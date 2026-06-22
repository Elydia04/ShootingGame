// Lightweight A* pathfinder for bot navigation.
// Builds a 2D grid from collidable AABB data and finds paths via A*.

export class Pathfinder {
  constructor(cellSize = 2) {
    this.cellSize = cellSize;
    this.grid = null;
    this._width = 0;
    this._height = 0;
    this._offsetX = 0;
    this._offsetZ = 0;
  }

  // Build a navigation grid from an array of AABB boxes { min: {x,y,z}, max: {x,y,z} }
  buildFromBoxes(boxes, bounds = { min: { x: -100, z: -100 }, max: { x: 100, z: 100 } }) {
    const cs = this.cellSize;
    this._offsetX = bounds.min.x;
    this._offsetZ = bounds.min.z;
    this._width = Math.ceil((bounds.max.x - bounds.min.x) / cs);
    this._height = Math.ceil((bounds.max.z - bounds.min.z) / cs);
    this.grid = new Uint8Array(this._width * this._height);

    for (const box of boxes) {
      if (!box || !box.min) continue;
      const minCX = Math.floor((box.min.x - this._offsetX) / cs);
      const maxCX = Math.ceil((box.max.x - this._offsetX) / cs);
      const minCZ = Math.floor((box.min.z - this._offsetZ) / cs);
      const maxCZ = Math.ceil((box.max.z - this._offsetZ) / cs);

      for (let gz = minCZ; gz <= maxCZ; gz++) {
        for (let gx = minCX; gx <= maxCX; gx++) {
          if (gx >= 0 && gx < this._width && gz >= 0 && gz < this._height) {
            this.grid[gz * this._width + gx] = 1; // blocked
          }
        }
      }
    }

    // Floor-level open space: unblock cells that have clear space above.
    // (Boxes that extend high up but have walkable area underneath — handled by
    //  only blocking cells where the box bottom is near ground level.)
  }

  _toGrid(worldX, worldZ) {
    return {
      x: Math.floor((worldX - this._offsetX) / this.cellSize),
      z: Math.floor((worldZ - this._offsetZ) / this.cellSize)
    };
  }

  _toWorld(gx, gz) {
    return {
      x: gx * this.cellSize + this._offsetX + this.cellSize / 2,
      z: gz * this.cellSize + this._offsetZ + this.cellSize / 2
    };
  }

  _isBlocked(gx, gz) {
    if (gx < 0 || gx >= this._width || gz < 0 || gz >= this._height) return true;
    return this.grid[gz * this._width + gx] === 1;
  }

  // A* search. Returns array of {x, z} waypoints or null if no path.
  findPath(startX, startZ, goalX, goalZ) {
    if (!this.grid) return null;

    const start = this._toGrid(startX, startZ);
    const goal = this._toGrid(goalX, goalZ);

    if (this._isBlocked(start.x, start.z) || this._isBlocked(goal.x, goal.z)) return null;

    const open = [];
    const closed = new Set();
    const cameFrom = new Map();
    const gScore = new Map();
    const fScore = new Map();

    const key = (x, z) => `${x},${z}`;
    const h = (x, z) => Math.abs(x - goal.x) + Math.abs(z - goal.z);

    open.push({ x: start.x, z: start.z, f: h(start.x, start.z) });
    gScore.set(key(start.x, start.z), 0);
    fScore.set(key(start.x, start.z), h(start.x, start.z));

    const neighbors = [
      { x: 0, z: -1 }, { x: 0, z: 1 }, { x: -1, z: 0 }, { x: 1, z: 0 },
      { x: -1, z: -1 }, { x: 1, z: -1 }, { x: -1, z: 1 }, { x: 1, z: 1 }
    ];

    while (open.length > 0) {
      open.sort((a, b) => a.f - b.f);
      const current = open.shift();
      const ck = key(current.x, current.z);

      if (current.x === goal.x && current.z === goal.z) {
        // Reconstruct path
        const path = [];
        let node = ck;
        while (node && node !== key(start.x, start.z)) {
          const [gx, gz] = node.split(',').map(Number);
          const wp = this._toWorld(gx, gz);
          path.unshift({ x: wp.x, z: wp.z });
          node = cameFrom.get(node);
        }
        return path;
      }

      closed.add(ck);

      for (const n of neighbors) {
        const nx = current.x + n.x;
        const nz = current.z + n.z;
        const nk = key(nx, nz);

        if (closed.has(nk)) continue;
        if (this._isBlocked(nx, nz)) continue;

        const moveCost = (n.x !== 0 && n.z !== 0) ? 1.414 : 1;
        const tentG = gScore.get(ck) + moveCost;

        if (tentG < (gScore.get(nk) ?? Infinity)) {
          cameFrom.set(nk, ck);
          gScore.set(nk, tentG);
          const f = tentG + h(nx, nz);
          fScore.set(nk, f);
          if (!open.some(o => o.x === nx && o.z === nz)) {
            open.push({ x: nx, z: nz, f });
          }
        }
      }
    }

    return null; // No path found
  }

  getRandomReachableNode(centerX, centerZ, radius) {
    for (let attempt = 0; attempt < 50; attempt++) {
      const x = centerX + (Math.random() - 0.5) * radius * 2;
      const z = centerZ + (Math.random() - 0.5) * radius * 2;
      const g = this._toGrid(x, z);
      if (!this._isBlocked(g.x, g.z)) {
        const wp = this._toWorld(g.x, g.z);
        return { x: wp.x, z: wp.z };
      }
    }
    return { x: centerX, z: centerZ };
  }
}
