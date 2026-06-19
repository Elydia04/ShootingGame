// ── First-person arms viewmodel ──────────────────────
// Simple forearm + hand meshes attached to the camera.
// Shown in first-person, hidden in third-person.
import * as THREE from 'three';

export class PlayerArms {
  constructor(camera) {
    this.camera = camera;
    this.group = new THREE.Group();
    this.camera.add(this.group);

    this._buildArms();
  }

  _buildArms() {
    const armMat = new THREE.MeshStandardMaterial({
      color: 0xccaa88,
      roughness: 0.6
    });

    const sleeveMat = new THREE.MeshStandardMaterial({
      color: 0x2a4a2a,
      roughness: 0.8
    });

    const forearmGeo = new THREE.CylinderGeometry(0.025, 0.03, 0.2, 6);
    forearmGeo.rotateX(Math.PI / 2);

    const leftForearm = new THREE.Mesh(forearmGeo, armMat);
    leftForearm.position.set(0.16, -0.18, -0.40);
    leftForearm.rotation.x = -0.25;
    leftForearm.rotation.z = 0.05;
    this.group.add(leftForearm);

    const leftSleeve = new THREE.Mesh(
      new THREE.CylinderGeometry(0.028, 0.025, 0.08, 6),
      sleeveMat
    );
    leftSleeve.position.set(0.14, -0.08, -0.42);
    leftSleeve.rotation.x = -0.25;
    leftSleeve.rotation.z = 0.05;
    this.group.add(leftSleeve);

    const rightForearm = new THREE.Mesh(forearmGeo, armMat);
    rightForearm.position.set(0.26, -0.18, -0.40);
    rightForearm.rotation.x = -0.25;
    rightForearm.rotation.z = 0.15;
    this.group.add(rightForearm);

    const rightSleeve = new THREE.Mesh(
      new THREE.CylinderGeometry(0.028, 0.025, 0.08, 6),
      sleeveMat
    );
    rightSleeve.position.set(0.24, -0.08, -0.42);
    rightSleeve.rotation.x = -0.25;
    rightSleeve.rotation.z = 0.15;
    this.group.add(rightSleeve);

    const handMat = new THREE.MeshStandardMaterial({
      color: 0xccaa88,
      roughness: 0.5
    });

    const handGeo = new THREE.SphereGeometry(0.025, 6, 6);

    const leftHand = new THREE.Mesh(handGeo, handMat);
    leftHand.position.set(0.18, -0.26, -0.38);
    leftHand.scale.set(1, 0.7, 0.5);
    this.group.add(leftHand);

    const rightHand = new THREE.Mesh(handGeo, handMat);
    rightHand.position.set(0.27, -0.26, -0.38);
    rightHand.scale.set(1, 0.7, 0.5);
    this.group.add(rightHand);
  }

  setVisible(visible) {
    this.group.visible = visible;
  }

  hide() {
    this.group.visible = false;
  }

  show() {
    this.group.visible = true;
  }

  dispose() {
    this.camera.remove(this.group);
    this.group.traverse(child => {
      if (child.isMesh) {
        child.geometry.dispose();
        child.material.dispose();
      }
    });
  }
}
