// ── Map loading and environment building ─────────────
// Reads a MapConfig (see core/types.js) and builds the scene:
// ground, walls, objects (box/sphere/cylinder/ramp), trees,
// buildings, lighting, skybox (with sun + clouds), bounds,
// and decorative mountains.
// All created objects are tracked for clean unload.
import * as THREE from 'three';
import { TreeGenerator } from './TreeGenerator.js';
import { BuildingGenerator, getAndClearFixtures } from './BuildingGenerator.js';
import { TextureGenerator } from '../utils/TextureGenerator.js';

export class MapManager {
  constructor(scene) {
    this.scene = scene;
    this.currentMap = null;
    this.maps = new Map();
    this.objects = [];
    this.loadingProgress = 0;
  }

  registerMap(id, mapData) {
    this.maps.set(id, mapData);
  }

  async loadMap(id) {
    if (this.currentMap) {
      this.unloadMap();
    }

    const mapData = this.maps.get(id);
    if (!mapData) {
      console.error(`[MapManager] Map '${id}' not found`);
      return false;
    }

    console.log(`[MapManager] Loading map: ${id}`);
    this.currentMap = id;
    this.loadingProgress = 0;

    await this._buildEnvironment(mapData);
    this.loadingProgress = 1;

    console.log(`[MapManager] Map '${id}' loaded`);
    return true;
  }

  async _buildEnvironment(mapData) {
    this.objects = [];

    if (mapData.ground) {
      this._createGround(mapData.ground);
    }

    if (mapData.walls) {
      for (const wall of mapData.walls) {
        this._createWall(wall);
      }
    }

    if (mapData.objects) {
      for (const obj of mapData.objects) {
        if (obj.type === 'tree') {
          this._createTree(obj);
        } else {
          this._createObject(obj);
        }
      }
    }

    if (mapData.trees) {
      // Avoid placing trees inside building footprints.
      const buildingZones = (mapData.buildings || []).map(b => {
        const opts = b.options || {};
        const bw = (opts.width || (b.type === 'house3' ? 10 : 12)) / 2 + 2;
        const bd = (opts.depth || (b.type === 'house3' ? 9 : 10)) / 2 + 2;
        return { x: b.x || 0, z: b.z || 0, hw: bw, hd: bd };
      });
      for (const t of mapData.trees) {
        const tx = t.x || 0, tz = t.z || 0;
        const overlap = buildingZones.some(bz =>
          tx > bz.x - bz.hw && tx < bz.x + bz.hw &&
          tz > bz.z - bz.hd && tz < bz.z + bz.hd
        );
        if (!overlap) this._createTree(t);
      }
    }

    if (mapData.buildings) {
      for (const b of mapData.buildings) {
        this._createBuilding(b);
      }
    }

    if (mapData.lighting) {
      this._setupLighting(mapData.lighting);
    }

    if (mapData.skybox) {
      this._createSkybox(mapData.skybox);
    }

    if (mapData.bounds) {
      this._createBounds(mapData.bounds);
    }

    if (mapData.mountains !== false) {
      this._createMountains(mapData.bounds || {});
    }

    if (mapData.spawns) {
      this.spawns = mapData.spawns;
    }
  }

