// ── Finite state machine for application lifecycle ───
// States: Loading → MainMenu → (SoloSetup | MultiLobby) → Playing → ...
// Transitions are validated against a whitelist (TRANSITIONS map).
// Listeners can attach per-state or wildcard ('*').
export const States = Object.freeze({
  LOADING: 'Loading',
  MAIN_MENU: 'MainMenu',
  SOLO_SETUP: 'SoloSetup',
  MULTI_LOBBY: 'MultiLobby',
  PLAYING: 'Playing',
  SPECTATING: 'Spectating',
  MATCH_END: 'MatchEnd'
});

const TRANSITIONS = Object.freeze({
  [States.LOADING]: [States.MAIN_MENU],
  [States.MAIN_MENU]: [States.SOLO_SETUP, States.MULTI_LOBBY, States.SPECTATING],
  [States.SOLO_SETUP]: [States.PLAYING, States.MAIN_MENU],
  [States.MULTI_LOBBY]: [States.PLAYING, States.MAIN_MENU],
  [States.PLAYING]: [States.SPECTATING, States.MATCH_END, States.MAIN_MENU],
  [States.SPECTATING]: [States.MULTI_LOBBY, States.MATCH_END],
  [States.MATCH_END]: [States.SOLO_SETUP, States.MULTI_LOBBY, States.MAIN_MENU]
});

export class GameStateManager {
  constructor() {
    this.current = States.LOADING;
    this.previous = null;
    this.listeners = new Map();
    this.transitioning = false;
  }

  // Subscribe to a specific state transition. Returns unsubscribe fn.
  on(state, callback) {
    if (!this.listeners.has(state)) {
      this.listeners.set(state, []);
    }
    this.listeners.get(state).push(callback);
    return () => {
      const arr = this.listeners.get(state);
      if (arr) {
        const idx = arr.indexOf(callback);
        if (idx !== -1) arr.splice(idx, 1);
      }
    };
  }

  // Convenience: listen to all state transitions.
  onChange(callback) {
    return this.on('*', callback);
  }

  get current() {
    return this._current;
  }

  set current(val) {
    this._current = val;
  }

  get previous() {
    return this._previous;
  }

  set previous(val) {
    this._previous = val;
  }

  is(state) {
    return this.current === state;
  }

  canTransitionTo(state) {
    const allowed = TRANSITIONS[this.current];
    return allowed && allowed.includes(state);
  }

  // Attempt a state change. Rejects invalid transitions silently.
  transitionTo(newState, data = null) {
    if (this.transitioning) {
      console.warn(`[GameStateManager] Already transitioning, ignoring ${newState}`);
      return false;
    }

    if (!this.canTransitionTo(newState)) {
      console.warn(
        `[GameStateManager] Invalid transition: ${this.current} -> ${newState}`
      );
      return false;
    }

    this.transitioning = true;
    this.previous = this.current;
    this.current = newState;

    console.log(`[GameStateManager] ${this.previous} -> ${this.current}`);

    const listeners = this.listeners.get(newState);
    if (listeners) {
      for (const cb of listeners) {
        cb({ from: this.previous, to: newState, data });
      }
    }

    const wildcard = this.listeners.get('*');
    if (wildcard) {
      for (const cb of wildcard) {
        cb({ from: this.previous, to: newState, data });
      }
    }

    this.transitioning = false;
    return true;
  }

  reset() {
    this.current = States.LOADING;
    this.previous = null;
    this.transitioning = false;
  }
}
