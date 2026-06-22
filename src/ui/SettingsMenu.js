const QUALITY_PRESETS = {
  low: { shadows: false, shadowResolution: 0, pixelRatio: 0.75, toneMapping: 'none', fog: false, resolutionScale: 0.75 },
  medium: { shadows: true, shadowResolution: 512, pixelRatio: 1.0, toneMapping: 'reinhard', fog: true, resolutionScale: 1.0 },
  high: { shadows: true, shadowResolution: 1024, pixelRatio: 1.5, toneMapping: 'reinhard', fog: true, resolutionScale: 1.0 },
  ultra: { shadows: true, shadowResolution: 2048, pixelRatio: 2.0, toneMapping: 'aces', fog: true, resolutionScale: 1.0 }
};

export class SettingsMenu {
  constructor(settingsManager, { onBackToPause, onApply } = {}) {
    this.settings = settingsManager;
    this.onBackToPause = onBackToPause;
    this.onApply = onApply;
    this.visible = false;
    this.currentTab = 'graphics';
    this.screen = document.getElementById('settings-screen');
    this.panel = document.getElementById('settings-panel');

    this._setupTabButtons();
    this._setupBackButton();
    this._setupSaveButton();
    this._setupResetButton();
  }

  show() {
    this.visible = true;
    this.screen.classList.remove('hidden');
    this._renderTab('graphics');
  }

  hide() {
    this.visible = false;
    this.screen.classList.add('hidden');
    this.onBackToPause?.();
  }

  isVisible() {
    return this.visible;
  }

