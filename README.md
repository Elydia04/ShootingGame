# Elydia04-ShootingGame

A browser-based 3D first-person shooter built with Three.js and Node.js — solo against bots or multiplayer with up to 8 players.

## Features

- **First-person shooter** — Mouse aim, WASD movement, scroll/slot weapons
- **6 weapons** — Knife, Pistol, SMG, Rifle, Shotgun, Sniper (each with unique stats, red dot sights on Rifle/SMG)
- **Solo mode** — Fight 10 AI bots with strafe AI on procedural maps
- **Multiplayer** — WebSocket server, create/join rooms with 6-char code, CT vs T teams
- **Server-authoritative** — Movement, health, hits validated server-side (30 tps), with client-side prediction
- **Procedural textures** — Canvas-generated grass, brick, plaster, roof, concrete
- **ADS (Aim Down Sights)** — Right-click to zoom and center weapon
- **Third-person view** — Toggle with V key
- **Scoreboard** — Tab to show kills/deaths/score (solo + multiplayer)
- **Damage numbers** — Floating damage values, headshot icons in kill feed
- **Kill feed** — Weapon icons, headshot indicator, team colors
- **Death screen** — "Killed by X" overlay on death
- **In-game chat** — Press Enter to type
- **Graphics settings** — Quality presets (Low/Med/High/Ultra), shadow res, pixel ratio, tone mapping, fog
- **Deployable** — Single-port server serves client + WebSocket

## Controls

| Key | Action |
|-----|--------|
| WASD | Move |
| Mouse | Look / Aim |
| Left Click | Shoot |
| Right Click | ADS |
| Scroll / 1-4 | Switch weapon |
| Ctrl | Crouch |
| Shift | Sprint |
| R | Reload |
| Alt | Lock/unlock pointer |
| Escape | Pause / Menu |
| V | Toggle camera view |
| Tab | Scoreboard |
| Enter | Chat |

## Quick Start

```bash
npm install
npm install --prefix server
npm run build
npm run server
```

Open `http://localhost:3001` in your browser.

## Multiplayer

1. Click **Multiplayer** from the main menu
2. **Create Room** to host — share the 6-character code with friends
3. **Join Room** with a code
4. Host clicks **Start Game** when all players are ready

Players on the same network can connect directly. For online play, deploy the server to a VPS or PaaS (Fly.io, Railway, Render).

## Project Structure

```
├── server/          Node.js WebSocket server (GameRoom, MatchManager)
├── src/
│   ├── core/        Engine, state machine, settings, event bus
│   ├── player/      FPS controller, weapons, camera, hitbox, arms
│   ├── systems/     Map, spawn, audio, animation, bullets, bots, match logic
│   ├── ui/          HUD, menus, lobby, settings UI + styles
│   └── assets/      Asset loading, texture generation
├── maps/            Map JSON definitions
├── dist/            Built client
└── index.html       Entry point
```

## Tech Stack

- **Frontend**: Three.js 0.160, Vite, vanilla JS
- **Backend**: Node.js, ws (WebSocket), uuid
- **Deploy**: Fly.io / Railway / Render (single-port HTTP + WS)

## License

MIT
