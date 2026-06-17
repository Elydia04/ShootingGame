import * as THREE from 'three';
import { TextureGenerator } from '../utils/TextureGenerator.js';

function texMat(texture, color, opts = {}) {
  return new THREE.MeshStandardMaterial({
    map: texture,
    color: color || 0xffffff,
    roughness: opts.roughness ?? 0.8,
    metalness: opts.metalness ?? 0,
    ...opts
  });
}

function addWindow(group, x, y, z, axis, width, height, trimMat) {
  const glassMat = new THREE.MeshStandardMaterial({ color: 0x1a2a3a, roughness: 0.1, metalness: 0.3 });
  const w = width || 0.8, h = height || 0.9;
  let pane, fH, fL, fR;
  if (axis === 'x') {
    pane = new THREE.Mesh(new THREE.BoxGeometry(0.02, h, w), glassMat);
    pane.position.set(x, y, z);
    group.add(pane);
    if (trimMat) {
      fH = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.04, w + 0.06), trimMat);
      fH.position.set(x, y + h / 2 + 0.02, z);
      group.add(fH);
      fL = new THREE.Mesh(new THREE.BoxGeometry(0.04, h + 0.06, 0.04), trimMat);
      fL.position.set(x, y, z - w / 2 - 0.02);
      group.add(fL);
      fR = new THREE.Mesh(new THREE.BoxGeometry(0.04, h + 0.06, 0.04), trimMat);
      fR.position.set(x, y, z + w / 2 + 0.02);
      group.add(fR);
    }
  } else {
    pane = new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.02), glassMat);
    pane.position.set(x, y, z);
    group.add(pane);
    if (trimMat) {
      fH = new THREE.Mesh(new THREE.BoxGeometry(w + 0.06, 0.04, 0.04), trimMat);
      fH.position.set(x, y + h / 2 + 0.02, z);
      group.add(fH);
      fL = new THREE.Mesh(new THREE.BoxGeometry(0.04, h + 0.06, 0.04), trimMat);
      fL.position.set(x - w / 2 - 0.02, y, z);
      group.add(fL);
      fR = new THREE.Mesh(new THREE.BoxGeometry(0.04, h + 0.06, 0.04), trimMat);
      fR.position.set(x + w / 2 + 0.02, y, z);
      group.add(fR);
    }
  }
}

function addDoorFrame(group, x, z, trimMat, doorMat) {
  const postL = new THREE.Mesh(new THREE.BoxGeometry(0.08, 2.1, 0.08), trimMat);
  postL.position.set(x - 0.45, 1.05, z);
  group.add(postL);
  const postR = new THREE.Mesh(new THREE.BoxGeometry(0.08, 2.1, 0.08), trimMat);
  postR.position.set(x + 0.45, 1.05, z);
  group.add(postR);
  const header = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.08, 0.08), trimMat);
  header.position.set(x, 2.1, z);
  group.add(header);
  if (doorMat) {
    const door = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.9, 0.04), doorMat);
    door.position.set(x, 0.95, z + 0.02);
    group.add(door);
  }
}

function addCeilingLight(group, x, y, z) {
  const bulbMat = new THREE.MeshStandardMaterial({ color: 0xffeedd, emissive: 0xffeecc, emissiveIntensity: 0.5 });
  const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), bulbMat);
  bulb.position.set(x, y, z);
  group.add(bulb);
  const baseMat = new THREE.MeshStandardMaterial({ color: 0x444444, metalness: 0.5, roughness: 0.4 });
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.15, 0.04, 8), baseMat);
  base.position.set(x, y + 0.04, z);
  group.add(base);
}

function addTable(group, x, y, z) {
  const woodMat = new THREE.MeshStandardMaterial({ color: 0x8a6a4a, roughness: 0.8 });
  const top = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.06, 0.6), woodMat);
  top.position.set(x, y + 0.7, z);
  top.castShadow = true;
  group.add(top);
  for (let ox of [-0.42, 0.42]) {
    for (let oz of [-0.22, 0.22]) {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.68, 0.04), woodMat);
      leg.position.set(x + ox, y + 0.34, z + oz);
      group.add(leg);
    }
  }
}

