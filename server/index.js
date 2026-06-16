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

const wss = new WebSocketServer({ server, path: '/ws' });
const rooms = new Map();

function getOrCreateRoom(code) {
  if (!rooms.has(code)) {
    rooms.set(code, new GameRoom(code));
  }
  return rooms.get(code);
}

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
        const code = Math.random().toString(36).slice(2, 6).toUpperCase();
        const room = getOrCreateRoom(code);
        room.addPlayer(playerId, msg.data?.name || 'Player', ws);
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
        if (room.state !== 'lobby') {
          ws.send(JSON.stringify({ type: 'error', data: { message: 'Game already in progress' } }));
          return;
        }
        room.addPlayer(playerId, msg.data?.name || 'Player', ws);
        currentRoom = room;
        ws.send(JSON.stringify({ type: 'room_joined', data: { code, players: room.getPlayerList() } }));
        break;
      }
      case 'player_ready': {
        if (currentRoom) currentRoom.setReady(playerId, msg.data?.ready ?? true);
        break;
      }
      case 'start_game': {
        if (currentRoom && currentRoom.hostId === playerId) {
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
