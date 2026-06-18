import http from 'http';
import fs from 'fs';
import path from 'path';
import { WebSocketServer } from 'ws';
import { v4 as uuidv4 } from 'uuid';
import { GameRoom } from './GameRoom.js';

const PORT = process.env.PORT || 3001;
const DIST = path.resolve('dist');

const MIME = {
  '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon', '.json': 'application/json', '.glb': 'model/gltf-binary'
};

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true, rooms: rooms.size }));
    return;
  }

  let filePath = req.url === '/' ? '/index.html' : req.url;
  filePath = path.join(DIST, filePath);

  if (!filePath.startsWith(DIST)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      fs.readFile(path.join(DIST, 'index.html'), (err2, data2) => {
        if (err2) {
          res.writeHead(404);
          res.end('Not found');
          return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data2);
      });
      return;
    }
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

function sanitizeName(name) {
  if (!name || typeof name !== 'string') return 'Player';
  return name.replace(/[^a-zA-Z0-9_\s-]/g, '').slice(0, 20).trim() || 'Player';
}

const wss = new WebSocketServer({ server, path: '/ws' });
const rooms = new Map();

wss.on('connection', (ws) => {
  const playerId = uuidv4().slice(0, 8);
  let currentRoom = null;

  ws.send(JSON.stringify({ type: 'connected', data: { id: playerId } }));

  ws.on('message', (raw) => {
    let msg;
    try {
      msg = JSON.parse(raw);
    } catch {
      return;
    }

    switch (msg.type) {
      case 'create_room': {
        const code = msg.data?.code || Math.random().toString(36).slice(2, 8).toUpperCase();
        if (rooms.has(code)) {
          ws.send(JSON.stringify({ type: 'error', data: { message: 'Room code already in use' } }));
          return;
        }
        const room = new GameRoom(code);
        rooms.set(code, room);
        if (msg.data?.config) room.configure(msg.data.config);
        room.addPlayer(playerId, sanitizeName(msg.data?.name), ws);
        currentRoom = room;
        ws.send(JSON.stringify({ type: 'room_created', data: { code, players: room.getPlayerList() } }));
        break;
      }
      case 'join_room': {
        const code = msg.data?.code?.toUpperCase();
        if (!code || !rooms.has(code)) {
          ws.send(JSON.stringify({ type: 'error', data: { message: 'Room not found' } }));
          return;
        }
        const room = rooms.get(code);
        if (room.players.size >= 8) {
          ws.send(JSON.stringify({ type: 'error', data: { message: 'Room full' } }));
          return;
        }
        room.addPlayer(playerId, sanitizeName(msg.data?.name), ws);
        currentRoom = room;
        if (room.state === 'lobby') {
          const config = room.getConfig();
          ws.send(JSON.stringify({ type: 'room_joined', data: { code, players: room.getPlayerList(), config } }));
        } else {
          ws.send(JSON.stringify({ type: 'joined_active_game', data: { code, players: room.getPlayerList(), config: room.getConfig(), mapId: room.mapId } }));
          ws.send(JSON.stringify({ type: 'score_update', data: { teamScores: room.matchManager._getTeamScores() } }));
          ws.send(room._buildStateMessage());
        }
        break;
      }
      case 'player_ready': {
        if (currentRoom) currentRoom.setReady(playerId, msg.data?.ready ?? true);
        break;
      }
      case 'join_available_room': {
        let targetRoom = null;
        for (const [, room] of rooms) {
          if (room.state === 'lobby' && room.players.size < 8) {
            targetRoom = room;
            break;
          }
        }
        if (!targetRoom) {
          ws.send(JSON.stringify({ type: 'error', data: { message: 'No lobby available on this server' } }));
          return;
        }
        targetRoom.addPlayer(playerId, sanitizeName(msg.data?.name), ws);
        currentRoom = targetRoom;
        const config = targetRoom.getConfig();
        ws.send(JSON.stringify({ type: 'room_joined', data: { code: targetRoom.code, players: targetRoom.getPlayerList(), config } }));
        break;
      }
      case 'start_game': {
        if (currentRoom && currentRoom.hostId === playerId) {
          if (msg.data?.config) currentRoom.configure(msg.data.config);
          currentRoom.startGame();
        }
        break;
      }
      case 'input': {
        if (currentRoom && currentRoom.state === 'playing') {
          currentRoom.handleInput(playerId, msg.data, msg.time);
        }
        break;
      }
      case 'ping': {
        ws.send(JSON.stringify({ type: 'pong', serverTime: Date.now(), clientTime: msg.data?.clientTime }));
        break;
      }
      case 'chat': {
        if (currentRoom && currentRoom.state === 'playing') {
          currentRoom.handleChat(playerId, msg.data?.message);
        }
        break;
      }
      case 'regenerate_code': {
        if (currentRoom && currentRoom.hostId === playerId) {
          let newCode;
          do {
            newCode = Math.random().toString(36).slice(2, 8).toUpperCase();
          } while (rooms.has(newCode));
          rooms.delete(currentRoom.code);
          currentRoom.code = newCode;
          rooms.set(newCode, currentRoom);
          currentRoom._broadcast({ type: 'code_updated', data: { code: newCode } });
        }
        break;
      }
    }
  });

  ws.on('close', () => {
    if (currentRoom) {
      currentRoom.removePlayer(playerId);
      if (currentRoom.players.size === 0) {
        rooms.delete(currentRoom.code);
      }
    }
  });
});

server.listen(PORT, () => {
  console.log(`[Server] Listening on port ${PORT}`);
});
