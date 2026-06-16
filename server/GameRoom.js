import { v4 as uuidv4 } from 'uuid';
import { MatchManager } from './MatchManager.js';

const MAPS = {
  training_map: {
    id: 'training_map',
    spawns: [
      { x: -15, y: 0, z: -15, type: 'player' },
      { x: 15, y: 0, z: -15, type: 'player' },
      { x: -10, y: 0, z: -10, type: 'player' },
      { x: 10, y: 0, z: -10, type: 'player' },
      { x: 0, y: 0, z: -12, type: 'player' },
    ],
    bounds: { size: 240, height: 8 }
  }
};

export class GameRoom {
  constructor(code, mapId = 'training_map') {
    this.code = code;
    this.mapId = mapId;
    this.mapData = MAPS[mapId] || MAPS.training_map;
    this.players = new Map();
    this.hostId = null;
    this.state = 'lobby'; // lobby | countdown | playing | ended
    this.matchManager = new MatchManager();
    this.gameLoop = null;
    this.lastTime = 0;
    this.spawnIndex = 0;

    this.matchManager.on('start', () => {
      this.state = 'playing';
      this._broadcast({ type: 'game_started', data: { mapId: this.mapId, config: this.getConfig() } });
    });

    this.matchManager.on('kill', (data) => {
      this._broadcast({ type: 'kill', data });
      const victim = this.players.get(data.victim);
      if (victim) {
        setTimeout(() => this._respawnPlayer(data.victim), this.matchManager.config.respawnTime * 1000);
      }
    });

    this.matchManager.on('score_update', (data) => {
      this._broadcast({ type: 'score_update', data });
    });

    this.matchManager.on('end', (data) => {
      this.state = 'ended';
      this._broadcast({ type: 'match_end', data });
      if (this.gameLoop) {
        clearInterval(this.gameLoop);
        this.gameLoop = null;
      }
    });
  }

  configure(config) {
    if (config.map) {
      this.mapId = config.map;
      this.mapData = MAPS[config.map] || MAPS.training_map;
    }
    const matchConfig = {};
    if (config.timeLimit != null) matchConfig.timeLimit = config.timeLimit * 60;
    if (config.scoreLimit != null) matchConfig.scoreLimit = config.scoreLimit;
    this.matchManager.configure(matchConfig);
  }

  getConfig() {
    return {
      map: this.mapId,
      timeLimit: this.matchManager.config.timeLimit / 60,
      scoreLimit: this.matchManager.config.scoreLimit
    };
  }

  addPlayer(id, name, ws) {
    const teamSizes = { CT: 0, T: 0 };
    for (const [, p] of this.players) teamSizes[p.team]++;
    const team = teamSizes.CT <= teamSizes.T ? 'CT' : 'T';
    const spawn = this._getSpawn(team);
    const player = {
      id,
      name,
      ws,
      team,
      ready: false,
      position: { x: spawn.x, y: 0.9, z: spawn.z },
      velocity: { x: 0, y: 0, z: 0 },
      euler: { x: 0, y: 0 },
      grounded: true,
      alive: true,
      health: 100,
      weapon: 'Rifle',
      inputs: { forward: false, backward: false, left: false, right: false, jump: false, crouch: false, sprint: false, shoot: false, aim: false, reload: false },
      lastProcessedSeq: 0
    };
    this.players.set(id, player);
    if (!this.hostId) {
      this.hostId = id;
    }
    this.matchManager.registerPlayer(id, name, team);
    this._broadcast({ type: 'player_joined', data: { id, name, team, players: this.getPlayerList() } });
  }

  removePlayer(id) {
    this.players.delete(id);
    this.matchManager.removePlayer(id);
    if (this.hostId === id) {
      const remaining = Array.from(this.players.keys());
      this.hostId = remaining.length > 0 ? remaining[0] : null;
    }
    this._broadcast({ type: 'player_left', data: { id, players: this.getPlayerList() } });
  }

  setReady(id, ready) {
    const player = this.players.get(id);
    if (!player) return;
    player.ready = ready;
    this._broadcast({ type: 'player_ready', data: { id, ready, players: this.getPlayerList() } });
  }

  startGame() {
    if (this.state !== 'lobby') return;
    this.matchManager.start();
    this.state = 'countdown';
    this._broadcast({ type: 'countdown', data: { time: this.matchManager.countdown } });

    this.matchManager.on('countdown', (data) => {
      this._broadcast({ type: 'countdown', data });
    });

    setTimeout(() => {
      this.lastTime = performance.now();
      this.gameLoop = setInterval(() => this._tick(), 1000 / 30);
    }, this.matchManager.config.countdownTime * 1000);
  }

