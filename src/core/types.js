/**
 * @module Types
 * Data contracts used across the project.
 */

/**
 * @typedef {Object} MapConfig
 * @property {string} id
 * @property {string} name
 * @property {string} [description]
 * @property {GroundConfig} [ground]
 * @property {LightingConfig} [lighting]
 * @property {SkyboxConfig} [skybox]
 * @property {BoundsConfig} [bounds]
 * @property {BuildingConfig[]} [buildings]
 * @property {TreeConfig[]} [trees]
 * @property {ObjectConfig[]} [objects]
 * @property {WallConfig[]} [walls]
 * @property {SpawnConfig[]} [spawns]
 * @property {boolean} [mountains]
 */

/**
 * @typedef {Object} GroundConfig
 * @property {number} [size]
 * @property {number} [color]
 * @property {number} [y]
 */

/**
 * @typedef {Object} LightingConfig
 * @property {Object} [ambient]
 * @property {number} [ambient.color]
 * @property {number} [ambient.intensity]
 * @property {Object} [directional]
 * @property {number} [directional.color]
 * @property {number} [directional.intensity]
 * @property {number} [directional.x]
 * @property {number} [directional.y]
 * @property {number} [directional.z]
 * @property {Object} [hemisphere]
 * @property {number} [hemisphere.skyColor]
 * @property {number} [hemisphere.groundColor]
 * @property {number} [hemisphere.intensity]
 */

/**
 * @typedef {Object} SkyboxConfig
 * @property {number} [color]
 * @property {number} [fogNear]
 * @property {number} [fogFar]
 */

/**
 * @typedef {Object} BoundsConfig
 * @property {number} [size]
 * @property {number} [height]
 */

/**
 * @typedef {Object} BuildingConfig
 * @property {'house1'|'house2'|'house3'} type
 * @property {number} x
 * @property {number} z
 * @property {number} [rotation]
 * @property {Object} [options]
 * @property {number} [options.width]
 * @property {number} [options.depth]
 * @property {number} [options.wallHeight]
 * @property {number} [options.floorHeight]
 * @property {number} [options.wallColor]
 * @property {number} [options.roofColor]
 * @property {number} [options.trimColor]
 */

/**
 * @typedef {Object} TreeConfig
 * @property {number} x
 * @property {number} z
 * @property {number} [scale]
 * @property {number} [rotation]
 * @property {string} [type]
 */

/**
 * @typedef {Object} WallConfig
 * @property {number} width
 * @property {number} height
 * @property {number} depth
 * @property {number} [x]
 * @property {number} [z]
 * @property {number} [color]
 * @property {number} [rotation]
 */

/**
 * @typedef {Object} SpawnConfig
 * @property {number} x
 * @property {number} y
 * @property {number} z
 * @property {'player'|'enemy'} type
 */

/**
 * @typedef {Object} ObjectConfig
 * @property {'box'|'sphere'|'cylinder'|'ramp'} type
 * @property {number} [width]
 * @property {number} [height]
 * @property {number} [depth]
 * @property {number} [radius]
 * @property {number} [x]
 * @property {number} [z]
 * @property {number} [y]
 * @property {number} [color]
 * @property {number} [roughness]
 * @property {number} [scale]
 * @property {Object} [rotation]
 * @property {number} [rotation.x]
 * @property {number} [rotation.y]
 * @property {number} [rotation.z]
 */

/**
 * @typedef {Object} CollidableObject
 * Three.js mesh or group that participates in collision detection.
 * Tagged via userData flags.
 * @property {Object} userData
 * @property {boolean} [userData.isWall]
 * @property {boolean} [userData.isMapObject]
 * @property {boolean} [userData.isBoundary]
 * @property {boolean} [userData.isTree]
 * @property {boolean} [userData.isBuilding]
 * @property {boolean} [userData.isMountain]
 */

/**
 * @typedef {Object} WeaponState
 * @property {string} type
 * @property {string} name
 * @property {number} currentAmmo
 * @property {number} reserveAmmo
 * @property {number} magSize
 * @property {boolean} automatic
 * @property {number} fireRate
 * @property {number} reloadTime
 * @property {function(number): boolean} canFire
 */

/**
 * @typedef {Object} BotFireResult
 * @property {import('three').Vector3} origin
 * @property {import('three').Vector3} direction
 * @property {number} damage
 * @property {import('three').Vector3} [botPosition]
 */

export default {};
