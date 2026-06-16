import { States } from '../core/GameStateManager.js';

const MAPS = [
  { id: 'training_map', name: 'Training', desc: 'Open practice area' },
  { id: 'forest_map', name: 'Forest', desc: 'Dense forest ruins' },
  { id: 'city_map', name: 'City', desc: 'Urban combat zone' }
];

export class UIManager {
  constructor(gameStateManager, settingsManager, eventBus, requestPointerLock) {
    this.gsm = gameStateManager;
    this.settings = settingsManager;
    this.eventBus = eventBus;
    this._requestPointerLock = requestPointerLock;

    this.screens = {
      loading: document.getElementById('loading-screen'),
      mainMenu: document.getElementById('main-menu'),
      soloSetup: document.getElementById('solo-setup-screen'),
      multiLobby: document.getElementById('multi-lobby-screen'),
      matchEnd: document.getElementById('match-end-screen')
    };

    this.soloConfig = {
      map: 'training_map',
      difficulty: 'medium',
      botCount: 3
    };

    this.multiLobby = {
      code: null,
      players: [{ name: 'You', ready: true }],
      isHost: false
    };

    this._setupMainMenu();
    this._setupSoloSetup();
    this._setupMultiLobby();
    this._setupMatchEnd();

    this.gsm.onChange(({ to }) => {
      this._onStateChange(to);
    });
  }

  _setupMainMenu() {
    document.getElementById('btn-solo')?.addEventListener('click', () => {
      this.gsm.transitionTo(States.SOLO_SETUP);
    });

    document.getElementById('btn-multi')?.addEventListener('click', () => {
      this.gsm.transitionTo(States.MULTI_LOBBY);
    });

    document.getElementById('btn-settings')?.addEventListener('click', () => {
      this.eventBus.emit('ui:openSettings');
    });

    document.getElementById('btn-quit')?.addEventListener('click', () => {
      if (confirm('Quit game?')) {
        window.close();
      }
    });
  }

  _setupSoloSetup() {
    this._renderMapSelection();
    this._setupDifficultyButtons();
    this._setupBotCountSlider();

    document.getElementById('btn-start-solo')?.addEventListener('click', () => {
      this.soloConfig.map = document.querySelector('.map-card.selected')?.dataset.map || 'training_map';
      this.soloConfig.difficulty = document.querySelector('.diff-btn.active')?.dataset.diff || 'medium';
      this.soloConfig.botCount = parseInt(document.getElementById('bot-count-slider')?.value || 3);
      this.gsm.transitionTo(States.PLAYING, { mode: 'solo', ...this.soloConfig });
      this._requestPointerLock();
    });

    document.getElementById('btn-back-solo')?.addEventListener('click', () => {
      this.gsm.transitionTo(States.MAIN_MENU);
    });
  }

