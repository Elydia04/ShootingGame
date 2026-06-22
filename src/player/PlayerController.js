import * as THREE from 'three';
import { MovementController } from './MovementController.js';

// PlayerController handles: camera, bob, flinch, stance, input routing.
// Movement physics are delegated to this.movement (MovementController).
// Do NOT add movement acceleration/collision/gravity here — use MovementController.

const CROUCH_HEIGHT = 0.8;
const NORMAL_HEIGHT = 1.8;
const CROUCH_TRANSITION = 8.0;

const CAMERA = {
  normalHeight: 0.75,
  crouchHeight: 0.2,
  bobFrequency: 10.0,
  bobAmplitude: 0.07,
  sprintBobMultiplier: 2.0,
  crouchBobMultiplier: 0.3,
  landImpact: 0.1,
  fov: 75,
  sprintFovAdd: 5,
  smoothLookSpeed: 0.1
};

export class PlayerController {
  constructor(camera, settingsManager) {
    this.camera = camera;
    this.settings = settingsManager;

    this.position = new THREE.Vector3(0, 0, 0);
    this.movement = new MovementController();
    this.velocity = this.movement.velocity;
    this.euler = new THREE.Euler(0, 0, 0, 'YXZ');
    this.quaternion = new THREE.Quaternion();

    this.height = NORMAL_HEIGHT;
    this.targetHeight = NORMAL_HEIGHT;
    this.camHeight = CAMERA.normalHeight;
    this.targetCamHeight = CAMERA.normalHeight;

    this.isInAir = false;

    // ── Input state (level-triggered) ──────────────────────
    // Set true on keydown, false on keyup (see handleKeyDown/Up).
    // jump is consumed by MovementController.checkGround after
    // firing (edge-triggered), so holding Space won't re-jump.
    this.inputs = {
      forward: false,
      backward: false,
      left: false,
      right: false,
      jump: false,
      crouch: false,
      sprint: false,
      shoot: false,
      aim: false,
      reload: false
    };

    this.mouseDelta = { x: 0, y: 0 };
    this.isPointerLocked = false;

    this.bobPhase = 0;
    this.bobIntensity = 0;
    this.landBobbing = 0;

    this.currentSpeed = 0;
    this.isMoving = false;
    this.isSprinting = false;
    this.isCrouching = false;
    this.cameraActive = true;

    this.flinchTarget = new THREE.Vector3();
    this.flinchCurrent = new THREE.Vector3();
    this.flinchDecay = 8;
    this.flinchStrength = { head: 0.15, body: 0.04 };

    this.slowTimer = 0;
    this.slowDuration = 2.0;
    this.slowMultiplier = 0.5;
    this.isSlowed = false;

    this.onFallDamage = null;

    // Stuck detection: if player is providing input but not moving,
    // teleport to a spawn point.
    this._stuckTimer = 0;
    this._stuckCheckPos = new THREE.Vector3();
    this._stuckThreshold = 2.0;   // seconds before teleport
    this._stuckMoveThreshold = 0.3; // must move less than this to be stuck
    this.onStuck = null;
  }

  handleMouseMove(event) {
    if (!this.isPointerLocked) return;

    // Filter delta spikes (Chromium garbage events on lock engagement)
    const dx = Math.abs(event.movementX) > 600 ? 0 : event.movementX;
    const dy = Math.abs(event.movementY) > 600 ? 0 : event.movementY;
    const cap = 280;
    const clampedX = Math.max(-cap, Math.min(cap, dx));
    const clampedY = Math.max(-cap, Math.min(cap, dy));

    const sensitivity = this.settings.get('controls', 'sensitivity') / 10;
    const invertY = this.settings.get('controls', 'invertY') ? -1 : 1;

    this.mouseDelta.x += clampedX * sensitivity * 0.002;
    this.mouseDelta.y += clampedY * sensitivity * 0.002 * invertY;
  }

  handleKeyDown(code) {
    const direct = {
      'KeyW': 'forward', 'KeyS': 'backward',
      'KeyA': 'left', 'KeyD': 'right',
      'Space': 'jump',
      'ShiftLeft': 'sprint', 'ShiftRight': 'sprint',
      'ControlLeft': 'crouch', 'ControlRight': 'crouch',
      'KeyR': 'reload'
    };
    if (direct[code] && direct[code] in this.inputs) {
      this.inputs[direct[code]] = true;
    }
    const binds = this.settings.get('controls', 'keybinds');
    if (binds) {
      for (const [action, key] of Object.entries(binds)) {
        if (key === code && action in this.inputs) {
          this.inputs[action] = true;
        }
      }
    }
  }

