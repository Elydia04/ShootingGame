import * as THREE from 'three';

// ─────────────────────────────────────────────
// MovementController — all movement physics lives here
// Do NOT add camera, input handling, or weapon logic to this file.
//   - computeWish:  turn inputs + yaw into wish direction
//   - applyMovement: acceleration / friction / speed limits
//   - applyGravity:  gravity when airborne
//   - integrate:     velocity → position
//   - resolveCollisions: AABB push-out with step-up
//   - checkGround:   ground detection + jump
// ─────────────────────────────────────────────

const GRAVITY = -20.0;
const MAX_FALL = -30.0;
const WALK_SPEED = 4.5;
const SPRINT_SPEED = 7.2;
const CROUCH_SPEED = 2.2;
const ACCEL = 12.0;
const FRICTION = 10.0;
const AIR_ACCEL = 4.0;
const AIR_CONTROL = 0.3;
const JUMP_FORCE = 8.0;
const STEP_HEIGHT = 0.35;

export class MovementController {
  constructor() {
    this.velocity = new THREE.Vector3();
    this.wishDir = new THREE.Vector3();
    this.grounded = false;
    this.groundY = 0;
    this.height = 1.8;
    this.radius = 0.4;
    this.collidables = [];
    this.slowMultiplier = 1;
  }

  computeWish(inputs, yaw) {
    this.wishDir.set(0, 0, 0);
    if (inputs.forward) { this.wishDir.x -= Math.sin(yaw); this.wishDir.z -= Math.cos(yaw); }
    if (inputs.backward) { this.wishDir.x += Math.sin(yaw); this.wishDir.z += Math.cos(yaw); }
    if (inputs.left) { this.wishDir.x -= Math.cos(yaw); this.wishDir.z += Math.sin(yaw); }
    if (inputs.right) { this.wishDir.x += Math.cos(yaw); this.wishDir.z -= Math.sin(yaw); }
    if (this.wishDir.lengthSq() > 0) this.wishDir.normalize();
  }

  applyMovement(dt, inputs) {
    const sprint = inputs.sprint && inputs.forward && !inputs.backward && !inputs.crouch;
    const crouch = inputs.crouch;
    const maxSpeed = (crouch ? CROUCH_SPEED : (sprint ? SPRINT_SPEED : WALK_SPEED)) * this.slowMultiplier;
    const accel = this.grounded ? ACCEL : AIR_ACCEL;

    const wishSpeed = this.wishDir.length();
    if (wishSpeed > 0) {
      const add = this.wishDir.clone().multiplyScalar(maxSpeed);
      const cur = this.velocity.clone();
      cur.y = 0;
      const delta = add.sub(cur);
      const len = delta.length();
      const maxDelta = accel * maxSpeed * dt;
      if (len > maxDelta) delta.multiplyScalar(maxDelta / len);
      this.velocity.x += delta.x;
      this.velocity.z += delta.z;

      if (!this.grounded) {
        this.velocity.x *= (1 - AIR_CONTROL * dt);
        this.velocity.z *= (1 - AIR_CONTROL * dt);
      }
    } else if (this.grounded) {
      const spd = Math.sqrt(this.velocity.x * this.velocity.x + this.velocity.z * this.velocity.z);
      if (spd > 0) {
        const drop = FRICTION * dt;
        const ratio = Math.max(0, spd - drop) / spd;
        this.velocity.x *= ratio;
        this.velocity.z *= ratio;
      }
    }

    return sprint;
  }

  applyGravity(dt) {
    if (!this.grounded) {
      this.velocity.y += GRAVITY * dt;
      if (this.velocity.y < MAX_FALL) this.velocity.y = MAX_FALL;
    }
  }

  integrate(pos, dt) {
    pos.x += this.velocity.x * dt;
    pos.z += this.velocity.z * dt;
    pos.y += this.velocity.y * dt;
  }

  resolveCollisions(pos) {
    const r = this.radius;
    const bottom = pos.y - this.height * 0.5;

    for (const obj of this.collidables) {
      if (!obj.geometry) continue;
      const geo = obj.geometry;
      if (!geo.boundingBox) geo.computeBoundingBox();
      obj.updateWorldMatrix(true, false);
      const box = geo.boundingBox.clone().applyMatrix4(obj.matrixWorld);

      if (bottom > box.max.y || pos.y + this.height * 0.5 < box.min.y) continue;
      if (bottom >= box.max.y) continue;

      const cx = pos.x;
      const cz = pos.z;
      const cx2 = Math.max(box.min.x, Math.min(cx, box.max.x));
      const cz2 = Math.max(box.min.z, Math.min(cz, box.max.z));
      const dx = cx - cx2;
      const dz = cz - cz2;
      const d2 = dx * dx + dz * dz;

      if (d2 < r * r && d2 > 0.0001) {
        const stepUp = box.max.y - bottom;
        if (stepUp > 0 && stepUp <= STEP_HEIGHT) {
          pos.y += stepUp;
          this.velocity.y = 0;
          continue;
        }

        const dist = Math.sqrt(d2);
        const overlap = r - dist;
        pos.x += (dx / dist) * overlap;
        pos.z += (dz / dist) * overlap;
        this.velocity.x *= 0.1;
        this.velocity.z *= 0.1;
      }
    }
  }

  checkGround(pos, dt, inputs) {
    const bottom = pos.y - this.height * 0.5;
    this.grounded = false;

    if (this.velocity.y <= 0 && pos.y <= this.height * 0.5 + 0.01) {
      this.grounded = true;
      this.groundY = 0;
    }

    if (!this.grounded && this.velocity.y <= 0) {
      for (const obj of this.collidables) {
        if (!obj.geometry) continue;
        const geo = obj.geometry;
        if (!geo.boundingBox) geo.computeBoundingBox();
        obj.updateWorldMatrix(true, false);
        const box = geo.boundingBox.clone().applyMatrix4(obj.matrixWorld);

        if (bottom > box.max.y || pos.y + this.height * 0.5 < box.min.y) continue;
        const cx = pos.x;
        const cz = pos.z;
        const cx2 = Math.max(box.min.x, Math.min(cx, box.max.x));
        const cz2 = Math.max(box.min.z, Math.min(cz, box.max.z));
        if ((cx - cx2) * (cx - cx2) + (cz - cz2) * (cz - cz2) < this.radius * this.radius) {
          if (bottom >= box.max.y - 0.1 && bottom <= box.max.y + 0.05) {
            this.grounded = true;
            this.groundY = box.max.y;
            break;
          }
        }
      }
    }

    if (this.grounded) {
      pos.y = this.groundY + this.height * 0.5;
      if (this.velocity.y < 0) this.velocity.y = 0;
    }

    if (inputs.jump && this.grounded) {
      this.velocity.y = JUMP_FORCE;
      this.grounded = false;
    }
  }
}
