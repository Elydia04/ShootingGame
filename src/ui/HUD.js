export class HUD {
  constructor(eventBus, scoreboardStore) {
    this.eventBus = eventBus;
    this.scoreboardStore = scoreboardStore;
    this.elements = this._cacheElements();
    this.vignetteTimer = null;
    this.hitMarkerTimer = null;
    this.killFeedEntries = [];
    this.damageIndicatorTimeout = null;
    this.slowIndicatorTimeout = null;

    this.damageTrack = null;

    this.crosshairBase = 4;
    this.crosshairSpread = 0;

    this._setupListeners();
  }

  _cacheElements() {
    return {
      container: document.getElementById('game-hud'),
      crosshair: document.getElementById('crosshair'),
      healthFill: document.getElementById('health-fill'),
      healthText: document.getElementById('health-text'),
      ammoCurrent: document.getElementById('ammo-current'),
      ammoReserve: document.getElementById('ammo-reserve'),
      weaponName: document.getElementById('weapon-name'),
      matchTimer: document.getElementById('match-timer'),
      scoreDisplay: document.getElementById('score-display'),
      vignette: document.getElementById('damage-vignette'),
      killFeed: document.getElementById('kill-feed'),
      damageIndicator: document.getElementById('damage-indicator'),
      damageArrow: document.querySelector('#damage-indicator .damage-arrow'),
      slowIndicator: document.getElementById('slow-indicator'),
      viewToggle: document.getElementById('view-toggle'),
      hitMarker: document.getElementById('hit-marker'),
      crosshairTop: document.querySelector('#crosshair .crosshair-line.top'),
      crosshairBottom: document.querySelector('#crosshair .crosshair-line.bottom'),
      crosshairLeft: document.querySelector('#crosshair .crosshair-line.left'),
      crosshairRight: document.querySelector('#crosshair .crosshair-line.right'),
      deathScreen: document.getElementById('death-screen'),
      deathInfo: document.getElementById('death-info'),
      deathRespawnTimer: document.getElementById('death-respawn-timer'),
      chatOverlay: document.getElementById('chat-overlay'),
      chatMessages: document.getElementById('chat-messages'),
      chatInput: document.getElementById('chat-input')
    };
  }

  _setupListeners() {
    if (!this.eventBus) return;

    this.eventBus.on('player:damage', (data) => {
      this.showDamageVignette();
      if (data.attackerPos) {
        this.showDamageDirection(data.attackerPos);
      }
      if (data.region === 'leg') {
        this.showSlowIndicator();
      }
    });

    this.eventBus.on('player:kill', (data) => {
      this.addKillFeedEntry(data);
    });

    this.eventBus.on('match:score', (data) => {
      this.updateScore(data);
    });

    this.eventBus.on('match:timer', (data) => {
      this.updateTimer(data.time);
    });
  }

  show() {
    if (this.elements.container) {
      this.elements.container.classList.remove('hidden');
    }
  }

  hide() {
    if (this.elements.container) {
      this.elements.container.classList.add('hidden');
    }
  }

  updateHealth(health, maxHealth = 100) {
    if (!this.elements.healthFill) return;

    const pct = Math.max(0, Math.min(100, (health / maxHealth) * 100));
    this.elements.healthFill.style.width = `${pct}%`;

    if (this.elements.healthText) {
      this.elements.healthText.textContent = Math.ceil(health);
    }

    if (pct <= 25) {
      this.elements.healthFill.style.background = 'linear-gradient(90deg, #e74c3c, #c0392b)';
    } else if (pct <= 50) {
      this.elements.healthFill.style.background = 'linear-gradient(90deg, #e74c3c, #f39c12)';
    } else {
      this.elements.healthFill.style.background = 'linear-gradient(90deg, #e74c3c, #2ecc71)';
    }
  }

  updateAmmo(current, reserve) {
    const separator = document.querySelector('#ammo-display .ammo-separator');
    if (current <= 0 && reserve <= 0) {
      if (this.elements.ammoCurrent) {
        this.elements.ammoCurrent.textContent = 'No Ammo';
        this.elements.ammoCurrent.style.color = '#ff2222';
      }
      if (this.elements.ammoReserve) this.elements.ammoReserve.style.display = 'none';
      if (separator) separator.style.display = 'none';
    } else {
      if (this.elements.ammoCurrent) {
        this.elements.ammoCurrent.textContent = current;
        this.elements.ammoCurrent.style.color = '';
      }
      if (this.elements.ammoReserve) {
        this.elements.ammoReserve.textContent = reserve;
        this.elements.ammoReserve.style.display = '';
      }
      if (separator) separator.style.display = '';
    }
  }

  updateWeapon(name) {
    if (this.elements.weaponName) {
      this.elements.weaponName.textContent = name;
    }
  }

  updateTimer(timeString) {
    if (this.elements.matchTimer) {
      this.elements.matchTimer.textContent = timeString;
    }
  }

  updateScore(score) {
    if (!this.elements.scoreDisplay) return;

    if (typeof score === 'object') {
      this.elements.scoreDisplay.textContent = `${score.team1 || 0} - ${score.team2 || 0}`;
    } else {
      this.elements.scoreDisplay.textContent = score;
    }
  }

  showDamageVignette() {
    if (!this.elements.vignette) return;

    this.elements.vignette.classList.remove('hidden');

    if (this.vignetteTimer) {
      clearTimeout(this.vignetteTimer);
    }

    this.vignetteTimer = setTimeout(() => {
      if (this.elements.vignette) {
        this.elements.vignette.classList.add('hidden');
      }
    }, 400);
  }

  setTeam(team) {
    this._team = team;
    const el = document.getElementById('team-display');
    if (el) {
      el.textContent = team;
      el.className = 'hud-team team-' + (team || 'ct').toLowerCase();
    }
  }

  showHitMarker(damage) {
    if (!this.elements.hitMarker) return;

    this.elements.hitMarker.classList.remove('hidden');

    if (this.hitMarkerTimer) {
      clearTimeout(this.hitMarkerTimer);
    }

    this.hitMarkerTimer = setTimeout(() => {
      if (this.elements.hitMarker) {
        this.elements.hitMarker.classList.add('hidden');
      }
    }, 150);
  }

  addKillFeedEntry(data) {
    if (!this.elements.killFeed) return;

    const killerTeam = data.killerTeam || '';
    const victimTeam = data.victimTeam || '';
    const isHeadshot = data.region === 'head';
    const entry = document.createElement('div');
    entry.className = 'kill-entry' + (isHeadshot ? ' headshot' : '');
    entry.innerHTML = `
      <span class="killer${killerTeam ? ' team-' + killerTeam.toLowerCase() : ''}">${data.killerName || 'Player'}</span>
      <span class="weapon">${isHeadshot ? '&#9762; ' : ''}[${data.weapon || '?'}]</span>
      <span class="victim${victimTeam ? ' team-' + victimTeam.toLowerCase() : ''}">${data.victimName || 'Enemy'}</span>
    `;

    this.elements.killFeed.appendChild(entry);
    this.killFeedEntries.push(entry);

    while (this.killFeedEntries.length > 5) {
      const old = this.killFeedEntries.shift();
      if (old.parentNode) old.parentNode.removeChild(old);
    }

    setTimeout(() => {
      if (entry.parentNode) {
        entry.parentNode.removeChild(entry);
        const idx = this.killFeedEntries.indexOf(entry);
        if (idx !== -1) this.killFeedEntries.splice(idx, 1);
      }
    }, 5000);
  }

  showDamageDirection(attackerPos) {
    if (!this.elements.damageIndicator || !this.elements.damageArrow) return;

    this.damageTrack = {
      attackerPos: attackerPos.clone ? attackerPos.clone() : { x: attackerPos.x, y: attackerPos.y, z: attackerPos.z },
      hitTime: performance.now()
    };

    this.elements.damageIndicator.classList.add('visible');
  }

  updateDamageDirection(playerPos, forward) {
    if (!this.damageTrack || !this.elements.damageArrow) {
      if (this.elements.damageIndicator) this.elements.damageIndicator.classList.remove('visible');
      return;
    }

    const elapsed = (performance.now() - this.damageTrack.hitTime) / 1000;
    const duration = 3;

    if (elapsed >= duration) {
      this.damageTrack = null;
      this.elements.damageIndicator.classList.remove('visible');
      return;
    }

    const dx = this.damageTrack.attackerPos.x - playerPos.x;
    const dz = this.damageTrack.attackerPos.z - playerPos.z;
    const len = Math.sqrt(dx * dx + dz * dz);
    if (len < 0.001) return;

    const toAttacker = { x: dx / len, z: dz / len };
    const dot = forward.x * toAttacker.x + forward.z * toAttacker.z;
    const cross = forward.x * toAttacker.z - forward.z * toAttacker.x;
    const angle = Math.atan2(cross, dot) * (180 / Math.PI);

    this.elements.damageArrow.style.transform = `rotate(${angle}deg)`;

    const fade = Math.max(0, 1 - (elapsed / duration));
    this.elements.damageIndicator.style.opacity = fade;
  }

  updateCrosshair(spread) {
    this.crosshairSpread = spread;
    if (!this.elements.crosshairTop) return;
    const gap = this.crosshairBase + spread * 16;
    this.elements.crosshair.style.setProperty('--gap', `${gap}px`);
  }

  setCrosshairVisible(visible) {
    if (this.elements.crosshair) {
      this.elements.crosshair.style.display = visible ? '' : 'none';
    }
  }

  showSlowIndicator() {
    if (!this.elements.slowIndicator) return;

    this.elements.slowIndicator.classList.add('active');

    if (this.slowIndicatorTimeout) {
      clearTimeout(this.slowIndicatorTimeout);
    }
    this.slowIndicatorTimeout = setTimeout(() => {
      if (this.elements.slowIndicator) {
        this.elements.slowIndicator.classList.remove('active');
      }
    }, 2500);
  }

  setViewToggleCallback(callback) {
    if (this.elements.viewToggle) {
      this.elements.viewToggle.addEventListener('click', callback);
    }
  }

  updateViewToggleLabel(isFirstPerson) {
    if (this.elements.viewToggle) {
      this.elements.viewToggle.textContent = isFirstPerson ? '1P' : '3P';
    }
  }

  // --- Scoreboard (delegated to ScoreboardUI) ---
  showScoreboard(stats) {
    this.scoreboardStore.setPlayers(stats);
    this.scoreboardStore.setVisible(true);
  }

  hideScoreboard() {
    this.scoreboardStore.setVisible(false);
  }

  // --- Death Screen ---
  showDeathScreen(killerName, respawnTime) {
    if (!this.elements.deathInfo || !this.elements.deathScreen) return;
    this.elements.deathInfo.innerHTML = `Killed by <strong>${killerName || 'Unknown'}</strong>`;
    this.elements.deathScreen.classList.remove('hidden');
    if (this.elements.deathRespawnTimer) {
      this.elements.deathRespawnTimer.textContent = `Respawning in ${Math.ceil(respawnTime || 0)}...`;
    }
  }

  updateDeathRespawnTimer(time) {
    if (this.elements.deathRespawnTimer) {
      this.elements.deathRespawnTimer.textContent = `Respawning in ${Math.ceil(time)}...`;
    }
  }

  hideDeathScreen() {
    if (this.elements.deathScreen) {
      this.elements.deathScreen.classList.add('hidden');
    }
  }

  // --- Chat ---
  showChat() {
    if (!this.elements.chatOverlay) return;
    this.elements.chatOverlay.classList.add('active');
    if (this.elements.chatInput) {
      this.elements.chatInput.style.display = 'block';
      this.elements.chatInput.focus();
    }
  }

  hideChat() {
    if (!this.elements.chatOverlay) return;
    this.elements.chatOverlay.classList.remove('active');
    if (this.elements.chatInput) {
      this.elements.chatInput.style.display = 'none';
      this.elements.chatInput.value = '';
      this.elements.chatInput.blur();
    }
  }

  addChatMessage(name, text, team) {
    if (!this.elements.chatMessages) return;
    const msg = document.createElement('div');
    msg.className = 'chat-message';
    msg.innerHTML = `<span class="chat-name${team ? ' team-' + team.toLowerCase() : ''}">${name}: </span>${text}`;
    this.elements.chatMessages.appendChild(msg);
    this.elements.chatMessages.scrollTop = this.elements.chatMessages.scrollHeight;

    while (this.elements.chatMessages.children.length > 20) {
      this.elements.chatMessages.removeChild(this.elements.chatMessages.firstChild);
    }
  }

  // --- Damage Numbers ---
  showDamageNumber(screenPos, damage, isHeadshot) {
    const el = document.createElement('div');
    el.className = 'damage-number ' + (isHeadshot ? 'damage-headshot' : 'damage-hit');
    el.textContent = isHeadshot ? `✖${Math.round(damage)}` : Math.round(damage);
    el.style.left = screenPos.x + 'px';
    el.style.top = screenPos.y + 'px';
    const parent = document.getElementById('game-hud') || document.getElementById('app') || document.body;
    parent.appendChild(el);
    setTimeout(() => { if (el.parentNode) el.parentNode.removeChild(el); }, 800);
  }

  dispose() {
    this.hide();
    if (this.vignetteTimer) {
      clearTimeout(this.vignetteTimer);
    }
    if (this.hitMarkerTimer) {
      clearTimeout(this.hitMarkerTimer);
    }
    if (this.damageIndicatorTimeout) {
      clearTimeout(this.damageIndicatorTimeout);
    }
    if (this.slowIndicatorTimeout) {
      clearTimeout(this.slowIndicatorTimeout);
    }
  }
}
