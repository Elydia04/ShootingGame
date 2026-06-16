import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

export class AssetManager {
  constructor(scene) {
    this.scene = scene;

    this._setupLoaders();

    this.models = new Map();
    this.sounds = new Map();
    this.textures = new Map();

    this.loadingPromises = [];
    this.totalAssets = 0;
    this.loadedAssets = 0;

    this.onProgress = null;
    this.onComplete = null;
  }

  _setupLoaders() {
    this.gltfLoader = new GLTFLoader();

    const draco = new DRACOLoader();
    draco.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
    this.gltfLoader.setDRACOLoader(draco);

    this.textureLoader = new THREE.TextureLoader();
    this.audioLoader = new THREE.AudioLoader();
  }

  loadModel(name, path) {
    const promise = new Promise((resolve, reject) => {
      this.totalAssets++;
      this.gltfLoader.load(
        path,
        (gltf) => {
          this.models.set(name, gltf);
          this.loadedAssets++;
          this._reportProgress();
          resolve(gltf);
        },
        undefined,
        (err) => {
          console.warn(`[AssetManager] Failed to load model '${name}':`, err);
          this.loadedAssets++;
          this._reportProgress();
          reject(err);
        }
      );
    });
    this.loadingPromises.push(promise);
    return promise;
  }

  loadTexture(name, path) {
    const promise = new Promise((resolve, reject) => {
      this.totalAssets++;
      this.textureLoader.load(
        path,
        (tex) => {
          this.textures.set(name, tex);
          this.loadedAssets++;
          this._reportProgress();
          resolve(tex);
        },
        undefined,
        (err) => {
          console.warn(`[AssetManager] Failed to load texture '${name}':`, err);
          this.loadedAssets++;
          this._reportProgress();
          reject(err);
        }
      );
    });
    this.loadingPromises.push(promise);
    return promise;
  }

  loadSound(name, path) {
    const promise = new Promise((resolve, reject) => {
      this.totalAssets++;
      this.audioLoader.load(
        path,
        (buffer) => {
          this.sounds.set(name, buffer);
          this.loadedAssets++;
          this._reportProgress();
          resolve(buffer);
        },
        undefined,
        (err) => {
          console.warn(`[AssetManager] Failed to load sound '${name}':`, err);
          this.loadedAssets++;
          this._reportProgress();
          reject(err);
        }
      );
    });
    this.loadingPromises.push(promise);
    return promise;
  }

  getModel(name) {
    return this.models.get(name) || null;
  }

  getSound(name) {
    return this.sounds.get(name) || null;
  }

  getTexture(name) {
    return this.textures.get(name) || null;
  }

  async loadAll() {
    if (this.loadingPromises.length === 0) return;
    await Promise.allSettled(this.loadingPromises);
    this.loadingPromises = [];
    if (this.onComplete) this.onComplete();
  }

  _reportProgress() {
    if (this.onProgress) {
      this.onProgress(this.loadedAssets, this.totalAssets);
    }
  }

  get progress() {
    if (this.totalAssets === 0) return 1;
    return this.loadedAssets / this.totalAssets;
  }
}