function frontWallWithDoor(w, fH, wallThick, mat, d, glassMat) {
  const parts = [];
  const fL = new THREE.Mesh(new THREE.BoxGeometry(w * 0.35, fH, wallThick), mat);
  fL.position.set(-w * 0.33, fH / 2, d / 2);
  fL.castShadow = true; fL.receiveShadow = true; fL.userData.isMapObject = true;
  parts.push(fL);
  const fR = new THREE.Mesh(new THREE.BoxGeometry(w * 0.35, fH, wallThick), mat);
  fR.position.set(w * 0.33, fH / 2, d / 2);
  fR.castShadow = true; fR.receiveShadow = true; fR.userData.isMapObject = true;
  parts.push(fR);
  const fT = new THREE.Mesh(new THREE.BoxGeometry(0.9, fH - 2.1, wallThick), mat);
  fT.position.set(0, fH - (fH - 2.1) / 2, d / 2);
  fT.castShadow = true; fT.receiveShadow = true; fT.userData.isMapObject = true;
  parts.push(fT);
  return parts;
}

export class BuildingGenerator {

  static house1(config = {}) {
    const group = new THREE.Group();
    const w = config.width || 12;
    const d = config.depth || 10;
    const h = config.wallHeight || 4.5;
    const wallColor = config.wallColor || 0xffffff;
    const roofColor = config.roofColor || 0x8b4513;
    const trimColor = config.trimColor || 0xeeddcc;

    const plasterTex = TextureGenerator.createPlasterTexture();
    const brickTex = TextureGenerator.createBrickTexture();
    const roofTex = TextureGenerator.createRoofTileTexture();

    const wallMat = texMat(plasterTex, wallColor, { roughness: 0.85 });
    const roofMat = texMat(roofTex, roofColor, { roughness: 0.7 });
    const trimMat = new THREE.MeshStandardMaterial({ color: trimColor, roughness: 0.6 });
    const brickMat = texMat(brickTex, 0xcccccc, { roughness: 0.9 });
    const glassMat = new THREE.MeshStandardMaterial({ color: 0x1a2a3a, roughness: 0.1, metalness: 0.3 });
    const doorMat = new THREE.MeshStandardMaterial({ color: 0x5a3a2a, roughness: 0.9 });

    const wallThick = 0.15;
    const wallH = h;

    // Floor slab
    const floor = new THREE.Mesh(new THREE.BoxGeometry(w, 0.15, d), brickMat);
    floor.position.y = 0.075;
    // floor slab — visual only, walls handle collision
    group.add(floor);

    // Back wall
    const back = new THREE.Mesh(new THREE.BoxGeometry(w, wallH, wallThick), brickMat);
    back.position.set(0, wallH / 2, -d / 2);
    back.castShadow = true; back.receiveShadow = true; back.userData.isMapObject = true;
    group.add(back);

    // Front wall with door gap
    for (const m of frontWallWithDoor(w, wallH, wallThick, wallMat, d, glassMat)) group.add(m);

    // Left wall
    const left = new THREE.Mesh(new THREE.BoxGeometry(wallThick, wallH, d), brickMat);
    left.position.set(-w / 2, wallH / 2, 0);
    left.castShadow = true; left.receiveShadow = true; left.userData.isMapObject = true;
    group.add(left);

    // Right wall
    const right = new THREE.Mesh(new THREE.BoxGeometry(wallThick, wallH, d), brickMat);
    right.position.set(w / 2, wallH / 2, 0);
    right.castShadow = true; right.receiveShadow = true; right.userData.isMapObject = true;
    group.add(right);

    // Windows
    const winY = 1.8;
    for (let wz of [-2, 2]) addWindow(group, -w / 2 - 0.01, winY, wz, 'x', 0.8, 0.9, trimMat);
    for (let wz of [-2, 2]) addWindow(group, w / 2 + 0.01, winY, wz, 'x', 0.8, 0.9, trimMat);
    for (let wx of [-2.5, 0, 2.5]) addWindow(group, wx, winY, -d / 2 - 0.01, 'z', 0.8, 0.9, trimMat);

    // Roof (pyramid) with overhang
    const roofH = 2.5;
    const roof = new THREE.Mesh(
      new THREE.ConeGeometry(Math.sqrt(w * w + d * d) * 0.6, roofH, 4), roofMat
    );
    roof.position.set(0, wallH + roofH / 2, 0);
    roof.rotation.y = Math.PI / 4;
    roof.castShadow = true; roof.receiveShadow = true;
    group.add(roof);

    // Door
    addDoorFrame(group, 0, d / 2 + 0.01, trimMat, doorMat);

    // Interior
    addCeilingLight(group, 0, wallH - 0.05, 0);
    addTable(group, -2, 0, 1.5);

    return group;
  }