  handleInput(playerId, inputData, clientTime) {
    const player = this.players.get(playerId);
    if (!player || !player.alive) return;
    if (inputData) {
      if (inputData.euler) {
        player.euler = { ...player.euler, ...inputData.euler };
      }
      player.inputs = { ...player.inputs, ...inputData };
    }
  }

  _tick() {
    const now = performance.now();
    const dt = Math.min((now - this.lastTime) / 1000, 0.05);
    this.lastTime = now;

    this.matchManager.update(dt);

    for (const [, player] of this.players) {
      if (!player.alive) continue;
      this._processPlayerMovement(player, dt);
    }

    for (const [, player] of this.players) {
      if (!player.alive) continue;
      this._processShooting(player, dt);
    }

    this._broadcastState();
  }

  _processPlayerMovement(player, dt) {
    const inputs = player.inputs;
    const speed = inputs.sprint ? 7 : 5;
    const forward = inputs.forward ? 1 : inputs.backward ? -1 : 0;
    const strafe = inputs.right ? 1 : inputs.left ? -1 : 0;
    const yaw = player.euler.y;

    const moveX = (forward * Math.sin(yaw) + strafe * Math.cos(yaw)) * speed * dt;
    const moveZ = (forward * Math.cos(yaw) - strafe * Math.sin(yaw)) * speed * dt;

    player.position.x += moveX;
    player.position.z += moveZ;

    const halfBounds = this.mapData.bounds.size / 2 - 1;
    player.position.x = Math.max(-halfBounds, Math.min(halfBounds, player.position.x));
    player.position.z = Math.max(-halfBounds, Math.min(halfBounds, player.position.z));

    if (inputs.jump && player.grounded) {
      player.velocity.y = 6;
      player.grounded = false;
    }

    if (inputs.crouch) {
      player.position.y = 0.6;
    } else {
      player.position.y = player.grounded ? 0.9 : player.position.y;
    }

    const gravity = -20;
    if (!player.grounded) {
      player.velocity.y += gravity * dt;
      player.position.y += player.velocity.y * dt;
      if (player.position.y <= 0.9) {
        player.position.y = 0.9;
        player.velocity.y = 0;
        player.grounded = true;
      }
    }
  }

  _processShooting(player, dt) {
    if (!player.inputs.shoot) return;

    const now = Date.now();
    const fireRate = 0.1;
    if (player._lastFireTime && (now - player._lastFireTime) < fireRate * 1000) return;
    player._lastFireTime = now;

    this._broadcast({ type: 'shot', data: { playerId: player.id } });

    const origin = { x: player.position.x, y: player.position.y + 1.0, z: player.position.z };
    const dir = this._getShootDirection(player);

    let closestHit = null;
    let closestDist = Infinity;

    for (const [, target] of this.players) {
      if (target.id === player.id || !target.alive || target.team === player.team) continue;
      const hit = this._raycastPlayer(origin, dir, target, 300);
      if (hit && hit.distance < closestDist) {
        closestDist = hit.distance;
        closestHit = { ...hit, victimId: target.id };
      }
    }

    if (closestHit) {
      const damage = 20 * closestHit.multiplier;
      const victim = this.players.get(closestHit.victimId);
      if (victim) {
        victim.health -= damage;
        this.matchManager.registerDamage(player.id, victim.id, damage);
        this._broadcast({ type: 'hit', data: { shooterId: player.id, victimId: victim.id, damage, region: closestHit.region, point: closestHit.point } });

        if (victim.health <= 0) {
          victim.alive = false;
          this.matchManager.registerKill(player.id, victim.id, 'Rifle');
        }
      }
    }
  }

  _getShootDirection(player) {
    const yaw = player.euler.y;
    const pitch = player.euler.x;
    return {
      x: -Math.sin(yaw) * Math.cos(pitch),
      y: Math.sin(pitch),
      z: -Math.cos(yaw) * Math.cos(pitch)
    };
  }

