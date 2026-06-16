import * as THREE from 'three';

export class RemotePlayer {
  constructor(scene, id, name) {
    this.id = id;
    this.name = name;
    this.scene = scene;
    this.group = new THREE.Group();
    this.alive = true;

    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x4488cc, roughness: 0.6 });
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.8, 8), bodyMat);
    body.position.y = 0.1;
    body.castShadow = true;
    this.group.add(body);
    this.bodyMesh = body;

    const headMat = new THREE.MeshStandardMaterial({ color: 0xccaa88, roughness: 0.5 });
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8, 8), headMat);
    head.position.y = 0.75;
    this.group.add(head);
    this.headMesh = head;

    const weaponMat = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.5 });
    const weapon = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.05, 0.5), weaponMat);
    weapon.position.set(-0.15, 0.0, -0.4);
    this.group.add(weapon);

    const legMat = new THREE.MeshStandardMaterial({ color: 0x445544, roughness: 0.7 });
    const legGeo = new THREE.BoxGeometry(0.12, 0.45, 0.12);
    this.leftLeg = new THREE.Mesh(legGeo, legMat);
    this.leftLeg.position.set(-0.12, -0.675, 0);
    this.leftLeg.castShadow = true;
    this.group.add(this.leftLeg);
    this.rightLeg = new THREE.Mesh(legGeo, legMat);
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

  update(state, deltaTime) {
    if (!this.alive && this.group.visible) {
      this.group.visible = false;
    }
    if (this.alive && !this.group.visible) {
      this.group.visible = true;
    }

    const pos = state.position;
    const vel = state.velocity;
    const euler = state.euler;

    this.group.position.set(pos.x, pos.y || 0.9, pos.z);
    this.group.rotation.y = euler.y;
    this.bodyMesh.position.y = state.inputs?.crouch ? 0.15 : 0.1;
    this.headMesh.position.y = state.inputs?.crouch ? 0.65 : 0.75;
    const crouchScale = state.inputs?.crouch ? 0.6 : 1;
    this.group.scale.y = crouchScale;

    const speed = Math.sqrt(vel.x * vel.x + vel.z * vel.z);
    if (speed > 0.1) {
      this.walkPhase += deltaTime * speed * 4;
    } else {
      this.walkPhase *= 0.9;
      if (Math.abs(this.walkPhase) < 0.001) this.walkPhase = 0;
    }
    const swing = this.walkPhase;
    this.leftLeg.rotation.x = Math.sin(swing) * 0.4;
    this.rightLeg.rotation.x = Math.sin(swing + Math.PI) * 0.4;
  }

  dispose() {
    this.scene.remove(this.group);
  }
}