  handleKeyUp(code) {
    const direct = {
      'KeyW': 'forward', 'KeyS': 'backward',
      'KeyA': 'left', 'KeyD': 'right',
      'Space': 'jump',
      'ShiftLeft': 'sprint', 'ShiftRight': 'sprint',
      'ControlLeft': 'crouch', 'ControlRight': 'crouch',
      'KeyR': 'reload'
    };
    if (direct[code] && direct[code] in this.inputs) {
      this.inputs[direct[code]] = false;
    }
    const binds = this.settings.get('controls', 'keybinds');
    if (binds) {
      for (const [action, key] of Object.entries(binds)) {
        if (key === code && action in this.inputs) {
          this.inputs[action] = false;
        }
      }
    }
  }

  handleMouseDown(button) {
    const binds = this.settings.get('controls', 'keybinds');
    const code = `Mouse${button}`;
    for (const [action, key] of Object.entries(binds)) {
      if (key === code && action in this.inputs) {
        this.inputs[action] = true;
      }
    }
  }

  handleMouseUp(button) {
    const binds = this.settings.get('controls', 'keybinds');
    const code = `Mouse${button}`;
    for (const [action, key] of Object.entries(binds)) {
      if (key === code && action in this.inputs) {
        this.inputs[action] = false;
      }
    }
  }

  // ── Per-frame update ─────────────────────────────────────
  // Order matters: wish → movement → gravity → integrate → collisions → ground
  // checkGround reads this.inputs.jump and edge-triggers via its
  // internal _jumpConsumed flag (see MovementController.checkGround).
  update(deltaTime, collidables = [], collisionCallback = null) {
    const dt = Math.min(deltaTime, 0.05);

    this._updatePitch(dt);
    this._updateYaw(dt);
    this._updateStance(dt);

    this.movement.slowMultiplier = this.isSlowed ? this.slowMultiplier : 1;
    this.movement.collidables = collidables;
    this.movement.computeWish(this.inputs, this.euler.y);
    this.isSprinting = this.movement.applyMovement(dt, this.inputs);
    this.movement.applyGravity(dt);
    this.movement.integrate(this.position, dt);
    this.movement.resolveCollisions(this.position);
    this.movement.checkGround(this.position, dt, this.inputs);
    this.grounded = this.movement.grounded;
    this.isInAir = !this.grounded;
    this.currentSpeed = Math.sqrt(this.velocity.x * this.velocity.x + this.velocity.z * this.velocity.z);
    this.isMoving = this.currentSpeed > 0.1;

    if (collisionCallback) {
      collisionCallback(this);
    }

    this._checkStuck(dt);

    this._updateBob(dt);
    this._updateCamera(dt);
  }