  _raycastPlayer(origin, dir, target, maxDist) {
    const halfH = 0.9;
    const regions = [
      { name: 'head', center: { x: 0, y: 1.65, z: 0 }, radius: 0.2, mult: 2.5 },
      { name: 'body', center: { x: 0, y: 1.0, z: 0 }, half: { x: 0.25, y: 0.3, z: 0.15 }, mult: 1.0 },
      { name: 'leg', center: { x: 0, y: 0.35, z: 0 }, half: { x: 0.1, y: 0.2, z: 0.125 }, mult: 0.75 },
    ];

    for (const region of regions) {
      const cx = target.position.x + region.center.x;
      const cy = target.position.y + region.center.y;
      const cz = target.position.z + region.center.z;

      const dx = cx - origin.x;
      const dy = cy - origin.y;
      const dz = cz - origin.z;
      const dot = dx * dir.x + dy * dir.y + dz * dir.z;
      if (dot < 0 || dot > maxDist) continue;

      if (region.radius) {
        const closest = {
          x: origin.x + dir.x * dot,
          y: origin.y + dir.y * dot,
          z: origin.z + dir.z * dot
        };
        const dist2 = (closest.x - cx) ** 2 + (closest.y - cy) ** 2 + (closest.z - cz) ** 2;
        if (dist2 > region.radius ** 2) continue;
        return { region: region.name, distance: dot, multiplier: region.mult, point: closest };
      } else {
        const t = this._rayAABB(origin, dir, { x: cx - region.half.x, y: cy - region.half.y, z: cz - region.half.z }, { x: cx + region.half.x, y: cy + region.half.y, z: cz + region.half.z });
        if (t !== null && t <= maxDist) {
          return {
            region: region.name, distance: t, multiplier: region.mult,
            point: { x: origin.x + dir.x * t, y: origin.y + dir.y * t, z: origin.z + dir.z * t }
          };
        }
      }
    }
    return null;
  }

  _rayAABB(origin, dir, min, max) {
    let tmin = -Infinity, tmax = Infinity;
    for (const axis of ['x', 'y', 'z']) {
      if (Math.abs(dir[axis]) < 1e-8) {
        if (origin[axis] < min[axis] || origin[axis] > max[axis]) return null;
      } else {
        let t1 = (min[axis] - origin[axis]) / dir[axis];
        let t2 = (max[axis] - origin[axis]) / dir[axis];
        if (t1 > t2) [t1, t2] = [t2, t1];
        tmin = Math.max(tmin, t1);
        tmax = Math.min(tmax, t2);
        if (tmin > tmax) return null;
      }
    }
    return tmin >= 0 ? tmin : tmax >= 0 ? tmax : null;
  }

  _broadcastState() {
    const entities = {};
    for (const [id, player] of this.players) {
      entities[id] = {
        position: player.position,
        velocity: player.velocity,
        euler: player.euler,
        grounded: player.grounded,
        alive: player.alive,
        health: player.health,
        weapon: player.weapon,
        inputs: player.inputs,
        team: player.team
      };
    }
    const msg = { type: 'state', data: { entities, worldTime: Date.now() } };
    for (const [, player] of this.players) {
      if (player.ws.readyState === 1) {
        player.ws.send(JSON.stringify({ ...msg, data: { ...msg.data, entities: { ...entities } } }));
      }
    }
  }

  _broadcast(message) {
    const raw = JSON.stringify(message);
    for (const [, player] of this.players) {
      if (player.ws.readyState === 1) {
        player.ws.send(raw);
      }
    }
  }

  _getSpawn(team) {
    const spawns = this.mapData.spawns.filter(s => s.type === 'player');
    let spawn = spawns[this.spawnIndex % spawns.length];
    this.spawnIndex++;
    if (team === 'CT') {
      spawn = { ...spawn, x: spawn.x - 8, z: spawn.z - 8 };
    } else if (team === 'T') {
      spawn = { ...spawn, x: spawn.x + 8, z: spawn.z + 8 };
    }
    return spawn;
  }

  _respawnPlayer(id) {
    const player = this.players.get(id);
    if (!player) return;
    const spawn = this._getSpawn(player.team);
    player.position = { x: spawn.x, y: 0.9, z: spawn.z };
    player.velocity = { x: 0, y: 0, z: 0 };
    player.health = 100;
    player.alive = true;
    this._broadcast({ type: 'respawn', data: { id, position: player.position } });
  }

  getPlayerList() {
    return Array.from(this.players.values()).map(p => ({
      id: p.id, name: p.name, team: p.team, ready: p.ready, isHost: p.id === this.hostId
    }));
  }
}