  static house2(config = {}) {
    const group = new THREE.Group();
    const w = config.width || 12;
    const d = config.depth || 10;
    const floorH = config.floorHeight || 4.5;
    const wallColor = config.wallColor || 0xffffff;
    const roofColor = config.roofColor || 0x666666;
    const trimColor = config.trimColor || 0xdddddd;

    const brickTex = TextureGenerator.createBrickTexture();
    const roofTex = TextureGenerator.createRoofTileTexture();
    const plasterTex = TextureGenerator.createPlasterTexture();

    const wallMat = texMat(plasterTex, wallColor, { roughness: 0.85 });
    const roofMat = texMat(roofTex, roofColor, { roughness: 0.6 });
    const trimMat = new THREE.MeshStandardMaterial({ color: trimColor, roughness: 0.5 });
    const brickMat = texMat(brickTex, 0xcccccc, { roughness: 0.9 });
    const glassMat = new THREE.MeshStandardMaterial({ color: 0x1a2a3a, roughness: 0.1, metalness: 0.3 });
    const doorMat = new THREE.MeshStandardMaterial({ color: 0x5a3a2a, roughness: 0.9 });
    const railMat = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.3, roughness: 0.6 });

    const wallThick = 0.15;

    // === Ground floor ===
    const gFloor = new THREE.Mesh(new THREE.BoxGeometry(w, 0.15, d), brickMat);
    gFloor.position.y = 0.075;
    // floor slab — visual only
    group.add(gFloor);

    const gH = floorH;

    // Back wall
    const gBack = new THREE.Mesh(new THREE.BoxGeometry(w, gH, wallThick), brickMat);
    gBack.position.set(0, gH / 2, -d / 2);
    gBack.castShadow = true; gBack.receiveShadow = true; gBack.userData.isMapObject = true;
    group.add(gBack);

    // Front wall (with door)
    for (const m of frontWallWithDoor(w, gH, wallThick, wallMat, d, glassMat)) group.add(m);

    // Side walls
    const gLeft = new THREE.Mesh(new THREE.BoxGeometry(wallThick, gH, d), brickMat);
    gLeft.position.set(-w / 2, gH / 2, 0);
    gLeft.castShadow = true; gLeft.receiveShadow = true; gLeft.userData.isMapObject = true;
    group.add(gLeft);

    const gRight = new THREE.Mesh(new THREE.BoxGeometry(wallThick, gH, d), brickMat);
    gRight.position.set(w / 2, gH / 2, 0);
    gRight.castShadow = true; gRight.receiveShadow = true; gRight.userData.isMapObject = true;
    group.add(gRight);

    // Ground floor windows
    for (let wz of [-2, 2]) addWindow(group, -w / 2 - 0.01, 1.8, wz, 'x', 0.8, 0.9, trimMat);
    for (let wz of [-2, 2]) addWindow(group, w / 2 + 0.01, 1.8, wz, 'x', 0.8, 0.9, trimMat);

    // === Second floor ===
    const sFloor = new THREE.Mesh(new THREE.BoxGeometry(w, 0.15, d), brickMat);
    sFloor.position.set(0, gH, 0);
    // floor slab — visual only
    group.add(sFloor);

    const sH = floorH;
    const sY = gH + sH / 2;

    const sBack = new THREE.Mesh(new THREE.BoxGeometry(w, sH, wallThick), brickMat);
    sBack.position.set(0, sY, -d / 2);
    sBack.castShadow = true; sBack.receiveShadow = true; sBack.userData.isMapObject = true;
    group.add(sBack);

    // Front wall with balcony door opening
    const sFL = new THREE.Mesh(new THREE.BoxGeometry(w * 0.3, sH, wallThick), wallMat);
    sFL.position.set(-w * 0.35, sY, d / 2);
    sFL.castShadow = true; sFL.receiveShadow = true; sFL.userData.isMapObject = true;
    group.add(sFL);
    const sFR = new THREE.Mesh(new THREE.BoxGeometry(w * 0.3, sH, wallThick), wallMat);
    sFR.position.set(w * 0.35, sY, d / 2);
    sFR.castShadow = true; sFR.receiveShadow = true; sFR.userData.isMapObject = true;
    group.add(sFR);
    const sFM = new THREE.Mesh(new THREE.BoxGeometry(1.6, sH - 2.1, wallThick), wallMat);
    sFM.position.set(0, sY - (sH - 2.1) / 2 + gH, d / 2);
    sFM.castShadow = true; sFM.receiveShadow = true; sFM.userData.isMapObject = true;
    group.add(sFM);

    const sLeft = new THREE.Mesh(new THREE.BoxGeometry(wallThick, sH, d), brickMat);
    sLeft.position.set(-w / 2, sY, 0);
    sLeft.castShadow = true; sLeft.receiveShadow = true; sLeft.userData.isMapObject = true;
    group.add(sLeft);

    const sRight = new THREE.Mesh(new THREE.BoxGeometry(wallThick, sH, d), brickMat);
    sRight.position.set(w / 2, sY, 0);
    sRight.castShadow = true; sRight.receiveShadow = true; sRight.userData.isMapObject = true;
    group.add(sRight);

    // Second floor windows
    for (let wz of [-2, 2]) addWindow(group, -w / 2 - 0.01, gH + 1.8, wz, 'x', 0.8, 0.9, trimMat);
    for (let wz of [-2, 2]) addWindow(group, w / 2 + 0.01, gH + 1.8, wz, 'x', 0.8, 0.9, trimMat);
    for (let wx of [-2.5, 0, 2.5]) addWindow(group, wx, gH + 1.8, -d / 2 - 0.01, 'z', 0.8, 0.9, trimMat);

    // === Rooftop with overhang ===
    const overhang = 1.0;
    const rFloor = new THREE.Mesh(new THREE.BoxGeometry(w + overhang * 2, 0.15, d + overhang * 2), brickMat);
    rFloor.position.set(0, gH + sH, 0);
    // floor slab — visual only
    group.add(rFloor);

    const rY = gH + sH + 0.1;
    const postCount = 6;
    const postSpacing = w / (postCount - 1);
    for (let i = 0; i < postCount; i++) {
      const px = -w / 2 + i * postSpacing;
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.6, 0.06), railMat);
      post.position.set(px, rY + 0.3, d / 2);
      group.add(post);
      const postB = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.6, 0.06), railMat);
      postB.position.set(px, rY + 0.3, -d / 2);
      group.add(postB);
    }
    for (let i = 0; i < postCount; i++) {
      const pz = -d / 2 + i * (d / (postCount - 1));
      const postL = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.6, 0.06), railMat);
      postL.position.set(-w / 2, rY + 0.3, pz);
      group.add(postL);
      const postR = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.6, 0.06), railMat);
      postR.position.set(w / 2, rY + 0.3, pz);
      group.add(postR);
    }
    const railBarMat = new THREE.MeshStandardMaterial({ color: 0x999999, metalness: 0.3, roughness: 0.5 });
    for (const side of [
      { x: 0, z: d / 2 + 0.05, sx: w + 0.1, sz: 0.04 },
      { x: 0, z: -d / 2 - 0.05, sx: w + 0.1, sz: 0.04 },
      { x: -w / 2 - 0.05, z: 0, sx: 0.04, sz: d + 0.1 },
      { x: w / 2 + 0.05, z: 0, sx: 0.04, sz: d + 0.1 }
    ]) {
      const barLow = new THREE.Mesh(new THREE.BoxGeometry(side.sx, 0.04, side.sz), railBarMat);
      barLow.position.set(side.x, rY + 0.15, side.z);
      group.add(barLow);
      const barHigh = new THREE.Mesh(new THREE.BoxGeometry(side.sx, 0.04, side.sz), railBarMat);
      barHigh.position.set(side.x, rY + 0.45, side.z);
      group.add(barHigh);
    }

    // === Ladder on back wall ===
    const ladderMat = new THREE.MeshStandardMaterial({ color: 0x8a7a6a, roughness: 0.8 });
    const ladderH = gH + sH;
    const ladderW = 0.5;
    const lRailL = new THREE.Mesh(new THREE.BoxGeometry(0.04, ladderH, 0.04), ladderMat);
    lRailL.position.set(-ladderW / 2, gH / 2, -d / 2 - 0.3);
    group.add(lRailL);
    const lRailR = new THREE.Mesh(new THREE.BoxGeometry(0.04, ladderH, 0.04), ladderMat);
    lRailR.position.set(ladderW / 2, gH / 2, -d / 2 - 0.3);
    group.add(lRailR);
    const rungCount = 10;
    for (let i = 0; i < rungCount; i++) {
      const ry = (i + 0.5) * (ladderH / rungCount);
      const rung = new THREE.Mesh(new THREE.BoxGeometry(ladderW - 0.05, 0.04, 0.04), ladderMat);
      rung.position.set(0, ry, -d / 2 - 0.3);
      group.add(rung);
    }

    // Ground floor door
    addDoorFrame(group, 0, d / 2 + 0.01, trimMat, doorMat);

    // Interior
    addCeilingLight(group, 0, floorH - 0.05, 0);
    addTable(group, -2, 0, 1.5);

    return group;
  }

  static house3(config = {}) {
    const group = new THREE.Group();
    const w = config.width || 10;
    const d = config.depth || 9;
    const floorH = config.floorHeight || 4.5;
    const wallColor = config.wallColor || 0xffffff;
    const roofColor = config.roofColor || 0x555555;

    const brickTex = TextureGenerator.createBrickTexture();
    const roofTex = TextureGenerator.createRoofTileTexture();
    const plasterTex = TextureGenerator.createPlasterTexture();

    const wallMat = texMat(plasterTex, wallColor, { roughness: 0.85 });
    const roofMat = texMat(roofTex, roofColor, { roughness: 0.6 });
    const brickMat = texMat(brickTex, 0xcccccc, { roughness: 0.9 });
    const glassMat = new THREE.MeshStandardMaterial({ color: 0x1a2a3a, roughness: 0.1, metalness: 0.3 });
    const doorMat = new THREE.MeshStandardMaterial({ color: 0x5a3a2a, roughness: 0.9 });
    const trimMat = new THREE.MeshStandardMaterial({ color: 0xeeddcc, roughness: 0.6 });

    const wallThick = 0.15;
    const floors = 3;

    for (let f = 0; f < floors; f++) {
      const yBase = f * floorH;

      const slab = new THREE.Mesh(new THREE.BoxGeometry(w, 0.15, d), brickMat);
      slab.position.set(0, yBase + 0.075, 0);
      // floor slab — visual only
      group.add(slab);

      const fH = floorH;
      const fY = yBase + fH / 2;

      const back = new THREE.Mesh(new THREE.BoxGeometry(w, fH, wallThick), brickMat);
      back.position.set(0, fY, -d / 2);
      back.castShadow = true; back.receiveShadow = true; back.userData.isMapObject = true;
      group.add(back);

      if (f === 0) {
        for (const m of frontWallWithDoor(w, fH, wallThick, wallMat, d, glassMat)) group.add(m);
      } else {
        const fW = new THREE.Mesh(new THREE.BoxGeometry(w, fH, wallThick), wallMat);
        fW.position.set(0, fY, d / 2);
        fW.castShadow = true; fW.receiveShadow = true; fW.userData.isMapObject = true;
        group.add(fW);
      }

      const left = new THREE.Mesh(new THREE.BoxGeometry(wallThick, fH, d), brickMat);
      left.position.set(-w / 2, fY, 0);
      left.castShadow = true; left.receiveShadow = true; left.userData.isMapObject = true;
      group.add(left);

      const right = new THREE.Mesh(new THREE.BoxGeometry(wallThick, fH, d), brickMat);
      right.position.set(w / 2, fY, 0);
      right.castShadow = true; right.receiveShadow = true; right.userData.isMapObject = true;
      group.add(right);

      // Windows per floor
      if (f > 0) {
        for (let wz of [-1.5, 1.5]) addWindow(group, -w / 2 - 0.01, yBase + 1.8, wz, 'x', 0.7);
        for (let wz of [-1.5, 1.5]) addWindow(group, w / 2 + 0.01, yBase + 1.8, wz, 'x', 0.7);
        for (let wx of [-2, 2]) addWindow(group, wx, yBase + 1.8, -d / 2 - 0.01, 'z', 0.7);
        for (let wx of [-2, 2]) addWindow(group, wx, yBase + 1.8, d / 2 + 0.01, 'z', 0.7);
      }
    }

    // Flat roof with overhang
    const roof = new THREE.Mesh(new THREE.BoxGeometry(w + 1.0, 0.15, d + 1.0), roofMat);
    roof.position.set(0, floors * floorH, 0);
    // flat roof — visual only
    group.add(roof);

    // Rooftop AC unit
    const acMat = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.4, roughness: 0.5 });
    const ac = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.4, 0.6), acMat);
    ac.position.set(2, floors * floorH + 0.2, 1);
    ac.castShadow = true;
    group.add(ac);

    // Ground floor door
    addDoorFrame(group, 0, d / 2 + 0.01, trimMat, doorMat);

    // Interior
    addCeilingLight(group, 0, floorH - 0.05, 0);

    return group;
  }

  static hauntedHouse(config = {}) {
    const group = new THREE.Group();
    const w = config.width || 10;
    const d = config.depth || 8;
    const h = config.wallHeight || 4.5;
    const wallColor = config.wallColor || 0x4a4a4a;
    const roofColor = config.roofColor || 0x2a2a2a;

    const plasterTex = TextureGenerator.createPlasterTexture();
    const roofTex = TextureGenerator.createRoofTileTexture();

    const wallMat = texMat(plasterTex, wallColor, { roughness: 0.95 });
    const roofMat = texMat(roofTex, roofColor, { roughness: 0.8 });
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x3a2a1a, roughness: 0.9 });
    const darkWoodMat = new THREE.MeshStandardMaterial({ color: 0x2a1a0a, roughness: 0.95 });
    const glassMat = new THREE.MeshStandardMaterial({ color: 0x0a1a2a, roughness: 0.3, metalness: 0.1 });
    const doorMat = new THREE.MeshStandardMaterial({ color: 0x3a2a1a, roughness: 0.9 });

    const wallThick = 0.15;
    const wallH = h;

    // Floor slab
    const floor = new THREE.Mesh(new THREE.BoxGeometry(w, 0.15, d), woodMat);
    floor.position.y = 0.075;
    // floor slab — visual only, walls handle collision
    group.add(floor);

    // Back wall
    const back = new THREE.Mesh(new THREE.BoxGeometry(w, wallH, wallThick), wallMat);
    back.position.set(0, wallH / 2, -d / 2);
    back.castShadow = true; back.receiveShadow = true; back.userData.isMapObject = true;
    group.add(back);

    // Front wall with door gap
    for (const m of frontWallWithDoor(w, wallH, wallThick, wallMat, d, glassMat)) group.add(m);

    // Boarded door (crossed planks)
    const doorPlank1 = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.12, 0.04), darkWoodMat);
    doorPlank1.position.set(0, 0.3, d / 2 + 0.02);
    group.add(doorPlank1);
    const doorPlank2 = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.12, 0.04), darkWoodMat);
    doorPlank2.position.set(0, 0.7, d / 2 + 0.02);
    group.add(doorPlank2);
    const doorPlank3 = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.12, 0.04), darkWoodMat);
    doorPlank3.position.set(0, 1.1, d / 2 + 0.02);
    group.add(doorPlank3);
    const doorPlank4 = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.12, 0.04), darkWoodMat);
    doorPlank4.position.set(0, 1.5, d / 2 + 0.02);
    group.add(doorPlank4);
    const doorCross1 = new THREE.Mesh(new THREE.BoxGeometry(0.06, 1.8, 0.04), darkWoodMat);
    doorCross1.rotation.z = 0.3;
    doorCross1.position.set(0, 0.95, d / 2 + 0.02);
    group.add(doorCross1);
    const doorCross2 = new THREE.Mesh(new THREE.BoxGeometry(0.06, 1.8, 0.04), darkWoodMat);
    doorCross2.rotation.z = -0.3;
    doorCross2.position.set(0, 0.95, d / 2 + 0.02);
    group.add(doorCross2);

    // Left wall
    const left = new THREE.Mesh(new THREE.BoxGeometry(wallThick, wallH, d), wallMat);
    left.position.set(-w / 2, wallH / 2, 0);
    left.castShadow = true; left.receiveShadow = true; left.userData.isMapObject = true;
    group.add(left);

    // Right wall
    const right = new THREE.Mesh(new THREE.BoxGeometry(wallThick, wallH, d), wallMat);
    right.position.set(w / 2, wallH / 2, 0);
    right.castShadow = true; right.receiveShadow = true; right.userData.isMapObject = true;
    group.add(right);

    // Side windows (one per side, slightly offset - broken panes)
    addWindow(group, -w / 2 - 0.01, 1.8, -1.5, 'x', 0.7, 0.8, null);
    addWindow(group, w / 2 + 0.01, 1.8, 1.5, 'x', 0.7, 0.8, null);
    addWindow(group, 2.5, 1.8, -d / 2 - 0.01, 'z', 0.7, 0.8, null);

    // Roof (pyramid with wider overhang)
    const roofH = 2.0;
    const roof = new THREE.Mesh(
      new THREE.ConeGeometry(Math.sqrt(w * w + d * d) * 0.4, roofH, 4), roofMat
    );
    roof.position.set(0, wallH + roofH / 2, 0);
    roof.rotation.y = Math.PI / 4;
    roof.castShadow = true; roof.receiveShadow = true;
    group.add(roof);

    // Chimney
    const chimney = new THREE.Mesh(
      new THREE.BoxGeometry(0.6, 1.2, 0.6), wallMat
    );
    chimney.position.set(2.5, wallH + roofH - 0.4, -1.5);
    chimney.castShadow = true; chimney.receiveShadow = true;
    group.add(chimney);
    const chimneyTop = new THREE.Mesh(
      new THREE.BoxGeometry(0.7, 0.1, 0.7), darkWoodMat
    );
    chimneyTop.position.set(2.5, wallH + roofH + 0.2, -1.5);
    chimneyTop.castShadow = true;
    group.add(chimneyTop);

    return group;
  }
}
