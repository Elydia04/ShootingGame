# Shooting Game — Reference Analysis & Roadmap

## Reference Projects Analyzed

### 1. [StarKnightt/Backroom-Escape](https://github.com/StarKnightt/Backroom-Escape)
- **Stars**: 15 | **Language**: TypeScript (79%) / JS (19%)
- **Stack**: Next.js + Three.js + pnpm + ESLint
- **Genre**: First-person survival horror
- **Highlights**:
  - 100% procedural generation (textures, audio, models, maps) — zero asset files
  - Procedural PBR textures via Canvas (albedo + normal maps via Sobel-filtered height fields + roughness)
  - Articulated 3D player (body, fingers on torch grip)
  - Articulated 3D entity with A* pathfinding (wall-edge aware) + state machine (roam/stalk/chase/search)
  - "Horror director" that relocates entity near player during calm periods
  - Dynamic light orchestration — InstancedMesh fixtures, 12 real lights assigned dynamically, entity suppresses nearby lights
  - 100% synthesized audio via WebAudio (fluorescent hum, footsteps, whispers, chase screech, procedural convolution reverb)
  - Post-processing: bloom, FXAA, custom fear shader (grain, vignette, chromatic aberration, VHS tearing)
  - Hardened input system (pointer lock watchdog, delta spike filtering, double-click protection)
  - Mobile support: touch joystick, landscape enforcement, native-res rendering
  - Dev cheats system
  - Portal build script (CrazyGames deployment)
- **What to borrow**: Procedural texture system, dynamic light management, synthesized audio approach, input hardening techniques

### 2. [mohsenheydari/three-fps](https://github.com/mohsenheydari/three-fps)
- **Stars**: 228 | **Language**: JavaScript (97%)
- **Stack**: Three.js + ammo.js (physics) + three-pathfinding + Webpack + Babel
- **Genre**: First-person shooter
- **Highlights**:
  - Entity/component system architecture
  - FPS controller using ammo.js rigidbody physics
  - NPC with root-motion animations and Mixamo assets
  - Basic AI with three-pathfinding
  - Webpack bundling, yarn
- **What to borrow**: Physics integration approach (ammo.js for player/enemy bodies), ECS architecture patterns

### 3. [mr-vance/ShooterGame](https://github.com/mr-vance/ShooterGame)
- **Stars**: 6 | **Language**: JavaScript (79%)
- **Stack**: Plain Three.js (CDN) + Web Audio API + Pointer Lock API
- **Genre**: First-person shooter
- **Highlights**:
  - Simple single-file approach (no bundler)
  - Uses Pointer Lock API directly
  - Web Audio API for sound effects
  - AI-controlled enemies
  - Sprint, jump mechanics
- **What to borrow**: Simplicity reference only — our project already surpasses this

### 4. [nickyvanurk/3d-multiplayer-browser-shooter](https://github.com/nickyvanurk/3d-multiplayer-browser-shooter)
- **Stars**: 138 | **Language**: JavaScript (88%)
- **Stack**: Three.js + ws (WebSocket) + Express + Babel + ESLint
- **Genre**: 3D space dogfight (multiplayer)
- **Highlights**:
  - Client/server architecture (493 commits)
  - WebSocket real-time multiplayer
  - Heroku/Render deployment (Procfile)
  - 3 versions of evolution (v1, v2, v3 tags)
  - Test directory
  - Shared code between client/server
- **What to borrow**: Multiplayer architecture patterns, shared client/server code organization, deployment config

### 5. [verytired/three.js-game](https://github.com/verytired/three.js-game)
- **Stars**: 9 | **Language**: JavaScript (94%) / TypeScript (6%)
- **Stack**: Three.js + Bower + Gulp + tsd (TypeScript definitions)
- **Genre**: 3D shooting demo
- **Highlights**:
  - Older build pipeline (Bower/Gulp)
  - TypeScript type definitions via tsd
  - 119 commits
- **What to borrow**: Minimal — mainly historical reference

---

## Topic Trends (threejs-game & 3d-game)

| Pattern | Prevalence | Notes |
|---------|-----------|-------|
| React Three Fiber | High | 5+ repos in topic use R3F as a wrapper |
| Vite bundler | High | Replacing Webpack as default |
| TypeScript | Medium-High | ~30% of repos |
| WebSocket multiplayer | Medium | Common for real-time games |
| Cannon.js / ammo.js physics | Medium | Physics engines for Three.js |
| Procedural generation | Medium | Maps, textures, audio |
| Mobile support | Low-Medium | Touch controls, responsive |

