const Prompt = require('./prompt');
const transitionTo = require('../utils/transition-to.js');

class ListPrompt extends Prompt {

  _run() {
    for (let i=0; i < this.question.choices.realLength; i++) {
      const choice = this.question.choices.getChoice(i);
      if (this._alreadyAnswered(choice.value)) {
        continue;
      } else {
        return this._answer(choice);
      }
    }
    const incompletes = this.model.getIncomplete();
    if (incompletes) {
      return this._answer(transitionTo(incompletes[0]));
    } else {
      return this._answer(this.question.choices.getChoice(0));
    }
  }

}

module.exports = ListPrompt;
