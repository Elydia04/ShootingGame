export class ObjectPool {
  constructor(factory, reset, initialSize = 0) {
    this.factory = factory;
    this.reset = reset;
    this.pool = [];
    this.active = new Set();

    for (let i = 0; i < initialSize; i++) {
      const obj = this.factory();
      this.pool.push(obj);
    }
  }

  acquire() {
    let obj;
    if (this.pool.length > 0) {
      obj = this.pool.pop();
    } else {
      obj = this.factory();
    }
    this.active.add(obj);
    return obj;
  }

  release(obj) {
    if (this.active.delete(obj)) {
      this.reset(obj);
      this.pool.push(obj);
    }
  }

  releaseAll() {
    for (const obj of this.active) {
      this.reset(obj);
      this.pool.push(obj);
    }
    this.active.clear();
  }

  get activeCount() {
    return this.active.size;
  }

  get pooledCount() {
    return this.pool.length;
  }

  get totalCount() {
    return this.active.size + this.pool.length;
  }

  forEachActive(callback) {
    for (const obj of this.active) {
      callback(obj);
    }
  }

  disposeAll(disposeFn) {
    this.releaseAll();
    for (const obj of this.pool) {
      disposeFn(obj);
    }
    this.pool = [];
  }
}
