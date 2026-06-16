import * as THREE from 'three';
import { GameStateManager, States } from './core/GameStateManager.js';
import { SaveManager } from './core/SaveManager.js';
import { SettingsManager } from './core/SettingsManager.js';
import { DebugTools } from './core/DebugTools.js';
import { EventBus } from './core/EventBus.js';
import { PlayerController } from './player/PlayerController.js';
import { FirstPersonWeapon } from './player/FirstPersonWeapon.js';
import { CameraSystem, CameraView } from './player/CameraSystem.js';
import { ThirdPersonCharacter } from './player/ThirdPersonCharacter.js';
import { Hitbox } from './player/Hitbox.js';
import { AssetManager } from './assets/AssetManager.js';
import { SpawnManager } from './systems/SpawnManager.js';
import { MapManager } from './systems/MapManager.js';
import { AudioManager } from './systems/AudioManager.js';
import { AnimationManager } from './systems/AnimationManager.js';
import { BulletPool } from './systems/BulletPool.js';
import { MatchManager, MatchState } from './systems/MatchManager.js';
import { WeaponManager, WeaponType } from './systems/WeaponManager.js';
import { BotController } from './systems/BotController.js';
import { NetworkManager } from './network/NetworkManager.js';
import { InterpolationManager } from './network/InterpolationManager.js';
import { UIManager } from './ui/UIManager.js';
import { HUD } from './ui/HUD.js';
import { SettingsMenu } from './ui/SettingsMenu.js';
import { forestMap } from '../maps/forest_map/index.js';
import { cityMap } from '../maps/city_map/index.js';
import { trainingMap } from '../maps/training_map/index.js';

class Game {
  constructor() {
    this.initialized = false;
    this.running = false;
    this.lastTime = 0;
    this.accumulator = 0;
    this.fixedDT = 1 / 60;

    this.core = {};
    this.systems = {};
    this.player = {};
    this.ui = {};
    this.network = {};

    this.bots = [];
    this.gameMode = 'solo';
    this.playerHealth = 100;
    this.playerMaxHealth = 100;
    this.playerAlive = true;
    this.cameraView = CameraView.FIRST_PERSON;
    this.impactParticles = [];
    this.footstepTimer = 0;
    this._respawnTimer = null;
    this._botRespawnTimers = [];
    this._errorCount = 0;
    this.paused = false;

    this._setupGlobalErrorHandler();
    this._setupPauseMenu();
  }

  _setupGlobalErrorHandler() {
    const overlay = document.createElement('div');
    overlay.id = 'error-overlay';
    overlay.style.cssText = 'display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.85);color:#ff4444;font-family:monospace;font-size:14px;padding:20px;z-index:9999;overflow:auto;white-space:pre-wrap;pointer-events:none';
    document.body.appendChild(overlay);

    const showError = (msg, source, line, col, err) => {
      this._errorCount++;
      if (this._errorCount > 20) return;
      overlay.textContent += `[${new Date().toLocaleTimeString()}] ${msg}\n  at ${source || '?'}:${line || '?'}:${col || '?'}\n${err?.stack || ''}\n\n`;
      overlay.style.display = 'block';
      console.error(`[Game Crashed]`, msg, source, line, col, err);
    };

    window.addEventListener('error', (e) => {
      e.preventDefault();
      showError(e.message, e.filename, e.lineno, e.colno, e.error);
    });

    window.addEventListener('unhandledrejection', (e) => {
      e.preventDefault();
      const err = e.reason;
      showError(err?.message || String(err), '', '', '', err instanceof Error ? err : null);
    });
  }

