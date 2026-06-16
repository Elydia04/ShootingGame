import * as THREE from 'three';

export class TextureGenerator {

  static createGrassTexture(size = 256) {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    const baseColor = { r: 70, g: 130, b: 50 };
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        const noise = (Math.random() - 0.5) * 40;
        const r = Math.max(0, Math.min(255, baseColor.r + noise + (Math.random() - 0.5) * 20));
        const g = Math.max(0, Math.min(255, baseColor.g + noise + (Math.random() - 0.5) * 30));
        const b = Math.max(0, Math.min(255, baseColor.b + noise * 0.5 + (Math.random() - 0.5) * 10));
        ctx.fillStyle = `rgb(${r|0},${g|0},${b|0})`;
        ctx.fillRect(x, y, 1, 1);
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(20, 20);
    texture.anisotropy = 4;
    return texture;
  }

  static createBrickTexture(size = 128) {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    const brickW = size / 6;
    const brickH = size / 10;
    const mortar = 2;

    ctx.fillStyle = '#6b5444';
    ctx.fillRect(0, 0, size, size);

    for (let row = 0; row < 10; row++) {
      const offset = row % 2 === 0 ? 0 : brickW / 2;
      for (let col = -1; col < 7; col++) {
        const bx = col * brickW + offset + mortar / 2;
        const by = row * brickH + mortar / 2;
        const shade = 0.85 + Math.random() * 0.3;
        const r = Math.min(255, (160 + Math.random() * 40) * shade);
        const g = Math.min(255, (90 + Math.random() * 30) * shade);
        const b = Math.min(255, (60 + Math.random() * 20) * shade);
        ctx.fillStyle = `rgb(${r|0},${g|0},${b|0})`;
        ctx.fillRect(bx, by, brickW - mortar, brickH - mortar);
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(2, 2);
    texture.anisotropy = 4;
    return texture;
  }

  static createPlasterTexture(size = 128) {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        const noise = (Math.random() - 0.5) * 15;
        const r = Math.max(0, Math.min(255, 190 + noise));
        const g = Math.max(0, Math.min(255, 175 + noise));
        const b = Math.max(0, Math.min(255, 160 + noise));
        ctx.fillStyle = `rgb(${r|0},${g|0},${b|0})`;
        ctx.fillRect(x, y, 1, 1);
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(2, 2);
    texture.anisotropy = 4;
    return texture;
  }

  static createRoofTileTexture(size = 128) {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#6b3a1a';
    ctx.fillRect(0, 0, size, size);

    const tileW = size / 8;
    const tileH = size / 12;

    for (let row = 0; row < 12; row++) {
      for (let col = 0; col < 9; col++) {
        const tx = col * tileW;
        const ty = row * tileH;
        const shade = 0.8 + Math.random() * 0.4;
        const r = Math.min(255, (120 + Math.random() * 30) * shade);
        const g = Math.min(255, (65 + Math.random() * 20) * shade);
        const b = Math.min(255, (30 + Math.random() * 15) * shade);
        ctx.fillStyle = `rgb(${r|0},${g|0},${b|0})`;
        ctx.beginPath();
        ctx.arc(tx + tileW / 2, ty + tileH / 2, tileW * 0.4, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(3, 3);
    texture.anisotropy = 4;
    return texture;
  }

  static createConcreteTexture(size = 64) {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        const n = (Math.random() - 0.5) * 20;
        const v = Math.max(0, Math.min(255, 130 + n));
        ctx.fillStyle = `rgb(${v|0},${v|0},${v|0})`;
        ctx.fillRect(x, y, 1, 1);
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(4, 4);
    texture.anisotropy = 4;
    return texture;
  }
}
