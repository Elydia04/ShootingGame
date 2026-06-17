export const WeaponType = Object.freeze({
  PISTOL: 'Pistol',
  RIFLE: 'Rifle',
  SMG: 'SMG',
  SHOTGUN: 'Shotgun',
  SNIPER: 'Sniper',
  KNIFE: 'Knife'
});

const WEAPON_DEFS = {
  [WeaponType.PISTOL]: {
    name: 'Pistol',
    damage: 15,
    fireRate: 0.25,
    magSize: 12,
    reserve: 48,
    reloadTime: 1.2,
    spread: 0.05,
    recoil: 0.02,
    range: 50,
    automatic: false
  },
  [WeaponType.RIFLE]: {
    name: 'Rifle',
    damage: 25,
    fireRate: 0.1,
    magSize: 30,
    reserve: 90,
    reloadTime: 2.0,
    spread: 0.02,
    recoil: 0.04,
    range: 100,
    automatic: true
  },
  [WeaponType.SMG]: {
    name: 'SMG',
    damage: 12,
    fireRate: 0.07,
    magSize: 35,
    reserve: 105,
    reloadTime: 1.8,
    spread: 0.06,
    recoil: 0.03,
    range: 60,
    automatic: true
  },
  [WeaponType.SHOTGUN]: {
    name: 'Shotgun',
    damage: 10,
    pellets: 8,
    fireRate: 0.8,
    magSize: 8,
    reserve: 32,
    reloadTime: 2.5,
    spread: 0.15,
    recoil: 0.1,
    range: 30,
    automatic: false
  },
  [WeaponType.SNIPER]: {
    name: 'Sniper',
    damage: 80,
    fireRate: 1.2,
    magSize: 5,
    reserve: 20,
    reloadTime: 3.0,
    spread: 0.001,
    recoil: 0.15,
    range: 200,
    automatic: false
  },
  [WeaponType.KNIFE]: {
    name: 'Knife',
    damage: 35,
    fireRate: 0.3,
    magSize: 99999,
    reserve: 99999,
    reloadTime: 0,
    spread: 0,
    recoil: 0.05,
    range: 2.5,
    automatic: false,
    melee: true
  }
};

export class Weapon {
  constructor(type) {
    const def = WEAPON_DEFS[type];
    if (!def) throw new Error(`Unknown weapon type: ${type}`);

    this.type = type;
    this.name = def.name;
    this.damage = def.damage;
    this.fireRate = def.fireRate;
    this.magSize = def.magSize;
    this.maxReserve = def.reserve;
    this.reloadTime = def.reloadTime;
    this.spread = def.spread;
    this.recoil = def.recoil;
    this.range = def.range;
    this.automatic = def.automatic;
    this.pellets = def.pellets || 1;
    this.melee = def.melee || false;

    this.currentAmmo = def.magSize;
    this.reserveAmmo = def.reserve;
    this.lastFireTime = 0;
    this.reloading = false;
    this.reloadProgress = 0;
  }

  canFire(currentTime) {
    if (this.reloading) return false;
    if (this.currentAmmo <= 0) return false;
    return (currentTime - this.lastFireTime) >= this.fireRate;
  }

  fire(currentTime) {
    if (!this.canFire(currentTime)) return null;

    this.lastFireTime = currentTime;
    if (!this.melee) this.currentAmmo--;

    const shots = [];
    for (let i = 0; i < this.pellets; i++) {
      shots.push({
        spreadX: (Math.random() - 0.5) * this.spread,
        spreadY: (Math.random() - 0.5) * this.spread,
        damage: this.damage
      });
    }

    if (!this.melee && this.currentAmmo <= 0 && this.reserveAmmo > 0) {
      this.startReload();
    }

    return { shots, recoil: this.recoil };
  }

  startReload() {
    if (this.reloading) return false;
    if (this.currentAmmo >= this.magSize) return false;
    if (this.reserveAmmo <= 0) return false;

    this.reloading = true;
    this.reloadProgress = 0;
    return true;
  }

  updateReload(deltaTime) {
    if (!this.reloading) return;

    this.reloadProgress += deltaTime;
    if (this.reloadProgress >= this.reloadTime) {
      const needed = this.magSize - this.currentAmmo;
      const available = Math.min(needed, this.reserveAmmo);
      this.currentAmmo += available;
      this.reserveAmmo -= available;
      this.reloading = false;
      this.reloadProgress = 0;
      return true;
    }
    return false;
  }

  addAmmo(amount) {
    this.reserveAmmo = Math.min(this.maxReserve, this.reserveAmmo + amount);
  }

  getState() {
    return {
      type: this.type,
      name: this.name,
      currentAmmo: this.currentAmmo,
      reserveAmmo: this.reserveAmmo,
      reloading: this.reloading,
      reloadProgress: this.reloadProgress
    };
  }
}

export class WeaponManager {
  constructor() {
    this.weapons = [];
    this.currentIndex = 0;
    this.lastFireTime = 0;
    this.onWeaponSwitch = null;
  }

  addWeapon(type) {
    const weapon = new Weapon(type);
    this.weapons.push(weapon);
    return weapon;
  }

  removeWeapon(type) {
    const idx = this.weapons.findIndex(w => w.type === type);
    if (idx !== -1) {
      if (this.currentIndex >= idx && this.currentIndex > 0) {
        this.currentIndex--;
      }
      this.weapons.splice(idx, 1);
    }
  }

  switchTo(index) {
    if (index < 0 || index >= this.weapons.length) return false;
    if (index === this.currentIndex) return false;

    this.currentIndex = index;
    if (this.onWeaponSwitch) {
      this.onWeaponSwitch(this.getCurrentWeapon());
    }
    return true;
  }

  switchToNext() {
    const next = (this.currentIndex + 1) % this.weapons.length;
    return this.switchTo(next);
  }

  switchToPrev() {
    const prev = (this.currentIndex - 1 + this.weapons.length) % this.weapons.length;
    return this.switchTo(prev);
  }

  getCurrentWeapon() {
    return this.weapons[this.currentIndex] || null;
  }

  fire(currentTime) {
    const weapon = this.getCurrentWeapon();
    if (!weapon) return null;
    return weapon.fire(currentTime);
  }

  reload() {
    const weapon = this.getCurrentWeapon();
    return weapon ? weapon.startReload() : false;
  }

  update(deltaTime) {
    for (const weapon of this.weapons) {
      weapon.updateReload(deltaTime);
      if (weapon.currentAmmo <= 0 && weapon.reserveAmmo > 0 && !weapon.reloading && !weapon.melee) {
        weapon.startReload();
      }
    }
  }

  getState() {
    return {
      weapons: this.weapons.map(w => w.getState()),
      currentIndex: this.currentIndex
    };
  }
}
