export class ScoreboardStore {
  constructor() {
    this.players = [];
    this.visible = false;
    this._listeners = new Map();
  }

  on(event, fn) {
    if (!this._listeners.has(event)) this._listeners.set(event, []);
    this._listeners.get(event).push(fn);
    return () => {
      const arr = this._listeners.get(event);
      if (arr) {
        const idx = arr.indexOf(fn);
        if (idx !== -1) arr.splice(idx, 1);
      }
    };
  }

  _emit(event, data) {
    const arr = this._listeners.get(event);
    if (arr) for (const fn of arr) fn(data);
  }

  setPlayers(players) {
    this.players = players;
    if (this.visible) {
      this._emit('changed', players);
    }
  }

  setVisible(v) {
    if (this.visible === v) return;
    this.visible = v;
    this._emit('visibility', v);
    if (v && this.players.length > 0) {
      this._emit('changed', this.players);
    }
  }

  updatePlayer(id, updates) {
    let changed = false;
    for (const p of this.players) {
      if (p.id === id) {
        for (const [k, v] of Object.entries(updates)) {
          if (p[k] !== v) { p[k] = v; changed = true; }
        }
        break;
      }
    }
    if (changed && this.visible) {
      this._emit('changed', this.players);
    }
  }

  clear() {
    this.players = [];
    this.visible = false;
  }
}
