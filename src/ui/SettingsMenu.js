export class SettingsMenu {
  constructor(settingsManager) {
    this.settings = settingsManager;
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

  _renderGraphics() {
    this.panel.innerHTML = `
      <div class="settings-group">
        <label>Quality</label>
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
        <label>Resolution Scale: <span class="range-value" id="res-scale-value">${Math.round(this.settings.get('graphics', 'resolutionScale') * 100)}%</span></label>
        <input type="range" id="setting-res-scale" min="50" max="200" value="${Math.round(this.settings.get('graphics', 'resolutionScale') * 100)}">
      </div>
      <div class="settings-group">
        <label>Field of View: <span class="range-value" id="fov-value">${this.settings.get('graphics', 'fov')}</span></label>
        <input type="range" id="setting-fov" min="60" max="120" value="${this.settings.get('graphics', 'fov')}">
      </div>
    `;

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
    const rows = this.panel.querySelectorAll('.keybind-row');
    let listening = null;

    rows.forEach(row => {
      row.addEventListener('click', () => {
        if (listening) {
          listening.style.borderColor = '#333';
        }

        listening = row;
        row.style.borderColor = '#4a9eff';
        row.querySelector('.keybind-key').textContent = '...';

        const handler = (e) => {
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

          document.removeEventListener('keydown', handler);
          document.removeEventListener('mousedown', handler);
          listening = null;
        };

        document.addEventListener('keydown', handler);
        document.addEventListener('mousedown', handler);
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

    this.hide();
    console.log('[Settings] Saved');
  }
}
