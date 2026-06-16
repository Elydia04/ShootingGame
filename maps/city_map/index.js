export const cityMap = {
  id: 'city_map',
  name: 'City',
  description: 'Urban combat zone with streets and buildings.',

  ground: {
    size: 200,
    color: 0x555555,
    y: 0
  },

  lighting: {
    ambient: { color: 0x606080, intensity: 0.4 },
    directional: { color: 0xffffff, intensity: 0.8, x: 30, y: 100, z: 50 },
    hemisphere: { skyColor: 0x88aacc, groundColor: 0x443322, intensity: 0.3 }
  },

  skybox: {
    color: 0x88aacc,
    fogNear: 60,
    fogFar: 180
  },

  bounds: {
    size: 200,
    height: 20
  },

  trees: [
    { x: -28, z: -28, scale: 0.7 },
    { x: 28, z: -28, scale: 0.8 },
    { x: -28, z: 28, scale: 0.75 },
    { x: 28, z: 28, scale: 0.7 },
    { x: -25, z: 0, scale: 0.6 },
    { x: 25, z: 0, scale: 0.65 },
    { x: 0, z: -28, scale: 0.7 },
    { x: 0, z: 28, scale: 0.75 },
    { x: -30, z: -10, scale: 0.8 },
    { x: 30, z: 12, scale: 0.7 },
    { x: -10, z: -30, scale: 0.65 },
    { x: 12, z: 30, scale: 0.7 },
  ],

  objects: [
    { type: 'box', width: 8, height: 12, depth: 8, x: -20, z: -20, color: 0x888888, roughness: 0.5, metalness: 0.3 },
    { type: 'box', width: 6, height: 8, depth: 6, x: 20, z: -15, color: 0x777777, roughness: 0.5, metalness: 0.3 },
    { type: 'box', width: 10, height: 16, depth: 10, x: -15, z: 20, color: 0x999999, roughness: 0.5, metalness: 0.3 },
    { type: 'box', width: 7, height: 10, depth: 7, x: 18, z: 18, color: 0x666666, roughness: 0.5, metalness: 0.3 },

    { type: 'box', width: 2, height: 0.5, depth: 2, x: -8, z: -5, color: 0xaaaaaa, roughness: 0.4 },
    { type: 'box', width: 1.5, height: 0.4, depth: 1.5, x: 5, z: 8, color: 0xbbbbbb, roughness: 0.4 },
    { type: 'box', width: 2.5, height: 0.6, depth: 2.5, x: -5, z: 10, color: 0x999999, roughness: 0.4 },

    { type: 'cylinder', radius: 0.3, height: 3, x: -12, z: -8, color: 0x666666, roughness: 0.3 }
  ],

  spawns: [
    { x: -25, y: 0, z: -25, type: 'player', team: 'red' },
    { x: -22, y: 0, z: -22, type: 'player', team: 'red' },
    { x: 25, y: 0, z: 25, type: 'player', team: 'blue' },
    { x: 22, y: 0, z: 22, type: 'player', team: 'blue' },
    { x: -10, y: 0, z: -10, type: 'player' },
    { x: 10, y: 0, z: 10, type: 'player' },
    { x: 0, y: 0, z: -30, type: 'enemy' },
    { x: 0, y: 0, z: 30, type: 'enemy' }
  ],

  walls: [
    { width: 30, height: 4, depth: 1, x: -15, z: 0, color: 0x777777 },
    { width: 1, height: 4, depth: 30, x: 15, z: 0, color: 0x777777 },
    { width: 20, height: 3, depth: 1, x: 5, z: -12, color: 0x666666 },
    { width: 1, height: 3, depth: 20, x: -5, z: 12, color: 0x666666 }
  ]
};
