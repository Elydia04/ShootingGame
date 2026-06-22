import * as THREE from 'three';

export class TextureGenerator {

  // ── PBR helpers ─────────────────────────────────────

  // Generate a tangent-space normal map from a canvas using Sobel filter.
  // Reads luminance from each pixel, computes gradient via 3x3 Sobel operator.
  static createNormalMap(canvas, strength = 1.4) {
    const w = canvas.width, h = canvas.height;
    const ctx = canvas.getContext('2d');
    const src = ctx.getImageData(0, 0, w, h);
    const out = ctx.createImageData(w, h);
    const d = out.data;
    const luminance = new Float32Array(w * h);
    for (let i = 0; i < w * h; i++) {
      luminance[i] = (src.data[i * 4] * 0.299 + src.data[i * 4 + 1] * 0.587 + src.data[i * 4 + 2] * 0.114) / 255;
    }
    const at = (x, y) => luminance[((y + h) % h) * w + ((x + w) % w)];
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const dx = at(x + 1, y - 1) + 2 * at(x + 1, y) + at(x + 1, y + 1)
                 - (at(x - 1, y - 1) + 2 * at(x - 1, y) + at(x - 1, y + 1));
        const dy = at(x - 1, y + 1) + 2 * at(x, y + 1) + at(x + 1, y + 1)
                 - (at(x - 1, y - 1) + 2 * at(x, y - 1) + at(x + 1, y - 1));
        let nx = -dx * strength;
        let ny = -dy * strength;
        let nz = 1;
        const len = Math.sqrt(nx * nx + ny * ny + nz * nz);
        nx /= len; ny /= len; nz /= len;
        const i = (y * w + x) * 4;
        d[i]     = (nx * 0.5 + 0.5) * 255;
        d[i + 1] = (ny * 0.5 + 0.5) * 255;
        d[i + 2] = (nz * 0.5 + 0.5) * 255;
        d[i + 3] = 255;
      }
    }
    ctx.putImageData(out, 0, 0);
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.anisotropy = 4;
    return tex;
  }

  // Derive a roughness map from per-pixel luminance variation.
  // Brighter = rougher, darker = smoother.
  static createRoughnessMap(canvas) {
    const w = canvas.width, h = canvas.height;
    const ctx = canvas.getContext('2d');
    const src = ctx.getImageData(0, 0, w, h);
    const out = ctx.createImageData(w, h);
    const d = out.data;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        let sum = 0, count = 0;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const px = (x + dx + w) % w;
            const py = (y + dy + h) % h;
            const i = (py * w + px) * 4;
            sum += (src.data[i] * 0.299 + src.data[i + 1] * 0.587 + src.data[i + 2] * 0.114);
            count++;
          }
        }
        const avg = sum / count;
        const i = (y * w + x) * 4;
        const v = Math.min(1, Math.max(0, (avg / 255) * 0.5 + 0.5));
        d[i] = d[i + 1] = d[i + 2] = v * 255;
        d[i + 3] = 255;
      }
    }
    ctx.putImageData(out, 0, 0);
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.anisotropy = 4;
    return tex;
  }

  // ── Base texture generators ─────────────────────────

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
