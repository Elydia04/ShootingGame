import * as THREE from 'three';

export class BuildingGenerator {

  static house1(config = {}) {
    const group = new THREE.Group();
    const w = config.width || 12;
    const d = config.depth || 10;
    const h = config.wallHeight || 3.5;
    const wallColor = config.wallColor || 0xc4b998;
    const roofColor = config.roofColor || 0x8b4513;
    const trimColor = config.trimColor || 0xeeddcc;

    const wallMat = new THREE.MeshStandardMaterial({ color: wallColor, roughness: 0.8 });
    const roofMat = new THREE.MeshStandardMaterial({ color: roofColor, roughness: 0.7 });
    const trimMat = new THREE.MeshStandardMaterial({ color: trimColor, roughness: 0.6 });

    // Floor slab
    const floor = new THREE.Mesh(new THREE.BoxGeometry(w, 0.15, d), wallMat);
    floor.position.y = 0.075;
    floor.userData.isMapObject = true;
    group.add(floor);

    // Walls (4 sides with door gap on front)
    const wallThick = 0.15;
    const wallH = h;

    // Back wall
    const back = new THREE.Mesh(new THREE.BoxGeometry(w, wallH, wallThick), wallMat);
    back.position.set(0, wallH / 2, -d / 2);
    back.castShadow = true;
    back.receiveShadow = true;
    back.userData.isMapObject = true;
    group.add(back);

    // Front wall with door gap
    const frontLeft = new THREE.Mesh(new THREE.BoxGeometry(w * 0.35, wallH, wallThick), wallMat);
    frontLeft.position.set(-w * 0.33, wallH / 2, d / 2);
    frontLeft.castShadow = true;
    frontLeft.receiveShadow = true;
    frontLeft.userData.isMapObject = true;
    group.add(frontLeft);

    const frontRight = new THREE.Mesh(new THREE.BoxGeometry(w * 0.35, wallH, wallThick), wallMat);
    frontRight.position.set(w * 0.33, wallH / 2, d / 2);
    frontRight.castShadow = true;
    frontRight.receiveShadow = true;
    frontRight.userData.isMapObject = true;
    group.add(frontRight);

    const doorTop = new THREE.Mesh(new THREE.BoxGeometry(0.9, wallH - 2.1, wallThick), wallMat);
    doorTop.position.set(0, wallH - (wallH - 2.1) / 2, d / 2);
    doorTop.castShadow = true;
    doorTop.receiveShadow = true;
    doorTop.userData.isMapObject = true;
    group.add(doorTop);

    // Left wall
    const left = new THREE.Mesh(new THREE.BoxGeometry(wallThick, wallH, d), wallMat);
    left.position.set(-w / 2, wallH / 2, 0);
    left.castShadow = true;
    left.receiveShadow = true;
    left.userData.isMapObject = true;
    group.add(left);

    // Right wall
    const right = new THREE.Mesh(new THREE.BoxGeometry(wallThick, wallH, d), wallMat);
    right.position.set(w / 2, wallH / 2, 0);
    right.castShadow = true;
    right.receiveShadow = true;
    right.userData.isMapObject = true;
    group.add(right);

    // Roof (pyramid shape)
    const roofH = 2.0;
    const roof = new THREE.Mesh(
      new THREE.ConeGeometry(Math.sqrt(w * w + d * d) * 0.35, roofH, 4),
      roofMat
    );
    roof.position.set(0, wallH + roofH / 2, 0);
    roof.rotation.y = Math.PI / 4;
    roof.castShadow = true;
    roof.receiveShadow = true;
    roof.userData.isMapObject = true;
    group.add(roof);

    // Door frame (trim)
    const doorFrameMat = trimMat;
    const doorPostL = new THREE.Mesh(new THREE.BoxGeometry(0.08, 2.1, 0.08), doorFrameMat);
    doorPostL.position.set(-0.45, 1.05, d / 2 + 0.01);
    group.add(doorPostL);
    const doorPostR = new THREE.Mesh(new THREE.BoxGeometry(0.08, 2.1, 0.08), doorFrameMat);
    doorPostR.position.set(0.45, 1.05, d / 2 + 0.01);
    group.add(doorPostR);
    const doorHeader = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.08, 0.08), doorFrameMat);
    doorHeader.position.set(0, 2.1, d / 2 + 0.01);
    group.add(doorHeader);

    return group;
  }

  static house2(config = {}) {
    const group = new THREE.Group();
    const w = config.width || 12;
    const d = config.depth || 10;
    const floorH = config.floorHeight || 3.5;
    const wallColor = config.wallColor || 0xb8a892;
    const roofColor = config.roofColor || 0x666666;
    const trimColor = config.trimColor || 0xdddddd;

    const wallMat = new THREE.MeshStandardMaterial({ color: wallColor, roughness: 0.8 });
    const roofMat = new THREE.MeshStandardMaterial({ color: roofColor, roughness: 0.6 });
    const trimMat = new THREE.MeshStandardMaterial({ color: trimColor, roughness: 0.5 });

    const wallThick = 0.15;

    // === Ground floor ===
    const gFloor = new THREE.Mesh(new THREE.BoxGeometry(w, 0.15, d), wallMat);
    gFloor.position.y = 0.075;
    gFloor.userData.isMapObject = true;
    group.add(gFloor);

    // Ground floor walls (simple boxes for each side)
    const gH = floorH;

    // Back wall ground
    const gBack = new THREE.Mesh(new THREE.BoxGeometry(w, gH, wallThick), wallMat);
    gBack.position.set(0, gH / 2, -d / 2);
    gBack.castShadow = true; gBack.receiveShadow = true; gBack.userData.isMapObject = true;
    group.add(gBack);

    // Front wall ground (with door gap)
    const gFL = new THREE.Mesh(new THREE.BoxGeometry(w * 0.35, gH, wallThick), wallMat);
    gFL.position.set(-w * 0.33, gH / 2, d / 2);
    gFL.castShadow = true; gFL.receiveShadow = true; gFL.userData.isMapObject = true;
    group.add(gFL);
    const gFR = new THREE.Mesh(new THREE.BoxGeometry(w * 0.35, gH, wallThick), wallMat);
    gFR.position.set(w * 0.33, gH / 2, d / 2);
    gFR.castShadow = true; gFR.receiveShadow = true; gFR.userData.isMapObject = true;
    group.add(gFR);
    const gDT = new THREE.Mesh(new THREE.BoxGeometry(0.9, gH - 2.1, wallThick), wallMat);
    gDT.position.set(0, gH - (gH - 2.1) / 2, d / 2);
    gDT.castShadow = true; gDT.receiveShadow = true; gDT.userData.isMapObject = true;
    group.add(gDT);

    // Left wall ground
    const gLeft = new THREE.Mesh(new THREE.BoxGeometry(wallThick, gH, d), wallMat);
    gLeft.position.set(-w / 2, gH / 2, 0);
    gLeft.castShadow = true; gLeft.receiveShadow = true; gLeft.userData.isMapObject = true;
    group.add(gLeft);

    // Right wall ground
    const gRight = new THREE.Mesh(new THREE.BoxGeometry(wallThick, gH, d), wallMat);
    gRight.position.set(w / 2, gH / 2, 0);
    gRight.castShadow = true; gRight.receiveShadow = true; gRight.userData.isMapObject = true;
    group.add(gRight);

    // === Second floor floor slab ===
    const sFloor = new THREE.Mesh(new THREE.BoxGeometry(w, 0.15, d), wallMat);
    sFloor.position.set(0, gH, 0);
    sFloor.userData.isMapObject = true;
    group.add(sFloor);

    // Second floor walls (with window gaps - just shorter walls with tops)
    const sH = floorH;
    const sY = gH + sH / 2;

    const sBack = new THREE.Mesh(new THREE.BoxGeometry(w, sH, wallThick), wallMat);
    sBack.position.set(0, sY, -d / 2);
    sBack.castShadow = true; sBack.receiveShadow = true; sBack.userData.isMapObject = true;
    group.add(sBack);

    // Front wall 2nd floor (balcony door opening)
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

    const sLeft = new THREE.Mesh(new THREE.BoxGeometry(wallThick, sH, d), wallMat);
    sLeft.position.set(-w / 2, sY, 0);
    sLeft.castShadow = true; sLeft.receiveShadow = true; sLeft.userData.isMapObject = true;
    group.add(sLeft);

    const sRight = new THREE.Mesh(new THREE.BoxGeometry(wallThick, sH, d), wallMat);
    sRight.position.set(w / 2, sY, 0);
    sRight.castShadow = true; sRight.receiveShadow = true; sRight.userData.isMapObject = true;
    group.add(sRight);

    // === Rooftop ===
    const rFloor = new THREE.Mesh(new THREE.BoxGeometry(w, 0.15, d), wallMat);
    rFloor.position.set(0, gH + sH, 0);
    rFloor.userData.isMapObject = true;
    group.add(rFloor);

    // Railing posts
    const railMat = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.3, roughness: 0.6 });
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
    // Side rails
    for (let i = 0; i < postCount; i++) {
      const pz = -d / 2 + i * (d / (postCount - 1));
      const postL = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.6, 0.06), railMat);
      postL.position.set(-w / 2, rY + 0.3, pz);
      group.add(postL);
      const postR = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.6, 0.06), railMat);
      postR.position.set(w / 2, rY + 0.3, pz);
      group.add(postR);
    }
    // Horizontal rail bars
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
    // Left rail
    const lRailL = new THREE.Mesh(new THREE.BoxGeometry(0.04, ladderH, 0.04), ladderMat);
    lRailL.position.set(-ladderW / 2, gH / 2, -d / 2 - 0.3);
    group.add(lRailL);
    // Right rail
    const lRailR = new THREE.Mesh(new THREE.BoxGeometry(0.04, ladderH, 0.04), ladderMat);
    lRailR.position.set(ladderW / 2, gH / 2, -d / 2 - 0.3);
    group.add(lRailR);
    // Rungs
    const rungMat = ladderMat;
    const rungCount = 10;
    for (let i = 0; i < rungCount; i++) {
      const ry = (i + 0.5) * (ladderH / rungCount);
      const rung = new THREE.Mesh(new THREE.BoxGeometry(ladderW - 0.05, 0.04, 0.04), rungMat);
      rung.position.set(0, ry, -d / 2 - 0.3);
      group.add(rung);
    }

    // Door frame ground floor
    const doorFrameMat = trimMat;
    const dpL = new THREE.Mesh(new THREE.BoxGeometry(0.08, 2.1, 0.08), doorFrameMat);
    dpL.position.set(-0.45, 1.05, d / 2 + 0.01);
    group.add(dpL);
    const dpR = new THREE.Mesh(new THREE.BoxGeometry(0.08, 2.1, 0.08), doorFrameMat);
    dpR.position.set(0.45, 1.05, d / 2 + 0.01);
    group.add(dpR);
    const dHdr = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.08, 0.08), doorFrameMat);
    dHdr.position.set(0, 2.1, d / 2 + 0.01);
    group.add(dHdr);

    return group;
  }

  static house3(config = {}) {
    const group = new THREE.Group();
    const w = config.width || 10;
    const d = config.depth || 9;
    const floorH = config.floorHeight || 3.5;
    const wallColor = config.wallColor || 0xaaa0a0;
    const roofColor = config.roofColor || 0x555555;

    const wallMat = new THREE.MeshStandardMaterial({ color: wallColor, roughness: 0.8 });
    const roofMat = new THREE.MeshStandardMaterial({ color: roofColor, roughness: 0.6 });
    const wallThick = 0.15;

    const floors = 3;

    for (let f = 0; f < floors; f++) {
      const yBase = f * floorH;

      // Floor slab
      const slab = new THREE.Mesh(new THREE.BoxGeometry(w, 0.15, d), wallMat);
      slab.position.set(0, yBase + 0.075, 0);
      slab.userData.isMapObject = true;
      group.add(slab);

      const fH = floorH;
      const fY = yBase + fH / 2;

      // Back wall
      const b = new THREE.Mesh(new THREE.BoxGeometry(w, fH, wallThick), wallMat);
      b.position.set(0, fY, -d / 2);
      b.castShadow = true; b.receiveShadow = true; b.userData.isMapObject = true;
      group.add(b);

      // Front wall (with door on ground floor only)
      if (f === 0) {
        const fL = new THREE.Mesh(new THREE.BoxGeometry(w * 0.35, fH, wallThick), wallMat);
        fL.position.set(-w * 0.33, fY, d / 2);
        fL.castShadow = true; fL.receiveShadow = true; fL.userData.isMapObject = true;
        group.add(fL);
        const fR = new THREE.Mesh(new THREE.BoxGeometry(w * 0.35, fH, wallThick), wallMat);
        fR.position.set(w * 0.33, fY, d / 2);
        fR.castShadow = true; fR.receiveShadow = true; fR.userData.isMapObject = true;
        group.add(fR);
        const fT = new THREE.Mesh(new THREE.BoxGeometry(0.9, fH - 2.1, wallThick), wallMat);
        fT.position.set(0, fY - (fH - 2.1) / 2, d / 2);
        fT.castShadow = true; fT.receiveShadow = true; fT.userData.isMapObject = true;
        group.add(fT);
      } else {
        const fW = new THREE.Mesh(new THREE.BoxGeometry(w, fH, wallThick), wallMat);
        fW.position.set(0, fY, d / 2);
        fW.castShadow = true; fW.receiveShadow = true; fW.userData.isMapObject = true;
        group.add(fW);
      }

      // Left wall
      const l = new THREE.Mesh(new THREE.BoxGeometry(wallThick, fH, d), wallMat);
      l.position.set(-w / 2, fY, 0);
      l.castShadow = true; l.receiveShadow = true; l.userData.isMapObject = true;
      group.add(l);

      // Right wall
      const r = new THREE.Mesh(new THREE.BoxGeometry(wallThick, fH, d), wallMat);
      r.position.set(w / 2, fY, 0);
      r.castShadow = true; r.receiveShadow = true; r.userData.isMapObject = true;
      group.add(r);
    }

    // Flat roof
    const roof = new THREE.Mesh(new THREE.BoxGeometry(w, 0.15, d), roofMat);
    roof.position.set(0, floors * floorH, 0);
    roof.userData.isMapObject = true;
    group.add(roof);

    return group;
  }
}
