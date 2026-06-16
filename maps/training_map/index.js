export const trainingMap = {
  id: 'training_map',
  name: 'Training Grounds',
  description: 'A town training area with roads, houses, and open fields.',

  ground: {
    size: 240,
    color: 0x7a9a7a,
    y: 0
  },

  lighting: {
    ambient: { color: 0x808080, intensity: 0.7 },
    directional: { color: 0xffffff, intensity: 1.3, x: 30, y: 60, z: 30 },
    hemisphere: { skyColor: 0xaaccff, groundColor: 0x556655, intensity: 0.4 }
  },

  skybox: {
    color: 0xaaccff,
    fogNear: 120,
    fogFar: 250
  },

  bounds: {
    size: 240,
    height: 8
  },

  buildings: [
    // House 1 (single story) - left side of town
    { type: 'house1', x: -50, z: -40, rotation: 0.3 },
    { type: 'house1', x: -55, z: 10, rotation: -0.8 },
    { type: 'house1', x: -40, z: 60, rotation: 0.5 },

    // House 2 (2 floors + rooftop) - center-right area
    { type: 'house2', x: 30, z: -35, rotation: 0 },
    { type: 'house2', x: 35, z: 55, rotation: Math.PI },

    // House 3 (3 floors) - far end
    { type: 'house3', x: 75, z: 0, rotation: 0.2 },
  ],

  trees: [
    // Large trees around the town
    { x: -70, z: -60, scale: 1.8 },
    { x: -60, z: -70, scale: 2.0 },
    { x: -80, z: -30, scale: 1.6 },
    { x: -80, z: 30, scale: 1.7 },
    { x: -70, z: 70, scale: 1.9 },
    { x: -60, z: 80, scale: 1.5 },

    { x: 70, z: -60, scale: 1.8 },
    { x: 80, z: -30, scale: 1.6 },
    { x: 80, z: 30, scale: 1.7 },
    { x: 70, z: 70, scale: 2.0 },

    { x: -20, z: -70, scale: 1.5 },
    { x: 20, z: -70, scale: 1.4 },
    { x: 0, z: -75, scale: 1.6 },

    { x: -20, z: 75, scale: 1.5 },
    { x: 20, z: 75, scale: 1.4 },
  ],

  objects: [
    // Center road
    { type: 'box', width: 8, height: 0.1, depth: 200, x: 0, z: 0, color: 0x555555, roughness: 0.9 },

    // Cross road
    { type: 'box', width: 200, height: 0.1, depth: 8, x: 0, z: 0, color: 0x555555, roughness: 0.9 },

    // Training crates
    { type: 'box', width: 2, height: 4, depth: 2, x: -10, z: -5, color: 0xcc4444, roughness: 0.5 },
    { type: 'box', width: 2, height: 4, depth: 2, x: 0, z: -8, color: 0x44cc44, roughness: 0.5 },
    { type: 'box', width: 2, height: 4, depth: 2, x: 10, z: -5, color: 0x4444cc, roughness: 0.5 },
    { type: 'box', width: 2, height: 4, depth: 2, x: -5, z: 5, color: 0xcccc44, roughness: 0.5 },
    { type: 'box', width: 2, height: 4, depth: 2, x: 5, z: 5, color: 0xcc44cc, roughness: 0.5 },

    { type: 'box', width: 1, height: 0.5, depth: 1, x: -10, z: -15, color: 0xaaaaaa },
    { type: 'box', width: 1, height: 0.5, depth: 1, x: 0, z: -18, color: 0xaaaaaa },
    { type: 'box', width: 1, height: 0.5, depth: 1, x: 10, z: -15, color: 0xaaaaaa },
    { type: 'box', width: 1, height: 0.5, depth: 1, x: -15, z: -10, color: 0xaaaaaa },
    { type: 'box', width: 1, height: 0.5, depth: 1, x: 15, z: -10, color: 0xaaaaaa },

    { type: 'box', width: 4, height: 2, depth: 4, x: 0, z: 15, color: 0x888888, roughness: 0.7 },

    // Small cover walls near roads
    { type: 'box', width: 3, height: 1.5, depth: 0.5, x: -14, z: 0, color: 0x666666, roughness: 0.8 },
    { type: 'box', width: 3, height: 1.5, depth: 0.5, x: 14, z: 0, color: 0x666666, roughness: 0.8 },
  ],

  spawns: [
    { x: -15, y: 0, z: -15, type: 'player' },
    { x: 15, y: 0, z: -15, type: 'player' },
    { x: -10, y: 0, z: -10, type: 'player' },
    { x: 10, y: 0, z: -10, type: 'player' },
    { x: 0, y: 0, z: -12, type: 'player' },
    { x: -30, y: 0, z: 0, type: 'enemy' },
    { x: 30, y: 0, z: 0, type: 'enemy' },
    { x: 0, y: 0, z: -35, type: 'enemy' },
    { x: -45, y: 0, z: -30, type: 'enemy' },
    { x: 50, y: 0, z: 30, type: 'enemy' },
  ],

  walls: [
    { width: 20, height: 4, depth: 1, x: 0, z: -30, color: 0x666666 },
    { width: 1, height: 4, depth: 20, x: -25, z: -10, color: 0x666666 },
    { width: 20, height: 4, depth: 1, x: 10, z: 25, color: 0x666666 },
    { width: 1, height: 4, depth: 20, x: 25, z: 10, color: 0x666666 }
  ]
};