  _setupTabButtons() {
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(btn => {
      btn.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        btn.classList.add('active');
        this._renderTab(btn.dataset.tab);
      });
    });
  }

  _setupBackButton() {
    document.getElementById('btn-back-settings')?.addEventListener('click', () => {
      this.hide();
    });
  }

  _setupSaveButton() {
    document.getElementById('btn-save-settings')?.addEventListener('click', () => {
      this._saveCurrentSettings();
    });
  }

  _setupResetButton() {
    document.getElementById('btn-reset-settings')?.addEventListener('click', () => {
      this.settings.reset();
      this._renderTab(this.currentTab);
    });
  }

  _renderTab(tab) {
    this.currentTab = tab;
    if (!this.panel) return;

    switch (tab) {
      case 'graphics': this._renderGraphics(); break;
      case 'controls': this._renderControls(); break;
      case 'audio': this._renderAudio(); break;
    }
  }

  _applyPreset(preset) {
    const p = QUALITY_PRESETS[preset];
    if (!p) return;
    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.value = val;
    };
    setVal('setting-shadows', p.shadows ? 'true' : 'false');
    setVal('setting-shadow-res', String(p.shadowResolution));
    setVal('setting-pixel-ratio', String(p.pixelRatio));
    setVal('setting-tone-map', p.toneMapping);
    setVal('setting-fog', p.fog ? 'true' : 'false');
    setVal('setting-res-scale', String(Math.round(p.resolutionScale * 100)));
    const resLabel = document.getElementById('res-scale-value');
    if (resLabel) resLabel.textContent = `${Math.round(p.resolutionScale * 100)}%`;
  }

  _renderGraphics() {
    this.panel.innerHTML = `
      <div class="settings-group">
        <label>Quality Preset</label>
        <select id="setting-quality">
          <option value="low" ${this.settings.get('graphics', 'quality') === 'low' ? 'selected' : ''}>Low</option>
          <option value="medium" ${this.settings.get('graphics', 'quality') === 'medium' ? 'selected' : ''}>Medium</option>
          <option value="high" ${this.settings.get('graphics', 'quality') === 'high' ? 'selected' : ''}>High</option>
          <option value="ultra" ${this.settings.get('graphics', 'quality') === 'ultra' ? 'selected' : ''}>Ultra</option>
        </select>
      </div>
      <div class="settings-group">
        <label>Shadows</label>
        <select id="setting-shadows">
          <option value="true" ${this.settings.get('graphics', 'shadows') ? 'selected' : ''}>Enabled</option>
          <option value="false" ${!this.settings.get('graphics', 'shadows') ? 'selected' : ''}>Disabled</option>
        </select>
      </div>
      <div class="settings-group">
        <label>Shadow Resolution</label>
        <select id="setting-shadow-res">
          <option value="0" ${this.settings.get('graphics', 'shadowResolution') === 0 ? 'selected' : ''}>Off</option>
          <option value="512" ${this.settings.get('graphics', 'shadowResolution') === 512 ? 'selected' : ''}>512</option>
          <option value="1024" ${this.settings.get('graphics', 'shadowResolution') === 1024 ? 'selected' : ''}>1024</option>
          <option value="2048" ${this.settings.get('graphics', 'shadowResolution') === 2048 ? 'selected' : ''}>2048</option>
        </select>
      </div>
      <div class="settings-group">
        <label>Pixel Ratio</label>
        <select id="setting-pixel-ratio">
          <option value="0.5" ${this.settings.get('graphics', 'pixelRatio') === 0.5 ? 'selected' : ''}>0.5x</option>
          <option value="0.75" ${this.settings.get('graphics', 'pixelRatio') === 0.75 ? 'selected' : ''}>0.75x</option>
          <option value="1.0" ${this.settings.get('graphics', 'pixelRatio') === 1.0 ? 'selected' : ''}>1.0x</option>
          <option value="1.5" ${this.settings.get('graphics', 'pixelRatio') === 1.5 ? 'selected' : ''}>1.5x</option>
          <option value="2.0" ${this.settings.get('graphics', 'pixelRatio') === 2.0 ? 'selected' : ''}>2.0x</option>
        </select>
      </div>
      <div class="settings-group">
        <label>Tone Mapping</label>
        <select id="setting-tone-map">
          <option value="none" ${this.settings.get('graphics', 'toneMapping') === 'none' ? 'selected' : ''}>None</option>
          <option value="reinhard" ${this.settings.get('graphics', 'toneMapping') === 'reinhard' ? 'selected' : ''}>Reinhard</option>
          <option value="aces" ${this.settings.get('graphics', 'toneMapping') === 'aces' ? 'selected' : ''}>ACES</option>
        </select>
      </div>
      <div class="settings-group">
        <label>Fog</label>
        <select id="setting-fog">
          <option value="true" ${this.settings.get('graphics', 'fog') ? 'selected' : ''}>Enabled</option>
          <option value="false" ${!this.settings.get('graphics', 'fog') ? 'selected' : ''}>Disabled</option>
        </select>
      </div>
      <div class="settings-group">
        <label>Resolution Scale: <span class="range-value" id="res-scale-value">${Math.round(this.settings.get('graphics', 'resolutionScale') * 100)}%</span></label>
        <input type="range" id="setting-res-scale" min="50" max="200" value="${Math.round(this.settings.get('graphics', 'resolutionScale') * 100)}">
      </div>
      <div class="settings-group">
        <label>Field of View: <span class="range-value" id="fov-value">${this.settings.get('graphics', 'fov')}</span></label>
        <input type="range" id="setting-fov" min="60" max="120" value="${this.settings.get('graphics', 'fov')}">
      </div>
    `;

    document.getElementById('setting-quality')?.addEventListener('change', (e) => {
      this._applyPreset(e.target.value);
    });

    this._bindRange('res-scale-value', 'setting-res-scale');
    this._bindRange('fov-value', 'setting-fov');
  }

  _renderControls() {
    const binds = this.settings.get('controls', 'keybinds');

    this.panel.innerHTML = `
      <div class="settings-group">
        <label>Mouse Sensitivity: <span class="range-value" id="sens-value">${this.settings.get('controls', 'sensitivity')}</span></label>
        <input type="range" id="setting-sensitivity" min="1" max="20" step="0.5" value="${this.settings.get('controls', 'sensitivity')}">
      </div>
      <div class="settings-group">
        <label>Invert Y</label>
        <select id="setting-invert-y">
          <option value="false" ${!this.settings.get('controls', 'invertY') ? 'selected' : ''}>Disabled</option>
          <option value="true" ${this.settings.get('controls', 'invertY') ? 'selected' : ''}>Enabled</option>
        </select>
      </div>
      <div class="settings-group">
        <label>Keybinds (click to rebind)</label>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-top: 8px;">
          ${Object.entries(binds).map(([action, key]) => `
            <div style="display: flex; justify-content: space-between; background: #1a1a1a; padding: 4px 8px; border-radius: 4px; cursor: pointer;" class="keybind-row" data-action="${action}">
              <span style="color: #aaa; font-size: 0.8rem;">${action}</span>
              <span style="color: #4a9eff; font-size: 0.8rem;" class="keybind-key">${key}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    this._bindRange('sens-value', 'setting-sensitivity');
    this._setupKeybindListeners();
  }

  _setupKeybindListeners() {
    // Clean up any previous listening state to prevent listener leaks
    if (this._keybindHandler) {
      document.removeEventListener('keydown', this._keybindHandler);
      document.removeEventListener('mousedown', this._keybindHandler);
      this._keybindHandler = null;
    }
    if (this._keybindListening) {
      this._keybindListening.style.borderColor = '#333';
      this._keybindListening = null;
    }

    const rows = this.panel.querySelectorAll('.keybind-row');

    rows.forEach(row => {
      row.addEventListener('click', () => {
        if (this._keybindListening) {
          this._keybindListening.style.borderColor = '#333';
        }

        this._keybindListening = row;
        row.style.borderColor = '#4a9eff';
        row.querySelector('.keybind-key').textContent = '...';

        if (this._keybindHandler) {
          document.removeEventListener('keydown', this._keybindHandler);
          document.removeEventListener('mousedown', this._keybindHandler);
        }

        this._keybindHandler = (e) => {
          e.preventDefault();
          let code = e.code;
          if (e.button !== undefined) {
            code = `Mouse${e.button}`;
          }

          row.querySelector('.keybind-key').textContent = code;
          row.style.borderColor = '#333';

          const action = row.dataset.action;
          this.settings.setKeybind(action, code);
          this.settings.saveManager.save('settings', this.settings.settings);
          this.settings._persist();

          document.removeEventListener('keydown', this._keybindHandler);
          document.removeEventListener('mousedown', this._keybindHandler);
          this._keybindHandler = null;
          this._keybindListening = null;
        };

        document.addEventListener('keydown', this._keybindHandler);
        document.addEventListener('mousedown', this._keybindHandler);
      });
    });
  }

  _renderAudio() {
    this.panel.innerHTML = `
      <div class="settings-group">
        <label>Master Volume: <span class="range-value" id="master-vol-value">${Math.round(this.settings.get('audio', 'masterVolume') * 100)}%</span></label>
        <input type="range" id="setting-master-vol" min="0" max="100" value="${Math.round(this.settings.get('audio', 'masterVolume') * 100)}">
      </div>
      <div class="settings-group">
        <label>Effects Volume: <span class="range-value" id="effects-vol-value">${Math.round(this.settings.get('audio', 'effectsVolume') * 100)}%</span></label>
        <input type="range" id="setting-effects-vol" min="0" max="100" value="${Math.round(this.settings.get('audio', 'effectsVolume') * 100)}">
      </div>
      <div class="settings-group">
        <label>Music Volume: <span class="range-value" id="music-vol-value">${Math.round(this.settings.get('audio', 'musicVolume') * 100)}%</span></label>
        <input type="range" id="setting-music-vol" min="0" max="100" value="${Math.round(this.settings.get('audio', 'musicVolume') * 100)}">
      </div>
    `;

    this._bindRange('master-vol-value', 'setting-master-vol');
    this._bindRange('effects-vol-value', 'setting-effects-vol');
    this._bindRange('music-vol-value', 'setting-music-vol');
  }

  _bindRange(valueId, inputId) {
    const input = document.getElementById(inputId);
    const display = document.getElementById(valueId);
    if (input && display) {
      input.addEventListener('input', () => {
        display.textContent = input.id.includes('scale') ? `${input.value}%` : input.value;
      });
    }
  }

  _saveCurrentSettings() {
    const getVal = (id) => document.getElementById(id)?.value;

    const quality = getVal('setting-quality');
    if (quality) this.settings.set('graphics', 'quality', quality);

    const shadows = getVal('setting-shadows');
    if (shadows) this.settings.set('graphics', 'shadows', shadows === 'true');

    const shadowRes = getVal('setting-shadow-res');
    if (shadowRes) this.settings.set('graphics', 'shadowResolution', parseInt(shadowRes));

    const pixelRatio = getVal('setting-pixel-ratio');
    if (pixelRatio) this.settings.set('graphics', 'pixelRatio', parseFloat(pixelRatio));

    const toneMapping = getVal('setting-tone-map');
    if (toneMapping) this.settings.set('graphics', 'toneMapping', toneMapping);

    const fog = getVal('setting-fog');
    if (fog) this.settings.set('graphics', 'fog', fog === 'true');

    const resScale = getVal('setting-res-scale');
    if (resScale) this.settings.set('graphics', 'resolutionScale', parseInt(resScale) / 100);

    const fov = getVal('setting-fov');
    if (fov) this.settings.set('graphics', 'fov', parseInt(fov));

    const sensitivity = getVal('setting-sensitivity');
    if (sensitivity) this.settings.set('controls', 'sensitivity', parseFloat(sensitivity));

    const invertY = getVal('setting-invert-y');
    if (invertY) this.settings.set('controls', 'invertY', invertY === 'true');

    const masterVol = getVal('setting-master-vol');
    if (masterVol) this.settings.set('audio', 'masterVolume', parseInt(masterVol) / 100);

    const effectsVol = getVal('setting-effects-vol');
    if (effectsVol) this.settings.set('audio', 'effectsVolume', parseInt(effectsVol) / 100);

    const musicVol = getVal('setting-music-vol');
    if (musicVol) this.settings.set('audio', 'musicVolume', parseInt(musicVol) / 100);

    this.onApply?.();
    this.hide();
    console.log('[Settings] Saved');
  }
}