  _renderMapSelection() {
    const container = document.getElementById('map-selection');
    if (!container) return;

    container.innerHTML = MAPS.map((map, i) => `
      <div class="map-card ${i === 0 ? 'selected' : ''}" data-map="${map.id}">
        <span class="map-name">${map.name}</span>
        <span class="map-desc">${map.desc}</span>
      </div>
    `).join('');

    container.querySelectorAll('.map-card').forEach(card => {
      card.addEventListener('click', () => {
        container.querySelectorAll('.map-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
      });
    });
  }

  _setupDifficultyButtons() {
    document.querySelectorAll('.diff-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  }

  _setupBotCountSlider() {
    const slider = document.getElementById('bot-count-slider');
    const display = document.getElementById('bot-count-display');
    if (slider && display) {
      slider.addEventListener('input', () => {
        display.textContent = slider.value;
      });
    }
  }

  _setupMultiLobby() {
    document.getElementById('btn-create-lobby')?.addEventListener('click', () => {
      this.multiLobby.isHost = true;
      this.multiLobby.code = this._generateLobbyCode();
      this._showLobbySection('create');
      document.getElementById('lobby-code').textContent = this.multiLobby.code;
      this.eventBus.emit('lobby:created', { code: this.multiLobby.code });
    });

    document.getElementById('btn-join-lobby')?.addEventListener('click', () => {
      this.multiLobby.isHost = false;
      this._showLobbySection('join');
    });

    document.getElementById('btn-join-confirm')?.addEventListener('click', () => {
      const code = document.getElementById('lobby-code-input')?.value?.toUpperCase().trim();
      if (code && code.length === 6) {
        this.multiLobby.code = code;
        this.eventBus.emit('lobby:join', { code });
      }
    });

    document.getElementById('btn-ready')?.addEventListener('click', () => {
      const btn = document.getElementById('btn-ready');
      const isReady = btn.textContent === 'Ready';
      btn.textContent = isReady ? 'Unready' : 'Ready';
      btn.classList.toggle('primary', isReady);
      this.eventBus.emit('lobby:ready', isReady);
    });

    document.getElementById('btn-leave-lobby')?.addEventListener('click', () => {
      this.gsm.transitionTo(States.MAIN_MENU);
    });

    document.getElementById('btn-start-game')?.addEventListener('click', () => {
      this.eventBus.emit('lobby:start');
    });
  }

  _generateLobbyCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    return code;
  }

  _showLobbySection(section) {
    document.getElementById('lobby-create-display')?.classList.toggle('hidden', section !== 'create');
    document.getElementById('lobby-join-input')?.classList.toggle('hidden', section !== 'join');
  }

  _setupMatchEnd() {
    document.getElementById('btn-play-again')?.addEventListener('click', () => {
      const mode = this._lastMatchMode || 'solo';
      if (mode === 'solo') {
        this.gsm.transitionTo(States.SOLO_SETUP);
      } else {
        this.gsm.transitionTo(States.MULTI_LOBBY);
      }
    });

    document.getElementById('btn-leave-match')?.addEventListener('click', () => {
      this.gsm.transitionTo(States.MAIN_MENU);
    });
  }

  _onStateChange(state) {
    this._hideAllScreens();

    switch (state) {
      case States.LOADING:
        this.screens.loading.classList.remove('hidden');
        break;
      case States.MAIN_MENU:
        this.screens.mainMenu.classList.remove('hidden');
        break;
      case States.SOLO_SETUP:
        this.screens.soloSetup.classList.remove('hidden');
        this._renderMapSelection();
        break;
      case States.MULTI_LOBBY:
        this.screens.multiLobby.classList.remove('hidden');
        this._showLobbySection('create');
        this.multiLobby.code = this._generateLobbyCode();
        document.getElementById('lobby-code').textContent = this.multiLobby.code;
        break;
      case States.PLAYING:
      case States.SPECTATING:
        break;
      case States.MATCH_END:
        this.screens.matchEnd.classList.remove('hidden');
        this._updateMatchEndScreen();
        break;
    }
  }

  _hideAllScreens() {
    Object.values(this.screens).forEach(s => {
      if (s) s.classList.add('hidden');
    });
  }

  _updateMatchEndScreen() {
    const resultEl = document.getElementById('match-result');
    if (resultEl) {
      resultEl.textContent = 'Match Over';
    }
  }

  updateLoadingProgress(progress) {
    const bar = document.getElementById('loading-bar');
    const text = document.getElementById('loading-text');
    if (bar) bar.style.width = `${Math.min(100, progress * 100)}%`;
    if (text) text.textContent = `Loading... ${Math.floor(progress * 100)}%`;
  }

  setMultiLobbyPlayers(players) {
    const list = document.getElementById('player-list');
    if (!list) return;

    list.innerHTML = players.map(p => `
      <div class="player-entry">
        <span class="player-name">${p.name}</span>
        <span class="player-ready">${p.ready ? 'Ready' : 'Not Ready'}</span>
      </div>
    `).join('');
  }

  showMatchEnd(stats, mode = 'solo') {
    this._lastMatchMode = mode;
    const screen = this.screens.matchEnd;
    if (!screen) return;

    screen.classList.remove('hidden');

    const resultEl = document.getElementById('match-result');
    if (resultEl) {
      if (mode === 'solo') {
        resultEl.textContent = stats.winner ? `${stats.winner} Wins!` : 'Practice Complete';
      } else {
        resultEl.textContent = stats.winner ? `${stats.winner} Wins!` : 'Match Over';
      }
    }

    const statsEl = document.getElementById('match-stats');
    if (statsEl && stats.players) {
      statsEl.innerHTML = stats.players.slice(0, 10).map(p => `
        <div class="stat-row">
          <span>${p.name} ${p.isBot ? '(Bot)' : ''}</span>
          <span>${p.kills} / ${p.deaths}</span>
          <span>${p.score}</span>
        </div>
      `).join('');
    }
  }

  getSoloConfig() {
    return { ...this.soloConfig };
  }

  dispose() {
    this._hideAllScreens();
  }
}
