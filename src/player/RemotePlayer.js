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

const SHARED = (() => {
  const body = {
    CT: new THREE.MeshStandardMaterial({ color: TEAM_COLORS.CT.body, roughness: 0.6 }),
    T: new THREE.MeshStandardMaterial({ color: TEAM_COLORS.T.body, roughness: 0.6 })
  };
  const leg = {
    CT: new THREE.MeshStandardMaterial({ color: TEAM_COLORS.CT.leg, roughness: 0.7 }),
    T: new THREE.MeshStandardMaterial({ color: TEAM_COLORS.T.leg, roughness: 0.7 })
  };
  const head = new THREE.MeshStandardMaterial({ color: 0xccaa88, roughness: 0.5 });
  const foot = new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 0.8 });
  const flash = new THREE.MeshBasicMaterial({ color: 0xffff00, transparent: true, opacity: 0 });
  const weapon = {};
  for (const [type, def] of Object.entries(WEAPON_MODELS)) {
    weapon[type] = new THREE.MeshStandardMaterial({ color: def.color, metalness: 0.5 });
    weapon[type].userData.weaponType = type;
  }
  return { body, leg, head, foot, flash, weapon };
})();

const SHARED_GEO = (() => {
  const body = new THREE.CylinderGeometry(0.3, 0.3, 0.8, 8);
  const head = new THREE.SphereGeometry(0.18, 8, 8);
  const leg = new THREE.BoxGeometry(0.12, 0.45, 0.12);
  const foot = new THREE.BoxGeometry(0.08, 0.06, 0.14);
  const flash = new THREE.SphereGeometry(0.04, 4, 4);
  const weapon = {};
  for (const [type, def] of Object.entries(WEAPON_MODELS)) {
    weapon[type] = new THREE.BoxGeometry(def.w, def.h, def.d);
  }
  return { body, head, leg, foot, flash, weapon };
})();

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

    const body = new THREE.Mesh(SHARED_GEO.body, SHARED.body.CT);
    body.position.y = 0.1;
    body.castShadow = true;
    this.group.add(body);
    this.bodyMesh = body;

    const head = new THREE.Mesh(SHARED_GEO.head, SHARED.head);
    head.position.y = 0.75;
    this.group.add(head);
    this.headMesh = head;

    this.weaponMesh = new THREE.Mesh(SHARED_GEO.weapon.Rifle, SHARED.weapon.Rifle);
    this.weaponMesh.position.set(-0.15, 0.0, -0.4);
    this.group.add(this.weaponMesh);

    this.flashMesh = new THREE.Mesh(SHARED_GEO.flash, SHARED.flash);
    this.flashMesh.position.set(-0.15, 0.0, -0.65);
    this.group.add(this.flashMesh);

    this.leftLeg = new THREE.Mesh(SHARED_GEO.leg, SHARED.leg.CT);
    this.leftLeg.position.set(-0.12, -0.675, 0);
    this.leftLeg.castShadow = true;
    this.group.add(this.leftLeg);
    this.rightLeg = new THREE.Mesh(SHARED_GEO.leg, SHARED.leg.CT);
    this.rightLeg.position.set(0.12, -0.675, 0);
    this.rightLeg.castShadow = true;
    this.group.add(this.rightLeg);

    const lf = new THREE.Mesh(SHARED_GEO.foot, SHARED.foot);
    lf.position.set(0, -0.225, 0.04);
    this.leftLeg.add(lf);
    const rf = new THREE.Mesh(SHARED_GEO.foot, SHARED.foot);
    rf.position.set(0, -0.225, 0.04);
    this.rightLeg.add(rf);

    this.scene.add(this.group);
    this.walkPhase = 0;
  }

  setTeam(team) {
    this.team = team;
    this.bodyMesh.material = SHARED.body[team] || SHARED.body.CT;
    this.leftLeg.material = SHARED.leg[team] || SHARED.leg.CT;
    this.rightLeg.material = SHARED.leg[team] || SHARED.leg.CT;
  }

  setWeapon(type) {
    if (type === this._currentWeapon || !WEAPON_MODELS[type]) return;
    this._currentWeapon = type;
    const def = WEAPON_MODELS[type];
    this.weaponMesh.geometry = SHARED_GEO.weapon[type];
    this.weaponMesh.material = SHARED.weapon[type];
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
    this.scene.remove(this.group);
  }
}
