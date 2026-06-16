export const MatchState = Object.freeze({
  WAITING: 'waiting',
  COUNTDOWN: 'countdown',
  IN_PROGRESS: 'in_progress',
  PAUSED: 'paused',
  ENDED: 'ended'
});

export const WinCondition = Object.freeze({
  SCORE_LIMIT: 'score_limit',
  TIME_LIMIT: 'time_limit',
  LAST_MAN_STANDING: 'last_man_standing',
  CAPTURE_FLAG: 'capture_flag'
});

export class MatchManager {
  constructor() {
    this.state = MatchState.WAITING;
    this.config = {
      type: 'deathmatch',
      winCondition: WinCondition.SCORE_LIMIT,
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
    this.started = false;

    this.listeners = new Map();
  }

  configure(config) {
    Object.assign(this.config, config);
  }

  start() {
    if (this.state !== MatchState.WAITING) return;

    this.countdown = this.config.countdownTime;
    this.state = MatchState.COUNTDOWN;
    this.matchTime = 0;
    this.teamScores.clear();

    if (this.config.teamMode) {
      for (const team of this.config.teams) {
        this.teamScores.set(team, 0);
      }
    }

    console.log(`[MatchManager] Countdown started: ${this.countdown}s`);
    this._emit('countdown', { time: this.countdown });
  }

  update(deltaTime) {
    const dt = Math.min(deltaTime, 0.05);

    switch (this.state) {
      case MatchState.COUNTDOWN:
        this.countdown -= dt;
        if (this.countdown <= 0) {
          this.countdown = 0;
          this.state = MatchState.IN_PROGRESS;
          this.started = true;
          console.log('[MatchManager] Match started!');
          this._emit('start');
        }
        break;

      case MatchState.IN_PROGRESS:
        this.matchTime += dt;
        this._checkWinCondition();
        break;
    }
  }

  _checkWinCondition() {
    const { winCondition, scoreLimit, timeLimit } = this.config;

    if (winCondition === WinCondition.SCORE_LIMIT) {
      if (this.config.teamMode) {
        for (const [team, score] of this.teamScores) {
          if (score >= scoreLimit) {
            this.end({ winner: team, reason: 'Score limit reached' });
            return;
          }
        }
      } else {
        for (const [, stats] of this.playerStats) {
          if (stats.score >= scoreLimit) {
            this.end({ winner: stats.id, reason: 'Score limit reached' });
            return;
          }
        }
      }
    }

    if (winCondition === WinCondition.TIME_LIMIT) {
      if (this.matchTime >= timeLimit) {
        this.end({ winner: this._getHighestScorer(), reason: 'Time limit reached' });
      }
    }
  }

  _getHighestScorer() {
    let highest = null;
    let maxScore = -1;

    for (const [id, stats] of this.playerStats) {
      if (stats.score > maxScore) {
        maxScore = stats.score;
        highest = id;
      }
    }

    return highest;
  }

  registerPlayer(id, name, team = null) {
    this.playerStats.set(id, {
      id,
      name,
      team,
      score: 0,
      kills: 0,
      deaths: 0,
      assists: 0,
      damage: 0,
      streak: 0
    });
  }

  removePlayer(id) {
    this.playerStats.delete(id);
  }

  registerKill(killerId, victimId, weapon = 'unknown', region = null) {
    const killer = this.playerStats.get(killerId);
    const victim = this.playerStats.get(victimId);

    if (!killer || !victim) return;

    killer.kills++;
    killer.score += 100;
    killer.streak++;
    victim.deaths++;
    victim.streak = 0;

    if (this.config.teamMode && killer.team) {
      const current = this.teamScores.get(killer.team) || 0;
      this.teamScores.set(killer.team, current + 1);
    }

    console.log(`[MatchManager] ${killer.name} killed ${victim.name}`);
    this._emit('kill', {
      killer: killerId,
      killerName: killer.name,
      victim: victimId,
      victimName: victim.name,
      weapon
    });
  }

  registerDamage(attackerId, targetId, damage) {
    const attacker = this.playerStats.get(attackerId);
    if (attacker) {
      attacker.damage += damage;
    }
  }

  end(result = {}) {
    this.state = MatchState.ENDED;
    this.started = false;

    console.log(`[MatchManager] Match ended. Winner: ${result.winner}`);
    this._emit('end', {
      winner: result.winner,
      reason: result.reason,
      stats: this.getMatchStats(),
      teamScores: this.config.teamMode ? Object.fromEntries(this.teamScores) : null,
      duration: this.matchTime
    });
  }

  getMatchStats() {
    const players = Array.from(this.playerStats.values());

    players.sort((a, b) => b.score - a.score);

    return {
      players,
      teamScores: this.config.teamMode ? Object.fromEntries(this.teamScores) : null,
      duration: this.matchTime
    };
  }

  getTeamScore(team) {
    return this.teamScores.get(team) || 0;
  }

  getPlayerStats(id) {
    return this.playerStats.get(id) || null;
  }

  getTimeRemaining() {
    if (this.state !== MatchState.IN_PROGRESS) return 0;
    return Math.max(0, this.config.timeLimit - this.matchTime);
  }

  getFormattedTime() {
    const total = Math.ceil(this.getTimeRemaining());
    const mins = Math.floor(total / 60);
    const secs = total % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);
    return () => {
      const arr = this.listeners.get(event);
      if (arr) {
        const idx = arr.indexOf(callback);
        if (idx !== -1) arr.splice(idx, 1);
      }
    };
  }

  _emit(event, data = null) {
    const arr = this.listeners.get(event);
    if (!arr) return;
    for (const cb of arr) cb(data);
  }

  reset() {
    this.state = MatchState.WAITING;
    this.matchTime = 0;
    this.countdown = 0;
    this.started = false;
    this.playerStats.clear();
    this.teamScores.clear();
  }
}
