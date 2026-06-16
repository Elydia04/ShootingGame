import * as THREE from 'three';

const TEAM_COLORS = {
  CT: { body: 0x3366aa, sleeve: 0x3366aa, pants: 0x445566 },
  T: { body: 0xcc4422, sleeve: 0xcc4422, pants: 0x774433 }
};

export class ThirdPersonCharacter {
  constructor(scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    this.scene.add(this.group);

    this.visible = false;
    this.group.visible = false;
    this._team = 'CT';

    this._buildModel();
  }

  setTeam(team) {
    this._team = team;
    const c = TEAM_COLORS[team] || TEAM_COLORS.CT;
    if (this.bodyMat) this.bodyMat.color.setHex(c.body);
    if (this.pantsMat) this.pantsMat.color.setHex(c.pants);
    if (this.sleeveMat) this.sleeveMat.color.setHex(c.sleeve);
  }

  _buildModel() {
    const c = TEAM_COLORS[this._team] || TEAM_COLORS.CT;
    this.bodyMat = new THREE.MeshStandardMaterial({ color: c.body, roughness: 0.6 });

    const headMat = new THREE.MeshStandardMaterial({ color: 0xccaa88, roughness: 0.5 });

    this.pantsMat = new THREE.MeshStandardMaterial({ color: c.pants, roughness: 0.7 });

    const bootMat = new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 0.8 });

    const armMat = new THREE.MeshStandardMaterial({ color: 0xccaa88, roughness: 0.5 });

    const head = new THREE.Mesh(new THREE.SphereGeometry(0.2, 8, 8), headMat);
    head.position.y = 1.65;
    head.castShadow = true;
    this.group.add(head);

    const torso = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.3), this.bodyMat);
    torso.position.y = 1.15;
    torso.castShadow = true;
    this.group.add(torso);

    const pelvis = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.2, 0.25), this.pantsMat);
    pelvis.position.y = 0.8;
    this.group.add(pelvis);

    const lLeg = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.4, 0.12), this.pantsMat);
    lLeg.position.set(-0.1, 0.5, 0);
    lLeg.castShadow = true;
    this.group.add(lLeg);

    const rLeg = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.4, 0.12), this.pantsMat);
    rLeg.position.set(0.1, 0.5, 0);
    rLeg.castShadow = true;
    this.group.add(rLeg);

    const lFoot = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.08, 0.18), bootMat);
    lFoot.position.set(-0.1, 0.3, 0.04);
    this.group.add(lFoot);

    const rFoot = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.08, 0.18), bootMat);
    rFoot.position.set(0.1, 0.3, 0.04);
    this.group.add(rFoot);

    const lArm = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.4, 0.08), armMat);
    lArm.position.set(-0.34, 1.2, 0);
    lArm.castShadow = true;
    this.group.add(lArm);

    const rArm = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.4, 0.08), armMat);
    rArm.position.set(0.34, 1.2, 0);
    rArm.castShadow = true;
    this.group.add(rArm);

    this.sleeveMat = new THREE.MeshStandardMaterial({ color: c.sleeve, roughness: 0.6 });

    const lSleeve = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.15, 0.09), this.sleeveMat);
    lSleeve.position.set(-0.34, 1.38, 0);
    this.group.add(lSleeve);

    const rSleeve = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.15, 0.09), this.sleeveMat);
    rSleeve.position.set(0.34, 1.38, 0);
    this.group.add(rSleeve);

    const wepGeo = new THREE.BoxGeometry(0.05, 0.05, 0.35);
    const wepMat = new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.6 });
    this.weaponMesh = new THREE.Mesh(wepGeo, wepMat);
    this.weaponMesh.position.set(0.25, 1.05, -0.15);
    this.weaponMesh.rotation.x = -0.3;
    this.group.add(this.weaponMesh);
  }

  show() {
    this.visible = true;
    this.group.visible = true;
  }

  hide() {
    this.visible = false;
    this.group.visible = false;
  }

  update(position, rotation, isMoving, isSprinting, isInAir) {
    if (!this.visible) return;

    this.group.position.copy(position);
    this.group.position.y -= 0.9;
    this.group.rotation.y = rotation.y;
  }

  dispose() {
    this.scene.remove(this.group);
    this.group.traverse(child => {
      if (child.isMesh) {
        child.geometry.dispose();
        child.material.dispose();
      }
    });
  }
}
