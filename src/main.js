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
import { RemotePlayer } from './player/RemotePlayer.js';
import { UIManager } from './ui/UIManager.js';
import { HUD } from './ui/HUD.js';
import { ScoreboardStore } from './ui/ScoreboardStore.js';
import { ScoreboardUI } from './ui/ScoreboardUI.js';
import { SettingsMenu } from './ui/SettingsMenu.js';
import { forestMap } from '../maps/forest_map/index.js';
import { cityMap } from '../maps/city_map/index.js';
import { trainingMap } from '../maps/training_map/index.js';
import { PauseManager } from './systems/PauseManager.js';
import { InputManager } from './systems/InputManager.js';
import { ErrorOverlay } from './systems/ErrorOverlay.js';

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
    this.remotePlayers = [];
    this._cachedCollidables = [];
    this._cachedCollidableBoxes = [];
    this.gameMode = 'solo';
    this.playerHealth = 100;
    this.playerMaxHealth = 100;
    this.playerAlive = true;
    this.cameraView = CameraView.FIRST_PERSON;
    this.impactParticles = [];
    this._impactParticlePool = [];
    this._collidableBoxCache = [];
    this._collidableCacheFrame = -1;
    this.footstepTimer = 0;
    this._respawnTimer = null;
    this._botRespawnTimers = [];
    this._errorCount = 0;
    this.paused = false;
    this._scoreboardStats = new Map();
    this._scoreboardRefreshTimer = null;
    this._multiRespawnTimer = null;
    this._autoFireSound = null;
    this._listenerForward = new THREE.Vector3();
    this._listenerUp = new THREE.Vector3();
    this._inputSeq = 0;
    this._pendingInputs = [];
    this._reconcileTarget = new THREE.Vector3();
    this._reconcileBlend = -1;
    this._remoteInterp = new Map();
    this._multiNetworkReady = false;
    this._inputSendAccum = 0;

    this.scoreboardStore = new ScoreboardStore();

    this.errorOverlay = new ErrorOverlay();
    this.inputManager = null;
    this.pauseManager = null;
  }

  _isMobile() {
    return /Mobi|Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  async init() {
    console.log('[Game] Initializing...');

    this.core.eventBus = new EventBus();
    this.core.saveManager = new SaveManager();
    this.core.settingsManager = new SettingsManager(this.core.saveManager);
    if (this._isMobile()) {
      this.core.settingsManager.set('graphics', 'quality', 'low');
      this.core.settingsManager.set('graphics', 'shadows', false);
      this.core.settingsManager.set('graphics', 'pixelRatio', 0.75);
    }
    this.core.gameStateManager = new GameStateManager();
    this.core.debugTools = new DebugTools();

    this._setupRenderer();

    this.pauseManager = new PauseManager(this);
    this.errorOverlay = new ErrorOverlay();

    this.ui.uiManager = new UIManager(
      this.core.gameStateManager,
      this.core.settingsManager,
      this.core.eventBus,
      () => this.pauseManager.requestPointerLock()
    );

    this.systems.assetManager = new AssetManager(this.scene);
    this.systems.assetManager.onProgress = (loaded, total) => {
      const progress = total > 0 ? loaded / total : 0;
      this.ui.uiManager.updateLoadingProgress(progress);
    };

    this.systems.audioManager = new AudioManager(this.core.settingsManager);
    await this.systems.audioManager.init();
    this.systems.audioManager.resume();

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
    });
    this.systems.bulletPool.onNearMiss((pos) => {
      // removed bullet_flyby sound
    });

    this.systems.matchManager = new MatchManager();

    this.systems.weaponManager = new WeaponManager();
    this.systems.weaponManager.addWeapon(WeaponType.RIFLE);
    this.systems.weaponManager.addWeapon(WeaponType.PISTOL);
    this.systems.weaponManager.addWeapon(WeaponType.SMG);
    this.systems.weaponManager.addWeapon(WeaponType.KNIFE);

    this.player.camera = new THREE.PerspectiveCamera(
      this.core.settingsManager.get('graphics', 'fov'),
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.player.camera.position.set(0, 0.75, 0);
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

    this.ui.hud = new HUD(this.core.eventBus, this.scoreboardStore);
    this.ui.hud.hide();

    this.scoreboardUI = new ScoreboardUI(this.scoreboardStore);

    this.ui.settingsMenu = new SettingsMenu(this.core.settingsManager, {
      onBackToPause: () => { if (this.paused) this.pauseManager.pause(); },
      onApply: () => this._applyGraphicsSettings()
    });

    this.inputManager = new InputManager(this);

    this._setupStateListeners();
    this._setupMultiplayer();
    this._setupNetworkListeners();
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
      powerPreference: 'default'
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    this.renderer.toneMappingExposure = 1.0;
    this._applyGraphicsSettings();

    const container = document.getElementById('game-canvas-container');
    container.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x87ceeb);
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambient);
    const hemi = new THREE.HemisphereLight(0x87ceeb, 0x362d22, 0.4);
    this.scene.add(hemi);
  }

  _applyGraphicsSettings() {
    const gfx = this.core.settingsManager.get('graphics');

    this.renderer.setPixelRatio(Math.min(gfx.pixelRatio || 1, window.devicePixelRatio));
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    const toneMapMap = { none: THREE.NoToneMapping, reinhard: THREE.ReinhardToneMapping, aces: THREE.ACESFilmicToneMapping };
    this.renderer.toneMapping = toneMapMap[gfx.toneMapping] || THREE.ReinhardToneMapping;

    const shadowsEnabled = gfx.shadows && gfx.shadowResolution > 0;
    this.renderer.shadowMap.enabled = shadowsEnabled;
    if (shadowsEnabled) {
      const dirLight = this.scene?.userData?.dirLight;
      if (dirLight) {
        dirLight.shadow.mapSize.width = gfx.shadowResolution;
        dirLight.shadow.mapSize.height = gfx.shadowResolution;
        dirLight.shadow.map?.dispose?.();
      }
    }

    if (this.scene) {
      if (gfx.fog && this.systems.mapManager?.currentMap) {
        const mapData = this.systems.mapManager.getMapData();
        if (mapData?.skybox) {
          this.scene.fog = new THREE.Fog(mapData.skybox.color || 0x87ceeb, mapData.skybox.fogNear || 50, mapData.skybox.fogFar || 200);
        }
      } else if (!gfx.fog) {
        this.scene.fog = null;
      }
    }
  }

  _refreshCollidables() {
    const objects = this.systems.mapManager.objects;
    this._cachedCollidables.length = 0;
    this._cachedCollidableBoxes.length = 0;
    for (const obj of objects) {
      if (obj.userData?.isWall || obj.userData?.isMapObject || obj.userData?.isBoundary) {
        this._cachedCollidables.push(obj);
        if (obj.geometry) {
          if (!obj.geometry.boundingBox) obj.geometry.computeBoundingBox();
          obj.updateWorldMatrix(true, false);
          this._cachedCollidableBoxes.push(obj.geometry.boundingBox.clone().applyMatrix4(obj.matrixWorld));
        }
      }
      if (obj.isGroup) {
        obj.traverse((child) => {
          if (child.isMesh && (child.userData?.isWall || child.userData?.isMapObject)) {
            this._cachedCollidables.push(child);
            if (child.geometry) {
              if (!child.geometry.boundingBox) child.geometry.computeBoundingBox();
              child.updateWorldMatrix(true, false);
              this._cachedCollidableBoxes.push(child.geometry.boundingBox.clone().applyMatrix4(child.matrixWorld));
            }
          }
        });
      }
    }
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

    if (this.gameMode === 'multi') {
      this.player.firstPersonWeapon.playShoot();
      this.systems.animationManager.playWeapon('shoot');
      this._playWeaponSound(weapon);
      this.core.eventBus.emit('weapon:fired', {
        weapon: weapon.type, ammo: weapon.currentAmmo, reserve: weapon.reserveAmmo
      });

      const muzzlePos = camera.position.clone();
      muzzlePos.y -= 0.15;
      for (let i = 0; i < (result.shots?.length || 1); i++) {
        const spreadDir = direction.clone();
        if (result.shots) {
          spreadDir.x += result.shots[i].spreadX;
          spreadDir.y += result.shots[i].spreadY;
        } else {
          spreadDir.x += (Math.random() - 0.5) * 0.005;
          spreadDir.y += (Math.random() - 0.5) * 0.005;
        }
        spreadDir.normalize();
        this.systems.bulletPool.fire(muzzlePos, spreadDir, 0, 300, 'multi_local');
      }
      return;
    }

    const enemyHitboxes = this.bots
      .filter(b => b.alive)
      .map(b => b.hitbox);

    if (weapon.melee) {
      const hit = this._meleeAttack(enemyHitboxes, weapon);
      if (hit) {
        this.ui.hud.showHitMarker(hit.damage);
        this._showImpactEffect(hit.point, direction.clone().negate(), true);
      }
      this.player.firstPersonWeapon.playShoot();
      this.systems.animationManager.playWeapon('shoot');
      this._playMeleeSound();
      return;
    }

    const muzzlePos = this.player.cameraSystem.getMuzzleWorldPosition(
      this.player.firstPersonWeapon
    );

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
            this._showImpactEffect(hitData.point, new THREE.Vector3(0, 1, 0), true);
          }
          bullet.alive = false;
          bullet.tracer.visible = false;
        });
      }
    }

    this.player.firstPersonWeapon.playShoot();
    this.systems.animationManager.playWeapon('shoot');
    this._playWeaponSound(weapon);

    this.core.eventBus.emit('weapon:fired', {
      weapon: weapon.type,
      ammo: weapon.currentAmmo,
      reserve: weapon.reserveAmmo
    });
  }

  _meleeAttack(hitboxes, weapon) {
    const camera = this.player.camera;
    const origin = camera.position.clone();
    const direction = new THREE.Vector3(0, 0, -1);
    direction.applyQuaternion(camera.quaternion);

    const raycaster = new THREE.Raycaster(origin, direction, 0, weapon.range);
    const meshes = [];
    const hitboxMap = new Map();
    for (const hb of hitboxes) {
      for (const region of hb.getRegions()) {
        meshes.push(region.mesh);
        hitboxMap.set(region.mesh, { hitbox: hb, region: region.name, multiplier: region.multiplier });
      }
    }
    if (meshes.length === 0) return null;

    const hits = raycaster.intersectObjects(meshes);
    if (hits.length > 0 && hits[0].distance <= weapon.range) {
      const info = hitboxMap.get(hits[0].object);
      if (info) {
        const finalDamage = weapon.damage * info.multiplier;
        const bot = info.hitbox.owner;
        if (bot && bot.alive) {
          bot.takeDamage(finalDamage, 'local');
          this.systems.matchManager.registerDamage('local', bot.id, finalDamage);
          if (!bot.alive) {
            this.systems.matchManager.registerKill('local', bot.id, weapon.name);
            this._respawnBot(bot);
          }
        }
        return { damage: finalDamage, region: info.region, point: hits[0].point };
      }
    }

    return null;
  }

  _playMeleeSound() {
    this.systems.audioManager.play('knife_swing', 'WEAPON');
  }

  _playWeaponSound(weapon) {
    if (weapon.automatic) {
      const autoSound = weapon.type === 'Rifle' ? 'auto_rifle' :
                        weapon.type === 'SMG' ? 'auto_smg' : 'auto_rifle';
      if (!this._autoFireSound) {
        this.systems.audioManager.play(autoSound, 'WEAPON', { loop: true });
        this._autoFireSound = autoSound;
      }
    } else {
      const shotSound = weapon.type === 'Pistol' ? 'gunshot_pistol' :
                        weapon.type === 'Shotgun' ? 'gunshot_shotgun' : 'gunshot_rifle';
      this.systems.audioManager.play(shotSound, 'WEAPON');
    }
  }

  _onTriggerRelease() {
    if (this._autoFireSound) {
      this.systems.audioManager.fadeOutStop(this._autoFireSound, 0.2);
      this._autoFireSound = null;
    }
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

  _addChatMessage(name, text, team) {
    this.ui.hud.addChatMessage(name, text, team);
  }

  _setupMultiplayer() {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const SERVER_URL = `${protocol}//${window.location.host}/ws`;
    this._multiHost = false;
    this._multiCode = null;
    this._multiLobbyCode = '';
    this._multiLocalTeam = null;
    this._multiPing = 0;
    this._multiNetworkReady = false;
    this._SERVER_URL = SERVER_URL;

    this.core.eventBus.on('lobby:direct_connect', ({ ip, name, statusEl }) => {
      let cleanIp = ip.includes('://') ? ip : `ws://${ip}`;
      if (!cleanIp.match(/:\d+\/ws$/)) {
        cleanIp = cleanIp.replace(/\/+$/, '');
        if (cleanIp.match(/:\d+$/)) {
          cleanIp += '/ws';
        } else {
          cleanIp += ':3001/ws';
        }
      }
      const url = cleanIp;
      const nm = this.network.networkManager;
      if (nm.isConnected()) nm.disconnect();
      this._multiHost = false;
      this._multiNetworkReady = false;

      let timedOut = false;
      const timeout = setTimeout(() => {
        timedOut = true;
        statusEl.textContent = 'Connection timed out';
        statusEl.className = 'direct-connect-status error';
      }, 5000);

      const unsubConnected = nm.on('connected', () => {
        clearTimeout(timeout);
        if (timedOut) return;
        statusEl.textContent = 'Joining lobby...';
        statusEl.className = 'direct-connect-status success';
        nm.send('join_available_room', { name });
        unsubConnected();
      });
      const unsubJoined = nm.on('room_joined', () => {
        clearTimeout(timeout);
        this.core.eventBus.emit('ui:show_screen', 'joinLobby');
        unsubJoined();
      });
      const unsubError = this.core.eventBus.on('lobby:error', (msg) => {
        clearTimeout(timeout);
        statusEl.textContent = msg || 'Connection failed';
        statusEl.className = 'direct-connect-status error';
        unsubError();
      });

      nm.connect(url);
    });

    this.core.eventBus.on('lobby:created', (data) => {
      const nm = this.network.networkManager;
      if (nm.isConnected()) nm.disconnect();
      this._multiHost = true;
      this._multiCode = data.code;
      this._multiNetworkReady = false;
      const unsub = nm.on('connected', () => {
        nm.send('create_room', { code: data.code, name: data.name || 'Player', config: data.config });
        unsub();
      });
      nm.connect(this._SERVER_URL);
    });

    this.core.eventBus.on('lobby:join', (data) => {
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const defaultUrl = `${protocol}//${window.location.host}/ws`;
      const nm = this.network.networkManager;
      if (nm.isConnected()) nm.disconnect();
      this._multiHost = false;
      this._multiCode = data.code;
      this._multiNetworkReady = false;

      let timedOut = false;
      const timeout = setTimeout(() => {
        timedOut = true;
        this.core.eventBus.emit('lobby:error', 'Connection timed out — check the IP and make sure the server is running');
      }, 5000);

      const unsub = nm.on('connected', () => {
        clearTimeout(timeout);
        if (timedOut) return;
        nm.send('join_room', { code: data.code, name: data.name || 'Player' });
        unsub();
      });
      const unsubErr = nm.on('error', () => {
        clearTimeout(timeout);
        if (timedOut) return;
        this.core.eventBus.emit('lobby:error', 'Connection failed — check firewall and server status');
        unsubErr();
      });
      nm.connect(defaultUrl);
    });

    this.core.eventBus.on('lobby:ready', (isReady) => {
      this.network.networkManager.send('player_ready', { ready: isReady });
    });

    this.core.eventBus.on('lobby:start', (data) => {
      if (this._multiHost) {
        this.network.networkManager.send('start_game', { config: data?.config });
      }
    });

    this.core.eventBus.on('lobby:regenerate_code', () => {
      if (this._multiHost) {
        this.network.networkManager.send('regenerate_code');
      }
    });
  }

  _setupNetworkListeners() {
    const nm = this.network.networkManager;

    nm.on('connected', (data) => {
      this._multiLocalId = data.id;
    });

    nm.on('room_created', (data) => {
      this._onLobbyMessage('room_created', data);
    });

    nm.on('room_joined', (data) => {
      this._onLobbyMessage('room_joined', data);
    });

    nm.on('player_joined', (data) => {
      this._onLobbyMessage('player_joined', data);
    });

    nm.on('player_left', (data) => {
      this._onLobbyMessage('player_left', data);
    });

    nm.on('player_ready', (data) => {
      this._multiNetworkReady = true;
      if (data.players) {
        this.ui.uiManager.setMultiLobbyPlayers(data.players);
        const updatedMe = data.players.find(p => p.id === this._multiLocalId);
        if (updatedMe) {
          this._multiLocalTeam = updatedMe.team;
          this.ui.hud?.setTeam?.(updatedMe.team);
        }
      }
    });

    nm.on('countdown', (data) => {
      this.ui.hud?.showCountdown?.(data.time);
    });

    nm.on('game_started', (data) => {
      this.core.gameStateManager.transitionTo(States.PLAYING, { mode: 'multi', map: data.mapId, config: data.config });
      if (this._multiLocalTeam) {
        this.ui.hud?.setTeam?.(this._multiLocalTeam);
        this.player.thirdPersonCharacter?.setTeam?.(this._multiLocalTeam);
      }
    });

    nm.on('joined_active_game', (data) => {
      this._multiLobbyCode = data.code;
      this.ui.uiManager.multiLobby.code = data.code;
      document.getElementById('lobby-code').textContent = data.code;
      document.getElementById('join-lobby-code').textContent = data.code;
      const me = data.players.find(p => p.id === this._multiLocalId);
      if (me) this._multiLocalTeam = me.team;
      this.core.gameStateManager.transitionTo(States.PLAYING, { mode: 'multi', map: data.mapId, config: data.config });
    });

    nm.on('shot', (data) => {
      if (data.playerId === this._multiLocalId) return;
      this._showMuzzleFlashRemote(data.playerId);
    });

    nm.on('hit', (data) => {
      this._showImpactEffect(data.point, { x: 0, y: 1, z: 0 }, true);
      if (data.victimId === this._multiLocalId) {
        this.playerHealth = Math.max(0, this.playerHealth - (data.damage || 0));
        this.ui.hud.updateHealth(this.playerHealth, this.playerMaxHealth);
        this.ui.hud.showDamageVignette?.();
      }
      if (data.shooterId === this._multiLocalId) {
        this.ui.hud.showHitMarker?.(data.damage);
      }
    });

    nm.on('kill', (data) => {
      this.ui.hud?.addKillFeedEntry?.(data);
      this._trackMultiKill(data);
      if (data.victim === this._multiLocalId) {
        this.playerAlive = false;
        this.playerHealth = 0;
        this.player.controller.velocity.set(0, 0, 0);
        this.ui.hud.updateHealth(0);
        const respawnTime = data.respawnTime || 3;
        this.ui.hud.showDeathScreen(data.killerName, respawnTime);
        this._startMultiRespawnCountdown(respawnTime);
      }
    });

    nm.on('respawn', (data) => {
      this._handleMultiRespawn(data);
    });

    nm.on('chat', (data) => {
      this._addChatMessage(data.name, data.message, data.team);
    });

    nm.on('match_end', (data) => {
      this._endMultiMatch(data);
    });

    nm.on('score_update', (data) => {
      if (this.ui.hud) {
        this.ui.hud.updateScore({ team1: data.teamScores.CT, team2: data.teamScores.T });
      }
    });

    nm.on('code_updated', (data) => {
      this.ui.uiManager.multiLobby.code = data.code;
      document.getElementById('lobby-code').textContent = data.code;
      document.getElementById('join-lobby-code').textContent = data.code;
    });

    nm.on('error', (data) => {
      const msg = typeof data === 'string' ? data : data?.message || 'Unknown connection error';
      console.error('[Multi]', msg);
      this.core.eventBus.emit('lobby:error', msg);
    });

    nm.stateHandler = (serverState) => {
      this._applyMultiState(serverState);
    };
  }

  _onLobbyMessage(type, data) {
    switch (type) {
      case 'room_created':
      case 'room_joined':
        this._multiLobbyCode = data.code;
        this.ui.uiManager.multiLobby.code = data.code;
        this.ui.uiManager.setMultiLobbyPlayers(data.players);
        document.getElementById('lobby-code').textContent = data.code;
        document.getElementById('join-lobby-code').textContent = data.code;
        document.getElementById('btn-start-game')?.classList.toggle('hidden', !this._multiHost);
        const me = data.players.find(p => p.id === this._multiLocalId);
        if (me) this._multiLocalTeam = me.team;
        if (type === 'room_joined') {
          this.core.eventBus.emit('lobby:joined');
        }
        break;
      case 'player_joined':
      case 'player_left':
        this.ui.uiManager.setMultiLobbyPlayers(data.players);
        const updated = data.players?.find(p => p.id === this._multiLocalId);
        if (updated) {
          this._multiLocalTeam = updated.team;
          this.ui.hud?.setTeam?.(updated.team);
        }
        break;
      case 'lobby_reset':
        this.ui.uiManager.setMultiLobbyPlayers(data.players);
        break;
    }
  }
  _startMultiGame(data) {
    const mapId = data.map;
    const config = data.config || {};
    this.gameMode = 'multi';
    this.playerAlive = true;
    this.playerHealth = this.playerMaxHealth;

    this.systems.mapManager.loadMap(mapId);
    this._refreshCollidables();
    this._render();
    this.systems.spawnManager.loadFromMap(this.systems.mapManager.getMapData());

    const spawn = this.systems.spawnManager.getSpawn('player', null, []);
    if (spawn) {
      this.player.controller.teleport(spawn.position.x, spawn.position.y, spawn.position.z);
    }

    this.systems.matchManager.configure({ type: 'deathmatch', scoreLimit: config.scoreLimit || 10, timeLimit: (config.timeLimit || 10) * 60, teamMode: false });
    this.systems.matchManager.registerPlayer('local', 'Player');
    this.systems.matchManager.start();

    const initialWeapon = this.systems.weaponManager.getCurrentWeapon();
    if (initialWeapon) {
      this.player.firstPersonWeapon.switchModel(initialWeapon.type);
    }

    this.systems.weaponManager.onWeaponSwitch = (weapon) => {
      this.player.firstPersonWeapon.switchModel(weapon.type);
      if (this._autoFireSound) {
        this.systems.audioManager.fadeOutStop(this._autoFireSound, 0.15);
        this._autoFireSound = null;
      }
    };

    this._scoreboardStats = new Map();
    this._scoreboardStats.set(this._multiLocalId, { name: 'You', kills: 0, deaths: 0, team: this._multiLocalTeam });
    this._rawScoreboardStats = new Map();
    this._pendingInputs = [];
    this._inputSeq = 0;
    this.network.interpolation.clear();
    this._setupChatInput();

    this.ui.hud.hideDeathScreen();
    this.ui.hud.show();
    this.scoreboardUI.setLobbyCode(this._multiLobbyCode || this.ui.uiManager.multiLobby?.code || '');
    this._clearBots();
    this._clearRemotePlayers();

    if (document.pointerLockElement !== this.renderer.domElement) {
      this._showPointerLockPrompt();
    }
  }

  _showPointerLockPrompt() {
    const overlay = document.getElementById('click-to-play-overlay');
    if (!overlay) return;
    overlay.classList.remove('hidden');

    const handler = () => {
      overlay.classList.add('hidden');
      this.pauseManager.requestPointerLock();
      overlay.removeEventListener('click', handler);
    };
    overlay.addEventListener('click', handler);
  }

  _despawnRemotePlayer(id) {
    this.network.interpolation.removeEntity(id);
    const idx = this.remotePlayers.findIndex(p => p.id === id);
    if (idx !== -1) {
      this.remotePlayers[idx].dispose();
      this.remotePlayers.splice(idx, 1);
    }
  }

  _clearRemotePlayers() {
    for (const rp of this.remotePlayers) rp.dispose();
    this.remotePlayers = [];
    this._remoteInterp.clear();
    this.network.interpolation.clear();
  }

  _applyMultiState(serverState) {
    if (!serverState || !serverState.entities) return;

    const localId = this._multiLocalId;
    const entities = serverState.entities;
    const interp = this.network.interpolation;
    const nm = this.network.networkManager;

    for (const [id, state] of Object.entries(entities)) {
      if (id === localId) {
        if (this.playerAlive) this._reconcileLocalPlayer(state, serverState, nm);
        continue;
      }

      if (!state.alive) {
        this._despawnRemotePlayer(id);
        continue;
      }

      const pos = { x: state.position.x, y: state.position.y || 0.9, z: state.position.z };
      const rot = state.euler ? { x: state.euler.x || 0, y: state.euler.y || 0 } : undefined;

      if (!interp.trackedEntities.has(id)) {
        interp.addEntity(id, { position: pos, rotation: rot });
      }

      interp.updateEntity(id, { position: pos, rotation: rot });

      let rp = this.remotePlayers.find(p => p.id === id);
      if (!rp) {
        rp = new RemotePlayer(this.scene, id, state.name || id);
        this.remotePlayers.push(rp);
      }
      rp.alive = true;
      rp.team = state.team;
      if (state.weapon) rp.setWeapon(state.weapon);

      if (!this._scoreboardStats.has(id)) {
        this._scoreboardStats.set(id, { name: state.name || id, kills: 0, deaths: 0, team: state.team });
      }
      if (state.kills != null) {
        if (!this._rawScoreboardStats) this._rawScoreboardStats = new Map();
        this._rawScoreboardStats.set(id, { kills: state.kills, deaths: state.deaths, score: state.score });
        const isLocal = id === this._multiLocalId;
        this.scoreboardStore.updatePlayer(id, {
          name: isLocal ? 'You' : (state.name || id),
          team: state.team || '',
          kills: state.kills,
          deaths: state.deaths,
          score: state.score ?? state.kills * 100,
          ping: isLocal ? this._multiPing : '-',
          local: isLocal
        });
      }
    }

    const activeIds = new Set(Object.keys(entities));
    for (let i = this.remotePlayers.length - 1; i >= 0; i--) {
      const rp = this.remotePlayers[i];
      if (!activeIds.has(rp.id)) {
        rp.dispose();
        this.remotePlayers.splice(i, 1);
        interp.removeEntity(rp.id);
      }
    }
  }

  _reconcileLocalPlayer(state, serverState, nm) {
    const serverSeq = state.seq;
    if (serverSeq == null) return;

    const idx = this._pendingInputs.findIndex(p => p.seq === serverSeq);
    if (idx !== -1) {
      this._pendingInputs.splice(0, idx + 1);
    }

    const serverPos = new THREE.Vector3(
      state.position.x, state.position.y ?? 0.9, state.position.z
    );
    const localPos = this.player.controller.position;
    const diff = localPos.distanceTo(serverPos);

    if (diff > 2) {
      this.player.controller.teleport(serverPos.x, serverPos.y, serverPos.z);
      this._reconcileBlend = 0;
      return;
    }

    const sv = state.velocity || { x: 0, y: 0, z: 0 };
    const predPos = serverPos.clone();
    const predVel = { x: sv.x, y: sv.y, z: sv.z };
    const dt = 1 / 30;
    for (const p of this._pendingInputs) {
      if (p.input) this._applyPredictedInput(p.input, predPos, predVel, dt);
    }

    predPos.y = serverPos.y;
    const correctedDiff = localPos.distanceTo(predPos);

    if (correctedDiff > 0.01) {
      this._reconcileTarget.copy(predPos);
      this._reconcileBlend = 0;
    }
  }

  _applyPredictedInput(input, pos, vel, dt) {
    const sprint = input.sprint && input.forward && !input.backward && !input.crouch;
    const crouch = input.crouch;
    const maxSpeed = crouch ? 2.2 : (sprint ? 7.2 : 4.5);
    const grounded = pos.y <= 0.9 && vel.y <= 0;
    const accel = grounded ? 12.0 : 4.0;
    const friction = 10.0;
    const gravity = -20;
    const airControl = 0.3;
    const jumpForce = 8.0;

    const yaw = input.euler?.y || 0;
    let wx = 0, wz = 0;
    if (input.forward) { wx -= Math.sin(yaw); wz -= Math.cos(yaw); }
    if (input.backward) { wx += Math.sin(yaw); wz += Math.cos(yaw); }
    if (input.left) { wx -= Math.cos(yaw); wz += Math.sin(yaw); }
    if (input.right) { wx += Math.cos(yaw); wz -= Math.sin(yaw); }
    const wlen = Math.sqrt(wx * wx + wz * wz);
    if (wlen > 0) { wx /= wlen; wz /= wlen; }

    if (wlen > 0) {
      const addX = wx * maxSpeed;
      const addZ = wz * maxSpeed;
      let dx = addX - vel.x;
      let dz = addZ - vel.z;
      const dlen = Math.sqrt(dx * dx + dz * dz);
      const maxDelta = accel * maxSpeed * dt;
      if (dlen > maxDelta) {
        const s = maxDelta / dlen;
        dx *= s; dz *= s;
      }
      vel.x += dx;
      vel.z += dz;
      if (!grounded) {
        vel.x *= (1 - airControl * dt);
        vel.z *= (1 - airControl * dt);
      }
    } else if (grounded) {
      const spd = Math.sqrt(vel.x * vel.x + vel.z * vel.z);
      if (spd > 0) {
        const drop = friction * dt;
        vel.x *= Math.max(0, spd - drop) / spd;
        vel.z *= Math.max(0, spd - drop) / spd;
      }
    }

    if (!grounded) {
      vel.y += gravity * dt;
      if (vel.y < -30) vel.y = -30;
    }

    pos.x += vel.x * dt;
    pos.z += vel.z * dt;
    pos.y += vel.y * dt;

    if (input.jump && grounded) {
      vel.y = jumpForce;
    }
  }

  _handleMultiSpawn(data) {}
  _handleMultiDespawn(data) {}

  _startMultiRespawnCountdown(time) {
    if (this._multiRespawnTimer) clearInterval(this._multiRespawnTimer);
    let remaining = time;
    this._multiRespawnTimer = setInterval(() => {
      remaining--;
      if (remaining <= 0) {
        clearInterval(this._multiRespawnTimer);
        this._multiRespawnTimer = null;
        this.ui.hud.hideDeathScreen();
      }
      this.ui.hud.updateDeathRespawnTimer(Math.max(0, remaining));
    }, 1000);
  }

  _handleMultiRespawn(data) {
    if (data.id === this._multiLocalId) {
      if (this._multiRespawnTimer) {
        clearInterval(this._multiRespawnTimer);
        this._multiRespawnTimer = null;
      }
      this.playerHealth = this.playerMaxHealth;
      this.playerAlive = true;
      if (data.position) {
        this.player.controller.teleport(data.position.x, data.position.y, data.position.z);
      }
      const rifle = this.systems.weaponManager.weapons.find(w => w.type === WeaponType.RIFLE);
      if (rifle) {
        rifle.currentAmmo = rifle.magSize;
        rifle.reserveAmmo = Math.max(rifle.reserveAmmo, rifle.magSize * 3);
      }
      this.ui.hud.updateHealth(this.playerHealth, this.playerMaxHealth);
      this.ui.hud.hideDeathScreen();
    }
  }
  _showMuzzleFlashRemote(playerId) {
    const renderState = this.network?.interpolation?.getRenderState(playerId);
    if (!renderState || !renderState.position) return;

    const origin = new THREE.Vector3(
      renderState.position.x,
      renderState.position.y + 1.0,
      renderState.position.z
    );
    const yaw = renderState.rotation?.y ?? 0;
    const pitch = renderState.rotation?.x ?? 0;
    const dir = new THREE.Vector3(
      -Math.sin(yaw) * Math.cos(pitch),
      Math.sin(pitch),
      -Math.cos(yaw) * Math.cos(pitch)
    );

    this.systems.bulletPool.fire(origin, dir, 0, 300, 'multi_remote');

    const rp = this.remotePlayers.find(p => p.id === playerId);
    if (rp) rp.playShoot();
  }

  _trackMultiKill(data) {
    const killer = this._scoreboardStats.get(data.killer);
    if (killer) { killer.kills++; } else {
      this._scoreboardStats.set(data.killer, { name: data.killerName, kills: 1, deaths: 0, team: data.killerTeam });
    }
    const victim = this._scoreboardStats.get(data.victim);
    if (victim) { victim.deaths++; } else {
      this._scoreboardStats.set(data.victim, { name: data.victimName, kills: 0, deaths: 1, team: data.victimTeam });
    }

    const killerLocal = data.killer === this._multiLocalId;
    const victimLocal = data.victim === this._multiLocalId;
    this.scoreboardStore.updatePlayer(data.killer, {
      kills: (killer?.kills ?? 1),
      local: killerLocal
    });
    this.scoreboardStore.updatePlayer(data.victim, {
      deaths: (victim?.deaths ?? 1),
      local: victimLocal
    });
  }

  _endMultiMatch(data) {
    if (this._multiRespawnTimer) {
      clearInterval(this._multiRespawnTimer);
      this._multiRespawnTimer = null;
    }
    this.ui.hud?.hideDeathScreen();
    this.core.gameStateManager.transitionTo(States.MATCH_END, { mode: 'multi', ...data });
  }

  _setupChatInput() {
    const input = document.getElementById('chat-input');
    if (!input) return;
    if (this._chatInputHandler) {
      input.removeEventListener('keydown', this._chatInputHandler);
    }
    this._chatInputHandler = (e) => {
      if (e.key === 'Enter' && input.value.trim()) {
        const msg = input.value.trim();
        input.value = '';
        this.ui.hud.addChatMessage('You', msg);
        this.ui.hud.hideChat();
        if (this.gameMode === 'multi' && this.network.networkManager.isConnected()) {
          this.network.networkManager.send('chat', { message: msg });
        }
      }
      if (e.key === 'Escape') {
        this.ui.hud.hideChat();
      }
    };
    input.addEventListener('keydown', this._chatInputHandler);
  }

  _startSoloGame(config) {
    this.gameMode = 'solo';
    this.playerHealth = this.playerMaxHealth;
    this.playerAlive = true;

    this.systems.mapManager.loadMap(config.map);
    this._refreshCollidables();
    this._render();
    this.systems.spawnManager.loadFromMap(this.systems.mapManager.getMapData());

    // Decorative pistol prop
    const pistolGroup = new THREE.Group();
    const pMat = new THREE.MeshStandardMaterial({ color: 0x666666, metalness: 0.4, roughness: 0.5 });
    const pDark = new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 0.7 });
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.025, 0.12), pMat);
    body.position.set(0, 0, 0);
    pistolGroup.add(body);
    const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.008, 0.06, 6), pDark);
    barrel.rotation.x = Math.PI / 2;
    barrel.position.set(0, 0.01, 0.08);
    pistolGroup.add(barrel);
    const grip = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.04, 0.025), pDark);
    grip.position.set(0, -0.03, -0.03);
    grip.rotation.x = 0.15;
    pistolGroup.add(grip);
    pistolGroup.position.set(2, 1.2, 0);
    pistolGroup.scale.set(0.5, 0.5, 0.5);
    pistolGroup.rotation.x = -0.2;
    pistolGroup.rotation.y = 0.5;
    this.scene.add(pistolGroup);

    const playerSpawn = this.systems.spawnManager.getSpawn('player', null, []);
    if (playerSpawn) {
      this.player.controller.teleport(playerSpawn.position.x, playerSpawn.position.y, playerSpawn.position.z);
    }

    this.systems.matchManager.configure({
      type: 'deathmatch',
      scoreLimit: 999999,
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
      if (this._autoFireSound) {
        this.systems.audioManager.fadeOutStop(this._autoFireSound, 0.15);
        this._autoFireSound = null;
      }
    };

    this._clearBots();
    this._spawnBots(config.difficulty, config.botCount);

    this._setupChatInput();

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
    this.ui.hud.hideDeathScreen();
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
      this.pauseManager.resume();
      this.systems.audioManager?.stopAll();
      this._autoFireSound = null;
      this.ui.hud?.hide();

      if (this._respawnTimer) {
        clearTimeout(this._respawnTimer);
        this._respawnTimer = null;
      }
      if (this._multiRespawnTimer) {
        clearInterval(this._multiRespawnTimer);
        this._multiRespawnTimer = null;
      }
      for (const id of this._botRespawnTimers) clearTimeout(id);
      this._botRespawnTimers = [];

      if (this.systems.mapManager.currentMap) {
        this.systems.mapManager.unloadMap();
      }
      this._clearBots();
      this._clearRemotePlayers();
      if (this.network.networkManager.isConnected()) { this.network.networkManager.disconnect(); }
      this._scoreboardStats = new Map();
      this._rawScoreboardStats = new Map();
      this.scoreboardStore.clear();
      this._multiPing = 0;
      this.playerHealth = this.playerMaxHealth;
      this.playerAlive = true;
    });

    this.core.gameStateManager.on(States.PLAYING, (data) => {
      this.paused = false;
      this.pauseManager.hideOverlay();

      if (data?.data?.mode === 'solo') {
        this._startSoloGame(data.data);
      } else if (data?.data?.mode === 'multi') {
        this._startMultiGame(data.data);
      }
    });

    this.core.gameStateManager.on(States.SPECTATING, () => {
      this.ui.hud?.show();
    });

    this.core.gameStateManager.on(States.MATCH_END, (data) => {
      this.pauseManager.resume();
      try { document.exitPointerLock(); } catch (_) {}
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

    this.systems.bulletPool.playerPosition = this.player.controller?.position || null;
    this.systems.bulletPool.update(deltaTime, this._cachedCollidables);

    this.systems.animationManager.update(deltaTime);

    for (let i = this.impactParticles.length - 1; i >= 0; i--) {
      const p = this.impactParticles[i];
      p.life -= deltaTime;
      p.mesh.position.addScaledVector(p.velocity, deltaTime);
      p.mesh.material.opacity = Math.max(0, p.life / 0.8);
      if (p.life <= 0) {
        this._recycleImpactParticle(p);
        this.impactParticles.splice(i, 1);
      }
    }

    this.core.debugTools.update(deltaTime);
  }

  _updatePlayer(deltaTime) {
    if (!this.core.gameStateManager.is(States.PLAYING)) return;
    if (!this.playerAlive) return;

    if (this._reconcileBlend >= 0) {
      const pos = this.player.controller.position;
      pos.lerp(this._reconcileTarget, Math.min(1, deltaTime * 12));
      if (pos.distanceTo(this._reconcileTarget) < 0.01) {
        pos.copy(this._reconcileTarget);
        this._reconcileBlend = -1;
      }
    }

    const dt = Math.min(deltaTime, 0.05);
    this.player.controller.update(dt, this._cachedCollidables, (controller) => {
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
      null,
      this.player.controller.inputs.aim
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
    this.ui.hud.setCrosshairVisible(!this.player.controller.inputs.aim);

    this.footstepTimer -= dt;
    if (isMoving && isGrounded && speed > 1 && this.footstepTimer <= 0) {
      this.systems.audioManager.play('footstep', 'FOOTSTEP', { pitch: 0.9 + Math.random() * 0.2 });
      this.footstepTimer = 0.4 / Math.max(speed / 4, 0.5);
    }

    this._listenerForward.set(0, 0, -1).applyQuaternion(this.player.camera.quaternion);
    this._listenerUp.set(0, 1, 0).applyQuaternion(this.player.camera.quaternion);
    this.systems.audioManager.updateListenerPosition(
      this.player.controller.position,
      this._listenerForward,
      this._listenerUp
    );

    this.player.controller.isPointerLocked =
      document.pointerLockElement === this.renderer.domElement;
  }

  _updateBots(deltaTime) {
    if (!this.core.gameStateManager.is(States.PLAYING)) return;
    if (this.gameMode !== 'solo') return;

    const collidables = this._cachedCollidables;
    const boxes = this._cachedCollidableBoxes;

    for (const bot of this.bots) {
      if (!bot.alive) continue;

      const fireResult = bot.update(
        deltaTime,
        this.player.controller.position,
        this.playerAlive,
        collidables,
        boxes
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

  _showDamageNumber(worldPos, damage, isHeadshot) {
    const vec = worldPos.clone ? worldPos.clone() : new THREE.Vector3(worldPos.x, worldPos.y, worldPos.z);
    vec.project(this.player.camera);
    const x = (vec.x * 0.5 + 0.5) * window.innerWidth;
    const y = (-vec.y * 0.5 + 0.5) * window.innerHeight;
    this.ui.hud.showDamageNumber({ x, y }, damage, isHeadshot);
  }

  _playerDied() {
    this.playerAlive = false;
    if (this._autoFireSound) {
      this.systems.audioManager.fadeOutStop(this._autoFireSound, 0.15);
      this._autoFireSound = null;
    }
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

  _getImpactParticle() {
    if (this._impactParticlePool.length > 0) {
      const p = this._impactParticlePool.pop();
      p.mesh.visible = true;
      return p;
    }
    const geo = new THREE.SphereGeometry(0.025, 4, 4);
    const mat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 1 });
    const mesh = new THREE.Mesh(geo, mat);
    this.scene.add(mesh);
    return { mesh, velocity: new THREE.Vector3() };
  }

  _recycleImpactParticle(p) {
    p.mesh.visible = false;
    if (this._impactParticlePool.length < 120) {
      this._impactParticlePool.push(p);
    } else {
      this.scene.remove(p.mesh);
      p.mesh.geometry.dispose();
      p.mesh.material.dispose();
    }
  }

  _showImpactEffect(point, normal, isBot) {
    const color = isBot ? 0xcc2222 : 0xffaa44;
    const count = isBot ? 3 : 5;
    for (let i = 0; i < count; i++) {
      const p = this._getImpactParticle();
      p.mesh.material.color.setHex(color);
      p.mesh.position.copy(point);
      p.velocity.set(
        (Math.random() - 0.5) * 2,
        Math.random() * 2,
        (Math.random() - 0.5) * 2
      ).normalize().multiplyScalar(1.5 + Math.random() * 2);
      p.life = 0.4 + Math.random() * 0.3;
      this.impactParticles.push(p);
    }
  }

  _buildScoreboardStats() {
    const rows = [];
    for (const [id, stats] of this._scoreboardStats) {
      const isLocal = id === this._multiLocalId;
      const rawStats = this._rawScoreboardStats?.get(id);
      rows.push({
        id,
        name: isLocal ? 'You' : (stats.name || id),
        team: stats.team || '',
        kills: rawStats?.kills ?? stats.kills,
        deaths: rawStats?.deaths ?? stats.deaths,
        score: rawStats?.score ?? stats.kills * 100,
        ping: isLocal ? this._multiPing : '-',
        local: isLocal
      });
    }
    rows.sort((a, b) => {
      if (a.team !== b.team) return a.team < b.team ? -1 : 1;
      return b.score - a.score;
    });
    return rows;
  }

  _showScoreboard() {
    if (this.gameMode === 'multi') {
      const rows = this._buildScoreboardStats();
      this.scoreboardStore.setPlayers(rows);
    } else {
      this._refreshSoloScoreboard();
      if (!this._scoreboardRefreshTimer) {
        this._scoreboardRefreshTimer = setInterval(() => this._refreshSoloScoreboard(), 300);
      }
    }
    this.scoreboardStore.setVisible(true);
  }

  _refreshSoloScoreboard() {
    const matchStats = this.systems.matchManager.getMatchStats();
    const localStats = this.systems.matchManager.getPlayerStats('local');
    const rows = [{
      id: 'local',
      name: 'Player',
      kills: localStats?.kills ?? 0,
      deaths: localStats?.deaths ?? 0,
      score: localStats?.score ?? 0,
      team: '',
      ping: '-',
      local: true
    }];
    for (const bot of this.bots) {
      const bs = matchStats?.players?.find(p => p.id === bot.id);
      rows.push({
        id: bot.id,
        name: bot.name,
        kills: bs?.kills ?? 0,
        deaths: bs?.deaths ?? 0,
        score: bs?.score ?? 0,
        team: '',
        ping: '-',
        local: false
      });
    }
    this.scoreboardStore.setPlayers(rows);
  }

  _hideScoreboard() {
    this.scoreboardStore.setVisible(false);
    if (this._scoreboardRefreshTimer) {
      clearInterval(this._scoreboardRefreshTimer);
      this._scoreboardRefreshTimer = null;
    }
  }

  _updateRemoteInterpolation(deltaTime) {
    this.network.interpolation.update(deltaTime);
    for (const rp of this.remotePlayers) {
      if (!rp.alive) continue;
      rp.update(deltaTime);
      const state = this.network.interpolation.getRenderState(rp.id);
      if (state?.position) {
        rp.group.position.set(state.position.x, state.position.y, state.position.z);
      }
      if (state?.rotation) {
        rp.group.rotation.y = state.rotation.y;
      }
    }
  }

  _updateNetwork(deltaTime) {
    const nm = this.network.networkManager;
    if (this.gameMode === 'multi' && nm.isConnected()) {
      const inputs = this.player.controller?.inputs;
      const euler = this.player.controller?.euler;

      this._inputSendAccum += deltaTime;

      if (inputs && this.playerAlive && this._inputSendAccum >= 1 / 30) {
        this._inputSendAccum -= 1 / 30;
        this._inputSeq++;
        const currentWeapon = this.systems.weaponManager.getCurrentWeapon();
        const inputData = { ...inputs, euler: { x: euler?.x || 0, y: euler?.y || 0 }, seq: this._inputSeq, weapon: currentWeapon?.type };
        this._pendingInputs.push({ seq: this._inputSeq, input: inputData, time: performance.now() });
        if (this._pendingInputs.length > 60) this._pendingInputs.shift();
        nm.sendInput(inputData);
      }
    }

    this._multiPing = Math.round(nm.latency);
    this.core.debugTools.setPing(this._multiPing);
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

      if (this._fpsAccum === undefined) this._fpsAccum = 0;
      if (this._fpsCount === undefined) this._fpsCount = 0;
      this._fpsAccum += rawDelta;
      this._fpsCount++;
      if (this._fpsAccum >= 1) {
        const fps = this._fpsCount / this._fpsAccum;
        if (fps < 30 && !this._qualityReduced) {
          this._qualityReduced = true;
          this.core.settingsManager.set('graphics', 'pixelRatio', 0.75);
          this.core.settingsManager.set('graphics', 'shadowResolution', 512);
          this.core.settingsManager.set('graphics', 'shadows', false);
          this._applyGraphicsSettings();
          console.log('[AutoQuality] FPS low, reduced settings');
        }
        this._fpsAccum = 0;
        this._fpsCount = 0;
      }

      if (this.paused) {
        this._render();
        requestAnimationFrame(this._gameLoop);
        return;
      }

      this._refreshCollidables();
      this.inputManager.syncInputs();
      this._handleInput();
      this._updatePlayer(rawDelta);
      this._updateBots(rawDelta);
      this._updateCoreSystems(rawDelta);
      this._updateNetwork(rawDelta);
      this._updateRemoteInterpolation(rawDelta);
      this._render();

      this.core.debugTools.setBullets(this.systems.bulletPool.activeCount);

      this.running = true;
    } catch (err) {
      this.errorOverlay.showError(err);
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