---

## Current Project State (ShootingGame)

### Stack
- **Frontend**: Three.js 0.160 + Vite + vanilla JS
- **Backend**: Node.js + ws (WebSocket) + uuid
- **Deploy**: Fly.io / Railway / Render

### Architecture
```
server/          GameRoom, MatchManager (WebSocket, 30 tps, server-authoritative)
src/
  core/          Engine, state machine, settings, event bus
  player/        FPS controller, weapons, camera, hitbox, arms
  systems/       Map, spawn, audio, animation, bullets, bots, match logic
  ui/            HUD, menus, lobby, settings + CSS
  assets/        Asset loading, texture generation
maps/            Map JSON definitions
```

### Completed Features
- 6 weapons (Knife, Pistol, SMG, Rifle, Shotgun, Sniper)
- Solo mode vs AI bots on procedural maps
- Multiplayer with create/join rooms (6-char code)
- CT vs T team system (auto-balanced, friendly fire prevention)
- Server-authoritative movement/hits (30 tps)
- Procedural canvas textures (grass, brick, plaster, roof, concrete)
- Red dot sights, ADS, third-person toggle
- Scoreboard, damage numbers, headshot icons, kill feed
- In-game chat, death screen
- Bot strafing AI
- Graphics settings (quality presets, shadow res, pixel ratio, tone mapping, fog)
- Impact particle pooling
- Performance optimizations (shared collidable boxes, shadow map 1024)

---

## Roadmap: Features by Priority

### Phase 1 — Core Gameplay Enhancements (Now)

| # | Feature | Reference | Effort | Impact |
|---|---------|-----------|--------|--------|
| 1 | Client-side prediction + reconciliation | 3d-multiplayer-browser-shooter | 8h | High — smooth multiplayer |
| 2 | Footstep audio + distinct headshot sound | Backroom-Escape (WebAudio) | 3h | Medium — immersion |
| 3 | Bot hit reaction / stagger animation | three-fps (root motion) | 4h | Medium — game feel |
| 4 | Ammo pool (shared reserve per caliber) | — | 2h | Medium — gameplay depth |
| 5 | Damage falloff over distance | — | 2h | Medium — weapon balance |

### Phase 2 — Visual & Audio Polish

| # | Feature | Reference | Effort | Impact |
|---|---------|-----------|--------|--------|
| 6 | Procedural PBR textures (normal + roughness maps) | Backroom-Escape (Sobel height→normal) | 6h | High — visual quality |
| 7 | Synthesized audio (footsteps, ambient, reverb) | Backroom-Escape (WebAudio graph) | 5h | Medium — immersion |
| 8 | Dynamic light management (light pooling) | Backroom-Escape (InstancedMesh + 12-light pool) | 4h | Medium — atmosphere |
| 9 | Post-processing stack (bloom, grain, vignette) | Backroom-Escape (custom fear shader) | 3h | Medium — polish |
| 10 | Muzzle flash + shell casing particles | three-fps | 3h | Low — visual feedback |

### Phase 3 — AI & Game Systems

| # | Feature | Reference | Effort | Impact |
|---|---------|-----------|--------|--------|
| 11 | A* pathfinding for bots | Backroom-Escape, three-fps (three-pathfinding) | 6h | High — smarter bots |
| 12 | Bot state machine (patrol/search/chase) | Backroom-Escape (roam/stalk/chase/search) | 5h | High — bot variety |
| 13 | Round system + economy (buy phase) | CS-inspired | 8h | High — competitive mode |
| 14 | Bomb/defuse objective mode | CS-inspired | 6h | High — team purpose |
| 15 | Spectator mode | — | 4h | Medium — multiplayer UX |
| 16 | Kill cam (brief replay) | — | 5h | Low — polish |

### Phase 4 — Infrastructure & Platform

| # | Feature | Reference | Effort | Impact |
|---|---------|-----------|--------|--------|
| 17 | TypeScript migration | Backroom-Escape | 10h | Medium — maintainability |
| 18 | Mobile touch controls | Backroom-Escape (joystick + buttons) | 8h | Medium — reach |
| 19 | Portal build (CrazyGames / itch.io) | Backroom-Escape (packcg.mjs script) | 3h | Medium — distribution |
| 20 | Dev cheats system | Backroom-Escape (redrum cheat codes) | 2h | Low — debugging |
| 21 | E2E smoke tests (headless scripts) | Backroom-Escape (scripts/smoke.mjs, etc.) | 4h | Medium — CI quality |

