const STORAGE_PREFIX = 'shooting_game_';

export class SaveManager {
  constructor() {
    this.available = typeof localStorage !== 'undefined';
    this.cache = new Map();
  }

  _key(key) {
    return STORAGE_PREFIX + key;
  }

  save(key, data) {
    if (!this.available) return false;
    try {
      const serialized = JSON.stringify(data);
      localStorage.setItem(this._key(key), serialized);
      this.cache.set(key, data);
      return true;
    } catch (e) {
      console.warn(`[SaveManager] Failed to save ${key}:`, e);
      return false;
    }
  }

  load(key, defaultValue = null) {
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }

    if (!this.available) return defaultValue;

    try {
      const raw = localStorage.getItem(this._key(key));
      if (raw === null) return defaultValue;
      const data = JSON.parse(raw);
      this.cache.set(key, data);
      return data;
    } catch (e) {
      console.warn(`[SaveManager] Failed to load ${key}:`, e);
      return defaultValue;
    }
  }

  delete(key) {
    this.cache.delete(key);
    if (!this.available) return;
    localStorage.removeItem(this._key(key));
  }

  clear() {
    this.cache.clear();
    if (!this.available) return;
    const keys = Object.keys(localStorage).filter(k =>
      k.startsWith(STORAGE_PREFIX)
    );
    keys.forEach(k => localStorage.removeItem(k));
  }
}
