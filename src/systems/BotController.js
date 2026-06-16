import * as THREE from 'three';
import { Hitbox, HitRegion } from '../player/Hitbox.js';

const BOT_NAMES = ['Viper', 'Shadow', 'Phantom', 'Blitz', 'Raven', 'Frost', 'Storm', 'Blade', 'Ghost', 'Wraith'];

const DIFFICULTY_CONFIG = {
  easy: {
    reactionTime: 1.0,
    accuracy: 0.1,
    fireRate: 0.8,
    patrolSpeed: 2.0,
    combatSpeed: 3.0,
    damageMultiplier: 0.7,
    health: 80,
    detectionRange: 30,
    strafeChance: 0.2,
    takeCoverChance: 0.3
  },
  medium: {
    reactionTime: 0.5,
    accuracy: 0.25,
    fireRate: 0.5,
    patrolSpeed: 2.8,
    combatSpeed: 4.0,
    damageMultiplier: 1.0,
    health: 100,
    detectionRange: 50,
    strafeChance: 0.5,
    takeCoverChance: 0.5
  },
  hard: {
    reactionTime: 0.2,
    accuracy: 0.45,
    fireRate: 0.3,
    patrolSpeed: 3.5,
    combatSpeed: 5.0,
    damageMultiplier: 1.3,
    health: 120,
    detectionRange: 70,
    strafeChance: 0.8,
    takeCoverChance: 0.7
  }
};

export class BotController {
  constructor(scene, difficulty = 'medium', id = null) {
    this.scene = scene;
    this.id = id || `bot_${Math.random().toString(36).slice(2, 8)}`;
    this.difficulty = difficulty;
    this.config = DIFFICULTY_CONFIG[difficulty] || DIFFICULTY_CONFIG.medium;

    this.position = new THREE.Vector3(0, 0, 0);
    this.velocity = new THREE.Vector3(0, 0, 0);
    this.euler = new THREE.Euler(0, 0, 0, 'YXZ');
    this.quaternion = new THREE.Quaternion();

    this.health = this.config.health;
    this.maxHealth = this.config.health;
    this.alive = true;
    this.kills = 0;
    this.deaths = 0;

    this.name = BOT_NAMES[Math.floor(Math.random() * BOT_NAMES.length)];

    this.hearRadius = 40;
    this.detectionRange = this.config.detectionRange;
    this.fieldOfView = Math.PI / 2.5;
    this.lastKnownPlayerPos = null;
    this.lastSeenTime = 0;
    this.memoryDuration = 5;

    this.state = 'patrol';
    this.patrolTarget = null;
    this.patrolPoints = [];
    this.patrolIndex = 0;

    this.reactionTimer = 0;
    this.fireTimer = 0;
    this.strafeDir = 1;
    this.strafeTimer = 0;

    this.targetPlayer = null;
    this.aimTarget = new THREE.Vector3();

    this.grounded = true;
    this.height = 1.8;
    this.camHeight = 1.6;

    this.hitbox = new Hitbox(this, { scale: 0.9 });
    this.scene.add(this.hitbox.group);

    this.flinchTimer = 0;
    this.flinchOffset = new THREE.Vector3();
    this.flankTarget = null;
    this.flankTimer = 0;

    this._createVisual();
  }

