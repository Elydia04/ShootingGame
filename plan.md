# Shooting Game — Session Plan

## What's Been Done (2026-06-17)

### Session 1: Core Fixes & Polish
- **Tree-building overlap** — `MapManager.js` checks building zones before placing trees
- **House interiors** — Ceiling light + table added to houses
- **ESC menu settings fix** — Pause menu hides when opening settings, back button returns to pause
- **ESC double-press fix** — `pointerlockchange` triggers pause on unlock
- **Lobby UI fixes** — Generate code works server-side, join code display, name editing, ready toggle fixed
- **Damage vignette bug** — Red flash was showing when YOU hit enemies. Fixed: removed `player:damage` emits from attack paths (lines 233, 274 in main.js). Now only fires when receiving damage.
- **Default bots** — Increased from 3 → 10
- **Solo score limit** — Was 50 (1 kill = 100 score → match over). Changed to 999999 (match runs full timer).
- **README.md** — Created with features, controls, multiplayer setup

### Session 2: CT/T Team System
- **Auto-balance** — New players assigned to smaller team
- **Team spawns** — CT at `-8,-8`, T at `+8,+8` offset from base spawns
- **Friendly fire prevention** — Server skips same-team targets in `_processShooting`
- **Team colors** — RemotePlayer.js (blue CT / red T), ThirdPersonCharacter.js, kill feed, HUD indicator, lobby player list
- **Team score updates** — Broadcast on kills, shown in HUD and match stats

### Session 3: Weapon Orientation Fixes
- All guns rotated 180° so barrels face -Z (toward enemies)
- Knife in reverse grip on left side with stab animation

### Session 4: Multiplayer Damage Fix
- **Bug**: Shooting in multiplayer did no damage — rotation wasn't sent to server
- **Fix**: Added `euler` field to input messages sent to server
- Also fixed rotation step size (was 0.2, now 0.5 for responsiveness)

### Session 5: Feature Blitz
- **Scoreboard** — Press Tab to show kills/deaths/score (solo mode)
- **Damage numbers** — Floating yellow/red damage values at hit point
- **Headshot icons** — ☠ symbol in kill feed for headshots
- **Death screen** — "Killed by X" overlay on death
- **In-game chat** — Press Enter to type (solo), Escape to close
- **Bot strafing** — Faster strafe direction changes, higher strafe speed

## Files Modified

| File | Changes |
|------|---------|
| `index.html` | Added scoreboard, death screen, chat overlay HTML |
| `src/main.js` | Damage vignette fix, damage numbers, scoreboard tracking, death screen, chat, keyboard handlers |
| `src/ui/HUD.js` | Scoreboard show/hide, damage numbers, death screen, chat methods, headshot icon in kill feed |
| `src/ui/UIManager.js` | Default bots 3→10, team display in lobby |
| `src/ui/styles.css` | Scoreboard, death screen, chat, damage number CSS |
| `src/player/RemotePlayer.js` | Team colors + setTeam method |
| `src/player/ThirdPersonCharacter.js` | Team colors + setTeam method |
| `src/systems/BotController.js` | Faster strafing (0.8s timer, full speed strafe) |
| `src/systems/MatchManager.js` | `region` in kill event, `getPlayerStats()` method |
| `server/GameRoom.js` | Team assignment, spawn offset, friendly fire, team in broadcasts |
| `server/MatchManager.js` | Team scores, score_update event, `_getTeamScores()` |
| `server/index.js` | (minor - team in room responses) |
| `README.md` | Created |
| `src/core/SettingsManager.js` | Added `shadowResolution`, `pixelRatio`, `toneMapping`, `fog` defaults |
| `src/ui/SettingsMenu.js` | Added Shadow Resolution, Pixel Ratio, Tone Mapping, Fog controls; quality presets auto-fill; `onApply` callback |
| `src/main.js` | `_applyGraphicsSettings()` — reads settings → configures renderer; impact particle pooling; collidable box caching; `_refreshSoloScoreboard()`; scoreboard auto-refresh timer; fixed `_playerDied` scope bug |
| `src/systems/BotController.js` | `update()`/`_applyGravity()`/`_collisionResolve()` accept pre-computed collidable boxes; `_computeObstacleBoxes()` fallback |
| `src/systems/MapManager.js` | Shadow map 2048→1024; stores `dirLight` ref on `scene.userData` |

### Session 6: Scoreboard Fixes + Performance + Working Graphics Settings
- **Solo scoreboard kills** — Was reading from `_soloStats` (never set). Now reads from `MatchManager.getPlayerStats()`.
- **Solo scoreboard auto-refresh** — Previously built once on Tab press. Now refreshes every 300ms while held.
- **`_playerDied` crash** — Referenced out-of-scope `hitResult.region`. Removed bad parameter.
- **Impact particle memory leak** — Was creating new `SphereGeometry`/`MeshBasicMaterial` on every hit (no disposal). Now pooled — reuses up to 120 particles, no GC thrashing.
- **Shadow map 2048→1024** — Halved shadow resolution for big GPU perf gain.
- **Tone mapping ACES→Reinhard** — Lighter shader, especially on integrated GPUs.
- **Bot physics optimization** — Was calling `updateWorldMatrix(true, false)` per-collidable per-bot per-frame (300+ calls). Now computed once per frame and shared.
- **Graphics settings now work** — Quality presets (Low/Med/High/Ultra) actually change shadow res, pixel ratio, tone mapping, fog. Save applies immediately with no restart.

## What's Left

### High Priority
- [ ] **Client-side prediction** — Merge the `NetworkManager` framework into the actual multiplayer path. Currently `_multiWs` is a separate raw WebSocket that doesn't use `NetworkManager`'s prediction/interpolation. Estimate: 4-8 hours
- [x] **Multiplayer scoreboard** — Done (Valorant-style with hold Tab, live refresh)
- [x] **Multiplayer chat** — Done (`_setupChatInput` sends through NetworkManager, server relays to room)
- [x] **Respawn timer** — Done (countdown + auto-respawn in multiplayer)

### Medium Priority
- [ ] **Bot strafing** — Bots still sometimes stand still; increase `strafeChance` in config or add strafe-as-default behavior
- [ ] **Ammo pool** — Share reserve ammo between weapons of same caliber
- [ ] **Damage falloff** — Reduce bullet damage over distance per weapon type
- [ ] **Headshot sound** — Distinct audio cue for headshots
- [ ] **Bot hit reaction** — Stagger/interrupt bot attack when hit

### Low Priority / Polish
- [ ] **Footstep audio** — Hear enemies moving
- [ ] **Spectator mode** — Watch alive players when dead
- [ ] **Round system** — Best-of-X with economy (buy weapons between rounds)
- [ ] **Bomb/defuse objective** — Gives CT vs T purpose beyond colors
- [ ] **Kill cam** — Brief replay from killer's perspective on death
- [ ] **Scoreboard ping** — Show actual ping in multiplayer

### Bugs Noticed
- Fall damage (y < -20) still applies in multiplayer? Check if `onFallDamage` is set in MP mode
- The `nul` file in project root — already added to `.gitignore`

## How to Continue

On your other PC:
```bash
git clone https://github.com/Elydia04/Elydia04-ShootingGame.git
cd Elydia04-ShootingGame
npm install
npm install --prefix server
npm run build
npm run server
```

Then open `http://localhost:3001` in the browser.

When you're ready for me to continue, describe what you want to work on and I'll pick up where we left off.