---

## Library Adoption Analysis

| Library | Used By | Should We Adopt? | Notes |
|---------|---------|-----------------|-------|
| **three** | All | ✅ Already using | v0.160 — current |
| **vite** | Backroom-Escape, our project | ✅ Already using | Bundler of choice |
| **ws** | nickyvanurk, our project | ✅ Already using | WebSocket server |
| **ammo.js** | three-fps | ⏳ Consider for physics | Adds ~2MB wasm; useful for ragdolls, vehicle physics |
| **three-pathfinding** | three-fps | ✅ Yes | A* navmesh for bots — big AI improvement |
| **WebAudio API** | Backroom-Escape, mr-vance | ✅ Already using (basic) | Expand usage for synthesized audio |
| **Pointer Lock API** | Backroom-Escape, mr-vance | ✅ Already using | Hardening patterns from Backroom-Escape |
| **React** / **R3F** | Topic trend | ❌ No | Would require full rewrite; not worth it |
| **Next.js** | Backroom-Escape | ❌ No | Overkill for a game — our Vite SPA is better |
| **TypeScript** | Backroom-Escape, topic trend | ⏳ Incremental | Consider for new files; migrating existing is lower priority |

---

## Architecture Improvements

### Input System (from Backroom-Escape)
```js
// Current: direct event listeners in main.js
// Target: hardened input manager
class InputManager {
  // pointer lock watchdog (auto-pause on lock loss)
  // grace window for Chromium garbage deltas
  // spike delta filtering
  // double-click protection on overlay buttons
  // OS key repeat filtering
}
```

### Audio System (from Backroom-Escape)
```js
// Current: plays MP3 files via HTMLAudio
// Target: procedural WebAudio synthesis
class AudioManager {
  // audio graph: master gain → compressor → convolver → destination
  // procedural: footsteps (noise shaping), ambient drone (oscillators + filters)
  // positional audio via PannerNode
  // reverb via ConvolverNode (impulse response generated at runtime)
}
```

### Bot AI (from three-fps + Backroom-Escape)
```js
// Current: simple strafe + shoot
// Target: state machine with pathfinding
class BotBrain {
  states: PATROL | SEARCH | CHASE | ATTACK | FLEE
  // A* pathfinding via three-pathfinding navmesh
  // awareness model (sight/hearing radius)
  // tactical behavior (flank, take cover, retreat)
}
```

### Lighting (from Backroom-Escape)
```js
// Current: static directional + ambient
// Target: dynamic light pool
class LightManager {
  // pool of 8-12 PointLights
  // assign to nearest fixtures each frame
  // entity-suppressed lights (darkness follows monster)
  // InstancedMesh for emissive fixtures
}
```

---

## Long-Term Vision

```
                      ┌─────────────────────────────┐
                      │       ShootingGame           │
                      │  Three.js + Vite + ws        │
                      └──────────┬──────────────────┘
                                 │
              ┌──────────────────┼──────────────────┐
              ▼                  ▼                  ▼
      ┌─────────────┐   ┌──────────────┐   ┌──────────────┐
      │  Solo Mode   │   │  Multiplayer  │   │  Competitive │
      │  - Bot AI    │   │  - Prediction │   │  - Rounds    │
      │  - PvE maps  │   │  - Interpol. │   │  - Economy   │
      │  - Procs.gen │   │  - 8 players │   │  - Bomb mode │
      └─────────────┘   └──────────────┘   └──────────────┘
                                 │
                    ┌────────────┴────────────┐
                    ▼                         ▼
           ┌──────────────┐          ┌──────────────┐
           │  Mobile      │          │  Portal      │
           │  Touch UI    │          │  CrazyGames  │
           │  Landscape   │          │  itch.io     │
           └──────────────┘          └──────────────┘
```

---

## Immediate Next Steps (Ordered)

1. **Client-side prediction** — Biggest gap vs reference projects. Study nickyvanurk's architecture.
2. **Procedural PBR textures** — Port Backroom-Escape's Canvas normal-map technique to our texture generator.
3. **A* pathfinding for bots** — Integrate `three-pathfinding`; replace current random strafe logic.
4. **Footstep + ambient audio** — Use WebAudio synthesis (not MP3 files) following Backroom-Escape patterns.
5. **TypeScript migration** — Start with new files (systems/BotBrain.js → systems/BotBrain.ts).

## Commands to Run After Changes

```bash
# Verify build
npm run build

# Run server
npm run server
```
