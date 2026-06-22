import * as THREE from 'three';

const POOL_SIZE = 12;
const MAX_RANGE_SQ = 676; // 26^2 — skip fixtures beyond this distance

export class LightPool {
  constructor(scene) {
    this.scene = scene;
    this.fixtures = [];
    this._pool = [];

    for (let i = 0; i < POOL_SIZE; i++) {
      const light = new THREE.PointLight(0xffeebb, 0, 13, 1.8);
      this.scene.add(light);
      this._pool.push(light);
    }
  }

  registerFixture(position, color = 0xffeebb) {
    this.fixtures.push({ position: position.clone(), color });
  }

  update(playerPosition) {
    const candidates = [];
    const px = playerPosition.x, pz = playerPosition.z;

    for (const f of this.fixtures) {
      const dx = f.position.x - px;
      const dz = f.position.z - pz;
      const dSq = dx * dx + dz * dz;
      if (dSq > MAX_RANGE_SQ) continue;
      candidates.push({ fixture: f, dSq });
    }

    candidates.sort((a, b) => a.dSq - b.dSq);

    for (let i = 0; i < POOL_SIZE; i++) {
      const light = this._pool[i];
      const c = candidates[i];
      if (c) {
        const f = c.fixture;
        light.position.copy(f.position);
        light.intensity = 8;
        const col = new THREE.Color(f.color);
        light.color.copy(col);
        light.visible = true;
      } else {
        light.intensity = 0;
        light.visible = false;
      }
    }
  }

  dispose() {
    for (const light of this._pool) {
      this.scene.remove(light);
    }
    this._pool.length = 0;
    this.fixtures.length = 0;
  }
}
