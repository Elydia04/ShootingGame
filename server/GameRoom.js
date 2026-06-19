import { v4 as uuidv4 } from 'uuid';
import { MatchManager } from './MatchManager.js';

function aabbForBuilding(x, z, w, d, rot, h) {
  const hw = w / 2, hd = d / 2;
  const c = Math.abs(Math.cos(rot)), s = Math.abs(Math.sin(rot));
  const ex = hw * c + hd * s;
  const ez = hw * s + hd * c;
  return { minX: x - ex, maxX: x + ex, minZ: z - ez, maxZ: z + ez, height: h };
}

function aabbForBox(x, z, w, d, h) {
  return { minX: x - w / 2, maxX: x + w / 2, minZ: z - d / 2, maxZ: z + d / 2, height: h };
}

const WEAPON_FIRE_RATES = {
  Pistol: 0.25,
  Rifle: 0.1,
  SMG: 0.07,
  Shotgun: 0.8,
  Sniper: 1.2,
  Knife: 0.3,
};

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
    bounds: { size: 240, height: 8 },
    collidables: [
      // Buildings (rotated AABB)
      aabbForBuilding(-50, -40, 12, 10, 0.3, 4.5),
      aabbForBuilding(-55, 10, 12, 10, -0.8, 4.5),
      aabbForBuilding(-40, 60, 12, 10, 0.5, 4.5),
      aabbForBuilding(30, -35, 12, 10, 0, 9),
      aabbForBuilding(35, 55, 12, 10, Math.PI, 9),
      aabbForBuilding(75, 0, 10, 9, 0.2, 13.5),
      aabbForBuilding(-70, -75, 10, 8, 0.5, 4.5),
      // Walls
      aabbForBox(0, -30, 20, 1, 4),
      aabbForBox(-25, -10, 1, 20, 4),
      aabbForBox(10, 25, 20, 1, 4),
      aabbForBox(25, 10, 1, 20, 4),
      // Large objects
      aabbForBox(-10, -5, 2, 2, 4),
      aabbForBox(0, -8, 2, 2, 4),
      aabbForBox(10, -5, 2, 2, 4),
      aabbForBox(-5, 5, 2, 2, 4),
      aabbForBox(5, 5, 2, 2, 4),
      aabbForBox(0, 15, 4, 4, 2),
      aabbForBox(-14, 0, 3, 0.5, 1.5),
      aabbForBox(14, 0, 3, 0.5, 1.5),
    ]
  },
  forest_map: {
    id: 'forest_map',
    spawns: [
      { x: -10, y: 0, z: -10, type: 'player' },
      { x: -15, y: 0, z: -15, type: 'player' },
      { x: 10, y: 0, z: 10, type: 'player' },
      { x: 15, y: 0, z: 15, type: 'player' },
      { x: -5, y: 0, z: -5, type: 'player' },
      { x: 5, y: 0, z: 5, type: 'player' },
    ],
    bounds: { size: 200, height: 8 },
    collidables: [
      aabbForBox(-5, -8, 3, 3, 2.5),
      aabbForBox(10, 12, 2, 2, 1.5),
      aabbForBox(-15, 18, 4, 4, 3),
      aabbForBox(8, -15, 1.5, 1.5, 1),
      aabbForBox(-10, -3, 8, 1, 3),
      aabbForBox(10, 5, 1, 8, 3),
      aabbForBox(-3, 12, 6, 1, 2.5),
    ]
  },
  city_map: {
    id: 'city_map',
    spawns: [
      { x: -25, y: 0, z: -25, type: 'player' },
      { x: -22, y: 0, z: -22, type: 'player' },
      { x: 25, y: 0, z: 25, type: 'player' },
      { x: 22, y: 0, z: 22, type: 'player' },
      { x: -10, y: 0, z: -10, type: 'player' },
      { x: 10, y: 0, z: 10, type: 'player' },
    ],
    bounds: { size: 200, height: 20 },
    collidables: [
      aabbForBox(-20, -20, 8, 8, 12),
      aabbForBox(20, -15, 6, 6, 8),
      aabbForBox(-15, 20, 10, 10, 16),
      aabbForBox(18, 18, 7, 7, 10),
      aabbForBox(-15, 0, 30, 1, 4),
      aabbForBox(15, 0, 1, 30, 4),
      aabbForBox(5, -12, 20, 1, 3),
      aabbForBox(-5, 12, 1, 20, 3),
    ]
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
    this.spawnIndices = { CT: 0, T: 0 };

    this.matchManager.on('start', () => {
      this.state = 'playing';
      this._broadcast({ type: 'game_started', data: { mapId: this.mapId, config: this.getConfig() } });
      this._broadcast({ type: 'score_update', data: { teamScores: this.matchManager._getTeamScores() } });
    });

    this.matchManager.on('countdown', (data) => {
      this._broadcast({ type: 'countdown', data });
    });

    this.matchManager.on('kill', (data) => {
      data.respawnTime = this.matchManager.config.respawnTime;
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
      if (!MAPS[config.map]) {
        console.warn(`[GameRoom] Unknown map "${config.map}", falling back to training_map`);
      }
      this.mapId = MAPS[config.map] ? config.map : 'training_map';
      this.mapData = MAPS[this.mapId];
    }
    const matchConfig = {};
    if (config.timeLimit != null) {
      matchConfig.timeLimit = Math.max(1, Math.min(60, config.timeLimit)) * 60;
    }
    if (config.scoreLimit != null) {
      matchConfig.scoreLimit = Math.max(1, Math.min(999, config.scoreLimit));
    }
    this.matchManager.configure(matchConfig);
    console.log(`[GameRoom] Configured: scoreLimit=${this.matchManager.config.scoreLimit}, timeLimit=${this.matchManager.config.timeLimit}s, map=${this.mapId}`);
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
      // Edge-trigger: prevents re-jump while Space is held.
      _jumpConsumed: false,
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
    if (this.state !== 'lobby' && this.state !== 'ended') return;

    if (this.state === 'ended') {
      this.matchManager.reset();
      this.spawnIndices = { CT: 0, T: 0 };
      for (const [, p] of this.players) {
        p.ready = false;
        p._lastFireTime = 0;
        p._lastInputTime = 0;
        p.alive = true;
        p.health = 100;
      }
      this._broadcast({ type: 'lobby_reset', data: { players: this.getPlayerList() } });
    }

    this.matchManager.start();
    this.state = 'countdown';
    this._broadcast({ type: 'countdown', data: { time: this.matchManager.countdown } });

    if (this._gameStartTimeout) clearTimeout(this._gameStartTimeout);
    this._gameStartTimeout = setTimeout(() => {
      this.lastTime = performance.now();
      this.gameLoop = setInterval(() => this._tick(), 1000 / 30);
    }, this.matchManager.config.countdownTime * 1000);
  }

  handleInput(playerId, inputData, clientTime) {
    const player = this.players.get(playerId);
    if (!player || !player.alive) return;
    const now = Date.now();
    if (player._lastInputTime && now - player._lastInputTime < 10) return;
    player._lastInputTime = now;
    if (inputData) {
      if (inputData.euler) {
        player.euler = { ...player.euler, ...inputData.euler };
      }
      if (inputData.weapon && WEAPON_FIRE_RATES[inputData.weapon]) {
        player.weapon = inputData.weapon;
      }
      player.inputs = { ...player.inputs, ...inputData };
      if (inputData.seq != null) {
        player.lastProcessedSeq = Math.max(player.lastProcessedSeq, inputData.seq);
      }
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

  _computeWish(inputs, yaw) {
    let wx = 0, wz = 0;
    if (inputs.forward) { wx -= Math.sin(yaw); wz -= Math.cos(yaw); }
    if (inputs.backward) { wx += Math.sin(yaw); wz += Math.cos(yaw); }
    if (inputs.left) { wx -= Math.cos(yaw); wz += Math.sin(yaw); }
    if (inputs.right) { wx += Math.cos(yaw); wz -= Math.sin(yaw); }
    const len = Math.sqrt(wx * wx + wz * wz);
    if (len > 0) { wx /= len; wz /= len; }
    return { x: wx, z: wz };
  }

  _applyServerMovement(player, dt) {
    const inputs = player.inputs;
    const sprint = inputs.sprint && inputs.forward && !inputs.backward && !inputs.crouch;
    const crouch = inputs.crouch;
    const maxSpeed = crouch ? 2.2 : (sprint ? 7.2 : 4.5);
    const accel = player.grounded ? 12.0 : 4.0;
    const friction = 10.0;
    const airControl = 0.3;

    const wish = this._computeWish(inputs, player.euler.y);
    const wishSpeed = Math.sqrt(wish.x * wish.x + wish.z * wish.z);

    if (wishSpeed > 0) {
      const addX = wish.x * maxSpeed;
      const addZ = wish.z * maxSpeed;
      let deltaX = addX - player.velocity.x;
      let deltaZ = addZ - player.velocity.z;
      const deltaLen = Math.sqrt(deltaX * deltaX + deltaZ * deltaZ);
      const maxDelta = accel * maxSpeed * dt;
      if (deltaLen > maxDelta) {
        const scale = maxDelta / deltaLen;
        deltaX *= scale;
        deltaZ *= scale;
      }
      player.velocity.x += deltaX;
      player.velocity.z += deltaZ;

      if (!player.grounded) {
        player.velocity.x *= (1 - airControl * dt);
        player.velocity.z *= (1 - airControl * dt);
      }
    } else if (player.grounded) {
      const spd = Math.sqrt(player.velocity.x * player.velocity.x + player.velocity.z * player.velocity.z);
      if (spd > 0) {
        const drop = friction * dt;
        const ratio = Math.max(0, spd - drop) / spd;
        player.velocity.x *= ratio;
        player.velocity.z *= ratio;
      }
    }
  }

  _resolveCollisions(pos, vel, radius, height) {
    const bottom = pos.y - height / 2;
    const top = pos.y + height / 2;
    const collidables = this.mapData.collidables || [];

    for (const box of collidables) {
      if (bottom > box.height || top < 0) continue;
      if (bottom >= box.height) continue;

      const cx = pos.x;
      const cz = pos.z;
      const cx2 = Math.max(box.minX, Math.min(cx, box.maxX));
      const cz2 = Math.max(box.minZ, Math.min(cz, box.maxZ));
      const dx = cx - cx2;
      const dz = cz - cz2;
      const d2 = dx * dx + dz * dz;

      if (d2 < radius * radius) {
        if (d2 > 0.0001) {
          const dist = Math.sqrt(d2);
          const overlap = radius - dist;
          const nx = dx / dist;
          const nz = dz / dist;
          pos.x += nx * overlap;
          pos.z += nz * overlap;
          if (vel) {
            const vDotN = vel.x * nx + vel.z * nz;
            if (vDotN < 0) {
              vel.x -= vDotN * nx;
              vel.z -= vDotN * nz;
            }
          }
        } else {
          // d2 ≈ 0 → player is inside the collidable.
          // Push out along the nearest axis instead of always +X.
          const dLeft = cx - box.minX;
          const dRight = box.maxX - cx;
          const dFront = cz - box.minZ;
          const dBack = box.maxZ - cz;
          const minX = Math.min(dLeft, dRight);
          const minZ = Math.min(dFront, dBack);
          if (minX <= minZ) {
            const nx = dLeft < dRight ? -1 : 1;
            pos.x += nx * (minX + radius);
            if (vel) vel.x = 0;
          } else {
            const nz = dFront < dBack ? -1 : 1;
            pos.z += nz * (minZ + radius);
            if (vel) vel.z = 0;
          }
        }
      }
    }
  }

  _processPlayerMovement(player, dt) {
    this._applyServerMovement(player, dt);
    const inputs = player.inputs;

    const gravity = -20;
    if (!player.grounded) {
      player.velocity.y += gravity * dt;
      if (player.velocity.y < -30) player.velocity.y = -30;
    }

    player.position.x += player.velocity.x * dt;
    player.position.z += player.velocity.z * dt;
    player.position.y += player.velocity.y * dt;

    this._resolveCollisions(player.position, player.velocity, 0.4, 1.8);

    const halfBounds = this.mapData.bounds.size / 2 - 1;
    player.position.x = Math.max(-halfBounds, Math.min(halfBounds, player.position.x));
    player.position.z = Math.max(-halfBounds, Math.min(halfBounds, player.position.z));

    const height = 1.8;

    if (inputs.crouch) {
      player.position.y = player.grounded ? 0.6 : player.position.y;
    } else {
      player.position.y = player.grounded ? 0.9 : player.position.y;
    }

    if (player.velocity.y <= 0 && player.position.y <= (inputs.crouch ? 0.6 : 0.9)) {
      player.position.y = inputs.crouch ? 0.6 : 0.9;
      player.velocity.y = 0;
      player.grounded = true;
    }

    // Edge-triggered jump: only on first press frame, not while held.
    if (inputs.jump && player.grounded && !player._jumpConsumed) {
      player.velocity.y = 8.0;
      player.grounded = false;
      player._jumpConsumed = true;
    } else if (!inputs.jump) {
      player._jumpConsumed = false;
    }
  }

  _processShooting(player, dt) {
    if (!player.inputs.shoot) return;

    const now = Date.now();
    const fireRate = WEAPON_FIRE_RATES[player.weapon] || 0.1;
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
    const raw = this._buildStateMessage();
    for (const [, player] of this.players) {
      if (player.ws.readyState === 1) {
        player.ws.send(raw);
      }
    }
  }

  _buildStateMessage() {
    const entities = {};
    for (const [id, player] of this.players) {
      const stats = this.matchManager.playerStats.get(id);
      entities[id] = {
        position: player.position,
        velocity: player.velocity,
        euler: player.euler,
        grounded: player.grounded,
        alive: player.alive,
        health: player.health,
        weapon: player.weapon,
        inputs: player.inputs,
        name: player.name,
        team: player.team,
        seq: player.lastProcessedSeq,
        kills: stats?.kills || 0,
        deaths: stats?.deaths || 0,
        score: stats?.score || 0
      };
    }
    return JSON.stringify({ type: 'state', data: { entities, worldTime: Date.now() } });
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
    if (spawns.length === 0) return { x: 0, y: 0.9, z: 0 };
    const idx = (this.spawnIndices[team] || 0) % spawns.length;
    this.spawnIndices[team] = idx + 1;
    let spawn = { ...spawns[idx] };
    if (team === 'CT') {
      spawn.x -= 8; spawn.z -= 8;
    } else if (team === 'T') {
      spawn.x += 8; spawn.z += 8;
    }
    const occupied = new Set();
    for (const [, p] of this.players) {
      if (p.alive) occupied.add(`${Math.round(p.position.x)},${Math.round(p.position.z)}`);
    }
    for (let attempt = 0; attempt < spawns.length * 2; attempt++) {
      const key = `${Math.round(spawn.x)},${Math.round(spawn.z)}`;
      if (!occupied.has(key)) return spawn;
      const fallback = (this.spawnIndices[team] + attempt) % spawns.length;
      spawn = { ...spawns[fallback] };
      if (team === 'CT') { spawn.x -= 8; spawn.z -= 8; }
      else if (team === 'T') { spawn.x += 8; spawn.z += 8; }
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

  handleChat(senderId, message) {
    const sender = this.players.get(senderId);
    if (!sender || !message) return;
    const chatMsg = JSON.stringify({
      type: 'chat',
      data: { name: sender.name, message, team: sender.team }
    });
    for (const [id, player] of this.players) {
      if (id !== senderId && player.ws.readyState === 1) {
        player.ws.send(chatMsg);
      }
    }
  }

  getPlayerList() {
    return Array.from(this.players.values()).map(p => ({
      id: p.id, name: p.name, team: p.team, ready: p.ready, isHost: p.id === this.hostId
    }));
  }
}
