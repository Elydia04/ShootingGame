// ── WebSocket network client ─────────────────────────
// Sends input snapshots at 20 Hz; receives server state,
// events (spawn/despawn/hit/kill/match_state).
// Tracks latency via ping/pong.
// Maintains an interpolation buffer for smooth rendering.
const UPDATE_RATE = 20;
const UPDATE_INTERVAL = 1000 / UPDATE_RATE;

export class NetworkManager {
  constructor() {
    this.ws = null;
    this.url = null;
    this.connected = false;
    this.latency = 0;
    this.clockSync = { offset: 0, rtt: 0 };

    this._updateTimer = 0;
    this._serverStates = [];
    this._interpolationBuffer = [];
    this._interpolationDelay = 100;
    this._sequenceNumber = 0;

    this.listeners = new Map();
    this.stateHandler = null;

    this._pingInterval = null;
    this._pingStart = 0;
  }

  connect(url) {
    if (this.ws) this.disconnect();

    this.url = url;
    this.ws = new WebSocket(url);
    this.ws.binaryType = 'arraybuffer';

    this.ws.onopen = () => {
      this.connected = true;
      console.log(`[Network] Connected to ${url}`);
      this._startPing();
    };

    this.ws.onclose = () => {
      this.connected = false;
      console.log('[Network] Disconnected');
      this._stopPing();
      this._emit('disconnected');
    };

    this.ws.onerror = (err) => {
      console.error('[Network] Error:', err);
      this._emit('error', err);
    };

    this.ws.onmessage = (event) => {
      this._handleMessage(event.data);
    };
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.connected = false;
    this._serverStates = [];
    this._interpolationBuffer = [];
    this._stopPing();
  }

  // Generic message send.
  send(type, data = {}) {
    if (!this.connected || !this.ws) return;

    const message = JSON.stringify({
      type,
      seq: this._sequenceNumber++,
      time: performance.now(),
      data
    });

    this.ws.send(message);
  }

  // Specialised: send an input snapshot for server-authoritative movement.
  sendInput(inputSnapshot) {
    const seq = this._sequenceNumber++;

    if (!this.connected) return;

    const message = JSON.stringify({
      type: 'input',
      seq,
      time: performance.now(),
      data: inputSnapshot
    });

    this.ws.send(message);
  }

  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);
    return () => {
      const arr = this.listeners.get(event);
      if (arr) {
        const idx = arr.indexOf(callback);
        if (idx !== -1) arr.splice(idx, 1);
      }
    };
  }

  _emit(event, data = null) {
    const arr = this.listeners.get(event);
    if (!arr) return;
    for (const cb of arr) cb(data);
  }

  // ── Message dispatch ──────────────────────────────

  _handleMessage(raw) {
    let msg;
    try {
      msg = JSON.parse(raw);
    } catch (e) {
      return;
    }

    switch (msg.type) {
      case 'pong':
        this._handlePong(msg);
        break;

      case 'state':
        this._handleServerState(msg);
        break;

      case 'spawn':
        this._emit('spawn', msg.data);
        break;

      case 'despawn':
        this._emit('despawn', msg.data);
        break;

      case 'hit':
        this._emit('hit', msg.data);
        break;

      case 'kill':
        this._emit('kill', msg.data);
        break;

      case 'match_state':
        this._emit('match_state', msg.data);
        break;

      default:
        this._emit(msg.type, msg.data);
    }
  }

  _handlePong(msg) {
    const now = performance.now();
    this.latency = now - this._pingStart;
    this.clockSync.rtt = this.latency;
    this.clockSync.offset = msg.serverTime - now + this.latency / 2;
  }

  // Store incoming server state + push into interpolation buffer.
  _handleServerState(msg) {
    const now = performance.now();
    const serverState = {
      sequence: msg.seq,
      time: msg.time ?? now,
      timestamp: now,
      entities: msg.data.entities || {},
      worldTime: msg.data.worldTime
    };

    this._serverStates.push(serverState);
    while (this._serverStates.length > 60) {
      this._serverStates.shift();
    }

    this._interpolationBuffer.push(serverState);
    while (this._interpolationBuffer.length > 120) {
      this._interpolationBuffer.shift();
    }

    if (this.stateHandler) {
      this.stateHandler(serverState);
    }
  }

  // Returns { before, after, t } for rendering interpolation.
  getInterpolatedState(renderTimestamp) {
    const buffer = this._interpolationBuffer;
    if (buffer.length === 0) return null;

    const targetTime = renderTimestamp - this._interpolationDelay;

    let before = buffer[0];
    let after = buffer[buffer.length - 1];

    for (let i = 0; i < buffer.length - 1; i++) {
      if (buffer[i].time <= targetTime && buffer[i + 1].time >= targetTime) {
        before = buffer[i];
        after = buffer[i + 1];
        break;
      }
    }

    const timeDiff = after.time - before.time;
    const t = timeDiff > 0
      ? (targetTime - before.time) / timeDiff
      : 1;

    return {
      before,
      after,
      t: Math.max(0, Math.min(1, t))
    };
  }

  // Send input or heartbeat at the configured update rate.
  update(deltaTime, inputSnapshot = null) {
    if (!this.connected) return;

    this._updateTimer += deltaTime * 1000;

    if (this._updateTimer >= UPDATE_INTERVAL) {
      this._updateTimer -= UPDATE_INTERVAL;

      if (inputSnapshot) {
        this.sendInput(inputSnapshot);
      } else {
        this.send('heartbeat');
      }
    }
  }

  _startPing() {
    this._pingInterval = setInterval(() => {
      this._pingStart = performance.now();
      this.send('ping', { clientTime: this._pingStart });
    }, 2000);
  }

  _stopPing() {
    if (this._pingInterval) {
      clearInterval(this._pingInterval);
      this._pingInterval = null;
    }
  }

  getServerTime() {
    return performance.now() + this.clockSync.offset;
  }

  isConnected() {
    return this.connected;
  }

  getRTT() {
    return this.clockSync.rtt;
  }
}
