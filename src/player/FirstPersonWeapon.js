import * as THREE from 'three';

export class FirstPersonWeapon {
  constructor(camera) {
    this.camera = camera;
    this.holder = new THREE.Group();
    this.camera.add(this.holder);

    this.recoil = 0;
    this.maxRecoil = 0.15;
    this.recoverySpeed = 6;
    this.recoilSide = 0;

    this.bobPhase = 0;
    this.bobTarget = new THREE.Vector3();
    this.restPos = new THREE.Vector3(0.25, -0.2, -0.4);
    this.restRot = new THREE.Euler(-0.03, 0.06, -0.05);

    this.shootKick = 0;
    this.reloadProgress = 0;
    this.isReloading = false;

    this.weaponGroup = new THREE.Group();
    this.weaponGroup.scale.set(1.5, 1.5, 1.5);
    this.holder.add(this.weaponGroup);

    this._buildM4A1();

    this.muzzleFlash = new THREE.PointLight(0xffaa44, 0, 4);
    this.muzzleFlash.position.set(0, 0.02, 0.48);
    this.weaponGroup.add(this.muzzleFlash);
    this.flashTimer = 0;

    this.reloadDuration = 2.0;

    this._resetPose();
  }

  _buildM4A1() {
    const bodyGeo = new THREE.BoxGeometry(0.06, 0.06, 0.5);
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0xaaaaaa, metalness: 0.6, roughness: 0.3, emissive: 0x444444, emissiveIntensity: 0.15 });
    this.body = new THREE.Mesh(bodyGeo, bodyMat);
    this.body.position.set(0, 0, 0);
    this.weaponGroup.add(this.body);

    const barrelGeo = new THREE.CylinderGeometry(0.015, 0.02, 0.3, 8);
    const barrelMat = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.8, roughness: 0.2, emissive: 0x333333, emissiveIntensity: 0.15 });
    this.barrel = new THREE.Mesh(barrelGeo, barrelMat);
    this.barrel.rotation.x = Math.PI / 2;
    this.barrel.position.set(0, 0.02, 0.28);
    this.weaponGroup.add(this.barrel);

    this.muzzle = new THREE.Vector3();
    this.barrel.getWorldPosition(this.muzzle);

    const magGeo = new THREE.BoxGeometry(0.03, 0.07, 0.08);
    const magMat = new THREE.MeshStandardMaterial({ color: 0x999999, metalness: 0.4, roughness: 0.5, emissive: 0x444444, emissiveIntensity: 0.15 });
    this.magazine = new THREE.Mesh(magGeo, magMat);
    this.magazine.position.set(0, -0.06, -0.05);
    this.weaponGroup.add(this.magazine);

    const stockGeo = new THREE.BoxGeometry(0.04, 0.04, 0.15);
    const stockMat = new THREE.MeshStandardMaterial({ color: 0xbbbbbb, roughness: 0.7, emissive: 0x555555, emissiveIntensity: 0.15 });
    this.stock = new THREE.Mesh(stockGeo, stockMat);
    this.stock.position.set(0, -0.01, -0.28);
    this.weaponGroup.add(this.stock);

    const sightGeo = new THREE.BoxGeometry(0.01, 0.03, 0.02);
    const sightMat = new THREE.MeshStandardMaterial({ color: 0x666666, metalness: 0.5, emissive: 0x333333, emissiveIntensity: 0.15 });
    this.sight = new THREE.Mesh(sightGeo, sightMat);
    this.sight.position.set(0, 0.05, 0.1);
    this.weaponGroup.add(this.sight);

    const handguardGeo = new THREE.BoxGeometry(0.03, 0.03, 0.12);
    const handguardMat = new THREE.MeshStandardMaterial({ color: 0x888888, roughness: 0.6, emissive: 0x444444, emissiveIntensity: 0.15 });
    this.handguard = new THREE.Mesh(handguardGeo, handguardMat);
    this.handguard.position.set(0, 0, 0.18);
    this.weaponGroup.add(this.handguard);

    const gripGeo = new THREE.BoxGeometry(0.025, 0.04, 0.035);
    const gripMat = new THREE.MeshStandardMaterial({ color: 0x888888, roughness: 0.6, emissive: 0x444444, emissiveIntensity: 0.15 });
    this.grip = new THREE.Mesh(gripGeo, gripMat);
    this.grip.position.set(0.01, -0.04, 0.0);
    this.grip.rotation.x = 0.1;
    this.weaponGroup.add(this.grip);
  }

  _resetPose() {
    this.weaponGroup.position.copy(this.restPos);
    this.weaponGroup.rotation.set(this.restRot.x, this.restRot.y, this.restRot.z);
  }

  getMuzzleWorldPosition() {
    const pos = new THREE.Vector3(0, 0.02, 0.48);
    pos.applyMatrix4(this.weaponGroup.matrixWorld);
    return pos;
  }

  playShoot() {
    this.shootKick = 0.04;
    this.recoil = Math.min(this.recoil + 0.025, this.maxRecoil);
    this.recoilSide += (Math.random() - 0.5) * 0.02;
    this.flashTimer = 0.05;
    this.muzzleFlash.intensity = 2;
  }

  playReload(duration = 2.0) {
    this.isReloading = true;
    this.reloadProgress = 0;
    this.reloadDuration = duration;
  }

  update(deltaTime, isMoving, isSprinting, weapon, animState) {
    const dt = Math.min(deltaTime, 0.05);

    if (this.isReloading) {
      this.reloadProgress += dt;
      if (this.reloadProgress >= this.reloadDuration) {
        this.isReloading = false;
        this.reloadProgress = 0;
      }
    }

    if (this.shootKick > 0) {
      this.shootKick *= (1 - 12 * dt);
      if (this.shootKick < 0.001) this.shootKick = 0;
    }

    if (this.recoil > 0) {
      this.recoil *= (1 - this.recoverySpeed * dt);
      if (this.recoil < 0.001) this.recoil = 0;
    }
    this.recoilSide *= (1 - this.recoverySpeed * 0.5 * dt);
    if (Math.abs(this.recoilSide) < 0.0001) this.recoilSide = 0;

    this._updateBob(dt, isMoving, isSprinting);

    const targetPos = this.restPos.clone();
    targetPos.y += this.shootKick * 0.5;
    targetPos.x += this.recoilSide * 1.5;

    if (this.isReloading) {
      const p = this.reloadProgress / this.reloadDuration;
      if (p < 0.3) {
        targetPos.y += p / 0.3 * -0.12;
        targetPos.x += p / 0.3 * -0.1;
      } else if (p < 0.7) {
        targetPos.y += -0.12 + (p - 0.3) / 0.4 * 0.12;
        targetPos.x += -0.1 + (p - 0.3) / 0.4 * 0.1;
      }
    }

    targetPos.x += this.bobTarget.x;
    targetPos.y += this.bobTarget.y;

    this.weaponGroup.position.lerp(targetPos, 10 * dt);

    const targetRot = new THREE.Euler(
      this.restRot.x + this.recoil * 2,
      this.restRot.y + this.recoilSide,
      this.restRot.z + this.recoil * 3
    );
    this.weaponGroup.rotation.x += (targetRot.x - this.weaponGroup.rotation.x) * 10 * dt;
    this.weaponGroup.rotation.y += (targetRot.y - this.weaponGroup.rotation.y) * 10 * dt;
    this.weaponGroup.rotation.z += (targetRot.z - this.weaponGroup.rotation.z) * 10 * dt;

    if (this.flashTimer > 0) {
      this.flashTimer -= dt;
      if (this.flashTimer <= 0) {
        this.muzzleFlash.intensity = 0;
      }
    }
  }

  _updateBob(dt, isMoving, isSprinting) {
    if (isMoving) {
      const speed = isSprinting ? 1.4 : 1.0;
      this.bobPhase += 8 * dt * speed;
      this.bobTarget.x = Math.sin(this.bobPhase) * 0.006;
      this.bobTarget.y = Math.abs(Math.cos(this.bobPhase)) * 0.006;
    } else {
      this.bobTarget.x *= (1 - 8 * dt);
      this.bobTarget.y *= (1 - 8 * dt);
      if (Math.abs(this.bobTarget.x) < 0.0001) this.bobTarget.x = 0;
      if (Math.abs(this.bobTarget.y) < 0.0001) this.bobTarget.y = 0;
    }
  }

  _clearWeapon() {
    while (this.weaponGroup.children.length > 0) {
      const child = this.weaponGroup.children[0];
      if (child.isMesh) {
        child.geometry.dispose();
        child.material.dispose();
      }
      this.weaponGroup.remove(child);
    }
  }

  switchModel(weaponType) {
    this._clearWeapon();
    switch (weaponType) {
      case 'Pistol': this._buildPistol(); break;
      case 'SMG': this._buildSMG(); break;
      case 'Shotgun': this._buildShotgun(); break;
      case 'Sniper': this._buildSniper(); break;
      default: this._buildM4A1(); break;
    }

    this.muzzleFlash = new THREE.PointLight(0xffaa44, 0, 4);
    this.muzzleFlash.position.set(0, 0.02, 0.48);
    this.weaponGroup.add(this.muzzleFlash);
    this.flashTimer = 0;

    this._resetPose();
  }

  _buildPistol() {
    const bodyGeo = new THREE.BoxGeometry(0.04, 0.04, 0.16);
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.5, roughness: 0.4, emissive: 0x222222, emissiveIntensity: 0.1 });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.set(0, 0.01, 0);
    this.weaponGroup.add(body);

    const barrelGeo = new THREE.CylinderGeometry(0.012, 0.015, 0.1, 8);
    const barrelMat = new THREE.MeshStandardMaterial({ color: 0x444444, metalness: 0.8, roughness: 0.2, emissive: 0x111111, emissiveIntensity: 0.1 });
    const barrel = new THREE.Mesh(barrelGeo, barrelMat);
    barrel.rotation.x = Math.PI / 2;
    barrel.position.set(0, 0.02, 0.12);
    this.weaponGroup.add(barrel);

    const silencerGeo = new THREE.CylinderGeometry(0.016, 0.018, 0.07, 8);
    const silencerMat = new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.9, roughness: 0.1 });
    const silencer = new THREE.Mesh(silencerGeo, silencerMat);
    silencer.rotation.x = Math.PI / 2;
    silencer.position.set(0, 0.02, 0.18);
    this.weaponGroup.add(silencer);

    const gripGeo = new THREE.BoxGeometry(0.025, 0.06, 0.045);
    const gripMat = new THREE.MeshStandardMaterial({ color: 0x999999, roughness: 0.7, emissive: 0x333333, emissiveIntensity: 0.1 });
    const grip = new THREE.Mesh(gripGeo, gripMat);
    grip.position.set(0, -0.045, -0.04);
    grip.rotation.x = 0.15;
    this.weaponGroup.add(grip);

    const magGeo = new THREE.BoxGeometry(0.02, 0.04, 0.03);
    const magMat = new THREE.MeshStandardMaterial({ color: 0x777777, metalness: 0.3, roughness: 0.5, emissive: 0x222222, emissiveIntensity: 0.1 });
    const mag = new THREE.Mesh(magGeo, magMat);
    mag.position.set(0, -0.07, -0.04);
    this.weaponGroup.add(mag);
  }

  _buildSMG() {
    const bodyGeo = new THREE.BoxGeometry(0.04, 0.05, 0.3);
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.5, roughness: 0.4, emissive: 0x222222, emissiveIntensity: 0.1 });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.set(0, 0, 0);
    this.weaponGroup.add(body);

    const barrelGeo = new THREE.CylinderGeometry(0.01, 0.012, 0.15, 8);
    const barrelMat = new THREE.MeshStandardMaterial({ color: 0x666666, metalness: 0.7, roughness: 0.2, emissive: 0x111111, emissiveIntensity: 0.1 });
    const barrel = new THREE.Mesh(barrelGeo, barrelMat);
    barrel.rotation.x = Math.PI / 2;
    barrel.position.set(0, 0.02, 0.2);
    this.weaponGroup.add(barrel);

    const magGeo = new THREE.BoxGeometry(0.025, 0.08, 0.05);
    const magMat = new THREE.MeshStandardMaterial({ color: 0x777777, metalness: 0.3, roughness: 0.5, emissive: 0x222222, emissiveIntensity: 0.1 });
    const mag = new THREE.Mesh(magGeo, magMat);
    mag.position.set(0, -0.06, 0.0);
    this.weaponGroup.add(mag);

    const stockGeo = new THREE.BoxGeometry(0.03, 0.03, 0.12);
    const stockMat = new THREE.MeshStandardMaterial({ color: 0x999999, roughness: 0.6, emissive: 0x333333, emissiveIntensity: 0.1 });
    const stock = new THREE.Mesh(stockGeo, stockMat);
    stock.position.set(0, -0.01, -0.18);
    this.weaponGroup.add(stock);
  }

  _buildShotgun() {
    const bodyGeo = new THREE.BoxGeometry(0.06, 0.05, 0.25);
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.4, roughness: 0.5, emissive: 0x222222, emissiveIntensity: 0.1 });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.set(0, 0, 0);
    this.weaponGroup.add(body);

    const barrelGeo = new THREE.CylinderGeometry(0.025, 0.03, 0.35, 8);
    const barrelMat = new THREE.MeshStandardMaterial({ color: 0x666666, metalness: 0.7, roughness: 0.2, emissive: 0x111111, emissiveIntensity: 0.1 });
    const barrel = new THREE.Mesh(barrelGeo, barrelMat);
    barrel.rotation.x = Math.PI / 2;
    barrel.position.set(0, 0.02, 0.28);
    this.weaponGroup.add(barrel);

    const forendGeo = new THREE.BoxGeometry(0.04, 0.03, 0.08);
    const forendMat = new THREE.MeshStandardMaterial({ color: 0x999999, roughness: 0.7, emissive: 0x333333, emissiveIntensity: 0.1 });
    const forend = new THREE.Mesh(forendGeo, forendMat);
    forend.position.set(0, 0, 0.18);
    this.weaponGroup.add(forend);

    const stockGeo = new THREE.BoxGeometry(0.05, 0.04, 0.15);
    const stockMat = new THREE.MeshStandardMaterial({ color: 0x999999, roughness: 0.7, emissive: 0x333333, emissiveIntensity: 0.1 });
    const stock = new THREE.Mesh(stockGeo, stockMat);
    stock.position.set(0, -0.01, -0.18);
    this.weaponGroup.add(stock);
  }

  _buildSniper() {
    const bodyGeo = new THREE.BoxGeometry(0.04, 0.04, 0.5);
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.5, roughness: 0.3, emissive: 0x222222, emissiveIntensity: 0.1 });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.set(0, 0, 0);
    this.weaponGroup.add(body);

    const barrelGeo = new THREE.CylinderGeometry(0.012, 0.015, 0.45, 8);
    const barrelMat = new THREE.MeshStandardMaterial({ color: 0x666666, metalness: 0.8, roughness: 0.1, emissive: 0x111111, emissiveIntensity: 0.1 });
    const barrel = new THREE.Mesh(barrelGeo, barrelMat);
    barrel.rotation.x = Math.PI / 2;
    barrel.position.set(0, 0.02, 0.4);
    this.weaponGroup.add(barrel);

    const scopeGeo = new THREE.CylinderGeometry(0.015, 0.02, 0.1, 8);
    const scopeMat = new THREE.MeshStandardMaterial({ color: 0x444444, metalness: 0.5, emissive: 0x111111, emissiveIntensity: 0.1 });
    const scope = new THREE.Mesh(scopeGeo, scopeMat);
    scope.rotation.x = Math.PI / 2;
    scope.position.set(0, 0.06, 0.1);
    this.weaponGroup.add(scope);

    const stockGeo = new THREE.BoxGeometry(0.035, 0.035, 0.15);
    const stockMat = new THREE.MeshStandardMaterial({ color: 0x999999, roughness: 0.7, emissive: 0x333333, emissiveIntensity: 0.1 });
    const stock = new THREE.Mesh(stockGeo, stockMat);
    stock.position.set(0, -0.01, -0.3);
    this.weaponGroup.add(stock);

    const magGeo = new THREE.BoxGeometry(0.02, 0.04, 0.06);
    const magMat = new THREE.MeshStandardMaterial({ color: 0x777777, metalness: 0.3, roughness: 0.5, emissive: 0x222222, emissiveIntensity: 0.1 });
    const mag = new THREE.Mesh(magGeo, magMat);
    mag.position.set(0, -0.04, -0.05);
    this.weaponGroup.add(mag);
  }

  getMuzzlePosition() {
    const pos = new THREE.Vector3(0, 0.02, 0.48);
    pos.applyMatrix4(this.weaponGroup.matrixWorld);
    return pos;
  }

  dispose() {
    this.camera.remove(this.holder);
    this.weaponGroup.traverse(child => {
      if (child.isMesh) {
        child.geometry.dispose();
        child.material.dispose();
      }
    });
  }
}