  _updatePitch(dt) {
    const pitchSpeed = 2.0;
    this.euler.x -= this.mouseDelta.y * pitchSpeed;
    this.euler.x = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, this.euler.x));
    this.mouseDelta.y = 0;
  }

  _updateYaw(dt) {
    const yawSpeed = 2.0;
    this.euler.y -= this.mouseDelta.x * yawSpeed;
    this.mouseDelta.x = 0;
  }

  _updateStance(dt) {
    const crouching = this.inputs.crouch;
    this.isCrouching = crouching;

    if (crouching) {
      this.targetHeight = CROUCH_HEIGHT;
      this.targetCamHeight = CAMERA.crouchHeight;
    } else {
      this.targetHeight = NORMAL_HEIGHT;
      this.targetCamHeight = CAMERA.normalHeight;
    }

    this.height += (this.targetHeight - this.height) * CROUCH_TRANSITION * dt;
    this.camHeight += (this.targetCamHeight - this.camHeight) * CROUCH_TRANSITION * dt;
  }

  _updateBob(dt) {
    const speed = this.currentSpeed;

    if (this.grounded && speed > 0.1) {
      let freq = CAMERA.bobFrequency;
      let amp = CAMERA.bobAmplitude;

      if (this.isSprinting) {
        freq *= 1.3;
        amp *= CAMERA.sprintBobMultiplier;
      } else if (this.isCrouching) {
        freq *= 0.7;
        amp *= CAMERA.crouchBobMultiplier;
      }

      this.bobPhase += freq * dt * Math.min(speed / 4.5, 1.5);
      this.bobIntensity = amp * Math.min(speed / 4.5, 1.2);
    } else {
      this.bobIntensity *= (1 - 10 * dt);
      if (this.bobIntensity < 0.001) this.bobIntensity = 0;
    }
  }

  _updateCamera(dt) {
    this.quaternion.setFromEuler(this.euler);

    if (!this.cameraActive) return;

    if (this.flinchTarget.lengthSq() > 0.0001) {
      this.flinchCurrent.lerp(this.flinchTarget, 1 - Math.exp(-12 * dt));
      this.flinchTarget.lerp(new THREE.Vector3(), 1 - Math.exp(-this.flinchDecay * dt));
    } else {
      this.flinchCurrent.lerp(new THREE.Vector3(), 1 - Math.exp(-this.flinchDecay * dt));
    }

    if (this.slowTimer > 0) {
      this.slowTimer -= dt;
      if (this.slowTimer <= 0) {
        this.slowTimer = 0;
        this.isSlowed = false;
      }
    }

    const bobX = Math.sin(this.bobPhase) * this.bobIntensity;
    const bobY = Math.abs(Math.cos(this.bobPhase)) * this.bobIntensity;

    this.camera.position.x = this.position.x + bobX + this.flinchCurrent.x;
    this.camera.position.y = this.position.y + this.camHeight + bobY + this.landBobbing + this.flinchCurrent.y;
    this.camera.position.z = this.position.z + this.flinchCurrent.z;

    this.camera.quaternion.copy(this.quaternion);

    const adsFov = CAMERA.fov * 0.53;
    const targetFov = this.inputs.aim ? adsFov : CAMERA.fov;
    if (this.isSprinting && !this.inputs.aim) {
      this.camera.fov += (CAMERA.fov + CAMERA.sprintFovAdd - this.camera.fov) * 0.1;
    } else {
      this.camera.fov += (targetFov - this.camera.fov) * 0.1;
    }
    this.camera.updateProjectionMatrix();

    this.landBobbing *= (1 - 8 * dt);
    if (Math.abs(this.landBobbing) < 0.001) this.landBobbing = 0;
  }

  _checkStuck(dt) {
    const hasInput = this.inputs.forward || this.inputs.backward ||
                     this.inputs.left || this.inputs.right ||
                     this.inputs.jump;

    if (!hasInput) {
      this._stuckTimer = 0;
      this._stuckCheckPos.copy(this.position);
      return;
    }

    const moved = this.position.distanceTo(this._stuckCheckPos);
    if (moved < this._stuckMoveThreshold) {
      this._stuckTimer += dt;
      if (this._stuckTimer >= this._stuckThreshold) {
        this._stuckTimer = 0;
        if (this.onStuck) this.onStuck(this);
      }
    } else {
      this._stuckTimer = 0;
      this._stuckCheckPos.copy(this.position);
    }
  }

  applyFlinch(region) {
    const strength = this.flinchStrength[region] || this.flinchStrength.body;
    const angle = (Math.random() - 0.5) * Math.PI * 0.5;
    this.flinchTarget.set(
      Math.cos(angle) * strength * 0.5,
      strength,
      Math.sin(angle) * strength * 0.3
    );
  }

  applyLegSlow() {
    this.slowTimer = this.slowDuration;
    this.isSlowed = true;
  }

  teleport(x, y, z) {
    this.position.set(x, y, z);
    this.velocity.set(0, 0, 0);
    this._stuckTimer = 0;
    this._stuckCheckPos.copy(this.position);
  }

  getState() {
    return {
      position: this.position.clone(),
      velocity: this.velocity.clone(),
      euler: { x: this.euler.x, y: this.euler.y },
      grounded: this.grounded,
      isSprinting: this.isSprinting,
      isCrouching: this.isCrouching,
      currentSpeed: this.currentSpeed
    };
  }

  setState(state) {
    this.position.copy(state.position);
    this.velocity.copy(state.velocity);
    this.euler.x = state.euler.x;
    this.euler.y = state.euler.y;
    this.grounded = state.grounded;
  }
}
