import { States } from '../core/GameStateManager.js';

export class PauseManager {
  constructor(game) {
    this.game = game;
    this._createOverlay();
  }

  _createOverlay() {
    this.overlay = document.createElement('div');
    this.overlay.id = 'pause-menu';
    this.overlay.style.cssText = 'display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.6);z-index:9997;flex-direction:column;align-items:center;justify-content:center;font-family:sans-serif';
    this.overlay.innerHTML = `
      <h2 style="color:#fff;font-size:48px;margin-bottom:50px;text-shadow:0 2px 10px rgba(0,0,0,0.5)">PAUSED</h2>
      <button id="pause-continue" style="display:block;width:260px;padding:14px 0;margin:8px;font-size:20px;background:rgba(255,255,255,0.15);color:#fff;border:1px solid rgba(255,255,255,0.3);border-radius:6px;cursor:pointer">Continue</button>
      <button id="pause-settings" style="display:block;width:260px;padding:14px 0;margin:8px;font-size:20px;background:rgba(255,255,255,0.15);color:#fff;border:1px solid rgba(255,255,255,0.3);border-radius:6px;cursor:pointer">Settings</button>
      <button id="pause-quit" style="display:block;width:260px;padding:14px 0;margin:8px;font-size:20px;background:rgba(255,255,255,0.15);color:#ff6666;border:1px solid rgba(255,100,100,0.3);border-radius:6px;cursor:pointer">Quit Game</button>
    `;
    document.body.appendChild(this.overlay);

    document.getElementById('pause-continue').addEventListener('click', () => this.resume());
    document.getElementById('pause-settings').addEventListener('click', () => {
      this.hideOverlay();
      this.game.ui.settingsMenu?.show();
    });
    document.getElementById('pause-quit').addEventListener('click', () => {
      this.resume();
      this.game.core.gameStateManager.transitionTo(States.MAIN_MENU);
    });
  }

  requestPointerLock() {
    try {
      this.game.renderer.domElement.requestPointerLock();
    } catch (e) {
      // Browser may reject if called too soon after exitPointerLock
    }
  }

  resume() {
    this.overlay.style.display = 'none';
    this.game.paused = false;
    if (this.game.core.gameStateManager.is(States.PLAYING)) {
      this.requestPointerLock();
    }
  }

  pause() {
    this.game.paused = true;
    document.exitPointerLock();
    document.getElementById('pause-continue')?.focus();
    this.overlay.style.display = 'flex';
  }

  hideOverlay() {
    this.overlay.style.display = 'none';
  }

  isPaused() {
    return this.game.paused;
  }
}
