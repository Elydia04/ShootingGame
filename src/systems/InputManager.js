import { States } from '../core/GameStateManager.js';

export class InputManager {
  constructor(game) {
    this.game = game;
    this._keys = new Set();
    this._handlers = [];
    this._lockGraceUntil = 0;
    this._lastUnlockAt = -10000;
    this._lockLossTimer = 0;
    this._everHadLock = false;

    this._setupPointerLock();
    this._setupKeyboard();
    this._setupMouse();
  }

  // Called each frame for watchdog timer
  update(deltaTime) {
    // Lock-loss watchdog: auto-pause if pointer lock lost for >0.5s and player is playing.
    // Only activate after the player has acquired pointer lock at least once
    // (avoids triggering during the initial "Click to Play" prompt in multiplayer).
    if (this._everHadLock &&
        document.pointerLockElement !== this.game.renderer.domElement &&
        this.game.core.gameStateManager.is(States.PLAYING) &&
        !this.game.pauseManager.isPaused()) {
      this._lockLossTimer += deltaTime;
      if (this._lockLossTimer > 0.5) {
        this._lockLossTimer = 0;
        this.game.pauseManager.pause();
      }
    } else {
      this._lockLossTimer = 0;
    }
  }

  _addEvent(target, type, handler, options) {
    target.addEventListener(type, handler, options);
    this._handlers.push({ target, type, handler, options });
  }

  _setupPointerLock() {
    const clickHandler = (e) => {
      this.game.systems.audioManager?.resume();
      if (this.game.core.gameStateManager.is(States.PLAYING) && e.target === this.game.renderer.domElement) {
        // Relock cooldown (Chromium needs ~1.35s between unlock and relock)
        const wait = 1350 - (performance.now() - this._lastUnlockAt);
        if (wait > 0) {
          setTimeout(() => {
            if (document.pointerLockElement !== this.game.renderer.domElement) {
              this.game.pauseManager.requestPointerLock();
            }
          }, wait);
        } else {
          this.game.pauseManager.requestPointerLock();
        }
      }
    };
    this._addEvent(document, 'click', clickHandler);

    const lockChangeHandler = () => {
      const locked = document.pointerLockElement === this.game.renderer.domElement;
      if (locked) {
        this._everHadLock = true;
        this._lockGraceUntil = performance.now() + 200;
      } else {
        this._lastUnlockAt = performance.now();
        this._keys.delete('Mouse0');
        this._keys.delete('Mouse2');
      }
      if (this.game.player.controller) {
        this.game.player.controller.isPointerLocked = locked;
      }
      if (!locked && this._everHadLock && this.game.core.gameStateManager.is(States.PLAYING) && !this.game.pauseManager.isPaused() && !this.game.pauseManager.justResumed() && !this.game.ui.settingsMenu?.isVisible()) {
        this.game.pauseManager.pause();
      }
    };
    this._addEvent(document, 'pointerlockchange', lockChangeHandler);
  }

