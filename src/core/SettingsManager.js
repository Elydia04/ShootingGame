const DEFAULTS = {
  graphics: {
    quality: 'medium',
    shadows: true,
    shadowResolution: 1024,
    resolutionScale: 1.0,
    pixelRatio: 1.0,
    toneMapping: 'reinhard',
    fog: true,
    fov: 75,
    vsync: true
  },
  controls: {
    sensitivity: 5.0,
    invertY: false,
    keybinds: {
      forward: 'KeyW',
      backward: 'KeyS',
      left: 'KeyA',
      right: 'KeyD',
      jump: 'Space',
      crouch: 'KeyC',
      sprint: 'ShiftLeft',
      reload: 'KeyR',
      shoot: 'Mouse0',
      aim: 'Mouse2',
      interact: 'KeyE',
      switchWeapon1: 'Digit1',
      switchWeapon2: 'Digit2',
      switchWeapon3: 'Digit3',
      switchWeapon4: 'Digit4',
      debug: 'F3',
      scoreboard: 'Tab'
    }
  },
  audio: {
    masterVolume: 1.0,
    effectsVolume: 0.8,
    musicVolume: 0.5,
    voiceVolume: 0.7
  }
};

export class SettingsManager {
  constructor(saveManager) {
    this.saveManager = saveManager;
    this.settings = this._load();
  }

  _load() {
    const saved = this.saveManager.load('settings', null);
    if (saved) {
      return this._mergeDefaults(saved);
    }
    return this._deepClone(DEFAULTS);
  }

  _mergeDefaults(saved) {
    const result = this._deepClone(DEFAULTS);
    for (const category of Object.keys(DEFAULTS)) {
      if (saved[category]) {
        Object.assign(result[category], saved[category]);
      }
    }
    return result;
  }

  _deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  get(category, key) {
    if (key === undefined) {
      return this.settings[category];
    }
    return this.settings[category]?.[key];
  }

  set(category, key, value) {
    if (!this.settings[category]) {
      this.settings[category] = {};
    }
    this.settings[category][key] = value;
    this._persist();
  }

  getKeybind(action) {
    return this.settings.controls.keybinds[action] || null;
  }

  setKeybind(action, code) {
    this.settings.controls.keybinds[action] = code;
    this._persist();
  }

  reset() {
    this.settings = this._deepClone(DEFAULTS);
    this._persist();
  }

  _persist() {
    this.saveManager.save('settings', this.settings);
  }
}
