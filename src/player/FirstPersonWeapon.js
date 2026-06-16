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
    this.currentWeaponType = null;

    this.shootKick = 0;
    this.knifeStab = 0;
    this.reloadProgress = 0;
    this.isReloading = false;

    this.isEquipping = false;
    this.equipProgress = 0;
    this.equipDuration = 0.3;

    this.adsPos = new THREE.Vector3(0, -0.087, -0.2);
    this.isADS = false;

    this.weaponGroup = new THREE.Group();
    this.weaponGroup.scale.set(1.5, 1.5, 1.5);
    this.holder.add(this.weaponGroup);

    this._buildM4A1();

    this.muzzleFlash = new THREE.PointLight(0xffaa44, 0, 4);
    this.muzzleFlash.position.set(0, 0.02, 0.48);
    this.weaponGroup.add(this.muzzleFlash);

    this._createFlashSprite();

    this.flashTimer = 0;

    this.reloadDuration = 2.0;

    this._resetPose();
  }

  _createFlashSprite() {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255,255,200,1)');
    grad.addColorStop(0.3, 'rgba(255,200,100,0.8)');
    grad.addColorStop(0.7, 'rgba(255,100,20,0.3)');
    grad.addColorStop(1, 'rgba(255,50,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 32, 32);
    const tex = new THREE.CanvasTexture(canvas);
    const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, opacity: 0, blending: THREE.AdditiveBlending });
    this.flashSprite = new THREE.Sprite(mat);
    this.flashSprite.scale.set(0.15, 0.15, 1);
    this.flashSprite.position.set(0, 0.02, 0.5);
    this.weaponGroup.add(this.flashSprite);
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

    // Red dot sight (rifle)
    const rdMount = new THREE.Mesh(new THREE.BoxGeometry(0.01, 0.006, 0.015), new THREE.MeshStandardMaterial({ color: 0x444444, metalness: 0.5, roughness: 0.4 }));
    rdMount.position.set(-0.005, 0.048, 0.04);
    this.weaponGroup.add(rdMount);
    const rdGlassMat = new THREE.MeshPhysicalMaterial({ color: 0x4466aa, transparent: true, opacity: 0.2, roughness: 0.05, metalness: 0.0, emissive: 0x224488, emissiveIntensity: 0.1 });
    const rdGlass = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.018, 0.002), rdGlassMat);
    rdGlass.position.set(-0.005, 0.058, 0.05);
    this.weaponGroup.add(rdGlass);
    const rdDotMat = new THREE.MeshStandardMaterial({ color: 0xff2200, emissive: 0xff2200, emissiveIntensity: 3 });
    const rdDot = new THREE.Mesh(new THREE.SphereGeometry(0.003, 6, 6), rdDotMat);
    rdDot.position.set(-0.005, 0.058, 0.049);
    this.weaponGroup.add(rdDot);
  }

  _resetPose() {
    const pos = this._getRestPos();
    const rot = this._getRestRot();
    this.weaponGroup.position.copy(pos);
    this.weaponGroup.rotation.set(rot.x, rot.y, rot.z);
  }

  _getRestPos() {
    if (this.currentWeaponType === 'Knife') return new THREE.Vector3(-0.25, -0.18, -0.3);
    if (this.currentWeaponType === 'Pistol') return new THREE.Vector3(0.2, -0.15, -0.35);
    return this.restPos.clone();
  }

  _getRestRot() {
    if (this.currentWeaponType === 'Knife') return new THREE.Euler(-0.1, -0.4, 1.2);
    if (this.currentWeaponType === 'Pistol') return new THREE.Euler(-0.02, 0.04, -0.03);
    return this.restRot.clone();
  }

  getMuzzleWorldPosition() {
    const z = this._getMuzzleZ();
    const pos = new THREE.Vector3(0, 0.02, z);
    pos.applyMatrix4(this.weaponGroup.matrixWorld);
    return pos;
  }

  _getMuzzleZ() {
    return 0.48;
  }

  playShoot() {
    if (this.currentWeaponType === 'Knife') {
      this.knifeStab = 0.15;
      return;
    }
    this.shootKick = 0.04;
    this.recoil = Math.min(this.recoil + 0.025, this.maxRecoil);
    this.recoilSide += (Math.random() - 0.5) * 0.02;
    this.flashTimer = 0.08;
    this.muzzleFlash.intensity = 5;
  }

  playReload(duration = 2.0) {
    this.isReloading = true;
    this.reloadProgress = 0;
    this.reloadDuration = duration;
  }

  update(deltaTime, isMoving, isSprinting, weapon, animState, isADS = false) {
    const dt = Math.min(deltaTime, 0.05);
    this.isADS = isADS;

    if (this.isEquipping) {
      this.equipProgress += dt;
      const t = Math.min(this.equipProgress / this.equipDuration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      const restPos = this._getRestPos();
      const restRot = this._getRestRot();
      this.weaponGroup.position.set(
        restPos.x * ease,
        (restPos.y - 0.5) * (1 - ease) + restPos.y * ease,
        (restPos.z + 0.3) * (1 - ease) + restPos.z * ease
      );
      this.weaponGroup.rotation.set(
        restRot.x * ease,
        restRot.y * ease,
        restRot.z * ease
      );
      if (t >= 1) {
        this.isEquipping = false;
        this._resetPose();
      }
      return;
    }

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

    if (this.knifeStab > 0) {
      this.knifeStab -= dt * 3;
      if (this.knifeStab < 0) this.knifeStab = 0;
    }

    if (this.recoil > 0) {
      this.recoil *= (1 - this.recoverySpeed * dt);
      if (this.recoil < 0.001) this.recoil = 0;
    }
    this.recoilSide *= (1 - this.recoverySpeed * 0.5 * dt);
    if (Math.abs(this.recoilSide) < 0.0001) this.recoilSide = 0;

    this._updateBob(dt, isMoving, isSprinting);

    const restPos = this._getRestPos();
    const restRot = this._getRestRot();
    const targetPos = this.isADS ? this.adsPos.clone() : restPos.clone();
    if (!this.isADS) {
      targetPos.y += this.shootKick * 0.5;
      targetPos.x += this.recoilSide * 1.5;
    }

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

    if (!this.isADS) {
      targetPos.x += this.bobTarget.x;
      targetPos.y += this.bobTarget.y;
    }

    if (this.currentWeaponType === 'Knife' && this.knifeStab > 0) {
      targetPos.z += this.knifeStab * 2;
      targetPos.x += this.knifeStab * 0.3;
      targetPos.y += this.knifeStab * -0.1;
    }

    this.weaponGroup.position.lerp(targetPos, 10 * dt);

    const targetRot = new THREE.Euler(
      restRot.x + this.recoil * 2,
      restRot.y + this.recoilSide,
      restRot.z + this.recoil * 3
    );
    this.weaponGroup.rotation.x += (targetRot.x - this.weaponGroup.rotation.x) * 10 * dt;
    this.weaponGroup.rotation.y += (targetRot.y - this.weaponGroup.rotation.y) * 10 * dt;
    this.weaponGroup.rotation.z += (targetRot.z - this.weaponGroup.rotation.z) * 10 * dt;

    if (this.flashTimer > 0) {
      this.flashTimer -= dt;
      if (this.flashTimer <= 0) {
        this.muzzleFlash.intensity = 0;
        if (this.flashSprite) this.flashSprite.material.opacity = 0;
      } else {
        if (this.flashSprite) {
          this.flashSprite.material.opacity = this.flashTimer / 0.08;
          this.flashSprite.scale.setScalar(0.15 + (1 - this.flashTimer / 0.08) * 0.1);
        }
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
    this.currentWeaponType = weaponType;
    switch (weaponType) {
      case 'Pistol': this._buildPistol(); break;
      case 'SMG': this._buildSMG(); break;
      case 'Shotgun': this._buildShotgun(); break;
      case 'Sniper': this._buildSniper(); break;
      case 'Knife': this._buildKnife(); break;
      default: this._buildM4A1(); break;
    }

    this.muzzleFlash = new THREE.PointLight(0xffaa44, 0, 4);
    this.muzzleFlash.position.set(0, 0.02, 0.48);
    this.weaponGroup.add(this.muzzleFlash);
    this.flashTimer = 0;

    this._createFlashSprite();

    this._resetPose();

    this.isEquipping = true;
    this.equipProgress = 0;
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

    // Red dot sight (SMG)
    const rdMount = new THREE.Mesh(new THREE.BoxGeometry(0.008, 0.005, 0.012), new THREE.MeshStandardMaterial({ color: 0x444444, metalness: 0.5, roughness: 0.4 }));
    rdMount.position.set(-0.004, 0.035, 0.05);
    this.weaponGroup.add(rdMount);
    const rdGlassMat = new THREE.MeshPhysicalMaterial({ color: 0x4466aa, transparent: true, opacity: 0.2, roughness: 0.05, metalness: 0.0, emissive: 0x224488, emissiveIntensity: 0.1 });
    const rdGlass = new THREE.Mesh(new THREE.BoxGeometry(0.018, 0.014, 0.002), rdGlassMat);
    rdGlass.position.set(-0.004, 0.042, 0.06);
    this.weaponGroup.add(rdGlass);
    const rdDotMat = new THREE.MeshStandardMaterial({ color: 0xff2200, emissive: 0xff2200, emissiveIntensity: 3 });
    const rdDot = new THREE.Mesh(new THREE.SphereGeometry(0.0025, 6, 6), rdDotMat);
    rdDot.position.set(-0.004, 0.042, 0.059);
    this.weaponGroup.add(rdDot);
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

  _buildKnife() {
    const metalMat = new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.8, roughness: 0.2, emissive: 0x333333, emissiveIntensity: 0.1 });
    const darkMat = new THREE.MeshStandardMaterial({ color: 0x444444, metalness: 0.5, roughness: 0.5 });
    const gripMat = new THREE.MeshStandardMaterial({ color: 0x3a2a1a, roughness: 0.9 });

    // Blade (reversed - points toward player)
    const bladeGeo = new THREE.BoxGeometry(0.015, 0.002, 0.12);
    const blade = new THREE.Mesh(bladeGeo, metalMat);
    blade.position.set(0, 0, -0.08);
    this.weaponGroup.add(blade);

    // Blade tip
    const tipGeo = new THREE.ConeGeometry(0.008, 0.04, 4);
    const tip = new THREE.Mesh(tipGeo, metalMat);
    tip.rotation.x = -Math.PI / 2;
    tip.position.set(0, 0.001, -0.15);
    this.weaponGroup.add(tip);

    // Guard
    const guardGeo = new THREE.BoxGeometry(0.045, 0.005, 0.008);
    const guard = new THREE.Mesh(guardGeo, darkMat);
    guard.position.set(0, 0, -0.02);
    this.weaponGroup.add(guard);

    // Handle (forward)
    const handleGeo = new THREE.BoxGeometry(0.025, 0.025, 0.055);
    const handle = new THREE.Mesh(handleGeo, gripMat);
    handle.position.set(0, 0, 0.02);
    this.weaponGroup.add(handle);

    // Handle wrap rings
    const ringMat = new THREE.MeshStandardMaterial({ color: 0x222222 });
    for (let i = 0; i < 3; i++) {
      const ring = new THREE.Mesh(new THREE.BoxGeometry(0.028, 0.028, 0.005), ringMat);
      ring.position.set(0, 0, 0.025 + i * 0.018);
      this.weaponGroup.add(ring);
    }

    // Pommel (forward)
    const pommel = new THREE.Mesh(new THREE.SphereGeometry(0.014, 6, 6), darkMat);
    pommel.position.set(0, 0, 0.05);
    this.weaponGroup.add(pommel);
  }

  getMuzzlePosition() {
    const pos = new THREE.Vector3(0, 0.02, this._getMuzzleZ());
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
