export class SpawnPoint {
  constructor(x, y, z, type = 'player', team = null) {
    this.position = { x, y, z };
    this.type = type;
    this.team = team;
    this.occupied = false;
    this.cooldown = 0;
  }

  isAvailable(occupiedPositions, minDistance = 3) {
    if (this.occupied || this.cooldown > 0) return false;
    for (const pos of occupiedPositions) {
      const dx = this.position.x - pos.x;
      const dz = this.position.z - pos.z;
      const dist = Math.sqrt(dx * dx + dz * dz);
      if (dist < minDistance) return false;
    }
    return true;
  }
}

export class SpawnManager {
  constructor() {
    this.spawnPoints = [];
    this.respawnDelays = new Map();
    this.defaultRespawnDelay = 3000;
    this.minSpawnDistance = 3;
    this.checkRadius = 2;
  }

  loadFromMap(mapData) {
    this.spawnPoints = [];

    if (mapData.spawns) {
      for (const s of mapData.spawns) {
        const point = new SpawnPoint(s.x, s.y, s.z, s.type || 'player', s.team || null);
        this.spawnPoints.push(point);
      }
    }

    console.log(`[SpawnManager] Loaded ${this.spawnPoints.length} spawn points`);
  }

  addSpawnPoint(x, y, z, type = 'player', team = null) {
    const point = new SpawnPoint(x, y, z, type, team);
    this.spawnPoints.push(point);
    return point;
  }

  getSpawn(type = 'player', team = null, excludePositions = []) {
    let candidates = this.spawnPoints.filter(s =>
      s.type === type &&
      (team === null || s.team === null || s.team === team) &&
      s.isAvailable(excludePositions, this.minSpawnDistance)
    );

    if (candidates.length === 0) {
      candidates = this.spawnPoints.filter(s =>
        s.type === type &&
        (team === null || s.team === null || s.team === team)
      );
    }

    if (candidates.length === 0) return null;

    const idx = Math.floor(Math.random() * candidates.length);
    const spawn = candidates[idx];
    spawn.occupied = true;
    return spawn;
  }

  requestRespawn(entityId, delay = null) {
    const respawnDelay = delay !== null ? delay : this.defaultRespawnDelay;
    this.respawnDelays.set(entityId, {
      remaining: respawnDelay,
      total: respawnDelay
    });
  }

  update(deltaTime) {
    for (const [id, data] of this.respawnDelays) {
      data.remaining -= deltaTime * 1000;
      if (data.remaining <= 0) {
        this.respawnDelays.delete(id);
        this._onRespawnComplete(id);
      }
    }
  }

  _onRespawnComplete(entityId) {
    console.log(`[SpawnManager] Respawn ready for ${entityId}`);
  }

  onRespawnReady(callback) {
    this._onRespawnReady = callback;
  }

  freeSpawn(spawnPoint) {
    spawnPoint.occupied = false;
    spawnPoint.cooldown = 0;
  }

  getAvailableSpawnCount(type = 'player', team = null) {
    return this.spawnPoints.filter(s =>
      s.type === type &&
      (team === null || s.team === null || s.team === team) &&
      !s.occupied
    ).length;
  }
}