  _setupPauseMenu() {
    this._pauseOverlay = document.createElement('div');
    this._pauseOverlay.id = 'pause-menu';
    this._pauseOverlay.style.cssText = 'display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.6);z-index:9997;flex-direction:column;align-items:center;justify-content:center;font-family:sans-serif';
    this._pauseOverlay.innerHTML = `
      <h2 style="color:#fff;font-size:48px;margin-bottom:50px;text-shadow:0 2px 10px rgba(0,0,0,0.5)">PAUSED</h2>
      <button id="pause-continue" style="display:block;width:260px;padding:14px 0;margin:8px;font-size:20px;background:rgba(255,255,255,0.15);color:#fff;border:1px solid rgba(255,255,255,0.3);border-radius:6px;cursor:pointer">Continue</button>
      <button id="pause-settings" style="display:block;width:260px;padding:14px 0;margin:8px;font-size:20px;background:rgba(255,255,255,0.15);color:#fff;border:1px solid rgba(255,255,255,0.3);border-radius:6px;cursor:pointer">Settings</button>
      <button id="pause-quit" style="display:block;width:260px;padding:14px 0;margin:8px;font-size:20px;background:rgba(255,255,255,0.15);color:#ff6666;border:1px solid rgba(255,100,100,0.3);border-radius:6px;cursor:pointer">Quit Game</button>
    `;
    document.body.appendChild(this._pauseOverlay);

    document.getElementById('pause-continue').addEventListener('click', () => this._resumeGame());
    document.getElementById('pause-settings').addEventListener('click', () => {
      this.ui.settingsMenu?.show();
    });
    document.getElementById('pause-quit').addEventListener('click', () => {
      this._resumeGame();
      this.core.gameStateManager.transitionTo(States.MAIN_MENU);
    });
  }

  _requestPointerLock() {
    try {
      this.renderer.domElement.requestPointerLock();
    } catch (e) {
      // Browser may reject if called too soon after exitPointerLock
    }
  }

  _resumeGame() {
    this._pauseOverlay.style.display = 'none';
    this.paused = false;
    if (this.core.gameStateManager.is(States.PLAYING)) {
      this._requestPointerLock();
    }
  }

  _pauseGame() {
    this.paused = true;
    document.exitPointerLock();
    document.getElementById('pause-continue')?.focus();
    this._pauseOverlay.style.display = 'flex';
  }

