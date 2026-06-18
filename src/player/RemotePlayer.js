import * as THREE from 'three';

const TEAM_COLORS = {
  CT: { body: 0x2266cc, leg: 0x335577 },
  T: { body: 0xcc4422, leg: 0x774433 }
};

const WEAPON_MODELS = {
  Rifle: { w: 0.05, h: 0.05, d: 0.5, color: 0x222222 },
  SMG: { w: 0.05, h: 0.05, d: 0.35, color: 0x333333 },
  Pistol: { w: 0.03, h: 0.03, d: 0.15, color: 0x444444 },
  Shotgun: { w: 0.08, h: 0.05, d: 0.4, color: 0x2a2a2a },
  Sniper: { w: 0.04, h: 0.04, d: 0.6, color: 0x1a1a1a },
  Knife: { w: 0.02, h: 0.02, d: 0.12, color: 0x888888 },
};

export class RemotePlayer {
  constructor(scene, id, name) {
    this.id = id;
    this.name = name;
    this.scene = scene;
    this.group = new THREE.Group();
    this.alive = true;
    this.team = 'CT';
    this._currentWeapon = 'Rifle';
    this._flashTimer = 0;

    this.bodyMat = new THREE.MeshStandardMaterial({ color: TEAM_COLORS.CT.body, roughness: 0.6 });
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.8, 8), this.bodyMat);
    body.position.y = 0.1;
    body.castShadow = true;
    this.group.add(body);
    this.bodyMesh = body;

    const headMat = new THREE.MeshStandardMaterial({ color: 0xccaa88, roughness: 0.5 });
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8, 8), headMat);
    head.position.y = 0.75;
    this.group.add(head);
    this.headMesh = head;

    this.weaponMat = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.5 });
    this.weaponMesh = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.05, 0.5), this.weaponMat);
    this.weaponMesh.position.set(-0.15, 0.0, -0.4);
    this.group.add(this.weaponMesh);

    const flashGeo = new THREE.SphereGeometry(0.04, 4, 4);
    const flashMat = new THREE.MeshBasicMaterial({ color: 0xffff00, transparent: true, opacity: 0 });
    this.flashMesh = new THREE.Mesh(flashGeo, flashMat);
    this.flashMesh.position.set(-0.15, 0.0, -0.65);
    this.group.add(this.flashMesh);

    this.legMat = new THREE.MeshStandardMaterial({ color: TEAM_COLORS.CT.leg, roughness: 0.7 });
    const legGeo = new THREE.BoxGeometry(0.12, 0.45, 0.12);
    this.leftLeg = new THREE.Mesh(legGeo, this.legMat);
    this.leftLeg.position.set(-0.12, -0.675, 0);
    this.leftLeg.castShadow = true;
    this.group.add(this.leftLeg);
    this.rightLeg = new THREE.Mesh(legGeo, this.legMat);
    this.rightLeg.position.set(0.12, -0.675, 0);
    this.rightLeg.castShadow = true;
    this.group.add(this.rightLeg);

    const footMat = new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 0.8 });
    const footGeo = new THREE.BoxGeometry(0.08, 0.06, 0.14);
    const lf = new THREE.Mesh(footGeo, footMat);
    lf.position.set(0, -0.225, 0.04);
    this.leftLeg.add(lf);
    const rf = new THREE.Mesh(footGeo, footMat);
    rf.position.set(0, -0.225, 0.04);
    this.rightLeg.add(rf);

    this.scene.add(this.group);
    this.walkPhase = 0;
  }

  setTeam(team) {
    this.team = team;
    const c = TEAM_COLORS[team] || TEAM_COLORS.CT;
    this.bodyMat.color.setHex(c.body);
    this.legMat.color.setHex(c.leg);
  }

  setWeapon(type) {
    if (type === this._currentWeapon || !WEAPON_MODELS[type]) return;
    this._currentWeapon = type;
    const def = WEAPON_MODELS[type];
    this.weaponMesh.geometry.dispose();
    this.weaponMesh.geometry = new THREE.BoxGeometry(def.w, def.h, def.d);
    this.weaponMat.color.setHex(def.color);
    this.weaponMesh.position.set(-0.15, 0.0, -0.4);
    this.flashMesh.position.set(-0.15, 0.0, -0.4 - def.d / 2 - 0.02);
  }

  playShoot() {
    this._flashTimer = 0.08;
    this.flashMesh.material.opacity = 1;
  }

  update(state, deltaTime) {
    if (typeof state === 'number') {
      deltaTime = state;
      state = null;
    }
    if (state?.team && state.team !== this.team) this.setTeam(state.team);
    if (state?.weapon) this.setWeapon(state.weapon);

    if (!this.alive && this.group.visible) {
      this.group.visible = false;
    }
    if (this.alive && !this.group.visible) {
      this.group.visible = true;
    }

    if (state) {
      const pos = state.position;
      const vel = state.velocity;
      const euler = state.euler;

      if (pos) {
        this.group.position.set(pos.x, pos.y || 0.9, pos.z);
      }
      if (euler) {
        this.group.rotation.y = euler.y;
      }
      this.bodyMesh.position.y = state.inputs?.crouch ? 0.15 : 0.1;
      this.headMesh.position.y = state.inputs?.crouch ? 0.65 : 0.75;
      const crouchScale = state.inputs?.crouch ? 0.6 : 1;
      this.group.scale.y = crouchScale;

      const speed = vel ? Math.sqrt(vel.x * vel.x + vel.z * vel.z) : 0;
      if (speed > 0.1) {
        this.walkPhase += deltaTime * speed * 4;
      } else {
        this.walkPhase *= 0.9;
        if (Math.abs(this.walkPhase) < 0.001) this.walkPhase = 0;
      }
    } else {
      this.walkPhase *= 0.9;
      if (Math.abs(this.walkPhase) < 0.001) this.walkPhase = 0;
    }

    const swing = this.walkPhase;
    this.leftLeg.rotation.x = Math.sin(swing) * 0.4;
    this.rightLeg.rotation.x = Math.sin(swing + Math.PI) * 0.4;

    if (this._flashTimer > 0) {
      this._flashTimer -= deltaTime;
      this.flashMesh.material.opacity = Math.max(0, this._flashTimer / 0.08);
    } else {
      this.flashMesh.material.opacity = 0;
    }
  }

  dispose() {
    this.weaponMesh.geometry.dispose();
    this.flashMesh.geometry.dispose();
    this.flashMesh.material.dispose();
    this.scene.remove(this.group);
  }
}
