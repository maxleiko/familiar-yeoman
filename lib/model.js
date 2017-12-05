class Model {
  constructor() {
    this.init = false;
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
    if (this.init) {
      state.init = true;
      this.init = false;
    }
    return state;
  }

  prevQuestion(name, transition) {
    this.prevName = name;
    this.prevTransition = transition;
  }

  end() {
    this.init = true;
    this.states[this.prevName].end = true;
    this.prevName = null;
    this.prevTransition = null;
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

  /**
   * Returns the transition name to take in order to reach targetName state
   * @param  {String} curName    name of the state from where to start the search
   * @param  {String} targetName name of the state to reach
   * @return {String}            name of the transition to take
   */
  findTransition(curName, targetName) {
    const curState = this.states[curName];

    if (curState) {
      for (const name in curState.transitions) {
        const transState = curState.transitions[name];
        if (transState) {
          if (transState === targetName) {
            return name;
          } else {
            if (this.findTransition(transState, targetName)) {
              return name;
            }
          }
        }
      }
    }

    return null;
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
