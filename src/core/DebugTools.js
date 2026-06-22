// ── On-screen debug overlay (toggled via F3) ─────────
// Displays FPS, ping, position, game state, weapon, latency.
// All metrics are updated via set* methods and rendered
// to DOM elements with matching IDs.
export class DebugTools {
  constructor() {
    this.enabled = false;
    this.cheats = { unlocked: false, god: false, noclip: false, fullbright: false, freeze: false };
    this._cheatBuffer = '';
    this.metrics = {
      fps: 0,
      ping: 0,
      position: { x: 0, y: 0, z: 0 },
      state: 'Loading',
      weapon: 'none',
      latency: 0,
      players: 0,
      bullets: 0
    };

    this._frameCount = 0;
    this._lastFpsUpdate = performance.now();
    this._fps = 0;
  }

  handleKey(e) {
    if (/^[a-z]$/i.test(e.key)) {
      this._cheatBuffer = (this._cheatBuffer + e.key.toLowerCase()).slice(-10);
      if (!this.cheats.unlocked && this._cheatBuffer.endsWith('redrum')) {
        this.cheats.unlocked = true;
        console.log('%c🔓 CHEATS UNLOCKED — [G]od [N]oclip [B]right [X]freeze', 'color: #ff0; font-size: 14px');
      }
    }
    if (!this.cheats.unlocked) return;
    switch (e.code) {
      case 'KeyG': this.cheats.god = !this.cheats.god; break;
      case 'KeyN': this.cheats.noclip = !this.cheats.noclip; break;
      case 'KeyB': this.cheats.fullbright = !this.cheats.fullbright; break;
      case 'KeyX': this.cheats.freeze = !this.cheats.freeze; break;
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    const el = document.getElementById('debug-overlay');
    if (el) {
      el.classList.toggle('hidden', !this.enabled);
    }
    return this.enabled;
  }

  update(deltaTime) {
    if (!this.enabled) return;

    this._frameCount++;
    const now = performance.now();
    if (now - this._lastFpsUpdate >= 1000) {
      this._fps = this._frameCount;
      this._frameCount = 0;
      this._lastFpsUpdate = now;
    }

    this.metrics.fps = this._fps;
    this._render();
  }

  setPosition(x, y, z) {
    this.metrics.position = { x: x.toFixed(1), y: y.toFixed(1), z: z.toFixed(1) };
  }

  setState(state) {
    this.metrics.state = state;
  }

  setWeapon(weapon) {
    this.metrics.weapon = weapon;
  }

  setPing(ping) {
    this.metrics.ping = ping;
  }

  setLatency(latency) {
    this.metrics.latency = latency;
  }

  setPlayers(count) {
    this.metrics.players = count;
  }

  setBullets(count) {
    this.metrics.bullets = count;
  }

  _render() {
    const setText = (id, text) => {
      const el = document.getElementById(id);
      if (el) el.textContent = text;
    };

    setText('debug-fps', `FPS: ${this.metrics.fps}`);
    setText('debug-ping', `Ping: ${this.metrics.ping}ms`);
    setText('debug-position', `Pos: ${this.metrics.position.x}, ${this.metrics.position.y}, ${this.metrics.position.z}`);
    setText('debug-state', `State: ${this.metrics.state}`);
    setText('debug-weapon', `Weapon: ${this.metrics.weapon}`);
    setText('debug-latency', `Latency: ${this.metrics.latency}ms`);

    const activeCheats = [];
    if (this.cheats.god) activeCheats.push('GOD');
    if (this.cheats.noclip) activeCheats.push('NOCLIP');
    if (this.cheats.fullbright) activeCheats.push('FULLBRIGHT');
    if (this.cheats.freeze) activeCheats.push('FREEZE');
    const cheatsEl = document.getElementById('debug-cheats');
    if (cheatsEl) {
      cheatsEl.textContent = activeCheats.length > 0 ? `Cheats: ${activeCheats.join(' · ')}` : '';
      cheatsEl.style.display = activeCheats.length > 0 ? '' : 'none';
    }
  }
}
