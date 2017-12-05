const Prompt = require('./prompt');

class ExpandPrompt extends Prompt {

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
    if (incompletes && incompletes.length > 0) {
      const transName = this.model.findTransition(this.question.name, incompletes[0]);
      if (transName) {
        return this._answer(transName);
      } else {
        return this._answer(this.question.choices.getChoice(0));
      }
    } else {
      return this._answer(this.question.choices.getChoice(0));
    }
  }

}

module.exports = ExpandPrompt;
