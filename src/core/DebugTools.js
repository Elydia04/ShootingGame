export class DebugTools {
  constructor() {
    this.enabled = false;
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
  }
}
