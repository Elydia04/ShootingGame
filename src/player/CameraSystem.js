import * as THREE from 'three';

export const CameraView = Object.freeze({
  FIRST_PERSON: 'first',
  THIRD_PERSON: 'third'
});

export class CameraSystem {
  constructor(camera, playerController) {
    this.camera = camera;
    this.player = playerController;
    this.currentView = CameraView.FIRST_PERSON;

    this.thirdPersonOffset = new THREE.Vector3(0, 2.0, 4.0);
    this.thirdPersonLookAhead = 0.5;
    this.smoothSpeed = 5;

    this._thirdPersonPosition = new THREE.Vector3();
    this._thirdPersonLookTarget = new THREE.Vector3();

    this.firstPersonFov = 75;
    this.thirdPersonFov = 65;
  }

  toggleView() {
    if (this.currentView === CameraView.FIRST_PERSON) {
      this.currentView = CameraView.THIRD_PERSON;
    } else {
      this.currentView = CameraView.FIRST_PERSON;
    }
    return this.currentView;
  }

  setView(view) {
    this.currentView = view;
  }

  isFirstPerson() {
    return this.currentView === CameraView.FIRST_PERSON;
  }

  isThirdPerson() {
    return this.currentView === CameraView.THIRD_PERSON;
  }

  update(deltaTime, firstPersonWeapon, playerArms, thirdPersonCharacter) {
    const dt = Math.min(deltaTime, 0.05);

    if (this.currentView === CameraView.FIRST_PERSON) {
      this._updateFirstPerson(firstPersonWeapon, playerArms, thirdPersonCharacter);
    } else {
      this._updateThirdPerson(dt, thirdPersonCharacter);
      if (firstPersonWeapon) firstPersonWeapon.holder.visible = false;
      if (playerArms) playerArms.hide();
    }
  }

  _updateFirstPerson(firstPersonWeapon, playerArms, thirdPersonCharacter) {
    if (firstPersonWeapon) firstPersonWeapon.holder.visible = true;
    if (playerArms) playerArms.show();
    if (thirdPersonCharacter) thirdPersonCharacter.hide();

    this.camera.fov += (this.firstPersonFov - this.camera.fov) * 0.1;
    this.camera.updateProjectionMatrix();
  }

  _updateThirdPerson(dt, thirdPersonCharacter) {
    if (thirdPersonCharacter) {
      thirdPersonCharacter.show();
      thirdPersonCharacter.update(
        this.player.position,
        this.player.euler,
        this.player.isMoving,
        this.player.isSprinting,
        this.player.isInAir
      );
    }

    const behind = new THREE.Vector3(0, 0, 1);
    behind.applyQuaternion(this.player.quaternion);
    behind.multiplyScalar(this.thirdPersonOffset.z);
    behind.y += this.thirdPersonOffset.y;

    const targetPos = this.player.position.clone().add(behind);

    this._thirdPersonPosition.lerp(targetPos, this.smoothSpeed * dt);

    this.camera.position.copy(this._thirdPersonPosition);

    const lookTarget = this.player.position.clone();
    lookTarget.y += 1.0;
    this.camera.lookAt(lookTarget);

    this.camera.fov += (this.thirdPersonFov - this.camera.fov) * 0.1;
    this.camera.updateProjectionMatrix();
  }

  getMuzzleWorldPosition(firstPersonWeapon) {
    if (this.currentView === CameraView.FIRST_PERSON && firstPersonWeapon) {
      return firstPersonWeapon.getMuzzleWorldPosition();
    }

    const pos = this.player.position.clone();
    pos.y += 1.0;
    return pos;
  }
}
