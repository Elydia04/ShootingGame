import { States } from '../core/GameStateManager.js';
import { CameraView } from '../player/CameraSystem.js';

export class InputManager {
  constructor(game) {
    this.game = game;
    this._keys = new Set();

    this._setupPointerLock();
    this._setupKeyboard();
    this._setupMouse();
  }

  _setupPointerLock() {
    document.addEventListener('click', (e) => {
      if (this.game.core.gameStateManager.is(States.PLAYING) && e.target === this.game.renderer.domElement) {
        this.game.pauseManager.requestPointerLock();
      }
    });

    document.addEventListener('pointerlockchange', () => {
      const locked = document.pointerLockElement === this.game.renderer.domElement;
      if (this.game.player.controller) {
        this.game.player.controller.isPointerLocked = locked;
      }
      if (!locked && this.game.core.gameStateManager.is(States.PLAYING) && !this.game.pauseManager.isPaused() && !this.game.ui.settingsMenu?.isVisible()) {
        this.game.pauseManager.pause();
      }
    });
  }

  _setupKeyboard() {
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.code === 'KeyW') {
        e.preventDefault();
      }
      if (e.code === 'AltLeft' || e.code === 'AltRight') e.preventDefault();
      this._keys.add(e.code);

      if (e.code === this.game.core.settingsManager.getKeybind('debug')) {
        this.game.core.debugTools.toggle();
        this.game.player.hitbox.setDebugMode(this.game.core.debugTools.enabled);
        this.game.bots.forEach(b => b.hitbox.setDebugMode(this.game.core.debugTools.enabled));
      }

      if (e.code === 'Tab') {
        e.preventDefault();
        if (this.game.core.gameStateManager.is(States.PLAYING)) {
          if (this.game._scoreboardVisible) {
            this.game._hideScoreboard();
          } else {
            this.game._showScoreboard();
          }
        }
      }

      if (e.code === 'Escape') {
        if (this.game.ui.settingsMenu?.isVisible()) {
          this.game.ui.settingsMenu.hide();
        } else if (this.game.pauseManager.isPaused()) {
          this.game.pauseManager.resume();
        } else if (this.game.core.gameStateManager.is(States.PLAYING) && document.pointerLockElement === this.game.renderer.domElement) {
          this.game.pauseManager.pause();
        } else {
          document.exitPointerLock();
        }
      }

      if (e.code === 'AltLeft' || e.code === 'AltRight') {
        e.preventDefault();
        if (document.pointerLockElement === this.game.renderer.domElement) {
          document.exitPointerLock();
        } else if (this.game.core.gameStateManager.is(States.PLAYING)) {
          this.game.pauseManager.requestPointerLock();
        }
      }

      if (e.code === 'Enter' && this.game.core.gameStateManager.is(States.PLAYING)) {
        const chatInput = document.getElementById('chat-input');
        if (chatInput && document.activeElement === chatInput) return;
        e.preventDefault();
        this.game.ui.hud?.showChat?.();
      }

      if (e.code === this.game.core.settingsManager.getKeybind('reload')) {
        if (this.game.systems.weaponManager) {
          this.game.systems.weaponManager.reload();
          const weapon = this.game.systems.weaponManager.getCurrentWeapon();
          this.game.player.firstPersonWeapon.playReload(weapon ? weapon.reloadTime : 2.0);
          this.game.systems.audioManager.play('reload', 'WEAPON');
        }
      }

      if (e.code === 'KeyV' && this.game.core.gameStateManager.is(States.PLAYING)) {
        const view = this.game.player.cameraSystem.toggleView();
        this.game.cameraView = view;
        this.game.ui.hud?.updateViewToggleLabel(view === CameraView.FIRST_PERSON);
        if (view === CameraView.THIRD_PERSON) {
          this.game.player.controller.cameraActive = false;
        } else {
          this.game.player.controller.cameraActive = true;
        }
      }

      const weaponKeys = [
        this.game.core.settingsManager.getKeybind('switchWeapon1'),
        this.game.core.settingsManager.getKeybind('switchWeapon2'),
        this.game.core.settingsManager.getKeybind('switchWeapon3'),
        this.game.core.settingsManager.getKeybind('switchWeapon4')
      ];
      const idx = weaponKeys.indexOf(e.code);
      if (idx !== -1 && this.game.systems.weaponManager) {
        this.game.systems.weaponManager.switchTo(idx);
      }
    });

    document.addEventListener('keyup', (e) => {
      this._keys.delete(e.code);
    });

    document.addEventListener('blur', () => {
      this._keys.clear();
    });
  }

  _setupMouse() {
    document.addEventListener('mousemove', (e) => {
      if (this.game.player.controller) {
        this.game.player.controller.handleMouseMove(e);
      }
    });

    document.addEventListener('mousedown', (e) => {
      this._keys.add(`Mouse${e.button}`);

      if (e.button === 0 && this.game.core.gameStateManager.is(States.PLAYING) && this.game.playerAlive) {
        const weapon = this.game.systems.weaponManager?.getCurrentWeapon();
        if (weapon) {
          this.game._fireWeapon();
        }
      }
    });

    document.addEventListener('mouseup', (e) => {
      this._keys.delete(`Mouse${e.button}`);
    });

    document.addEventListener('wheel', (e) => {
      if (!this.game.core.gameStateManager.is(States.PLAYING) || !this.game.systems.weaponManager) return;
      if (e.deltaY > 0) {
        this.game.systems.weaponManager.switchToNext();
      } else {
        this.game.systems.weaponManager.switchToPrev();
      }
    });
  }

  syncInputs() {
    if (!this.game.player.controller) return;
    const c = this.game.player.controller;
    const k = this._keys;
    c.inputs.forward = k.has('KeyW');
    c.inputs.backward = k.has('KeyS');
    c.inputs.left = k.has('KeyA');
    c.inputs.right = k.has('KeyD');
    c.inputs.jump = k.has('Space');
    c.inputs.sprint = k.has('ShiftLeft') || k.has('ShiftRight');
    c.inputs.crouch = k.has('ControlLeft') || k.has('ControlRight');
    c.inputs.reload = k.has('KeyR');
    c.inputs.shoot = k.has('Mouse0');
    c.inputs.aim = k.has('Mouse2');
  }
}
