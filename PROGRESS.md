# Shooting Game — Progress & Improvements

## What's Been Done

### Movement & Controls
- **Instant stop**: `groundFriction` 6→50 — player stops almost instantly when no input on ground
- **ADS (Aim Down Sights)**: Right-click centers weapon on screen and zooms FOV to ~40; bob disabled during ADS
- **Crouch**: Press Ctrl (left/right) to crouch — reduces vertical scale
- **Pointer lock toggle**: Alt key locks/unlocks pointer; Escape pauses solo / opens menu in multiplayer
- **Ctrl+W prevention**: Browser tab no longer closes when crouching (Ctrl) + pressing W

### Weapons System
- **Knife**: New melee weapon (Digit4) — damage 35, range 2.5m, infinite ammo, raycaster-based hit test with hitbox regions
- **Red dot sights**: Thin square glass (semi-transparent, blue-tinted) with bright red emissive dot — mounted on both Rifle and SMG
- **Scope removed**: Replaced magnifying scope with red dot on rifle (consistent with SMG)
- **Scroll wheel switching**: Mouse wheel cycles forward/backward through all weapons
- **Muzzle flash**: Radial gradient additive sprite with fade animation
- **Bullet tracers**: Length 2.5, color `#88ffdd`, full opacity
- **Equipping animation**: 0.3s cubic-ease weapon raise from below frame to rest position on switch

### Visuals (Procedural)
- **TextureGenerator.js**: 5 procedural canvas textures — grass, brick, plaster, roof tile, concrete
- **Ground**: Grass texture with 20×20 repeat
- **Buildings**: 3 house types with textured walls, windows (glass + trim), doors, roof tiles, house2 ladder, house3 AC unit
- **Pistol prop**: Decorative procedural pistol mesh at (2, 1.2, 0) replacing the earlier GLB shotgun model
- **Camera bob**: Amplitude 0.07, sprint multiplier 2.0

### Bots
- **Legs + feet**: Two leg boxes with feet, sine-wave walk animation proportional to speed
- **Y-position fix**: Bot visual group positioned at `entity.y` with mesh offsets (body 0.1, head 0.75, legs -0.675) — feet now rest on ground, body/head at correct heights
- **Jump**: Random jump in combat (velocity.y=6, ~2s cooldown)
- **Crouch**: Random crouch toggle with smooth lerp (scale.y 0.6)
- **Invisibility fix**: `crouchTimer` uninitialized caused `scale.y = NaN` → bot invisible; added init in constructor

### Multiplayer (New)
- **WebSocket game server** (`server/`): Node.js with `ws`, handles rooms, player state, hit detection
- **Game rooms**: Create/join with 6-char code, up to 8 players, ready system with host start
- **Server-authoritative**: Movement, shooting, health, and scoring all run on the server (30 tick)
- **Remote players**: Server state broadcast to all clients; remote players rendered as colored humanoids with legs and walk animation (`RemotePlayer.js`)
- **Lobby UI**: Already in UIManager — Create Room, Join Room, player list, ready/start buttons
- **Crosshair hidden** during ADS
- **Rear sights removed** on weapons with red dots

## Deployment

### Quick Start (Local / LAN)
```bash
npm run build          # Build client into dist/
npm run server         # Start server on port 3001
```
Players on the same network connect to `http://YOUR_LOCAL_IP:3001` and use Multiplayer menu.

### Host Online (VPS / PaaS)
Needed: A server that runs Node.js persistently.
- **Railway**, **Render**, **Fly.io**, **Digital Ocean**, **Linode**, or any VPS

```bash
# On the server:
git clone <repo>
cd ShootingGame
npm install
npm install --prefix server
npm run build
PORT=3001 node server/index.js
```

The server serves the client build + WebSocket on the same port.

> **Static hosts** (Vercel, Netlify, Cloudflare Pages) can serve the client but **cannot** run the WebSocket server — you need a platform that keeps a Node process alive.

---

## Possible Improvements (Logic-Focused)

### AI & Combat
- **Bot strafing**: Bots currently stand and shoot; add strafing movement during combat to make them harder to hit
- **Bot grenades/tacticals**: Add grenade throws or flashbangs with area-of-effect damage
- **Bot hit reaction**: Stagger/interrupt bot attack when hit (currently they shoot through damage)
- **Bot suppression**: Bots could fire suppressing shots toward last known position even after losing sight
- **Bot squad behavior**: Bots could coordinate — one flanks while another provides cover fire
- **Difficulty scaling**: Beyond stat changes, harder bots could flank, dodge, and use cover

### Weapons & Combat
- **Weapon spread & recoil patterns**: Implement recoil patterns (CS-style spray) instead of random spread; reward tap-firing
- **Hitbox penetration**: Allow bullets to pass through thin walls/surface materials with damage reduction
- **Melee hitbox**: Replace raycaster melee with a short-range sweeping arc for more reliable hits
- **Headshot feedback**: Screen flash/audio cue specifically for headshots (beyond hit marker)
- **Weapon swap delay**: Add a short cooldown between weapon swaps to prevent instant switching in combat
- **Ammo pool**: Share reserve ammo between weapons of the same caliber (e.g., pistol and SMG)
- **ADS sensitivity scaling**: Lower mouse sensitivity while aiming down sights for finer aim

### Movement & Physics
- **Slide mechanic**: Allow slide when sprinting + crouching, with momentum carry
- **Mantle/vault**: Allow climbing onto low obstacles (waist-high walls, crates) without jumping
- **Ledge grab**: Catch ledge edges when falling short of a platform
- **Footstep audio**: Footstep sounds vary by surface material (grass, concrete, metal)
- **Stamina system**: Sprint duration limited by stamina; stamina regens when walking/stopped

### Game Systems
- **Damage falloff**: Reduce bullet damage over distance based on weapon type (SMG falls off faster than rifle)
- **Head hitbox expansion**: Slightly enlarge head hitbox at distance to compensate for visual scaling (fairness)
- **Bot respawn timer**: Add a visible countdown or camera pan to killed bot's position
- **Kill cam**: Brief replay from the killer's perspective on death in multiplayer
- **Scoreboard**: Tab key shows kills/deaths/ping for all players
- **Round system**: Best-of-X rounds with economy (buy weapons between rounds)

### Interaction & World
- **Ammo pickups**: Scattered ammo boxes on the map that refill reserve ammo
- **Weapon pickups**: World-placed weapons that can be picked up to replace current weapon
- **Destructible objects**: Barrels, crates, windows that break when shot
- **Dynamic cover**: Bots could shoot out lights to create darkness, or destroy player cover
- **Proximity audio**: Footsteps, gunshots, and voice lines audible based on distance and obstacles

### Multiplayer & Networking
- **Client-side prediction**: Reduce perceived lag for player movement
- **Lag compensation**: Server-side rewind hit detection for fair shooting
- **Spectator mode**: Allow dead players to spectate alive teammates or free-cam
- **Party system**: Invite friends to a lobby before match start
- **Anti-cheat basics**: Server-authoritative position validation and rate limiting

### Quality of Life
- **Ammo counter HUD**: Show current magazine / reserve ammo on screen
- **Weapon inspection**: Key to inspect weapon (brief animation, no gameplay effect)
- **Ping system**: Ping locations/obstacles/enemies for teammates
- **Auto pickup**: Walk over ammo/weapons to automatically collect them
- **Practice range**: Dedicated map with moving targets and damage numbers for testing weapons
