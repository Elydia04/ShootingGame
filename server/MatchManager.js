export class MatchManager {
  constructor() {
    this.state = 'waiting';
    this.config = {
      type: 'deathmatch',
      scoreLimit: 50,
      timeLimit: 600,
      teamMode: false,
      teams: ['red', 'blue'],
      maxPlayers: 16,
      respawnTime: 3,
      countdownTime: 5
    };
    this.teamScores = new Map();
    this.playerStats = new Map();
    this.matchTime = 0;
    this.countdown = 0;
    this.listeners = new Map();
  }

  configure(config) {
    Object.assign(this.config, config);
  }

  start() {
    if (this.state !== 'waiting') return;
    this.countdown = this.config.countdownTime;
    this.state = 'countdown';
    this.matchTime = 0;

    this._emit('countdown', { time: this.countdown });

    this._countdownInterval = setInterval(() => {
      this.countdown--;
      this._emit('countdown', { time: this.countdown });
      if (this.countdown <= 0) {
        clearInterval(this._countdownInterval);
        this.countdown = 0;
        this.state = 'in_progress';
        this._emit('start');
      }
    }, 1000);
  }

  update(dt) {
    if (this.state !== 'in_progress') return;
    this.matchTime += dt;
    if (this.matchTime >= this.config.timeLimit) {
      this.end({ winner: this._getHighestScorer(), reason: 'Time limit reached' });
    }
  }

  registerPlayer(id, name, team = null) {
    this.playerStats.set(id, { id, name, team, score: 0, kills: 0, deaths: 0, assists: 0, damage: 0, streak: 0 });
  }

  removePlayer(id) {
    this.playerStats.delete(id);
  }

  registerKill(killerId, victimId, weapon = 'unknown') {
    const killer = this.playerStats.get(killerId);
    const victim = this.playerStats.get(victimId);
    if (!killer || !victim) return;
    killer.kills++;
    killer.score += 1;
    killer.streak++;
    victim.deaths++;
    victim.streak = 0;

    this._emit('kill', { killer: killerId, killerName: killer.name, killerTeam: killer.team, victim: victimId, victimName: victim.name, victimTeam: victim.team, weapon });

    this._emit('score_update', { teamScores: this._getTeamScores() });

    console.log(`[MatchManager] Kill: ${killer.name} → ${victim.name} (score=${killer.score}, limit=${this.config.scoreLimit})`);

    if (killer.score >= this.config.scoreLimit) {
      this.end({ winner: killerId, reason: 'Score limit reached' });
    }
  }

  registerDamage(attackerId, targetId, damage) {
    const attacker = this.playerStats.get(attackerId);
    if (attacker) attacker.damage += damage;
  }

  end(result) {
    this.state = 'ended';
    this._emit('end', { winner: result.winner, reason: result.reason, stats: this.getMatchStats(), duration: this.matchTime });
  }

  getMatchStats() {
    return { players: Array.from(this.playerStats.values()).sort((a, b) => b.score - a.score), duration: this.matchTime };
  }

  _getTeamScores() {
    let ct = 0, t = 0;
    for (const [, p] of this.playerStats) {
      if (p.team === 'CT') ct += p.score;
      else if (p.team === 'T') t += p.score;
    }
    return { CT: ct, T: t };
  }

  on(event, callback) {
    if (!this.listeners.has(event)) this.listeners.set(event, []);
    this.listeners.get(event).push(callback);
  }

  _emit(event, data) {
    const arr = this.listeners.get(event);
    if (arr) for (const cb of arr) cb(data);
  }

  reset() {
    if (this._countdownInterval) {
      clearInterval(this._countdownInterval);
      this._countdownInterval = null;
    }
    this.state = 'waiting';
    this.matchTime = 0;
    this.countdown = 0;
    this.playerStats.clear();
    this.teamScores.clear();
  }
}
