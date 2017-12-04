class Model {
  constructor() {
    this.configs = [];
    this.states = {};
  }

  currentQuestion(name) {
    const prevState = this.states[this.prevName];
    if (prevState) {
      prevState.transitions[this.prevTransition] = name;
    }
    let state = this.states[name];
    if (!state) {
      this.states[name] = state = { name, transitions: {} };
    }
    return state;
  }

  prevQuestion(name, transition) {
    this.prevName = name;
    this.prevTransition = transition;
  }

  isComplete() {
    const stateNames = Object.keys(this.states);
    if (stateNames.length === 0) {
      return false;
    } else {
      for (let i=0; i < stateNames.length; i++) {
        const state = this.states[stateNames[i]];
        if (Object.keys(state.transitions).length < state.expectedTransitions) {
          return false;
        }
      }
      return true;
    }
  }

  /**
   *
   * @return {Array} a list of non fully answered question;
   *                 or null if no question answered at all
   */
  getIncomplete() {
    const incompletes = [];
    const stateNames = Object.keys(this.states);
    if (stateNames.length === 0) {
      return null;
    } else {
      for (let i=0; i < stateNames.length; i++) {
        const state = this.states[stateNames[i]];
        if (Object.keys(state.transitions).length < state.expectedTransitions) {
          incompletes.push(stateNames[i]);
        }
      }
    }
    return incompletes;
  }

  addConfig(config) {
    this.configs.push(config);
  }

  getConfigs() {
    return {
      config: this.configs,
      states: this.states
    };
  }
}

module.exports = Model;
