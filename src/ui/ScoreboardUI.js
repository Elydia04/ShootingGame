export class ScoreboardUI {
  constructor(store) {
    this.store = store;
    this._lobbyCode = '';
    this._rows = new Map();
    this._overlay = null;
    this._panel = null;
    this._body = null;
    this._codeEl = null;
    this._createDOM();
    this._storeUnsubs = [
      store.on('changed', (players) => this._sync(players)),
      store.on('visibility', (v) => this._animate(v))
    ];
  }

  setLobbyCode(code) {
    this._lobbyCode = code || '';
    if (this._codeEl) {
      this._codeEl.textContent = this._lobbyCode ? `Lobby: ${this._lobbyCode}` : '';
    }
  }

  _createDOM() {
    this._overlay = document.createElement('div');
    this._overlay.id = 'sb-overlay';
    this._overlay.className = 'sb-overlay';

    this._panel = document.createElement('div');
    this._panel.className = 'sb-panel';

    const header = document.createElement('div');
    header.className = 'sb-header';
    header.innerHTML = `
      <span class="sb-h-name">Player</span>
      <span class="sb-h-team">Team</span>
      <span class="sb-h-kills">K</span>
      <span class="sb-h-deaths">D</span>
      <span class="sb-h-score">Score</span>
      <span class="sb-h-ping">Ping</span>
    `;
    this._panel.appendChild(header);

    this._codeEl = document.createElement('div');
    this._codeEl.className = 'sb-code';
    this._codeEl.textContent = '';
    this._panel.appendChild(this._codeEl);

    this._body = document.createElement('div');
    this._body.className = 'sb-body';
    this._panel.appendChild(this._body);

    this._overlay.appendChild(this._panel);
    const parent = document.getElementById('game-hud') || document.getElementById('app');
    parent.appendChild(this._overlay);
  }

  _sync(players) {
    const existing = new Set(this._rows.keys());
    const incoming = new Set(players.map(p => p.id));

    for (const id of existing) {
      if (!incoming.has(id)) {
        const row = this._rows.get(id);
        row.remove();
        this._rows.delete(id);
      }
    }

    for (const p of players) {
      if (existing.has(p.id)) {
        this._updateRow(p.id, p);
      } else {
        this._createRow(p);
      }
    }
  }

  _createRow(p) {
    const row = document.createElement('div');
    row.className = 'sb-row' + (p.local ? ' sb-local' : '');
    row.dataset.id = p.id;

    const teamCls = p.team ? ' team-' + p.team.toLowerCase() : '';
    row.innerHTML = `
      <span class="sb-c-name${teamCls}">${p.name}</span>
      <span class="sb-c-team">${p.team || '-'}</span>
      <span class="sb-c-kills">${p.kills}</span>
      <span class="sb-c-deaths">${p.deaths}</span>
      <span class="sb-c-score">${p.score}</span>
      <span class="sb-c-ping">${p.ping}</span>
    `;
    this._body.appendChild(row);
    this._rows.set(p.id, row);
  }

  _updateRow(id, p) {
    const row = this._rows.get(id);
    if (!row) return;
    row.className = 'sb-row' + (p.local ? ' sb-local' : '');

    const cells = {
      'sb-c-name': p.name,
      'sb-c-team': p.team || '-',
      'sb-c-kills': p.kills,
      'sb-c-deaths': p.deaths,
      'sb-c-score': p.score,
      'sb-c-ping': p.ping
    };

    for (const [cls, val] of Object.entries(cells)) {
      const el = row.querySelector('.' + cls);
      if (el && el.textContent !== String(val)) {
        el.textContent = val;
      }
    }

    const nameEl = row.querySelector('.sb-c-name');
    if (nameEl) {
      const teamCls = p.team ? 'team-' + p.team.toLowerCase() : '';
      nameEl.className = 'sb-c-name' + (teamCls ? ' ' + teamCls : '');
    }
  }

  _animate(visible) {
    if (visible) {
      this._overlay.classList.remove('sb-hidden');
      this._overlay.classList.add('sb-visible');
    } else {
      this._overlay.classList.remove('sb-visible');
      this._overlay.classList.add('sb-hidden');
    }
  }

  dispose() {
    for (const unsub of this._storeUnsubs) unsub();
    this._storeUnsubs = [];
    if (this._overlay && this._overlay.parentNode) {
      this._overlay.parentNode.removeChild(this._overlay);
    }
    this._rows.clear();
  }
}
