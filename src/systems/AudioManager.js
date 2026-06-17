const AudioCategory = Object.freeze({
  WEAPON: 'effectsVolume',
  HIT: 'effectsVolume',
  FOOTSTEP: 'effectsVolume',
  RELOAD: 'effectsVolume',
  UI: 'effectsVolume',
  ENVIRONMENT: 'effectsVolume',
  MUSIC: 'musicVolume',
  VOICE: 'voiceVolume'
});

class AudioClip {
  constructor(buffer, volume = 1.0, pitch = 1.0) {
    this.buffer = buffer;
    this.volume = volume;
    this.pitch = pitch;
    this.duration = 0;
  }
}

export class AudioManager {
  constructor(settingsManager) {
    this.settings = settingsManager;
    this.context = null;
    this.masterGain = null;
    this.categoryGains = new Map();
    this.clips = new Map();
    this.activeSources = new Set();
    this._activeClipSources = new Map();
    this.listener = null;
    this.initialized = false;
    this.muted = false;
  }

  async init() {
    if (this.initialized) return;

    try {
      this.context = new (window.AudioContext || window.webkitAudioContext)();
      this.masterGain = this.context.createGain();
      this.masterGain.connect(this.context.destination);
      this.masterGain.gain.value = this.settings.get('audio', 'masterVolume');

      for (const [category, settingKey] of Object.entries(AudioCategory)) {
        const gain = this.context.createGain();
        gain.connect(this.masterGain);
        gain.gain.value = this.settings.get('audio', settingKey);
        this.categoryGains.set(category, gain);
      }

      this.listener = this.context.listener;
      this.generateDefaultSounds();
      this.initialized = true;
      this.loadRealSounds();
      console.log('[AudioManager] Initialized');
    } catch (e) {
      console.warn('[AudioManager] Failed to initialize:', e);
    }
  }

