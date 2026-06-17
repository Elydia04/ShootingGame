export class InterpolationManager {
  constructor() {
    this.trackedEntities = new Map();
    this.smoothingFactor = 0.1;
    this.maxSnapDistance = 5;
  }

  addEntity(id, initialData) {
    this.trackedEntities.set(id, {
      positions: [],
      rotations: [],
      currentPosition: initialData.position ? { ...initialData.position } : null,
      currentRotation: initialData.rotation ? { ...initialData.rotation } : null,
      renderPosition: initialData.position ? { ...initialData.position } : null,
      renderRotation: initialData.rotation ? { ...initialData.rotation } : null,
      lastUpdate: performance.now(),
      teleported: false
    });
  }

  removeEntity(id) {
    this.trackedEntities.delete(id);
  }

  updateEntity(id, data) {
    const entity = this.trackedEntities.get(id);
    if (!entity) return;

    const now = performance.now();

    if (entity.positions.length > 0) {
      const last = entity.positions[entity.positions.length - 1];
      if (last.position) {
        const dx = data.position.x - last.position.x;
        const dy = data.position.y - last.position.y;
        const dz = data.position.z - last.position.z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist > this.maxSnapDistance) {
          entity.positions = [];
          entity.rotations = [];
          entity.teleported = true;

          if (entity.renderPosition) {
            entity.renderPosition.x = data.position.x;
            entity.renderPosition.y = data.position.y;
            entity.renderPosition.z = data.position.z;
          }
          if (entity.currentPosition) {
            entity.currentPosition.x = data.position.x;
            entity.currentPosition.y = data.position.y;
            entity.currentPosition.z = data.position.z;
          }
          entity.lastUpdate = now;
          return;
        }
      }
    }

    entity.positions.push({
      position: { ...data.position },
      time: now
    });

    if (data.rotation) {
      entity.rotations.push({
        rotation: { ...data.rotation },
        time: now
      });
    }

    if (entity.currentPosition) {
      entity.currentPosition.x = data.position.x;
      entity.currentPosition.y = data.position.y;
      entity.currentPosition.z = data.position.z;
    }

    if (entity.currentRotation && data.rotation) {
      entity.currentRotation.x = data.rotation.x;
      entity.currentRotation.y = data.rotation.y;
    }

    while (entity.positions.length > 10) {
      entity.positions.shift();
    }
    while (entity.rotations.length > 10) {
      entity.rotations.shift();
    }

    entity.lastUpdate = now;
  }

  update(deltaTime) {
    const now = performance.now();
    const interpDelay = 0.05;

    for (const [id, entity] of this.trackedEntities) {
      if (!entity.renderPosition || entity.positions.length === 0) continue;

      if (entity.teleported) {
        entity.teleported = false;
        continue;
      }

      const targetTime = (now / 1000) - interpDelay;

      let before = entity.positions[0];
      let after = entity.positions[entity.positions.length - 1];

      for (let i = 0; i < entity.positions.length - 1; i++) {
        const t1 = entity.positions[i].time / 1000;
        const t2 = entity.positions[i + 1].time / 1000;
        if (t1 <= targetTime && t2 >= targetTime) {
          before = entity.positions[i];
          after = entity.positions[i + 1];
          break;
        }
      }

      const tBefore = before.time / 1000;
      const tAfter = after.time / 1000;
      const tRange = tAfter - tBefore;
      const t = tRange > 0
        ? (targetTime - tBefore) / tRange
        : 1;

      const clampedT = Math.max(0, Math.min(1, t));

      entity.renderPosition.x = before.position.x + (after.position.x - before.position.x) * clampedT;
      entity.renderPosition.y = before.position.y + (after.position.y - before.position.y) * clampedT;
      entity.renderPosition.z = before.position.z + (after.position.z - before.position.z) * clampedT;

      if (entity.renderRotation && entity.rotations.length >= 2) {
        let rBefore = entity.rotations[0];
        let rAfter = entity.rotations[entity.rotations.length - 1];

        for (let i = 0; i < entity.rotations.length - 1; i++) {
          const t1 = entity.rotations[i].time / 1000;
          const t2 = entity.rotations[i + 1].time / 1000;
          if (t1 <= targetTime && t2 >= targetTime) {
            rBefore = entity.rotations[i];
            rAfter = entity.rotations[i + 1];
            break;
          }
        }

        entity.renderRotation.x = rBefore.rotation.x + (rAfter.rotation.x - rBefore.rotation.x) * clampedT;
        entity.renderRotation.y = rBefore.rotation.y + (rAfter.rotation.y - rBefore.rotation.y) * clampedT;
      }
    }
  }

  getRenderState(id) {
    const entity = this.trackedEntities.get(id);
    if (!entity) return null;

    return {
      position: entity.renderPosition,
      rotation: entity.renderRotation,
      lastUpdate: entity.lastUpdate
    };
  }

  clear() {
    this.trackedEntities.clear();
  }
}