  _createGround(config) {
    const size = config.size || 200;
    const color = config.color || 0xffffff;
    const y = config.y || 0;

    const geometry = new THREE.PlaneGeometry(size, size);
    const grassTex = TextureGenerator.createGrassTexture();
    const grassNormal = TextureGenerator.createNormalMap(grassTex.image, 0.8);
    const material = new THREE.MeshStandardMaterial({
      map: grassTex,
      normalMap: grassNormal,
      color,
      roughness: 0.9,
      metalness: 0
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.y = y;
    mesh.receiveShadow = true;

    this.scene.add(mesh);
    this.objects.push(mesh);
  }

  _createWall(config) {
    const geometry = new THREE.BoxGeometry(config.width, config.height, config.depth);
    const material = new THREE.MeshStandardMaterial({
      color: config.color || 0x555555,
      roughness: 0.7,
      metalness: 0.2
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(config.x || 0, (config.height || 4) / 2, config.z || 0);
    if (config.rotation) {
      mesh.rotation.y = config.rotation;
    }
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.userData.isWall = true;

    this.scene.add(mesh);
    this.objects.push(mesh);
  }

  _createObject(config) {
    const geometry = this._createGeometry(config);
    if (!geometry) return;

    const material = new THREE.MeshStandardMaterial({
      color: config.color || 0x888888,
      roughness: config.roughness || 0.6,
      metalness: config.metalness || 0.3
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(config.x || 0, config.y || 0, config.z || 0);
    if (config.scale) {
      mesh.scale.set(config.scale, config.scale, config.scale);
    }
    if (config.rotation) {
      mesh.rotation.set(
        config.rotation.x || 0,
        config.rotation.y || 0,
        config.rotation.z || 0
      );
    }
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.userData.isMapObject = true;

    this.scene.add(mesh);
    this.objects.push(mesh);
  }

  _createTree(config) {
    const tree = TreeGenerator.createTree(config);
    tree.position.set(config.x || 0, 0, config.z || 0);
    if (config.scale) tree.scale.setScalar(config.scale);
    if (config.rotation) tree.rotation.y = config.rotation;
    tree.userData.isTree = true;
    this.scene.add(tree);
    this.objects.push(tree);

    // Invisible collision proxy around the trunk.
    const trunkRadius = config.trunkRadius || 0.15 + Math.random() * 0.1;
    const trunkHeight = config.trunkHeight || 2.5 + Math.random() * 1.5;
    const collisionProxy = new THREE.Mesh(
      new THREE.CylinderGeometry(0.35, 0.4, trunkHeight, 6),
      new THREE.MeshBasicMaterial({ visible: false })
    );
    collisionProxy.position.set(config.x || 0, trunkHeight / 2, config.z || 0);
    collisionProxy.userData.isMapObject = true;
    this.scene.add(collisionProxy);
    this.objects.push(collisionProxy);
  }

  _createBuilding(config) {
    const builderMap = {
      house1: BuildingGenerator.house1,
      house2: BuildingGenerator.house2,
      house3: BuildingGenerator.house3,
      hauntedHouse: BuildingGenerator.hauntedHouse,
    };
    const builder = builderMap[config.type];
    if (!builder) {
      console.warn(`[MapManager] Unknown building type: ${config.type}`);
      return;
    }
    const group = builder(config.options || {});
    group.position.set(config.x || 0, 0, config.z || 0);
    if (config.rotation) group.rotation.y = config.rotation;
    group.userData.isBuilding = true;
    this.scene.add(group);
    this.objects.push(group);

    // Register light fixtures from this building with the LightPool
    const worldPos = new THREE.Vector3();
    group.getWorldPosition(worldPos);
    const fixtures = getAndClearFixtures();
    for (const f of fixtures) {
      f.position.add(worldPos);
      if (this.lightPool) this.lightPool.registerFixture(f.position, f.color);
    }
  }

  _createGeometry(config) {
    switch (config.type) {
      case 'box': return new THREE.BoxGeometry(config.width || 1, config.height || 1, config.depth || 1);
      case 'sphere': return new THREE.SphereGeometry(config.radius || 0.5, 16, 16);
      case 'cylinder': return new THREE.CylinderGeometry(config.radius || 0.5, config.radius || 0.5, config.height || 1, 16);
      case 'ramp': return new THREE.CylinderGeometry(0, config.radius || 0.5, config.height || 1, 4);
      default: return null;
    }
  }

  _setupLighting(config) {
    if (config.ambient) {
      const ambient = new THREE.AmbientLight(
        config.ambient.color || 0x404060,
        config.ambient.intensity || 0.4
      );
      this.scene.add(ambient);
      this.objects.push(ambient);
    }

    if (config.directional) {
      const dir = new THREE.DirectionalLight(
        config.directional.color || 0xffffff,
        config.directional.intensity || 0.8
      );
      dir.position.set(
        config.directional.x || 50,
        config.directional.y || 100,
        config.directional.z || 50
      );
      dir.castShadow = true;
      dir.shadow.mapSize.width = 1024;
      dir.shadow.mapSize.height = 1024;
      dir.shadow.bias = -0.0005;
      dir.shadow.normalBias = 0.02;
      this.scene.userData.dirLight = dir;
      dir.shadow.camera.near = 0.5;
      dir.shadow.camera.far = 200;
      dir.shadow.camera.left = -100;
      dir.shadow.camera.right = 100;
      dir.shadow.camera.top = 100;
      dir.shadow.camera.bottom = -100;
      this.scene.add(dir);
      this.objects.push(dir);
    }

    if (config.hemisphere) {
      const hemi = new THREE.HemisphereLight(
        config.hemisphere.skyColor || 0x87ceeb,
        config.hemisphere.groundColor || 0x362d22,
        config.hemisphere.intensity || 0.3
      );
      this.scene.add(hemi);
      this.objects.push(hemi);
    }
  }

  _createSkybox(config) {
    const skyColor = config.color || 0x87ceeb;
    this.scene.background = new THREE.Color(skyColor);
    this.scene.fog = new THREE.Fog(skyColor, config.fogNear || 50, config.fogFar || 200);

    const sunMat = new THREE.MeshBasicMaterial({ color: 0xffee88 });
    const sun = new THREE.Mesh(new THREE.SphereGeometry(6, 12, 12), sunMat);
    sun.position.set(80, 120, -100);
    sun.userData.isSkyObject = true;
    this.scene.add(sun);
    this.objects.push(sun);

    const glowMat = new THREE.MeshBasicMaterial({
      color: 0xfff8cc,
      transparent: true,
      opacity: 0.15,
      side: THREE.BackSide
    });
    const glow = new THREE.Mesh(new THREE.SphereGeometry(18, 16, 16), glowMat);
    glow.position.copy(sun.position);
    glow.userData.isSkyObject = true;
    this.scene.add(glow);
    this.objects.push(glow);

    // Procedural cloud clusters scattered above the map.
    const cloudMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.6,
      roughness: 1,
      metalness: 0
    });
    const cloudPositions = [
      { x: -60, y: 45, z: -70, s: 1.2 },
      { x: -30, y: 50, z: -85, s: 1.0 },
      { x: 20, y: 42, z: -90, s: 1.4 },
      { x: 70, y: 48, z: -75, s: 0.9 },
      { x: -80, y: 44, z: -40, s: 1.1 },
      { x: 90, y: 46, z: -30, s: 1.0 },
      { x: -70, y: 50, z: 60, s: 1.3 },
      { x: 60, y: 43, z: 80, s: 1.1 },
      { x: -20, y: 47, z: 90, s: 0.8 },
      { x: 40, y: 52, z: 85, s: 1.0 },
    ];
    for (const cp of cloudPositions) {
      const cloudGroup = new THREE.Group();
      const parts = 3 + Math.floor(Math.random() * 3);
      for (let i = 0; i < parts; i++) {
        const p = new THREE.Mesh(
          new THREE.SphereGeometry(3 + Math.random() * 5, 6, 6),
          cloudMat
        );
        p.scale.y = 0.4;
        p.position.set(
          (Math.random() - 0.5) * 10 * cp.s,
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 6 * cp.s
        );
        cloudGroup.add(p);
      }
      cloudGroup.position.set(cp.x, cp.y, cp.z);
      cloudGroup.scale.setScalar(cp.s);
      cloudGroup.userData.isSkyObject = true;
      this.scene.add(cloudGroup);
      this.objects.push(cloudGroup);
    }
  }

  // Invisible boundary walls around the map perimeter.
  _createBounds(config) {
    const size = config.size || 200;
    const height = config.height || 12;
    const thickness = 2;

    const positions = [
      { x: 0, z: -size / 2, w: size + thickness * 2, d: thickness },
      { x: 0, z: size / 2, w: size + thickness * 2, d: thickness },
      { x: -size / 2, z: 0, w: thickness, d: size },
      { x: size / 2, z: 0, w: thickness, d: size }
    ];

    for (const pos of positions) {
      const geometry = new THREE.BoxGeometry(pos.w, height, pos.d);
      const material = new THREE.MeshStandardMaterial({
        color: 0x444444,
        transparent: true,
        opacity: 0.25,
        roughness: 0.9,
        metalness: 0.1
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(pos.x, height / 2, pos.z);
      mesh.userData.isBoundary = true;
      mesh.userData.isWall = true;
      this.scene.add(mesh);
      this.objects.push(mesh);
    }

    // Invisible top caps prevent jumping/climbing over walls.
    const topMat = new THREE.MeshStandardMaterial({
      color: 0x444444,
      transparent: true,
      opacity: 0.15,
      roughness: 0.9,
      visible: false
    });
    for (const pos of positions) {
      const cap = new THREE.Mesh(
        new THREE.BoxGeometry(pos.w, 0.5, pos.d),
        topMat
      );
      cap.position.set(pos.x, height + 0.25, pos.z);
      cap.userData.isBoundary = true;
      cap.userData.isWall = true;
      cap.userData.isBoundaryCap = true;
      this.scene.add(cap);
      this.objects.push(cap);
    }
  }

  // Decorative cone mountains surrounding the playable area.
  _createMountains(boundsConfig) {
    const size = boundsConfig.size || 240;
    const mountainMat = new THREE.MeshStandardMaterial({
      color: 0x3a4050,
      roughness: 0.9,
      metalness: 0.0,
      flatShading: true
    });
    const snowMat = new THREE.MeshStandardMaterial({
      color: 0xc8c8d0,
      roughness: 0.8,
      metalness: 0.0,
      flatShading: true
    });

    const edge = size / 2 + 8;

    const peaks = [
      { x: -40, z: -edge - 15, h: 35, r: 50 },
      { x: 0, z: -edge - 20, h: 55, r: 60 },
      { x: 40, z: -edge - 15, h: 30, r: 45 },
      { x: 80, z: -edge - 10, h: 25, r: 40 },
      { x: -80, z: -edge - 10, h: 25, r: 40 },
      { x: -40, z: edge + 15, h: 30, r: 50 },
      { x: 0, z: edge + 20, h: 50, r: 55 },
      { x: 40, z: edge + 15, h: 35, r: 45 },
      { x: 80, z: edge + 10, h: 22, r: 40 },
      { x: -80, z: edge + 10, h: 22, r: 40 },
      { x: -edge - 15, z: -40, h: 35, r: 50 },
      { x: -edge - 20, z: 0, h: 55, r: 60 },
      { x: -edge - 15, z: 40, h: 30, r: 45 },
      { x: -edge - 10, z: 80, h: 22, r: 40 },
      { x: -edge - 10, z: -80, h: 22, r: 40 },
      { x: edge + 15, z: -40, h: 30, r: 50 },
      { x: edge + 20, z: 0, h: 50, r: 55 },
      { x: edge + 15, z: 40, h: 35, r: 45 },
      { x: edge + 10, z: 80, h: 22, r: 40 },
      { x: edge + 10, z: -80, h: 22, r: 40 },
    ];

    for (const p of peaks) {
      const segments = 4 + Math.floor(Math.random() * 3);
      const geo = new THREE.ConeGeometry(p.r, p.h, segments);
      const mesh = new THREE.Mesh(geo, mountainMat);
      mesh.position.set(p.x, 0, p.z);
      mesh.rotation.y = Math.random() * Math.PI * 2;
      mesh.scale.x = 0.7 + Math.random() * 0.6;
      mesh.scale.z = 0.7 + Math.random() * 0.6;
      mesh.castShadow = false;
      mesh.receiveShadow = false;
      mesh.userData.isMountain = true;
      this.scene.add(mesh);
      this.objects.push(mesh);

      if (p.h > 35) {
        const snowGeo = new THREE.ConeGeometry(p.r * 0.25, p.h * 0.3, segments);
        const snow = new THREE.Mesh(snowGeo, snowMat);
        snow.position.set(p.x, p.h * 0.6, p.z);
        snow.scale.x = mesh.scale.x;
        snow.scale.z = mesh.scale.z;
        snow.userData.isMountain = true;
        this.scene.add(snow);
        this.objects.push(snow);
      }
    }
  }

  unloadMap() {
    for (const obj of this.objects) {
      this.scene.remove(obj);
      if (obj.isGroup) {
        obj.traverse(child => {
          if (child.isMesh) {
            child.geometry.dispose();
            child.material.dispose();
          }
        });
      } else {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) obj.material.dispose();
      }
    }
    this.objects = [];
    this.scene.background = null;
    this.scene.fog = null;
    this.currentMap = null;
    this.spawns = [];
    console.log('[MapManager] Map unloaded');
  }

  getMapData() { return this.maps.get(this.currentMap); }
  getSpawnData() { return this.spawns || []; }
  getCurrentMapId() { return this.currentMap; }
}
