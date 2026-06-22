// Generic finite state machine for weapon lifecycle.
export class FiniteStateMachine {
  constructor() {
    this.states = new Map();
    this.currentState = null;
    this._previousState = null;
  }

  addState(name, instance) {
    instance._fsm = this;
    instance._name = name;
    this.states.set(name, instance);
  }

  setState(name) {
    if (name === this._currentName) return;
    if (!this.states.has(name)) return;

    this._previousState = this.currentState;
    this._previousName = this._currentName;

    if (this.currentState && this.currentState.exit) this.currentState.exit();

    this.currentState = this.states.get(name);
    this._currentName = name;

    if (this.currentState && this.currentState.enter) this.currentState.enter(this._previousState);
  }

  update(deltaTime) {
    if (this.currentState && this.currentState.update) this.currentState.update(deltaTime);
  }

  get currentName() { return this._currentName; }
  get previousName() { return this._previousName; }
}
