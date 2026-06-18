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
      createLobby: document.getElementById('create-lobby-screen'),
      joinLobby: document.getElementById('join-lobby-screen'),
      matchEnd: document.getElementById('match-end-screen')
    };

    this.soloConfig = {
      map: 'training_map',
      difficulty: 'medium',
      botCount: 10
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
    const nameInputs = ['player-name-input', 'name-input-create', 'name-input-join'];
    const getName = () => {
      for (const id of nameInputs) {
        const val = document.getElementById(id)?.value?.trim();
        if (val) return val;
      }
      return 'Player';
    };
    const syncNameInputs = (src) => {
      const val = document.getElementById(src)?.value || '';
      nameInputs.forEach(id => { const el = document.getElementById(id); if (el && el.id !== src) el.value = val; });
    };
    nameInputs.forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => syncNameInputs(id));
    });
    this._multiConfig = { map: 'training_map', timeLimit: 10, scoreLimit: 10 };

    const showScreen = (screenId) => {
      this._hideAllScreens();
      const el = this.screens[screenId];
      if (el) el.classList.remove('hidden');
    };

    this.eventBus.on('ui:show_screen', (screenId) => showScreen(screenId));

    document.getElementById('btn-create-lobby')?.addEventListener('click', () => {
      this.multiLobby.isHost = true;
      const name = getName();
      syncNameInputs('player-name-input');
      this.multiLobby.code = this._generateLobbyCode();
      document.getElementById('lobby-code').textContent = this.multiLobby.code;
      this._renderMultiMapSelection();
      this._setupMultiSliders();
      showScreen('createLobby');
      this.eventBus.emit('lobby:created', { code: this.multiLobby.code, name, config: { ...this._multiConfig } });
    });

    document.getElementById('btn-join-lobby')?.addEventListener('click', () => {
      this.multiLobby.isHost = false;
      document.getElementById('join-form-section')?.classList.remove('hidden');
      document.getElementById('join-lobby-section')?.classList.add('hidden');
      document.getElementById('join-error')?.classList.add('hidden');
      document.getElementById('lobby-code-input').value = '';
      showScreen('joinLobby');
    });

    document.getElementById('btn-multi-back')?.addEventListener('click', () => {
      this.gsm.transitionTo(States.MAIN_MENU);
    });

    document.getElementById('btn-direct-connect')?.addEventListener('click', () => {
      const ip = document.getElementById('direct-ip-input')?.value?.trim();
      if (!ip) return;
      const statusEl = document.getElementById('direct-connect-status');
      statusEl.textContent = 'Connecting...';
      statusEl.className = 'direct-connect-status';
      const name = getName();
      this.eventBus.emit('lobby:direct_connect', { ip, name, statusEl });
    });

    document.getElementById('direct-ip-input')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') document.getElementById('btn-direct-connect')?.click();
    });

    const readyToggle = (btn) => {
      const ready = !btn.dataset.ready || btn.dataset.ready === 'false';
      btn.dataset.ready = ready;
      btn.textContent = ready ? 'Ready ✓' : 'Not Ready';
      btn.classList.toggle('primary', ready);
      this.eventBus.emit('lobby:ready', ready);
    };

    document.getElementById('btn-ready')?.addEventListener('click', (e) => readyToggle(e.currentTarget));
    document.getElementById('btn-ready-join')?.addEventListener('click', (e) => readyToggle(e.currentTarget));
    document.getElementById('btn-start-game')?.addEventListener('click', () => {
      const map = document.querySelector('#multi-map-selection .map-card.selected')?.dataset.map || 'training_map';
      this._multiConfig.map = map;
      this._multiConfig.timeLimit = parseInt(document.getElementById('multi-time-limit')?.value || 10);
      this._multiConfig.scoreLimit = parseInt(document.getElementById('multi-score-limit')?.value || 10);
      this.eventBus.emit('lobby:start', { config: { ...this._multiConfig } });
    });

    document.getElementById('btn-leave-create')?.addEventListener('click', () => {
      this.gsm.transitionTo(States.MAIN_MENU);
    });
    document.getElementById('btn-leave-join')?.addEventListener('click', () => {
      this.gsm.transitionTo(States.MAIN_MENU);
    });
    document.getElementById('btn-leave-joined')?.addEventListener('click', () => {
      this.gsm.transitionTo(States.MAIN_MENU);
    });

    document.getElementById('lobby-code-input')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') document.getElementById('btn-join-confirm')?.click();
    });

    document.getElementById('btn-generate-code')?.addEventListener('click', () => {
      this.eventBus.emit('lobby:regenerate_code');
    });

    document.getElementById('btn-join-confirm')?.addEventListener('click', () => {
      const code = document.getElementById('lobby-code-input')?.value?.toUpperCase().trim();
      if (code && code.length >= 4 && code.length <= 6) {
        this.multiLobby.code = code;
        const name = getName();
        this.eventBus.emit('lobby:join', { code, name });
      }
    });

    this.eventBus.on('lobby:joined', () => {
      document.getElementById('join-form-section')?.classList.add('hidden');
      document.getElementById('join-lobby-section')?.classList.remove('hidden');
    });

    this.eventBus.on('lobby:error', (msg) => {
      const el = document.getElementById('join-error');
      if (el) { el.textContent = msg; el.classList.remove('hidden'); }
    });
  }

  _renderMultiMapSelection() {
    const container = document.getElementById('multi-map-selection');
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

  _setupMultiSliders() {
    const timeSlider = document.getElementById('multi-time-limit');
    const timeDisplay = document.getElementById('multi-time-display');
    if (timeSlider && timeDisplay) {
      timeSlider.oninput = () => { timeDisplay.textContent = timeSlider.value; };
    }
    const scoreSlider = document.getElementById('multi-score-limit');
    const scoreDisplay = document.getElementById('multi-score-display');
    if (scoreSlider && scoreDisplay) {
      scoreSlider.oninput = () => { scoreDisplay.textContent = scoreSlider.value; };
    }
  }

  _generateLobbyCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    return code;
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
        document.getElementById('lobby-code-input').value = '';
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
    const html = players.map(p => `
      <div class="player-entry">
        <span class="player-name team-${(p.team || 'ct').toLowerCase()}">${p.name}</span>
        <span class="player-team">${p.team || 'CT'}</span>
        <span class="player-ready">${p.ready ? 'Ready' : 'Not Ready'}</span>
      </div>
    `).join('');

    const createList = document.querySelector('#player-list .player-list-inner');
    if (createList) createList.innerHTML = html;

    const joinList = document.querySelector('#player-list-join .player-list-inner');
    if (joinList) joinList.innerHTML = html;
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
      // Show team scores for multiplayer
      let teamHtml = '';
      if (mode !== 'solo' && stats.players.some(p => p.team)) {
        const ctScore = stats.players.filter(p => p.team === 'CT').reduce((s, p) => s + p.score, 0);
        const tScore = stats.players.filter(p => p.team === 'T').reduce((s, p) => s + p.score, 0);
        teamHtml = `
          <div class="team-scores">
            <span class="team-ct">CT: ${ctScore}</span>
            <span class="team-t">T: ${tScore}</span>
          </div>
        `;
      }
      statsEl.innerHTML = teamHtml + stats.players.slice(0, 10).map(p => `
        <div class="stat-row">
          <span>${p.team ? `<span class="team-${p.team.toLowerCase()}">[${p.team}]</span> ` : ''}${p.name} ${p.isBot ? '(Bot)' : ''}</span>
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
