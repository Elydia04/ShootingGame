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
      console.log('[AudioManager] Initialized');
    } catch (e) {
      console.warn('[AudioManager] Failed to initialize:', e);
    }
  }

  async loadClip(name, url, volume = 1.0, pitch = 1.0) {
    if (!this.initialized) return;

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
      const source = this.context.createBufferSource();
      source.buffer = clip.buffer;

      const gainNode = this.context.createGain();
      gainNode.gain.value = (options.volume ?? clip.volume);

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

      source.onended = () => {
        this.activeSources.delete(source);
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

  _generateNoise(duration, decayRate = 10, highFreq = true) {
    const sampleRate = this.context.sampleRate;
    const length = Math.floor(sampleRate * duration);
    const buffer = this.context.createBuffer(1, length, sampleRate);
    const data = buffer.getChannelData(0);
    let last = 0;
    for (let i = 0; i < length; i++) {
      const t = i / sampleRate;
      const envelope = Math.exp(-t * decayRate);
      let noise = Math.random() * 2 - 1;
      if (!highFreq) {
        last += (noise - last) * 0.3;
        noise = last;
      }
      data[i] = noise * envelope;
    }
    return buffer;
  }

  _generateTone(frequency, duration, type = 'sine') {
    const sampleRate = this.context.sampleRate;
    const length = Math.floor(sampleRate * duration);
    const buffer = this.context.createBuffer(1, length, sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i++) {
      const t = i / sampleRate;
      const envelope = Math.exp(-t * 5);
      let sample = 0;
      if (type === 'sine') {
        sample = Math.sin(2 * Math.PI * frequency * t);
      } else if (type === 'square') {
        sample = Math.sin(2 * Math.PI * frequency * t) > 0 ? 1 : -1;
      } else if (type === 'sawtooth') {
        sample = 2 * ((frequency * t) % 1) - 1;
      }
      data[i] = sample * envelope;
    }
    return buffer;
  }

  _generateFlyby() {
    const sampleRate = this.context.sampleRate;
    const length = Math.floor(sampleRate * 0.12);
    const buffer = this.context.createBuffer(1, length, sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i++) {
      const t = i / sampleRate;
      const freq = 3000 - t * 20000;
      const envelope = Math.exp(-t * 15) * 0.5;
      data[i] = Math.sin(2 * Math.PI * freq * t) * envelope;
    }
    return buffer;
  }

  _generateGunshot(decayFast, decaySlow, mix) {
    const sampleRate = this.context.sampleRate;
    const length = Math.floor(sampleRate * 0.15);
    const buffer = this.context.createBuffer(1, length, sampleRate);
    const data = buffer.getChannelData(0);
    let last = 0;
    for (let i = 0; i < length; i++) {
      const t = i / sampleRate;
      const fast = Math.exp(-t * decayFast) * mix;
      const slow = Math.exp(-t * decaySlow) * (1 - mix);
      const envelope = fast + slow;
      let noise = Math.random() * 2 - 1;
      // Low-pass filter for the "boom" body
      last += (noise - last) * 0.4;
      data[i] = (noise * fast + last * slow) / (fast + slow + 0.001) * envelope;
    }
    return buffer;
  }

  generateDefaultSounds() {
    this.registerClip('gunshot_rifle', this._generateGunshot(60, 15, 0.7), 0.35, 1.0);
    this.registerClip('gunshot_pistol', this._generateGunshot(50, 12, 0.6), 0.3, 1.4);
    this.registerClip('gunshot_smg', this._generateGunshot(70, 18, 0.8), 0.25, 1.3);
    this.registerClip('gunshot_shotgun', this._generateGunshot(40, 10, 0.5), 0.5, 0.9);

    this.registerClip('footstep', this._generateNoise(0.06, 25, false), 0.25, 1.0);
    this.registerClip('hit', this._generateNoise(0.05, 30, false), 0.4, 1.0);
    this.registerClip('hit_leg', this._generateNoise(0.04, 25, false), 0.25, 0.8);

    this.registerClip('reload', this._generateNoise(0.25, 6, false), 0.15, 1.0);

    this.registerClip('knife_swing', this._generateNoise(0.06, 30, true), 0.35, 1.1);
    this.registerClip('bullet_flyby', this._generateFlyby(), 0.3, 1.0);
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
