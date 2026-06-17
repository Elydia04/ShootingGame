import * as THREE from 'three';
import { ObjectPool } from './ObjectPool.js';

const MAX_BULLETS = 500;
const BULLET_LIFETIME = 2.0;
const BULLET_SPEED = 300;

export class Bullet {
  constructor() {
    this.velocity = new THREE.Vector3();
    this.position = new THREE.Vector3();
    this.lifetime = 0;
    this.alive = false;
    this.owner = null;
    this.damage = 0;
    this.tracer = null;
    this._trailDir = new THREE.Vector3();
    this.nearMissPlayed = false;
  }

  init(origin, direction, speed = BULLET_SPEED, damage = 20, owner = null) {
    this.position.copy(origin);
    this.velocity.copy(direction).multiplyScalar(speed);
    this.lifetime = BULLET_LIFETIME;
    this.alive = true;
    this.owner = owner;
    this.damage = damage;

    this.nearMissPlayed = false;

    if (this.tracer) {
      this.tracer.position.copy(origin);
      this._trailDir.copy(direction);
      this.tracer.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 0, 1),
        direction
      );
      this.tracer.visible = true;
    }
  }

  update(deltaTime) {
    if (!this.alive) return false;

    const dt = Math.min(deltaTime, 0.05);
    this.position.x += this.velocity.x * dt;
    this.position.y += this.velocity.y * dt;
    this.position.z += this.velocity.z * dt;

    this.lifetime -= dt;

    if (this.lifetime <= 0) {
      this.alive = false;
      if (this.tracer) this.tracer.visible = false;
      return false;
    }

    if (this.tracer) {
      this.tracer.position.copy(this.position);
    }

    return true;
  }

  reset() {
    this.alive = false;
    this.lifetime = 0;
    this.owner = null;
    this.damage = 0;
    this.nearMissPlayed = false;
    if (this.tracer) this.tracer.visible = false;
  }

  dispose() {
    if (this.tracer) {
      this.tracer.geometry.dispose();
      this.tracer.material.dispose();
    }
  }
}

export class BulletPool {
  constructor(scene) {
    this.scene = scene;
    this.pool = new ObjectPool(
      () => this._createBullet(),
      (bullet) => bullet.reset(),
      100
    );
    this.raycaster = new THREE.Raycaster();
    this.hitCallback = null;
    this.nearMissCallback = null;
    this.playerPosition = null;
  }

  _createBullet() {
    const bullet = new Bullet();

    const len = 2.5;
    const tracerGeo = new THREE.BufferGeometry();
    const tracerVerts = new Float32Array([0, 0, 0, 0, 0, -len]);
    tracerGeo.setAttribute('position', new THREE.BufferAttribute(tracerVerts, 3));
    const tracerMat = new THREE.LineBasicMaterial({
      color: 0x88ffdd,
      transparent: true,
      opacity: 1.0,
      linewidth: 2
    });
    bullet.tracer = new THREE.Line(tracerGeo, tracerMat);
    bullet.tracer.visible = false;
    this.scene.add(bullet.tracer);

    return bullet;
  }

  fire(origin, direction, damage = 20, speed = BULLET_SPEED, owner = null) {
    if (this.pool.activeCount >= MAX_BULLETS) return null;

    const bullet = this.pool.acquire();
    bullet.init(origin, direction, speed, damage, owner);
    return bullet;
  }

  update(deltaTime, collidables = []) {
    const toRemove = [];
    const NEAR_MISS_DIST = 4;

    this.pool.forEachActive((bullet) => {
      const prevPos = bullet.position.clone();

      if (!bullet.update(deltaTime)) {
        toRemove.push(bullet);
        return;
      }

      const direction = bullet.position.clone().sub(prevPos);
      const dist = direction.length();

      if (this.playerPosition && bullet.owner === 'bot' && !bullet.nearMissPlayed) {
        const dx = bullet.position.x - this.playerPosition.x;
        const dz = bullet.position.z - this.playerPosition.z;
        const dy = bullet.position.y - this.playerPosition.y;
        if (dx * dx + dz * dz + dy * dy < NEAR_MISS_DIST * NEAR_MISS_DIST) {
          bullet.nearMissPlayed = true;
          if (this.nearMissCallback) {
            this.nearMissCallback(bullet.position.clone());
          }
        }
      }

      if (dist > 0.001 && collidables.length > 0) {
        this.raycaster.set(prevPos, direction.normalize());
        this.raycaster.far = dist;

        const intersects = this.raycaster.intersectObjects(collidables, true);

        if (intersects.length > 0) {
          const hit = intersects[0];
          bullet.alive = false;
          bullet.tracer.visible = false;
          toRemove.push(bullet);

          if (this.hitCallback) {
            this.hitCallback({
              point: hit.point,
              normal: hit.face?.normal || new THREE.Vector3(0, 1, 0),
              object: hit.object,
              bullet,
              distance: hit.distance
            });
          }
        }
      }
    });

    for (const bullet of toRemove) {
      this.pool.release(bullet);
    }
  }

  forEachActive(callback) {
    this.pool.forEachActive(callback);
  }

  testBulletHitboxes(bullet, hitboxes, callback) {
    const prevPos = bullet.position.clone();
    const dir = bullet.velocity.clone().normalize();
    const dist = bullet.velocity.length() * 0.05;

    this.raycaster.set(prevPos, dir);
    this.raycaster.far = Math.max(dist, 1);

    for (const hitbox of hitboxes) {
      const result = hitbox.testRay(this.raycaster);
      if (result) {
        callback({
          hitbox,
          region: result.region,
          multiplier: result.multiplier,
          distance: result.distance,
          point: result.point,
          bullet
        });
        return true;
      }
    }
    return false;
  }

  onHit(callback) {
    this.hitCallback = callback;
  }

  onNearMiss(callback) {
    this.nearMissCallback = callback;
  }

  clear() {
    this.pool.releaseAll();
  }

  get activeCount() {
    return this.pool.activeCount;
  }

  dispose() {
    this.pool.disposeAll((bullet) => bullet.dispose());
  }
}
