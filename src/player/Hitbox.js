import * as THREE from 'three';

export const HitRegion = Object.freeze({
  HEAD: 'head',
  BODY: 'body',
  LEG: 'leg'
});

const HITBOX_MULTIPLIERS = Object.freeze({
  [HitRegion.HEAD]: 2.5,
  [HitRegion.BODY]: 1.0,
  [HitRegion.LEG]: 0.75
});

const HITBOX_COLORS = Object.freeze({
  [HitRegion.HEAD]: 0xff4444,
  [HitRegion.BODY]: 0x44aaff,
  [HitRegion.LEG]: 0x44ff44
});

export class Hitbox {
  constructor(owner, config = {}) {
    this.owner = owner;
    this.regions = new Map();
    this.group = new THREE.Group();
    this.visible = false;
    this.debugMode = false;

    this._createDefaultHitboxes(config);
  }

  _createDefaultHitboxes(config) {
    const scale = config.scale || 1;
    const headRadius = (config.headRadius || 0.2) * scale;
    const bodyWidth = (config.bodyWidth || 0.5) * scale;
    const bodyHeight = (config.bodyHeight || 0.6) * scale;
    const bodyDepth = (config.bodyDepth || 0.3) * scale;
    const legWidth = (config.legWidth || 0.25) * scale;
    const legHeight = (config.legHeight || 0.4) * scale;
    const legDepth = (config.legDepth || 0.25) * scale;

    const head = new THREE.Mesh(
      new THREE.SphereGeometry(headRadius, 8, 8),
      new THREE.MeshBasicMaterial({
        color: HITBOX_COLORS[HitRegion.HEAD],
        transparent: true,
        opacity: 0.3,
        depthWrite: false,
        wireframe: true
      })
    );
    head.position.y = bodyHeight + headRadius * 1.5;

    const body = new THREE.Mesh(
      new THREE.BoxGeometry(bodyWidth, bodyHeight, bodyDepth),
      new THREE.MeshBasicMaterial({
        color: HITBOX_COLORS[HitRegion.BODY],
        transparent: true,
        opacity: 0.3,
        depthWrite: false,
        wireframe: true
      })
    );
    body.position.y = bodyHeight * 0.5 + legHeight;

    const leftLeg = new THREE.Mesh(
      new THREE.BoxGeometry(legWidth * 0.8, legHeight, legDepth),
      new THREE.MeshBasicMaterial({
        color: HITBOX_COLORS[HitRegion.LEG],
        transparent: true,
        opacity: 0.3,
        depthWrite: false,
        wireframe: true
      })
    );
    leftLeg.position.set(-legWidth * 0.4, legHeight * 0.5, 0);

    const rightLeg = new THREE.Mesh(
      new THREE.BoxGeometry(legWidth * 0.8, legHeight, legDepth),
      new THREE.MeshBasicMaterial({
        color: HITBOX_COLORS[HitRegion.LEG],
        transparent: true,
        opacity: 0.3,
        depthWrite: false,
        wireframe: true
      })
    );
    rightLeg.position.set(legWidth * 0.4, legHeight * 0.5, 0);

    this.regions.set(HitRegion.HEAD, {
      mesh: head,
      type: 'sphere',
      radius: headRadius,
      offset: head.position.clone()
    });

    this.regions.set(HitRegion.BODY, {
      mesh: body,
      type: 'box',
      halfExtents: new THREE.Vector3(bodyWidth / 2, bodyHeight / 2, bodyDepth / 2),
      offset: body.position.clone()
    });

    const legRegion = {
      meshes: [leftLeg, rightLeg],
      type: 'box',
      halfExtents: new THREE.Vector3(legWidth * 0.8 / 2, legHeight / 2, legDepth / 2),
      offsets: [leftLeg.position.clone(), rightLeg.position.clone()],
      multiplier: HITBOX_MULTIPLIERS[HitRegion.LEG]
    };
    this.regions.set(HitRegion.LEG, legRegion);

    this.group.add(head);
    this.group.add(body);
    this.group.add(leftLeg);
    this.group.add(rightLeg);
  }

