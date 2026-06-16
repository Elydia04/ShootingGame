import * as THREE from 'three';

export class TreeGenerator {
  static createTree(config = {}) {
    const group = new THREE.Group();

    const trunkHeight = config.trunkHeight || 2.5 + Math.random() * 1.5;
    const trunkRadius = config.trunkRadius || 0.15 + Math.random() * 0.1;
    const canopyRadius = config.canopyRadius || 1.0 + Math.random() * 0.8;
    const canopyY = config.canopyY || trunkHeight + 0.3;

    const trunkMat = new THREE.MeshStandardMaterial({
      color: config.trunkColor || 0x4a3528,
      roughness: 0.9
    });

    const trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(trunkRadius * 0.7, trunkRadius, trunkHeight, 6),
      trunkMat
    );
    trunk.position.y = trunkHeight / 2;
    trunk.castShadow = true;
    group.add(trunk);

    const canopyMat = new THREE.MeshStandardMaterial({
      color: config.canopyColor || 0x2d6b2d,
      roughness: 0.8
    });

    const canopyMatLight = new THREE.MeshStandardMaterial({
      color: config.canopyColorLight || 0x3a8a3a,
      roughness: 0.8
    });

    const canopyMatDark = new THREE.MeshStandardMaterial({
      color: config.canopyColorDark || 0x1f4f1f,
      roughness: 0.8
    });

    const style = config.style || 'roblox';
    if (style === 'roblox') {
      const mainCanopy = new THREE.Mesh(
        new THREE.SphereGeometry(canopyRadius, 7, 7),
        canopyMat
      );
      mainCanopy.position.y = canopyY;
      mainCanopy.scale.y = 0.8;
      mainCanopy.castShadow = true;
      group.add(mainCanopy);

      const subCanopy1 = new THREE.Mesh(
        new THREE.SphereGeometry(canopyRadius * 0.7, 7, 7),
        canopyMatLight
      );
      subCanopy1.position.set(canopyRadius * 0.4, canopyY + canopyRadius * 0.3, canopyRadius * 0.3);
      subCanopy1.scale.y = 0.7;
      subCanopy1.castShadow = true;
      group.add(subCanopy1);

      const subCanopy2 = new THREE.Mesh(
        new THREE.SphereGeometry(canopyRadius * 0.6, 7, 7),
        canopyMatDark
      );
      subCanopy2.position.set(-canopyRadius * 0.35, canopyY + canopyRadius * 0.1, -canopyRadius * 0.25);
      subCanopy2.scale.y = 0.7;
      subCanopy2.castShadow = true;
      group.add(subCanopy2);

      const subCanopy3 = new THREE.Mesh(
        new THREE.SphereGeometry(canopyRadius * 0.5, 7, 7),
        canopyMatLight
      );
      subCanopy3.position.set(canopyRadius * 0.1, canopyY + canopyRadius * 0.5, -canopyRadius * 0.4);
      subCanopy3.scale.y = 0.7;
      subCanopy3.castShadow = true;
      group.add(subCanopy3);
    } else {
      const coneCanopy = new THREE.Mesh(
        new THREE.ConeGeometry(canopyRadius * 1.2, canopyRadius * 1.5, 7),
        canopyMat
      );
      coneCanopy.position.y = canopyY + canopyRadius * 0.3;
      coneCanopy.castShadow = true;
      group.add(coneCanopy);

      const coneLower = new THREE.Mesh(
        new THREE.ConeGeometry(canopyRadius * 1.5, canopyRadius, 7),
        canopyMatLight
      );
      coneLower.position.y = canopyY - canopyRadius * 0.2;
      coneLower.castShadow = true;
      group.add(coneLower);
    }

    return group;
  }

  static createForest(trees = [], scene) {
    const groups = [];
    for (const t of trees) {
      const tree = TreeGenerator.createTree(t.config || {});
      tree.position.set(t.x || 0, 0, t.z || 0);
      if (t.scale) tree.scale.setScalar(t.scale);
      if (t.rotation) tree.rotation.y = t.rotation;
      scene.add(tree);
      tree.userData.isTree = true;
      groups.push(tree);
    }
    return groups;
  }
}