  _createVisual() {
    const color = this.difficulty === 'easy' ? 0x44aa44 :
                  this.difficulty === 'medium' ? 0xaaaa44 :
                  0xaa4444;

    const bodyGeo = new THREE.CylinderGeometry(0.3, 0.3, 1.2, 8);
    const bodyMat = new THREE.MeshStandardMaterial({ color, roughness: 0.6 });
    this.bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
    this.bodyMesh.position.y = 0.9;
    this.bodyMesh.castShadow = true;

    const headGeo = new THREE.SphereGeometry(0.18, 8, 8);
    const headMat = new THREE.MeshStandardMaterial({ color: 0xccaa88, roughness: 0.5 });
    this.headMesh = new THREE.Mesh(headGeo, headMat);
    this.headMesh.position.y = 1.6;

    const weaponGeo = new THREE.BoxGeometry(0.05, 0.05, 0.5);
    const weaponMat = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.5 });
    this.weaponMesh = new THREE.Mesh(weaponGeo, weaponMat);
    this.weaponMesh.position.set(0, 0.8, -0.4);

    this.group = new THREE.Group();
    this.group.add(this.bodyMesh);
    this.group.add(this.headMesh);
    this.group.add(this.weaponMesh);
    this.scene.add(this.group);
  }

  setPatrolPoints(points) {
    this.patrolPoints = points;
    this.patrolIndex = 0;
    if (points.length > 0) {
      this.patrolTarget = points[0];
    }
  }

  spawnAt(x, y, z) {
    this.position.set(x, y, z);
    this.velocity.set(0, 0, 0);
    this.health = this.config.health;
    this.alive = true;
    this.state = 'patrol';
    this.lastKnownPlayerPos = null;
    this.updateVisual();
  }

  takeDamage(amount, attackerId = null) {
    if (!this.alive) return false;

    const finalDamage = amount * this.config.damageMultiplier;
    this.health -= finalDamage;

    this.flinchTimer = 0.2;
    this.flinchOffset.set(
      (Math.random() - 0.5) * 0.2,
      Math.random() * 0.15,
      (Math.random() - 0.5) * 0.1
    );

    if (attackerId) {
      this.lastKnownPlayerPos = null;
    }

    if (this.health <= 0) {
      this.health = 0;
      this.die();
      return true;
    }
    return false;
  }

  getHitDamageMultiplier(region) {
    switch (region) {
      case HitRegion.HEAD: return 2.5;
      case HitRegion.BODY: return 1.0;
      case HitRegion.LEG: return 0.75;
      default: return 1.0;
    }
  }

  die() {
    this.alive = false;
    this.state = 'dead';
    this.group.visible = false;
    this.hitbox.group.visible = false;
    this.deaths++;
  }

  respawn(x, y, z) {
    this.position.set(x, y, z);
    this.velocity.set(0, 0, 0);
    this.health = this.config.health;
    this.alive = true;
    this.state = 'patrol';
    this.group.visible = true;
    this.hitbox.group.visible = true;
    this.lastKnownPlayerPos = null;
    this.fireTimer = 0;
    this.reactionTimer = 0;
    this.updateVisual();
  }

  update(deltaTime, playerPosition, playerAlive, obstacles = []) {
    if (!this.alive) return null;

    this.fireTimer += deltaTime;
    this.strafeTimer += deltaTime;

    const canSeePlayer = this._detectPlayer(playerPosition, playerAlive, obstacles);
    this._updateState(canSeePlayer, playerPosition, deltaTime);
    this._executeState(deltaTime, playerPosition);
    this._applyMovement(deltaTime);
    this._applyGravity(deltaTime);
    this._avoidObstacles(obstacles, deltaTime);
    this._collisionResolve(obstacles);

    if (this.flinchTimer > 0) {
      this.flinchTimer -= deltaTime;
    }

    this.updateVisual();
    this.hitbox.update(this.position, this.euler);

    const shouldFire = this.state === 'combat' && this.fireTimer >= this.config.fireRate;
    let fireResult = null;

    if (shouldFire && playerAlive) {
      this.fireTimer = 0;
      const eyePos = this.position.clone().add(new THREE.Vector3(0, 1.0, 0));
      const direction = new THREE.Vector3().subVectors(playerPosition, eyePos).normalize();
      const spreadRad = (1 - this.config.accuracy) * 0.35;
      const theta = Math.random() * Math.PI * 2;
      const r = Math.sqrt(Math.random()) * spreadRad;
      const upRef = Math.abs(direction.y) < 0.99 ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(1, 0, 0);
      const right = new THREE.Vector3().crossVectors(direction, upRef).normalize();
      const localUp = new THREE.Vector3().crossVectors(right, direction).normalize();
      const spreadVec = new THREE.Vector3()
        .addScaledVector(right, Math.cos(theta) * r)
        .addScaledVector(localUp, Math.sin(theta) * r);
      fireResult = {
        origin: eyePos,
        direction: direction.clone().add(spreadVec).normalize(),
        damage: 10,
        botPosition: this.position.clone()
      };
    }

    return fireResult;
  }

  _detectPlayer(playerPosition, playerAlive, obstacles) {
    if (!playerAlive || !playerPosition) return false;

    const dx = playerPosition.x - this.position.x;
    const dz = playerPosition.z - this.position.z;
    const distance = Math.sqrt(dx * dx + dz * dz);

    if (distance > this.detectionRange) return false;

    const angleToPlayer = Math.atan2(dx, dz);
    let angleDiff = angleToPlayer - this.euler.y;
    while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
    while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;

    if (Math.abs(angleDiff) > this.fieldOfView) {
      return false;
    }

    const rayDir = new THREE.Vector3(playerPosition.x - this.position.x, 0, playerPosition.z - this.position.z).normalize();
    const raycaster = new THREE.Raycaster(
      this.position.clone().add(new THREE.Vector3(0, 1, 0)),
      rayDir
    );
    raycaster.far = distance;

    const hits = raycaster.intersectObjects(obstacles, true);
    if (hits.length > 0 && hits[0].distance < distance) {
      return false;
    }

    this.lastKnownPlayerPos = playerPosition.clone();
    this.lastSeenTime = performance.now();
    return true;
  }

  _updateState(canSeePlayer, playerPosition, deltaTime) {
    const now = performance.now();

    if (this.state === 'dead') return;

    if (canSeePlayer) {
      this.reactionTimer += deltaTime;
      if (this.reactionTimer >= this.config.reactionTime) {
        this.state = 'combat';
        this.targetPlayer = playerPosition;
      }
    } else {
      this.reactionTimer = 0;

      if (this.state === 'combat') {
        if (this.lastKnownPlayerPos && (now - this.lastSeenTime) < this.memoryDuration * 1000) {
          this.targetPlayer = this.lastKnownPlayerPos;
        } else {
          this.state = 'patrol';
          this.targetPlayer = null;
        }
      }
    }
  }

  _executeState(deltaTime, playerPosition) {
    switch (this.state) {
      case 'patrol':
        this._patrol(deltaTime);
        break;
      case 'combat':
        this._combat(deltaTime, playerPosition);
        break;
    }
  }

  _patrol(deltaTime) {
    if (this.patrolPoints.length === 0) return;

    if (!this.patrolTarget) {
      this.patrolTarget = this.patrolPoints[0];
    }

    const dx = this.patrolTarget.x - this.position.x;
    const dz = this.patrolTarget.z - this.position.z;
    const dist = Math.sqrt(dx * dx + dz * dz);

    if (dist < 1.5) {
      this.patrolIndex = (this.patrolIndex + 1) % this.patrolPoints.length;
      this.patrolTarget = this.patrolPoints[this.patrolIndex];
    } else {
      const targetAngle = Math.atan2(dx, dz);
      this.euler.y += this._angleDiff(this.euler.y, targetAngle) * 3 * deltaTime;

      this.velocity.x = Math.sin(targetAngle) * this.config.patrolSpeed;
      this.velocity.z = Math.cos(targetAngle) * this.config.patrolSpeed;
    }
  }

  _combat(deltaTime, playerPosition) {
    if (!this.targetPlayer) return;

    const targetPos = playerPosition || this.targetPlayer;
    const dx = targetPos.x - this.position.x;
    const dz = targetPos.z - this.position.z;
    const dist = Math.sqrt(dx * dx + dz * dz);

    const targetAngle = Math.atan2(dx, dz);
    this.euler.y += this._angleDiff(this.euler.y, targetAngle) * 5 * deltaTime;

    if (this.strafeTimer > 1.5) {
      this.strafeDir = Math.random() < 0.5 ? 1 : -1;
      this.strafeTimer = 0;
    }

    const strafeAngle = targetAngle + (Math.PI / 2) * this.strafeDir;
    const speed = this.config.combatSpeed;

    const idealDist = 15 + Math.random() * 10;
    const moveForward = dist > idealDist ? 1 : (dist < idealDist - 5 ? -1 : 0);

    // Flanking
    if (this.flankTimer > 3) {
      this.flankTimer = 0;
      const toPlayer = new THREE.Vector3(targetPos.x - this.position.x, 0, targetPos.z - this.position.z).normalize();
      const perp = new THREE.Vector3(-toPlayer.z, 0, toPlayer.x);
      if (Math.random() < 0.5) perp.negate();
      this.flankTarget = new THREE.Vector3(
        targetPos.x + perp.x * (8 + Math.random() * 6),
        0,
        targetPos.z + perp.z * (8 + Math.random() * 6)
      );
    }

    const useFlanking = this.flankTarget && dist > 6 && dist < 25 && Math.random() < 0.4;

    if (useFlanking) {
      const fdx = this.flankTarget.x - this.position.x;
      const fdz = this.flankTarget.z - this.position.z;
      const fdist = Math.sqrt(fdx * fdx + fdz * fdz);
      if (fdist < 2) {
        this.flankTarget = null;
      } else {
        const fAngle = Math.atan2(fdx, fdz);
        this.velocity.x = Math.sin(fAngle) * speed * 0.6;
        this.velocity.z = Math.cos(fAngle) * speed * 0.6;
      }
    } else if (Math.random() < this.config.strafeChance) {
      this.velocity.x = Math.sin(strafeAngle) * speed * 0.7;
      this.velocity.z = Math.cos(strafeAngle) * speed * 0.7;
    } else {
      this.velocity.x = Math.sin(targetAngle) * speed * moveForward;
      this.velocity.z = Math.cos(targetAngle) * speed * moveForward;
    }

    if (dist < 5) {
      this.velocity.x -= Math.sin(targetAngle) * speed * 0.5;
      this.velocity.z -= Math.cos(targetAngle) * speed * 0.5;
    }
  }

  _applyMovement(deltaTime) {
    const friction = 8;
    const speed = Math.sqrt(this.velocity.x * this.velocity.x + this.velocity.z * this.velocity.z);
    if (speed > 0) {
      const drop = friction * deltaTime;
      const newSpeed = Math.max(0, speed - drop);
      const ratio = newSpeed / speed;
      this.velocity.x *= ratio;
      this.velocity.z *= ratio;
    }

    this.position.x += this.velocity.x * deltaTime;
    this.position.z += this.velocity.z * deltaTime;
  }

  _applyGravity(deltaTime) {
    const gravity = -20;
    if (!this.grounded) {
      this.velocity.y += gravity * deltaTime;
    }
    if (this.position.y <= 0) {
      this.position.y = 0;
      this.velocity.y = 0;
      this.grounded = true;
    } else {
      this.grounded = false;
    }
  }

  _avoidObstacles(obstacles, deltaTime) {
    if (!this.alive || obstacles.length === 0) return;
    const speed = Math.sqrt(this.velocity.x * this.velocity.x + this.velocity.z * this.velocity.z);
    if (speed < 0.5) return;

    const dir = new THREE.Vector3(this.velocity.x / speed, 0, this.velocity.z / speed);

    const raycaster = new THREE.Raycaster(
      this.position.clone().add(new THREE.Vector3(0, 0.5, 0)),
      dir
    );
    raycaster.far = 3;
    const hits = raycaster.intersectObjects(obstacles, true);
    if (hits.length > 0 && hits[0].distance < 3) {
      const normal = hits[0].face.normal.clone();
      normal.y = 0;
      if (normal.lengthSq() > 0.01) {
        normal.normalize();
        const pushDir = new THREE.Vector3();
        pushDir.copy(dir).add(normal.multiplyScalar(2));
        pushDir.y = 0;
        pushDir.normalize();
        this.velocity.x = pushDir.x * speed * 0.5;
        this.velocity.z = pushDir.z * speed * 0.5;
      }
    }
  }

  _collisionResolve(obstacles) {
    if (obstacles.length === 0) return;
    const botRadius = 0.4;

    for (const obj of obstacles) {
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
        const dist = Math.sqrt(dx * dx + dz * dz);

      if (dist < botRadius && dist > 0.001) {
        const overlap = botRadius - dist;
        const nx = dx / dist;
        const nz = dz / dist;
        this.position.x += nx * overlap;
        this.position.z += nz * overlap;
        this.velocity.x *= 0.5;
        this.velocity.z *= 0.5;
      }
    }
  }

  _angleDiff(current, target) {
    let diff = target - current;
    while (diff > Math.PI) diff -= Math.PI * 2;
    while (diff < -Math.PI) diff += Math.PI * 2;
    return diff;
  }

  updateVisual() {
    const flinchScale = this.flinchTimer > 0 ? 1 + this.flinchTimer * 2 : 1;
    this.group.position.copy(this.position);
    this.group.position.y += this.height * 0.5;
    this.group.position.x += this.flinchOffset.x * flinchScale;
    this.group.position.z += this.flinchOffset.z * flinchScale;
    this.group.rotation.y = this.euler.y;
    this.weaponMesh.rotation.x = this.euler.x * 0.5 + (this.flinchOffset.y * flinchScale);

    if (this.bodyMesh) {
      this.bodyMesh.position.y = this.height * 0.5;
    }
    if (this.headMesh) {
      this.headMesh.position.y = this.height * 0.9;
      this.headMesh.position.z = -0.05;
    }
  }

  setVisible(visible) {
    this.group.visible = visible;
    this.hitbox.group.visible = visible;
  }

  dispose() {
    this.scene.remove(this.group);
    this.scene.remove(this.hitbox.group);
    this.hitbox.dispose();
    if (this.bodyMesh) {
      this.bodyMesh.geometry.dispose();
      this.bodyMesh.material.dispose();
    }
    if (this.headMesh) {
      this.headMesh.geometry.dispose();
      this.headMesh.material.dispose();
    }
    if (this.weaponMesh) {
      this.weaponMesh.geometry.dispose();
      this.weaponMesh.material.dispose();
    }
  }
}
