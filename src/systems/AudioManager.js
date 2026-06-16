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

  _generateNoise(duration, decayRate = 10) {
    const sampleRate = this.context.sampleRate;
    const length = Math.floor(sampleRate * duration);
    const buffer = this.context.createBuffer(1, length, sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i++) {
      const t = i / sampleRate;
      const envelope = Math.exp(-t * decayRate);
      data[i] = (Math.random() * 2 - 1) * envelope;
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

  generateDefaultSounds() {
    if (!this.initialized) return;

    const gunshot = this._generateNoise(0.1, 30);
    this.registerClip('gunshot_rifle', gunshot, 0.4, 1.0);
    this.registerClip('gunshot_pistol', gunshot, 0.3, 1.5);
    this.registerClip('gunshot_smg', gunshot, 0.25, 1.2);
    this.registerClip('gunshot_shotgun', gunshot, 0.6, 0.8);

    const footstep = this._generateTone(80, 0.08, 'square');
    this.registerClip('footstep', footstep, 0.2, 1.0);

    const hit = this._generateNoise(0.05, 40);
    this.registerClip('hit', hit, 0.5, 1.0);
    this.registerClip('hit_leg', hit, 0.3, 0.7);

    const reload = this._generateNoise(0.3, 8);
    this.registerClip('reload', reload, 0.25, 1.0);
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
