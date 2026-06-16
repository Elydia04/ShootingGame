import * as THREE from 'three';

const MOVEMENT = {
  walkSpeed: 4.5,
  sprintSpeed: 7.2,
  crouchSpeed: 2.2,
  jumpForce: 8.0,
  acceleration: 12.0,
  deceleration: 10.0,
  airAcceleration: 4.0,
  airDeceleration: 2.0,
  airControl: 0.3,
  crouchHeight: 0.8,
  normalHeight: 1.8,
  crouchTransitionSpeed: 8.0,
  gravity: -20.0,
  maxFallSpeed: -30.0,
  groundFriction: 6.0,
  slopeLimit: 0.8
};

const CAMERA = {
  normalHeight: 1.6,
  crouchHeight: 0.6,
  bobFrequency: 10.0,
  bobAmplitude: 0.04,
  sprintBobMultiplier: 1.6,
  crouchBobMultiplier: 0.4,
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
    this.velocity = new THREE.Vector3(0, 0, 0);
    this.euler = new THREE.Euler(0, 0, 0, 'YXZ');
    this.quaternion = new THREE.Quaternion();

    this.height = MOVEMENT.normalHeight;
    this.targetHeight = MOVEMENT.normalHeight;
    this.camHeight = CAMERA.normalHeight;
    this.targetCamHeight = CAMERA.normalHeight;

    this.grounded = false;
    this.wasGrounded = false;
    this.fallingVelocity = 0;
    this.wishDirection = new THREE.Vector3();
    this.moveDir = new THREE.Vector3();

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
    this.isInAir = false;

    this.cameraActive = true;

    this.flinchTarget = new THREE.Vector3();
    this.flinchCurrent = new THREE.Vector3();
    this.flinchDecay = 8;
    this.flinchStrength = { head: 0.15, body: 0.04 };

    this.slowTimer = 0;
    this.slowDuration = 2.0;
    this.slowMultiplier = 0.5;
    this.isSlowed = false;

    this._lastGroundPos = new THREE.Vector3();
    this._airTime = 0;

    this.onFallDamage = null;

    this._collidables = [];
    this._playerRadius = 0.4;
  }

  get forward() {
    const euler = this.euler;
    const forward = new THREE.Vector3(
      -Math.sin(euler.y),
      0,
      -Math.cos(euler.y)
    );
    return forward;
  }

  get right() {
    const euler = this.euler;
    const right = new THREE.Vector3(
      Math.cos(euler.y),
      0,
      -Math.sin(euler.y)
    );
    return right;
  }

  handleMouseMove(event) {
    if (!this.isPointerLocked) return;

    const sensitivity = this.settings.get('controls', 'sensitivity') / 10;
    const invertY = this.settings.get('controls', 'invertY') ? -1 : 1;

    this.mouseDelta.x += event.movementX * sensitivity * 0.002;
    this.mouseDelta.y += event.movementY * sensitivity * 0.002 * invertY;
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

  update(deltaTime, collidables = [], collisionCallback = null) {
    const dt = Math.min(deltaTime, 0.05);

    this._collidables = collidables;

    this._updatePitch(dt);
    this._updateYaw(dt);

    this._updateStance(dt);

    this._computeWishDirection();

    this._applyMovement(dt);

    if (collisionCallback) {
      collisionCallback(this);
    }

    this._applyGravity(dt);

    this._integratePosition(dt);

    this._resolveCollision();

    this._checkGroundState(dt);

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
      this.targetHeight = MOVEMENT.crouchHeight;
      this.targetCamHeight = CAMERA.crouchHeight;
    } else {
      this.targetHeight = MOVEMENT.normalHeight;
      this.targetCamHeight = CAMERA.normalHeight;
    }

    this.height += (this.targetHeight - this.height) * MOVEMENT.crouchTransitionSpeed * dt;
    this.camHeight += (this.targetCamHeight - this.camHeight) * MOVEMENT.crouchTransitionSpeed * dt;
  }

  _computeWishDirection() {
    this.wishDirection.set(0, 0, 0);

    const forward = this.forward;
    const right = this.right;

    if (this.inputs.forward) this.wishDirection.add(forward);
    if (this.inputs.backward) this.wishDirection.sub(forward);
    if (this.inputs.left) this.wishDirection.sub(right);
    if (this.inputs.right) this.wishDirection.add(right);

    if (this.wishDirection.lengthSq() > 0) {
      this.wishDirection.normalize();
    }
  }

  _applyMovement(dt) {
    const isCrouching = this.isCrouching;
    const isSprinting = this.inputs.sprint && !isCrouching && this.inputs.forward &&
      !this.inputs.backward && !this.inputs.left && !this.inputs.right;

    this.isSprinting = isSprinting;

    let maxSpeed = MOVEMENT.walkSpeed;
    if (isSprinting) maxSpeed = MOVEMENT.sprintSpeed;
    if (isCrouching) maxSpeed = MOVEMENT.crouchSpeed;
    if (this.isSlowed) maxSpeed *= this.slowMultiplier;

    const onGround = this.grounded;
    const accel = onGround ? MOVEMENT.acceleration : MOVEMENT.airAcceleration;
    const decel = onGround ? MOVEMENT.deceleration : MOVEMENT.airDeceleration;
    const friction = onGround ? MOVEMENT.groundFriction : 0;

    const wishSpeed = this.wishDirection.length();
    this.isMoving = wishSpeed > 0;

    if (wishSpeed > 0) {
      this.wishDirection.multiplyScalar(Math.min(wishSpeed, 1));
      const addSpeed = this.wishDirection.clone().multiplyScalar(maxSpeed);
      const currentVel = this.velocity.clone();
      currentVel.y = 0;

      let delta = addSpeed.clone().sub(currentVel);
      const deltaLen = delta.length();
      const maxDelta = accel * maxSpeed * dt;

      if (deltaLen > maxDelta) {
        delta.multiplyScalar(maxDelta / deltaLen);
      }

      this.velocity.x += delta.x;
      this.velocity.z += delta.z;

      if (!onGround) {
        this.velocity.x *= (1 - MOVEMENT.airControl * dt);
        this.velocity.z *= (1 - MOVEMENT.airControl * dt);
      }
    } else {
      if (onGround) {
        const speed = Math.sqrt(
          this.velocity.x * this.velocity.x +
          this.velocity.z * this.velocity.z
        );
        if (speed > 0) {
          const drop = friction * dt;
          const newSpeed = Math.max(0, speed - drop);
          const ratio = newSpeed / speed;
          this.velocity.x *= ratio;
          this.velocity.z *= ratio;
        }
      } else {
        this.velocity.x *= (1 - decel * dt * 0.1);
        this.velocity.z *= (1 - decel * dt * 0.1);
      }
    }

    this.currentSpeed = Math.sqrt(
      this.velocity.x * this.velocity.x +
      this.velocity.z * this.velocity.z
    );
  }

  _applyGravity(dt) {
    if (!this.grounded) {
      this.velocity.y += MOVEMENT.gravity * dt;
      if (this.velocity.y < MOVEMENT.maxFallSpeed) {
        this.velocity.y = MOVEMENT.maxFallSpeed;
      }
    }
  }

  _integratePosition(dt) {
    this.position.x += this.velocity.x * dt;
    this.position.z += this.velocity.z * dt;
    this.position.y += this.velocity.y * dt;
  }

  _resolveCollision() {
    const r = this._playerRadius;

    for (const obj of this._collidables) {
      if (!obj.geometry) continue;
      const geo = obj.geometry;
      if (!geo.boundingBox) geo.computeBoundingBox();
      obj.updateWorldMatrix(true, false);
      const worldBox = geo.boundingBox.clone().applyMatrix4(obj.matrixWorld);

      const cx = this.position.x;
      const cz = this.position.z;
      const closestX = Math.max(worldBox.min.x, Math.min(cx, worldBox.max.x));
      const closestZ = Math.max(worldBox.min.z, Math.min(cz, worldBox.max.z));
      const dx = cx - closestX;
      const dz = cz - closestZ;
      const distSq = dx * dx + dz * dz;

      if (distSq < r * r && distSq > 0.0001) {
        const dist = Math.sqrt(distSq);
        const overlap = r - dist;
        const nx = dx / dist;
        const nz = dz / dist;
        this.position.x += nx * overlap;
        this.position.z += nz * overlap;
        this.velocity.x *= 0.1;
        this.velocity.z *= 0.1;
      }
    }
  }

  _checkGroundState(dt) {
    this.wasGrounded = this.grounded;

    if (this.velocity.y <= 0 && this.position.y <= this.height * 0.5 + 0.01) {
      if (!this.grounded) {
        const fallDist = this._lastGroundPos.y - this.position.y;
        if (fallDist > 0.5) {
          this.landBobbing = CAMERA.landImpact * Math.min(fallDist / 5, 1);
        }
        if (fallDist > 3.0) {
          const damage = Math.round((fallDist - 3) * 5);
          if (this.onFallDamage) {
            this.onFallDamage(damage);
          }
        }
      }
      this.grounded = true;
      this.position.y = this.height * 0.5;
      if (this.velocity.y < 0) {
        this.velocity.y = 0;
      }
    } else {
      this.grounded = false;
    }

    if (this.inputs.jump && this.grounded) {
      this.velocity.y = MOVEMENT.jumpForce;
      this.grounded = false;
    }

    this.isInAir = !this.grounded;

    if (this.grounded) {
      this._lastGroundPos.copy(this.position);
      this._airTime = 0;
    } else {
      this._airTime += dt;
    }
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

      this.bobPhase += freq * dt * Math.min(speed / MOVEMENT.walkSpeed, 1.5);
      this.bobIntensity = amp * Math.min(speed / MOVEMENT.walkSpeed, 1.2);
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

    if (this.isSprinting) {
      this.camera.fov += (CAMERA.fov + CAMERA.sprintFovAdd - this.camera.fov) * 0.1;
    } else {
      this.camera.fov += (CAMERA.fov - this.camera.fov) * 0.1;
    }
    this.camera.updateProjectionMatrix();

    this.landBobbing *= (1 - 8 * dt);
    if (Math.abs(this.landBobbing) < 0.001) this.landBobbing = 0;
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
