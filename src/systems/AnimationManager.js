// ── Animation state machine ──────────────────────────
// Tracks weapon animation state (idle/shoot/reload/etc.) and
// player animation state (idle/walk/run/jump/etc.) separately.
// Uses named clips with durations; auto-returns to idle after
// non-looping clips finish. Crossfade via blendFactor.
export const WeaponAnimState = Object.freeze({
  IDLE: 'idle',
  SHOOT: 'shoot',
  RELOAD: 'reload',
  SWITCH: 'switch',
  AIM: 'aim'
});

export const PlayerAnimState = Object.freeze({
  IDLE: 'idle',
  WALK: 'walk',
  RUN: 'run',
  JUMP: 'jump',
  CROUCH: 'crouch',
  CROUCH_WALK: 'crouch_walk',
  DEATH: 'death'
});

class AnimationClip {
  constructor(name, duration, keyframes = []) {
    this.name = name;
    this.duration = duration;
    this.keyframes = keyframes;
    this.loop = false;
  }
}

export class AnimationManager {
  constructor() {
    this.weaponClips = new Map();
    this.playerClips = new Map();
    this.activeWeaponAnim = null;
    this.activePlayerAnim = null;
    this.animTime = 0;
    this.blendFactor = 0;
    this.transitioning = false;
    this.transitionTime = 0;
    this.transitionDuration = 0.15;
    this.callbacks = new Map();

    this._initDefaultClips();
  }

  _initDefaultClips() {
    const weaponClips = [
      new AnimationClip(WeaponAnimState.IDLE, 0),
      new AnimationClip(WeaponAnimState.SHOOT, 0.1),
      new AnimationClip(WeaponAnimState.RELOAD, 2.0),
      new AnimationClip(WeaponAnimState.SWITCH, 0.4),
      new AnimationClip(WeaponAnimState.AIM, 0.2)
    ];
    for (const clip of weaponClips) {
      this.weaponClips.set(clip.name, clip);
    }

    const playerClips = [
      new AnimationClip(PlayerAnimState.IDLE, 0),
      new AnimationClip(PlayerAnimState.WALK, 0.5),
      new AnimationClip(PlayerAnimState.RUN, 0.35),
      new AnimationClip(PlayerAnimState.JUMP, 0.6),
      new AnimationClip(PlayerAnimState.CROUCH, 0.3),
      new AnimationClip(PlayerAnimState.CROUCH_WALK, 0.6),
      new AnimationClip(PlayerAnimState.DEATH, 1.5)
    ];
    for (const clip of playerClips) {
      this.playerClips.set(clip.name, clip);
    }
  }

  playWeapon(state, callback = null) {
    const clip = this.weaponClips.get(state);
    if (!clip) return;

    if (this.activeWeaponAnim) {
      this.transitioning = true;
      this.transitionTime = 0;
      this.transitionDuration = 0.1;
    }

    this.activeWeaponAnim = state;
    this.animTime = 0;

    if (callback) {
      this.callbacks.set(`weapon_${state}`, callback);
    }

    console.log(`[AnimationManager] Weapon: ${state}`);
  }

  playPlayer(state, callback = null) {
    const clip = this.playerClips.get(state);
    if (!clip) return;

    if (this.activePlayerAnim) {
      this.transitioning = true;
      this.transitionTime = 0;
      this.transitionDuration = 0.15;
    }

    this.activePlayerAnim = state;
    this.animTime = 0;

    if (callback) {
      this.callbacks.set(`player_${state}`, callback);
    }
  }

  update(deltaTime) {
    const weaponClip = this.weaponClips.get(this.activeWeaponAnim);
    const playerClip = this.playerClips.get(this.activePlayerAnim);

    if (weaponClip && weaponClip.duration > 0) {
      this.animTime += deltaTime;
      if (this.animTime >= weaponClip.duration) {
        if (weaponClip.loop) {
          this.animTime = this.animTime % weaponClip.duration;
        } else {
          this.animTime = weaponClip.duration;
          this._triggerCallback(`weapon_${this.activeWeaponAnim}`);
          if (this.activeWeaponAnim !== WeaponAnimState.IDLE) {
            this.playWeapon(WeaponAnimState.IDLE);
          }
        }
      }
    }

    if (this.transitioning) {
      this.transitionTime += deltaTime;
      this.blendFactor = Math.min(1, this.transitionTime / this.transitionDuration);
      if (this.blendFactor >= 1) {
        this.transitioning = false;
        this.blendFactor = 1;
      }
    } else {
      this.blendFactor = 1;
    }
  }

  _triggerCallback(key) {
    const cb = this.callbacks.get(key);
    if (cb) {
      cb();
      this.callbacks.delete(key);
    }
  }

  getWeaponState() {
    return this.activeWeaponAnim;
  }

  getPlayerState() {
    return this.activePlayerAnim;
  }

  getWeaponAnimationData() {
    const clip = this.weaponClips.get(this.activeWeaponAnim);
    if (!clip) return null;

    return {
      state: this.activeWeaponAnim,
      progress: clip.duration > 0 ? this.animTime / clip.duration : 1,
      blendFactor: this.blendFactor
    };
  }

  reset() {
    this.activeWeaponAnim = null;
    this.activePlayerAnim = null;
    this.animTime = 0;
    this.blendFactor = 0;
    this.transitioning = false;
    this.callbacks.clear();
  }
}
