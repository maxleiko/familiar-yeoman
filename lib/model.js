const converter = require('./utils/converter');

class Model {
  constructor() {
    this.init = false;
    this.configs = [];
    this.states = {};
    this.answers = {};
  }

  currentQuestion(name, type) {
    const prevState = this.states[this.prevName];
    if (prevState) {
      prevState.transitions[this.prevTransition] = name;
    }
    let state = this.states[name];
    if (!state) {
      this.states[name] = state = { name, type, transitions: {} };
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
        const transStateName = curState.transitions[name];
        if (transStateName) {
          if (transStateName === targetName) {
            return name;
          }
        }
      }

      if (!curState.end) {
        for (const name in curState.transitions) {
          const transStateName = curState.transitions[name];
          if (transStateName) {
            if (this.findTransition(transStateName, targetName)) {
              return name;
            }
          }
        }
      }
    }

    return null;
  }

  setAnswer(questionName, answer) {
    this.answers[questionName] = answer;
  }

  getAnswer(questionName) {
    return this.answers[questionName];
  }

  hasAnswer(questionName) {
    return this.answers.hasOwnProperty(questionName);
  }

  addConfig(config) {
    console.log('=================================');
    console.log(config);
    console.log();
    this.configs.push(config);
  }

  getConfigs() {
    const configs = {};
    this.configs.forEach((config) => {
      Object.keys(config).forEach((key) => {
        if (!configs.hasOwnProperty(key)) {
          configs[key] = null;
        }
      });
    });

    const keys = Object.keys(configs);
    let csv = keys.join(';') + '\n';

    this.configs.forEach((config) => {
      keys.forEach((key) => {
        let value = converter(config[key]);
        if (value === null) {
          value = 'null';
        } else if (typeof value === 'string') {
          value = `"${value.trim()}"`;
        } else if (value === undefined) {
          value = '';
        }
        csv += value + ';';
      });
      csv += '\n';
    });

    return csv;
  }
}

module.exports = Model;