  async init() {
    console.log('[Game] Initializing...');

    this.core.eventBus = new EventBus();
    this.core.saveManager = new SaveManager();
    this.core.settingsManager = new SettingsManager(this.core.saveManager);
    this.core.gameStateManager = new GameStateManager();
    this.core.debugTools = new DebugTools();

    this._setupPointerLock();
    this._setupKeyboard();
    this._setupMouse();

    this._setupRenderer();

    this.ui.uiManager = new UIManager(
      this.core.gameStateManager,
      this.core.settingsManager,
      this.core.eventBus
    );

    this.systems.assetManager = new AssetManager(this.scene);
    this.systems.assetManager.onProgress = (loaded, total) => {
      const progress = total > 0 ? loaded / total : 0;
      this.ui.uiManager.updateLoadingProgress(progress);
    };

    this.systems.audioManager = new AudioManager(this.core.settingsManager);
    await this.systems.audioManager.init();

    this.systems.assetManager.loadModel('shotgun', '/models/Shotgun18F.glb');
    await this.systems.assetManager.loadAll();

    this.systems.mapManager = new MapManager(this.scene);
    this.systems.mapManager.registerMap('forest_map', forestMap);
    this.systems.mapManager.registerMap('city_map', cityMap);
    this.systems.mapManager.registerMap('training_map', trainingMap);

    this.systems.spawnManager = new SpawnManager();

    this.systems.animationManager = new AnimationManager();

    this.systems.bulletPool = new BulletPool(this.scene);
    this.systems.bulletPool.onHit((hit) => {
      this.core.eventBus.emit('bullet:hit', hit);
      this._showImpactEffect(hit.point, hit.normal, false);
      this.systems.audioManager.playAtPosition('hit', hit.point, 'HIT');
    });

    this.systems.matchManager = new MatchManager();

    this.systems.weaponManager = new WeaponManager();
    this.systems.weaponManager.addWeapon(WeaponType.RIFLE);
    this.systems.weaponManager.addWeapon(WeaponType.PISTOL);
    this.systems.weaponManager.addWeapon(WeaponType.SMG);

    this.player.camera = new THREE.PerspectiveCamera(
      this.core.settingsManager.get('graphics', 'fov'),
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.player.camera.position.set(0, 1.6, 0);
    this.scene.add(this.player.camera);

    this.player.controller = new PlayerController(
      this.player.camera,
      this.core.settingsManager
    );

    this.player.firstPersonWeapon = new FirstPersonWeapon(this.player.camera);
    this.player.thirdPersonCharacter = new ThirdPersonCharacter(this.scene);
    this.player.cameraSystem = new CameraSystem(
      this.player.camera,
      this.player.controller
    );

    this.player.hitbox = new Hitbox(this.player.controller, { scale: 1 });
    this.scene.add(this.player.hitbox.group);

    this.network.networkManager = new NetworkManager();
    this.network.interpolation = new InterpolationManager();

    this.ui.hud = new HUD(this.core.eventBus);
    this.ui.hud.hide();

    this.ui.settingsMenu = new SettingsMenu(this.core.settingsManager);

    this._setupStateListeners();
    this._setupDebugToggle();
    this._setupSettingsOpen();
    this._setupResize();

    this.clock = new THREE.Clock();

    this.initialized = true;
    console.log('[Game] Initialization complete');
  }

  _setupRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = this.core.settingsManager.get('graphics', 'shadows');
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.0;

    const container = document.getElementById('game-canvas-container');
    container.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x87ceeb);
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambient);
    const hemi = new THREE.HemisphereLight(0x87ceeb, 0x362d22, 0.4);
    this.scene.add(hemi);
  }

  _setupPointerLock() {
    document.addEventListener('click', (e) => {
      if (this.core.gameStateManager.is(States.PLAYING) && e.target === this.renderer.domElement) {
        this._requestPointerLock();
      }
    });

    document.addEventListener('pointerlockchange', () => {
      const locked = document.pointerLockElement === this.renderer.domElement;
      if (this.player.controller) {
        this.player.controller.isPointerLocked = locked;
      }
    });
  }

  _setupKeyboard() {
    this._keys = new Set();

    document.addEventListener('keydown', (e) => {
      if (e.code === 'AltLeft' || e.code === 'AltRight') e.preventDefault();
      this._keys.add(e.code);

      if (e.code === this.core.settingsManager.getKeybind('debug')) {
        this.core.debugTools.toggle();
        this.player.hitbox.setDebugMode(this.core.debugTools.enabled);
        this.bots.forEach(b => b.hitbox.setDebugMode(this.core.debugTools.enabled));
      }

      if (e.code === 'Escape') {
        if (this.paused) {
          this._resumeGame();
        } else if (this.core.gameStateManager.is(States.PLAYING)) {
          this._pauseGame();
        } else {
          document.exitPointerLock();
        }
      }

      if (e.code === 'AltLeft' || e.code === 'AltRight') {
        e.preventDefault();
        if (document.pointerLockElement === this.renderer.domElement) {
          document.exitPointerLock();
        } else if (this.core.gameStateManager.is(States.PLAYING)) {
          this._requestPointerLock();
        }
      }

      if (e.code === this.core.settingsManager.getKeybind('reload')) {
        if (this.systems.weaponManager) {
          this.systems.weaponManager.reload();
          const weapon = this.systems.weaponManager.getCurrentWeapon();
          this.player.firstPersonWeapon.playReload(weapon ? weapon.reloadTime : 2.0);
          this.systems.audioManager.play('reload', 'WEAPON');
        }
      }

      if (e.code === 'KeyV' && this.core.gameStateManager.is(States.PLAYING)) {
        const view = this.player.cameraSystem.toggleView();
        this.cameraView = view;
        this.ui.hud?.updateViewToggleLabel(view === CameraView.FIRST_PERSON);
        if (view === CameraView.THIRD_PERSON) {
          this.player.controller.cameraActive = false;
        } else {
          this.player.controller.cameraActive = true;
        }
      }

      const weaponKeys = [
        this.core.settingsManager.getKeybind('switchWeapon1'),
        this.core.settingsManager.getKeybind('switchWeapon2'),
        this.core.settingsManager.getKeybind('switchWeapon3')
      ];
      const idx = weaponKeys.indexOf(e.code);
      if (idx !== -1 && this.systems.weaponManager) {
        this.systems.weaponManager.switchTo(idx);
      }
    });

    document.addEventListener('keyup', (e) => {
      this._keys.delete(e.code);
    });

    document.addEventListener('blur', () => {
      this._keys.clear();
    });
  }

  _syncInputs() {
    if (!this.player.controller) return;
    const c = this.player.controller;
    const k = this._keys;
    c.inputs.forward = k.has('KeyW');
    c.inputs.backward = k.has('KeyS');
    c.inputs.left = k.has('KeyA');
    c.inputs.right = k.has('KeyD');
    c.inputs.jump = k.has('Space');
    c.inputs.sprint = k.has('ShiftLeft') || k.has('ShiftRight');
    c.inputs.crouch = k.has('ControlLeft') || k.has('ControlRight');
    c.inputs.reload = k.has('KeyR');
    c.inputs.shoot = k.has('Mouse0');
    c.inputs.aim = k.has('Mouse2');
  }

  _setupMouse() {
    document.addEventListener('mousemove', (e) => {
      if (this.player.controller) {
        this.player.controller.handleMouseMove(e);
      }
    });

    document.addEventListener('mousedown', (e) => {
      this._keys.add(`Mouse${e.button}`);

      if (e.button === 0 && this.core.gameStateManager.is(States.PLAYING) && this.playerAlive) {
        const weapon = this.systems.weaponManager?.getCurrentWeapon();
        if (weapon) {
          this._fireWeapon();
        }
      }
    });

    document.addEventListener('mouseup', (e) => {
      this._keys.delete(`Mouse${e.button}`);
    });
  }

  _fireWeapon() {
    const weapon = this.systems.weaponManager.getCurrentWeapon();
    if (!weapon) return;

    const now = performance.now() / 1000;
    const result = this.systems.weaponManager.fire(now);
    if (!result) return;

    const camera = this.player.camera;
    const direction = new THREE.Vector3(0, 0, -1);
    direction.applyQuaternion(camera.quaternion);

    const muzzlePos = this.player.cameraSystem.getMuzzleWorldPosition(
      this.player.firstPersonWeapon
    );

    const enemyHitboxes = this.bots
      .filter(b => b.alive)
      .map(b => b.hitbox);

    for (const shot of result.shots) {
      const spreadDir = direction.clone();
      spreadDir.x += shot.spreadX;
      spreadDir.y += shot.spreadY;
      spreadDir.normalize();

      const bullet = this.systems.bulletPool.fire(
        muzzlePos,
        spreadDir,
        shot.damage,
        300,
        'local'
      );

      if (bullet && enemyHitboxes.length > 0) {
        this.systems.bulletPool.testBulletHitboxes(bullet, enemyHitboxes, (hitData) => {
          const bot = hitData.hitbox.owner;
          if (bot && bot.alive) {
            const finalDamage = shot.damage * hitData.multiplier;
            bot.takeDamage(finalDamage, 'local');
            this.systems.matchManager.registerDamage('local', bot.id, finalDamage);

            if (!bot.alive) {
              this.systems.matchManager.registerKill('local', bot.id, weapon.name);
              this._respawnBot(bot);
            }

            this.ui.hud.showHitMarker(finalDamage);
            this.core.eventBus.emit('player:damage', { damage: finalDamage, region: hitData.region });
            this._showImpactEffect(hitData.point, new THREE.Vector3(0, 1, 0), true);
            this.systems.audioManager.playAtPosition('hit', bot.position, 'HIT');
          }
          bullet.alive = false;
          bullet.tracer.visible = false;
        });
      }
    }

    this.player.firstPersonWeapon.playShoot();
    this.systems.animationManager.playWeapon('shoot');

    const shotSound = weapon.type === 'Rifle' ? 'gunshot_rifle' :
                      weapon.type === 'Pistol' ? 'gunshot_pistol' :
                      weapon.type === 'SMG' ? 'gunshot_smg' :
                      weapon.type === 'Shotgun' ? 'gunshot_shotgun' : 'gunshot_rifle';
    this.systems.audioManager.play(shotSound, 'WEAPON');

    this.core.eventBus.emit('weapon:fired', {
      weapon: weapon.type,
      ammo: weapon.currentAmmo,
      reserve: weapon.reserveAmmo
    });
  }

  _fireBotWeapon(bot) {
    const direction = new THREE.Vector3()
      .subVectors(this.player.controller.position, bot.position)
      .normalize();

    this.systems.bulletPool.fire(
      bot.position.clone().add(new THREE.Vector3(0, 1.0, 0)),
      direction,
      10,
      250,
      bot.id
    );

    this.systems.animationManager.playWeapon('shoot');
    this.systems.audioManager.playAtPosition('gunshot_pistol', bot.position, 'WEAPON');
  }

  _respawnBot(bot) {
    const exclude = this.bots.filter(b => b.alive).map(b => b.position);
    const spawn = this.systems.spawnManager.getSpawn('player', null, exclude);
    if (spawn) {
      const timerId = setTimeout(() => {
        const idx = this._botRespawnTimers.indexOf(timerId);
        if (idx !== -1) this._botRespawnTimers.splice(idx, 1);
        if (bot.alive) return;
        bot.respawn(spawn.position.x, spawn.position.y, spawn.position.z);
      }, 2000);
      this._botRespawnTimers.push(timerId);
    }
  }

  _startSoloGame(config) {
    this.gameMode = 'solo';
    this.playerHealth = this.playerMaxHealth;
    this.playerAlive = true;

    this.systems.mapManager.loadMap(config.map);
    this.systems.spawnManager.loadFromMap(this.systems.mapManager.getMapData());

    const shotgunModel = this.systems.assetManager.getModel('shotgun');
    if (shotgunModel) {
      const modelClone = shotgunModel.scene.clone();
      modelClone.position.set(2, 1.2, 0);
      modelClone.scale.set(0.5, 0.5, 0.5);
      modelClone.rotation.x = -0.2;
      modelClone.rotation.y = 0.5;
      this.scene.add(modelClone);
    }

    const playerSpawn = this.systems.spawnManager.getSpawn('player', null, []);
    if (playerSpawn) {
      this.player.controller.teleport(playerSpawn.position.x, playerSpawn.position.y, playerSpawn.position.z);
    }

    this.systems.matchManager.configure({
      type: 'deathmatch',
      scoreLimit: 50,
      timeLimit: 600,
      teamMode: false,
      respawnTime: 2
    });

    if (this._matchEndUnsub) this._matchEndUnsub();
    this._matchEndUnsub = this.systems.matchManager.on('end', () => {
      this.core.gameStateManager.transitionTo(States.MATCH_END);
    });

    this.systems.matchManager.registerPlayer('local', 'Player');
    this.systems.matchManager.start();

    const initialWeapon = this.systems.weaponManager.getCurrentWeapon();
    if (initialWeapon) {
      this.player.firstPersonWeapon.switchModel(initialWeapon.type);
    }
    this.systems.weaponManager.onWeaponSwitch = (weapon) => {
      this.player.firstPersonWeapon.switchModel(weapon.type);
    };

    this._clearBots();
    this._spawnBots(config.difficulty, config.botCount);

    this.ui.hud.setViewToggleCallback(() => {
      const view = this.player.cameraSystem.toggleView();
      this.cameraView = view;
      this.ui.hud.updateViewToggleLabel(view === CameraView.FIRST_PERSON);
      if (view === CameraView.THIRD_PERSON) {
        this.player.controller.cameraActive = false;
      } else {
        this.player.controller.cameraActive = true;
      }
    });
    this.ui.hud.updateViewToggleLabel(true);
    this.ui.hud.show();
    this.core.debugTools.setState('Playing');
  }

  _spawnBots(difficulty, count) {
    for (let i = 0; i < count; i++) {
      const bot = new BotController(this.scene, difficulty);

      const exclude = this.bots.map(b => b.position).concat([this.player.controller.position]);
      const spawn = this.systems.spawnManager.getSpawn('player', null, exclude);
      if (spawn) {
        bot.spawnAt(spawn.position.x, spawn.position.y, spawn.position.z);
      }

      const points = this._generatePatrolPoints();
      bot.setPatrolPoints(points);

      this.bots.push(bot);
      this.systems.matchManager.registerPlayer(bot.id, bot.name);
    }
  }

  _generatePatrolPoints() {
    const points = [];
    const center = this.player.controller.position;
    for (let i = 0; i < 5; i++) {
      points.push({
        x: center.x + (Math.random() - 0.5) * 40,
        z: center.z + (Math.random() - 0.5) * 40
      });
    }
    return points;
  }

  _clearBots() {
    for (const bot of this.bots) {
      this.scene.remove(bot.group);
      bot.dispose();
    }
    this.bots = [];
  }

  _setupStateListeners() {
    this.core.gameStateManager.on(States.MAIN_MENU, () => {
      this._resumeGame();
      this.systems.audioManager?.stopAll();
      this.ui.hud?.hide();

      if (this._respawnTimer) {
        clearTimeout(this._respawnTimer);
        this._respawnTimer = null;
      }
      for (const id of this._botRespawnTimers) clearTimeout(id);
      this._botRespawnTimers = [];

      if (this.systems.mapManager.currentMap) {
        this.systems.mapManager.unloadMap();
      }
      this._clearBots();
      this.playerHealth = this.playerMaxHealth;
      this.playerAlive = true;
    });

    this.core.gameStateManager.on(States.PLAYING, (data) => {
      this.paused = false;
      this._pauseOverlay.style.display = 'none';

      if (data?.data?.mode === 'solo') {
        this._startSoloGame(data.data);
      }

      this._requestPointerLock();
    });

    this.core.gameStateManager.on(States.SPECTATING, () => {
      this.ui.hud?.show();
    });

    this.core.gameStateManager.on(States.MATCH_END, (data) => {
      this._resumeGame();
      document.exitPointerLock();
      this.ui.hud?.hide();

      const matchStats = this.systems.matchManager.getMatchStats();
      this.ui.uiManager.showMatchEnd(matchStats, this.gameMode);
      this.core.debugTools.setState('MatchEnd');
    });

    this.core.gameStateManager.onChange(({ from, to }) => {
      this.core.debugTools.setState(to);
    });
  }

  _setupDebugToggle() {
    this.core.debugTools.setState('Loading');
  }

  _setupSettingsOpen() {
    this.core.eventBus.on('ui:openSettings', () => {
      this.ui.settingsMenu.show();
    });
  }

  _setupResize() {
    window.addEventListener('resize', () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      this.player.camera.aspect = w / h;
      this.player.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
    });
  }

  _handleInput() {
    if (!this.core.gameStateManager.is(States.PLAYING) || !this.playerAlive) return;

    if (this.player.controller.inputs.shoot) {
      const now = performance.now() / 1000;
      const weapon = this.systems.weaponManager.getCurrentWeapon();
      if (weapon && weapon.automatic && weapon.canFire(now)) {
        this._fireWeapon();
      }
    }
  }

  _updateCoreSystems(deltaTime) {
    this.systems.spawnManager.update(deltaTime);
    this.systems.matchManager.update(deltaTime);
    this.systems.weaponManager.update(deltaTime);

    const mapObjects = this.systems.mapManager.objects.filter(o => o.userData?.isWall || o.userData?.isMapObject || o.userData?.isBoundary);
    this.systems.bulletPool.update(deltaTime, mapObjects);

    this.systems.animationManager.update(deltaTime);

    for (let i = this.impactParticles.length - 1; i >= 0; i--) {
      const p = this.impactParticles[i];
      p.life -= deltaTime;
      p.mesh.position.add(p.velocity.clone().multiplyScalar(deltaTime));
      p.mesh.material.opacity = Math.max(0, p.life / 0.8);
      if (p.life <= 0) {
        this.scene.remove(p.mesh);
        p.mesh.geometry.dispose();
        p.mesh.material.dispose();
        this.impactParticles.splice(i, 1);
      }
    }

    this.core.debugTools.update(deltaTime);
  }

  _updatePlayer(deltaTime) {
    if (!this.core.gameStateManager.is(States.PLAYING)) return;
    if (!this.playerAlive) return;

    const dt = Math.min(deltaTime, 0.05);
    const mapObjects = this.systems.mapManager.objects.filter(o => o.userData?.isWall || o.userData?.isMapObject || o.userData?.isBoundary);
    this.player.controller.update(dt, mapObjects, (controller) => {
      const pos = controller.position;
      if (pos.y < -20) {
        controller.teleport(0, 5, 0);
      }
    });

    this.player.controller.onFallDamage = (damage) => {
      this.playerHealth -= damage;
      this.ui.hud.updateHealth(this.playerHealth, this.playerMaxHealth);
      this.core.eventBus.emit('player:damage', { damage, region: 'body' });
      if (this.playerHealth <= 0) {
        this.playerHealth = 0;
        this._playerDied();
      }
    };

    this.player.cameraSystem.update(
      dt,
      this.player.firstPersonWeapon,
      this.player.playerArms,
      this.player.thirdPersonCharacter
    );

    const weapon = this.systems.weaponManager.getCurrentWeapon();
    this.player.firstPersonWeapon.update(
      dt,
      this.player.controller.isMoving,
      this.player.controller.isSprinting,
      weapon || null,
      null
    );

    this.player.hitbox.update(
      this.player.controller.position,
      this.player.controller.euler
    );

    this.core.debugTools.setPosition(
      this.player.controller.position.x,
      this.player.controller.position.y,
      this.player.controller.position.z
    );

    if (weapon) {
      this.core.debugTools.setWeapon(weapon.name);
      this.ui.hud.updateAmmo(weapon.currentAmmo, weapon.reserveAmmo);
      this.ui.hud.updateWeapon(weapon.name);
    }

    this.ui.hud.updateHealth(this.playerHealth, this.playerMaxHealth);
    this.ui.hud.updateTimer(this.systems.matchManager.getFormattedTime());

    const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(this.player.camera.quaternion);
    forward.y = 0;
    forward.normalize();
    this.ui.hud.updateDamageDirection(this.player.controller.position, forward);

    const matchStats = this.systems.matchManager.getMatchStats();
    if (matchStats && matchStats.players) {
      const playerStat = matchStats.players.find(p => p.id === 'local');
      const botStats = matchStats.players.filter(p => p.id !== 'local');
      const botScore = botStats.reduce((sum, b) => sum + b.score, 0);
      this.ui.hud.updateScore({ team1: playerStat?.score || 0, team2: botScore });
    }

    const isMoving = this.player.controller.isMoving;
    const isGrounded = this.player.controller.grounded;
    const speed = this.player.controller.currentSpeed;

    const crosshairSpread = Math.min(1,
      (isMoving ? speed / 7 : 0) * 0.6 +
      (this.player.controller.isSprinting ? 0.3 : 0) +
      (this.player.firstPersonWeapon.flashTimer > 0 ? 0.4 : 0)
    );
    this.ui.hud.updateCrosshair(crosshairSpread);

    this.footstepTimer -= dt;
    if (isMoving && isGrounded && speed > 1 && this.footstepTimer <= 0) {
      this.systems.audioManager.play('footstep', 'FOOTSTEP', { pitch: 0.9 + Math.random() * 0.2 });
      this.footstepTimer = 0.4 / Math.max(speed / 4, 0.5);
    }

    this.systems.audioManager.updateListenerPosition(
      this.player.controller.position,
      this.player.camera.quaternion
    );

    this.player.controller.isPointerLocked =
      document.pointerLockElement === this.renderer.domElement;
  }

  _updateBots(deltaTime) {
    if (!this.core.gameStateManager.is(States.PLAYING)) return;
    if (this.gameMode !== 'solo') return;

    const mapObjects = this.systems.mapManager.objects.filter(o => o.userData?.isWall || o.userData?.isMapObject || o.userData?.isBoundary);

    for (const bot of this.bots) {
      if (!bot.alive) continue;

      const fireResult = bot.update(
        deltaTime,
        this.player.controller.position,
        this.playerAlive,
        mapObjects
      );

      if (fireResult && this.playerAlive) {
        this._checkBotBulletHitPlayer(fireResult);
      }
    }
  }

  _checkBotBulletHitPlayer(botFireResult) {
    const { origin, direction, damage, botPosition } = botFireResult;
    const botPos = botPosition || origin;

    this.systems.bulletPool.fire(origin, direction, damage, 250, 'bot');

    const raycaster = new THREE.Raycaster(origin, direction);
    raycaster.far = 60;

    const hitResult = this.player.hitbox.testRay(raycaster);
    if (hitResult && this.playerAlive) {
      const finalDamage = damage * hitResult.multiplier;
      this.playerHealth -= finalDamage;

      this.systems.matchManager.registerDamage('bot', 'local', finalDamage);

      const playerPos = this.player.controller.position;
      const toBot = new THREE.Vector3(
        botPos.x - playerPos.x,
        0,
        botPos.z - playerPos.z
      ).normalize();
      const forward = new THREE.Vector3(0, 0, -1);
      forward.applyQuaternion(this.player.camera.quaternion);
      forward.y = 0;
      forward.normalize();
      const cross = new THREE.Vector3().crossVectors(forward, toBot);
      const dot = forward.dot(toBot);
      const angle = Math.atan2(cross.y, dot) * (180 / Math.PI);

      this.ui.hud.showHitMarker(finalDamage);
      this.core.eventBus.emit('player:damage', {
        damage: finalDamage,
        region: hitResult.region,
        angle,
        attackerPos: botPos
      });

      this.player.controller.applyFlinch(hitResult.region);
      this.systems.audioManager.play(hitResult.region === 'leg' ? 'hit_leg' : 'hit', 'HIT');

      if (hitResult.region === 'leg') {
        this.player.controller.applyLegSlow();
      }

      if (this.playerHealth <= 0) {
        this.playerHealth = 0;
        this._playerDied();
      }
    }
  }

  _playerDied() {
    this.playerAlive = false;
    this.player.controller.velocity.set(0, 0, 0);
    this.ui.hud.updateHealth(0);

    const bot = this.bots.find(b => b.alive);
    if (bot) {
      this.systems.matchManager.registerKill(bot.id, 'local', 'rifle');
    }

    this._respawnTimer = setTimeout(() => {
      this._respawnPlayer();
    }, 3000);
  }

  _respawnPlayer() {
    this.playerHealth = this.playerMaxHealth;
    this.playerAlive = true;

    const exclude = this.bots.filter(b => b.alive).map(b => b.position);
    const spawn = this.systems.spawnManager.getSpawn('player', null, exclude);
    if (spawn) {
      this.player.controller.teleport(spawn.position.x, spawn.position.y, spawn.position.z);
    }

    const rifle = this.systems.weaponManager.weapons.find(w => w.type === WeaponType.RIFLE);
    if (rifle) {
      rifle.currentAmmo = rifle.magSize;
      rifle.reserveAmmo = Math.max(rifle.reserveAmmo, rifle.magSize * 3);
    }
  }

  _showImpactEffect(point, normal, isBot) {
    const color = isBot ? 0xcc2222 : 0xffaa44;
    const count = isBot ? 3 : 5;
    for (let i = 0; i < count; i++) {
      const geo = new THREE.SphereGeometry(0.025, 4, 4);
      const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 1 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.copy(point);
      const spread = new THREE.Vector3(
        (Math.random() - 0.5) * 2,
        Math.random() * 2,
        (Math.random() - 0.5) * 2
      ).normalize().multiplyScalar(1.5 + Math.random() * 2);
      this.scene.add(mesh);
      this.impactParticles.push({ mesh, velocity: spread, life: 0.4 + Math.random() * 0.3 });
    }
  }

  _updateNetwork(deltaTime) {
    if (!this.network.networkManager.isConnected()) return;

    const inputSnapshot = this.player.controller?.getState() || null;
    this.network.networkManager.update(deltaTime, inputSnapshot);
    this.network.interpolation.update(deltaTime);

    this.core.debugTools.setPing(Math.round(this.network.networkManager.latency));
    this.core.debugTools.setBullets(this.systems.bulletPool.activeCount);
  }

  _render() {
    this.renderer.render(this.scene, this.player.camera);
  }

  _gameLoop = (timestamp) => {
    if (!this.initialized) return;

    try {
      const deltaTime = this.clock.getDelta();
      const rawDelta = Math.min(deltaTime, 0.05);

      if (this.paused) {
        if (this.gameMode === 'solo') {
          this._render();
          requestAnimationFrame(this._gameLoop);
          return;
        }
      }

      this._syncInputs();
      this._handleInput();
      this._updatePlayer(rawDelta);
      this._updateBots(rawDelta);
      this._updateCoreSystems(rawDelta);
      this._updateNetwork(rawDelta);
      this._render();

      this.core.debugTools.setBullets(this.systems.bulletPool.activeCount);

      this.running = true;
    } catch (err) {
      const overlay = document.getElementById('error-overlay');
      if (overlay) {
        overlay.textContent += `[${new Date().toLocaleTimeString()}] LOOP ERROR: ${err.message}\n${err.stack || ''}\n\n`;
        overlay.style.display = 'block';
      }
      console.error('[Game Loop Error]', err);
    }

    requestAnimationFrame(this._gameLoop);
  };

  start() {
    if (this.running) {
      console.warn('[Game] Already running');
      return;
    }

    console.log('[Game] Starting...');
    this.lastTime = performance.now();
    this.running = true;

    this.core.gameStateManager.transitionTo(States.MAIN_MENU);

    requestAnimationFrame(this._gameLoop);
  }
}

const game = new Game();
game.init().then(() => {
  game.start();
});

export default game;