  async loadClip(name, url, volume = 1.0, pitch = 1.0) {
    if (!this.context) return;

    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this.context.decodeAudioData(arrayBuffer);
      const clip = new AudioClip(audioBuffer, volume, pitch);
      this.clips.set(name, clip);
    } catch (e) {
      console.warn(`[AudioManager] Failed to load clip '${name}':`, e);
    }
  }

  registerClip(name, buffer, volume = 1.0, pitch = 1.0) {
    const clip = new AudioClip(buffer, volume, pitch);
    this.clips.set(name, clip);
  }

  play(name, category = 'WEAPON', options = {}) {
    if (!this.initialized || this.muted) return null;

    const clip = this.clips.get(name);
    if (!clip) {
      console.warn(`[AudioManager] Clip '${name}' not found`);
      return null;
    }

    try {
      // Stop previous instance of the same clip to prevent stacking
      if (this._activeClipSources.has(name)) {
        const prev = this._activeClipSources.get(name);
        try { prev.source.stop(); } catch (e) { /* already stopped */ }
        this.activeSources.delete(prev.source);
      }

      const source = this.context.createBufferSource();
      source.buffer = clip.buffer;

      const gainNode = this.context.createGain();
      gainNode.gain.value = (options.volume ?? clip.volume);

      // Envelope to tighten tails and prevent stacking noise
      if (clip.duration) {
        const now = this.context.currentTime;
        const envDuration = clip.duration;
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(options.volume ?? clip.volume, now + 0.003);
        gainNode.gain.setValueAtTime(options.volume ?? clip.volume, now + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + envDuration);
      }

      const panner = this.context.createPanner();
      panner.panningModel = 'HRTF';
      panner.distanceModel = 'inverse';
      panner.refDistance = 10;
      panner.maxDistance = 100;
      panner.rolloffFactor = 1;

      if (options.position) {
        panner.positionX.value = options.position.x;
        panner.positionY.value = options.position.y;
        panner.positionZ.value = options.position.z;
        source.connect(panner);
        panner.connect(gainNode);
      } else {
        source.connect(gainNode);
      }

      const categoryGain = this.categoryGains.get(category);
      if (categoryGain) {
        gainNode.connect(categoryGain);
      } else {
        gainNode.connect(this.masterGain);
      }

      source.playbackRate.value = options.pitch ?? clip.pitch;
      source.loop = options.loop ?? false;

      source.start(0);
      this.activeSources.add(source);
      this._activeClipSources.set(name, { source, gainNode });

      source.onended = () => {
        this.activeSources.delete(source);
        if (this._activeClipSources.get(name)?.source === source) {
          this._activeClipSources.delete(name);
        }
      };

      return source;
    } catch (e) {
      console.warn(`[AudioManager] Playback failed for '${name}':`, e);
      return null;
    }
  }

  playAtPosition(name, position, category = 'WEAPON', options = {}) {
    return this.play(name, category, { ...options, position });
  }

  stop(source) {
    try {
      source.stop();
      this.activeSources.delete(source);
    } catch (e) {
      // already stopped
    }
  }

  stopAll() {
    for (const source of this.activeSources) {
      try { source.stop(); } catch (e) { /* ignore */ }
    }
    this.activeSources.clear();
  }

  setMasterVolume(volume) {
    if (this.masterGain) {
      this.masterGain.gain.value = volume;
    }
  }

  setCategoryVolume(category, volume) {
    const gain = this.categoryGains.get(category);
    if (gain) {
      gain.gain.value = volume;
    }
  }

  updateListenerPosition(position, quaternion) {
    if (!this.listener) return;
    if (position) {
      this.listener.positionX.value = position.x;
      this.listener.positionY.value = position.y;
      this.listener.positionZ.value = position.z;
    }
  }

  mute() {
    this.muted = true;
  }

  unmute() {
    this.muted = false;
  }

  toggleMute() {
    this.muted = !this.muted;
  }

  resume() {
    if (this.context && this.context.state === 'suspended') {
      this.context.resume();
    }
  }

  // Micro-ramp attack (3ms) and release (last 15% fade-out) for click-free immersive audio
  _envelope(i, len, rate) {
    const dur = len / rate;
    const atk = Math.min(0.003, dur * 0.1);
    const rel = Math.min(0.005, dur * 0.15);
    const t = i / rate;
    let env = 1;
    if (t < atk) env = t / atk;
    const relStart = dur - rel;
    if (t > relStart) env *= (dur - t) / rel;
    return env;
  }

  _generateNoise(duration, decayRate = 10, highFreq = true) {
    const sr = this.context.sampleRate;
    const len = Math.floor(sr * duration);
    const buf = this.context.createBuffer(1, len, sr);
    const d = buf.getChannelData(0);
    let last = 0;
    for (let i = 0; i < len; i++) {
      const t = i / sr;
      const env = this._envelope(i, len, sr) * Math.exp(-t * decayRate);
      let n = Math.random() * 2 - 1;
      if (!highFreq) { last += (n - last) * 0.3; n = last; }
      d[i] = n * env;
    }
    return buf;
  }

  _generateTone(frequency, duration, type = 'sine') {
    const sr = this.context.sampleRate;
    const len = Math.floor(sr * duration);
    const buf = this.context.createBuffer(1, len, sr);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) {
      const t = i / sr;
      const env = this._envelope(i, len, sr) * Math.exp(-t * 5);
      let s = 0;
      if (type === 'sine') s = Math.sin(2 * Math.PI * frequency * t);
      else if (type === 'square') s = Math.sin(2 * Math.PI * frequency * t) > 0 ? 1 : -1;
      else if (type === 'sawtooth') s = 2 * ((frequency * t) % 1) - 1;
      d[i] = s * env;
    }
    return buf;
  }

  _generateFlyby() {
    const sr = this.context.sampleRate;
    const len = Math.floor(sr * 0.12);
    const buf = this.context.createBuffer(1, len, sr);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) {
      const t = i / sr;
      const freq = 3000 - t * 20000;
      d[i] = Math.sin(2 * Math.PI * freq * t) * this._envelope(i, len, sr) * Math.exp(-t * 15) * 0.5;
    }
    return buf;
  }

  _generateGunshot(decayFast, decaySlow, mix) {
    const sr = this.context.sampleRate;
    const len = Math.floor(sr * 0.15);
    const buf = this.context.createBuffer(1, len, sr);
    const d = buf.getChannelData(0);
    let last = 0;
    for (let i = 0; i < len; i++) {
      const t = i / sr;
      const fast = Math.exp(-t * decayFast) * mix;
      const slow = Math.exp(-t * decaySlow) * (1 - mix);
      const env = (fast + slow) * this._envelope(i, len, sr);
      let n = Math.random() * 2 - 1;
      last += (n - last) * 0.4;
      d[i] = (n * fast + last * slow) / (fast + slow + 0.001) * env;
    }
    return buf;
  }

  async loadRealSounds() {
    const sounds = [
      { name: 'gunshot_rifle', file: 'sounds/rifle_shot.wav', vol: 0.5, pitch: 1.0, dur: 0.2 },
      { name: 'gunshot_pistol', file: 'sounds/pistol_shot.wav', vol: 0.45, pitch: 1.0, dur: 0.2 },
      { name: 'gunshot_shotgun', file: 'sounds/shotgun_shot.wav', vol: 0.55, pitch: 1.0, dur: 0.25 },
    ];
    const loaded = [];
    for (const s of sounds) {
      await this.loadClip(s.name, s.file, s.vol, s.pitch);
      const clip = this.clips.get(s.name);
      if (clip) { clip.duration = s.dur; loaded.push(s.name); }
    }
    if (loaded.length > 0) console.log(`[AudioManager] Loaded ${loaded.length}/${sounds.length} real sound files (${loaded.join(', ')})`);
  }

  generateDefaultSounds() {
    this.registerClip('gunshot_rifle', this._generateGunshot(60, 15, 0.7), 0.45, 1.0);
    this.registerClip('gunshot_pistol', this._generateGunshot(50, 12, 0.6), 0.4, 1.4);
    this.registerClip('gunshot_smg', this._generateGunshot(70, 18, 0.8), 0.35, 1.3);
    this.registerClip('gunshot_shotgun', this._generateGunshot(40, 10, 0.5), 0.6, 0.9);

    this.registerClip('footstep', this._generateNoise(0.06, 25, false), 0.3, 1.0);
    this.registerClip('hit', this._generateNoise(0.05, 30, false), 0.5, 1.0);
    this.registerClip('hit_leg', this._generateNoise(0.04, 25, false), 0.3, 0.8);

    this.registerClip('reload', this._generateNoise(0.25, 6, false), 0.2, 1.0);

    this.registerClip('knife_swing', this._generateNoise(0.06, 30, true), 0.45, 1.1);
    this.registerClip('bullet_flyby', this._generateFlyby(), 0.35, 1.0);
  }

  dispose() {
    this.stopAll();
    if (this.context) {
      this.context.close();
    }
    this.clips.clear();
    this.initialized = false;
  }
}
