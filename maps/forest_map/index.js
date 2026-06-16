export const forestMap = {
  id: 'forest_map',
  name: 'Forest',
  description: 'A dense forest with scattered ruins.',

  ground: {
    size: 200,
    color: 0x2d5a27,
    y: 0
  },

  lighting: {
    ambient: { color: 0x404060, intensity: 0.35 },
    directional: { color: 0xffeedd, intensity: 0.7, x: 60, y: 80, z: 40 },
    hemisphere: { skyColor: 0x87ceeb, groundColor: 0x362d22, intensity: 0.25 }
  },

  skybox: {
    color: 0x6b8e6b,
    fogNear: 40,
    fogFar: 150
  },

  bounds: {
    size: 200,
    height: 8
  },

  trees: [
    { x: -15, z: -12, scale: 0.9 },
    { x: 12, z: -18, scale: 0.8 },
    { x: -8, z: 20, scale: 1.1 },
    { x: 22, z: 15, scale: 0.85 },
    { x: -20, z: -5, scale: 1.0 },
    { x: 5, z: 25, scale: 0.75 },
    { x: -25, z: 10, scale: 1.2 },
    { x: 18, z: -8, scale: 0.7 },
    { x: -30, z: -18, scale: 1.0 },
    { x: 28, z: -22, scale: 0.9 },
    { x: -35, z: 15, scale: 0.8 },
    { x: 30, z: 22, scale: 1.0 },
    { x: -22, z: -28, scale: 0.85 },
    { x: 15, z: -30, scale: 1.1 },
    { x: -28, z: 28, scale: 0.75 },
    { x: 25, z: 30, scale: 0.9 },
    { x: -12, z: -32, scale: 1.0 },
    { x: 32, z: -12, scale: 0.8 },
    { x: -32, z: -30, scale: 1.05 },
    { x: 35, z: 28, scale: 0.9 },
    { x: -5, z: -25, scale: 0.7 },
    { x: 8, z: 30, scale: 0.95 },
    { x: -18, z: 25, scale: 1.0 },
    { x: 20, z: -25, scale: 0.85 },
    { x: -25, z: -15, scale: 0.9 },
    { x: 0, z: 28, scale: 0.8 },
  ],

  objects: [
    { type: 'box', width: 3, height: 2.5, depth: 3, x: -5, z: -8, color: 0x666666, roughness: 0.7 },
    { type: 'box', width: 2, height: 1.5, depth: 2, x: 10, z: 12, color: 0x777777, roughness: 0.7 },
    { type: 'box', width: 4, height: 3, depth: 4, x: -15, z: 18, color: 0x555555, roughness: 0.7 },
    { type: 'box', width: 1.5, height: 1, depth: 1.5, x: 8, z: -15, color: 0x888888, roughness: 0.7 }
  ],

  spawns: [
    { x: -10, y: 0, z: -10, type: 'player', team: 'red' },
    { x: -15, y: 0, z: -15, type: 'player', team: 'red' },
    { x: 10, y: 0, z: 10, type: 'player', team: 'blue' },
    { x: 15, y: 0, z: 15, type: 'player', team: 'blue' },
    { x: -5, y: 0, z: -5, type: 'player' },
    { x: 5, y: 0, z: 5, type: 'player' },
    { x: 0, y: 0, z: -20, type: 'enemy' },
    { x: 0, y: 0, z: 20, type: 'enemy' }
  ],

  walls: [
    { width: 8, height: 3, depth: 1, x: -10, z: -3, color: 0x555555 },
    { width: 1, height: 3, depth: 8, x: 10, z: 5, color: 0x555555 },
    { width: 6, height: 2.5, depth: 1, x: -3, z: 12, color: 0x666666 }
  ]
};