  _setupKeyboard() {
    const captureKeydown = (e) => {
      if (e.ctrlKey || e.code === 'ControlLeft' || e.code === 'ControlRight') {
        e.preventDefault();
      }
    };
    this._addEvent(window, 'keydown', captureKeydown, { capture: true });

    const keydownHandler = (e) => {
      if (e.ctrlKey || e.code === 'ControlLeft' || e.code === 'ControlRight') {
        e.preventDefault();
      }
      if (e.code === 'AltLeft' || e.code === 'AltRight') e.preventDefault();

      const chatInput = document.getElementById('chat-input');
      if (chatInput && document.activeElement === chatInput) {
        const movement = ['KeyW','KeyA','KeyS','KeyD','Space','ShiftLeft','ShiftRight','ControlLeft','ControlRight'];
        if (movement.includes(e.code)) return;
      }
      this._keys.add(e.code);

      if (e.code === this.game.core.settingsManager.getKeybind('debug')) {
        this.game.core.debugTools.toggle();
        this.game.player.hitbox.setDebugMode(this.game.core.debugTools.enabled);
        this.game.bots.forEach(b => b.hitbox.setDebugMode(this.game.core.debugTools.enabled));
      }

      this.game.core.debugTools.handleKey(e);

      if (e.code === 'Tab') {
        e.preventDefault();
        if (this.game.core.gameStateManager.is(States.PLAYING)) {
          this.game._showScoreboard();
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
          try { document.exitPointerLock(); } catch (_) {}
        }
      }

      if (e.code === 'AltLeft' || e.code === 'AltRight') {
        if (this.game.core.gameStateManager.is(States.PLAYING) && document.pointerLockElement !== this.game.renderer.domElement) {
          this.game.pauseManager.requestPointerLock();
        }
      }

      if (e.code === 'Enter' && this.game.core.gameStateManager.is(States.PLAYING)) {
        const chatInput = document.getElementById('chat-input');
        if (chatInput && document.activeElement === chatInput) return;
        e.preventDefault();
        this.game.ui.hud?.showChat?.();
      }

      if (e.code === this.game.core.settingsManager.getKeybind('reload') && this.game.systems.weaponManager) {
        if (this.game.systems.weaponManager.reload()) {
          const weapon = this.game.systems.weaponManager.getCurrentWeapon();
          this.game.player.firstPersonWeapon.playReload(weapon ? weapon.reloadTime : 2.0);
          this.game.systems.audioManager.play('reload', 'WEAPON');
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
    };
    this._addEvent(document, 'keydown', keydownHandler);

    const keyupHandler = (e) => {
      this._keys.delete(e.code);
      if (e.code === 'Tab' && this.game.core.gameStateManager.is(States.PLAYING)) {
        this.game._hideScoreboard();
      }
    };
    this._addEvent(document, 'keyup', keyupHandler);

    const blurHandler = () => {
      this._keys.clear();
    };
    this._addEvent(document, 'blur', blurHandler);
  }

  _setupMouse() {
    const mousemoveHandler = (e) => {
      if (this.game.player.controller) {
        // Grace window — ignore garbage deltas right after lock
        if (performance.now() < this._lockGraceUntil) return;
        this.game.player.controller.handleMouseMove(e);
      }
    };
    this._addEvent(document, 'mousemove', mousemoveHandler);

    const mousedownHandler = (e) => {
      this._keys.add(`Mouse${e.button}`);
      this.game.systems.audioManager?.resume();

      if (e.button === 0 && this.game.core.gameStateManager.is(States.PLAYING) && this.game.playerAlive && !this.game.paused) {
        const weapon = this.game.systems.weaponManager?.getCurrentWeapon();
        if (weapon) {
          this.game._fireWeapon();
        }
      }
    };
    this._addEvent(document, 'mousedown', mousedownHandler);

    const mouseupHandler = (e) => {
      this._keys.delete(`Mouse${e.button}`);
      if (e.button === 0) {
        this.game._onTriggerRelease?.();
      }
    };
    this._addEvent(document, 'mouseup', mouseupHandler);

    const wheelHandler = (e) => {
      if (!this.game.core.gameStateManager.is(States.PLAYING) || !this.game.systems.weaponManager) return;
      if (e.deltaY > 0) {
        this.game.systems.weaponManager.switchToNext();
      } else {
        this.game.systems.weaponManager.switchToPrev();
      }
    };
    this._addEvent(document, 'wheel', wheelHandler);
  }

  dispose() {
    for (const { target, type, handler, options } of this._handlers) {
      target.removeEventListener(type, handler, options);
    }
    this._handlers.length = 0;
    this._keys.clear();
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
    c.inputs.crouch = k.has(this.game.core.settingsManager.getKeybind('crouch'));
    c.inputs.reload = k.has('KeyR');
    c.inputs.shoot = k.has('Mouse0');
    c.inputs.aim = k.has('Mouse2');
  }
}