  update(position, rotation) {
    this.group.position.copy(position);
    this.group.rotation.copy(rotation);
    this.group.visible = this.visible || this.debugMode;
  }

  setVisible(visible) {
    this.visible = visible;
  }

  setDebugMode(enabled) {
    this.debugMode = enabled;
    this.group.visible = this.visible || enabled;
  }

  getRegions() {
    const out = [];
    for (const [region, data] of this.regions) {
      const mult = HITBOX_MULTIPLIERS[region];
      if (data.meshes) {
        for (const m of data.meshes) {
          out.push({ mesh: m, name: region, multiplier: mult });
        }
      } else {
        out.push({ mesh: data.mesh, name: region, multiplier: mult });
      }
    }
    return out;
  }

  testRay(raycaster) {
    const results = [];

    for (const [region, data] of this.regions) {
      const worldPos = this._getWorldPosition(data);
      const hit = this._testRegion(raycaster, data, worldPos);
      if (hit) {
        results.push({
          region,
          distance: hit.distance,
          point: hit.point,
          multiplier: HITBOX_MULTIPLIERS[region]
        });
      }
    }

    results.sort((a, b) => a.distance - b.distance);
    return results.length > 0 ? results[0] : null;
  }

  _getWorldPosition(data) {
    const offset = data.offset || data.offsets?.[0];
    if (!offset) return this.group.position.clone();

    const worldPos = this.group.position.clone();
    worldPos.y += offset.y;
    return worldPos;
  }

  _testRegion(raycaster, data, worldPos) {
    if (data.type === 'sphere') {
      return this._testSphere(raycaster, worldPos, data.radius);
    } else if (data.type === 'box') {
      if (data.offsets) {
        for (const offset of data.offsets) {
          const pos = this.group.position.clone();
          pos.y += offset.y;
          const result = this._testBox(raycaster, pos, data.halfExtents);
          if (result) return result;
        }
        return null;
      }
      return this._testBox(raycaster, worldPos, data.halfExtents);
    }
    return null;
  }

  _testSphere(raycaster, center, radius) {
    const ray = raycaster.ray;
    const toCenter = center.clone().sub(ray.origin);
    const t = toCenter.dot(ray.direction);
    const closest = ray.origin.clone().add(ray.direction.clone().multiplyScalar(t));
    const distSq = closest.distanceToSquared(center);

    if (distSq <= radius * radius) {
      const dist = t > 0 ? t : 0;
      const point = ray.origin.clone().add(ray.direction.clone().multiplyScalar(dist));
      return { distance: dist, point };
    }
    return null;
  }

  _testBox(raycaster, center, halfExtents) {
    const ray = raycaster.ray;

    const invDir = new THREE.Vector3(
      1 / ray.direction.x,
      1 / ray.direction.y,
      1 / ray.direction.z
    );

    const min = center.clone().sub(halfExtents);
    const max = center.clone().add(halfExtents);

    let tMin = -Infinity;
    let tMax = Infinity;

    for (let i = 0; i < 3; i++) {
      const axis = ['x', 'y', 'z'][i];
      const origin = ray.origin[axis];
      const inv = invDir[axis];

      let t1 = (min[axis] - origin) * inv;
      let t2 = (max[axis] - origin) * inv;

      if (t1 > t2) [t1, t2] = [t2, t1];

      tMin = Math.max(tMin, t1);
      tMax = Math.min(tMax, t2);

      if (tMin > tMax) return null;
    }

    if (tMax < 0) return null;

    const t = tMin > 0 ? tMin : tMax;
    const point = ray.origin.clone().add(ray.direction.clone().multiplyScalar(t));

    return { distance: t, point };
  }

  getCenter() {
    return this.group.position.clone();
  }

  dispose() {
    for (const [, data] of this.regions) {
      if (data.mesh) {
        data.mesh.geometry.dispose();
        data.mesh.material.dispose();
      }
      if (data.meshes) {
        for (const m of data.meshes) {
          m.geometry.dispose();
          m.material.dispose();
        }
      }
    }
    this.regions.clear();
  }
}
