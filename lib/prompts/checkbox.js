const Prompt = require('./prompt');
const combine = require('../utils/combine');

class CheckboxPrompt extends Prompt {

  _run() {
    let combinedChoices = [];
    if (this.question.choices.realLength > 10) {
      console.warn(`Question "${this.question.name}" has ${this.question.choices.realLength} choices which means 2^${this.question.choices.realLength} combined possibilities,`);
      console.warn(`so we are only going to process the single possibilities, which means ${this.question.choices.realLength} possibilities.`);
      this.question.choices.forEach((c) => combinedChoices.push(c.value));
    } else {
      const choices = [];
      this.question.choices.forEach((c) => choices.push(c.value));
      combinedChoices = combine(choices);
    }


    for (let i=0; i < combinedChoices.length; i++) {
      const choice = combinedChoices[i];
      if (this._alreadyAnswered(choice)) {
        continue;
      } else {
        return this._answer([choice]);
      }
    }

    const incompletes = this.model.getIncomplete();
    if (incompletes && incompletes.length > 0) {
      const transName = this.model.findTransition(this.question.name, incompletes[0]);
      if (transName) {
        return this._answer(transName.split(','));
      } else {
        return this._answer([this.question.choices.getChoice(0)]);
      }
    } else {
      return this._answer([this.question.choices.getChoice(0)]);
    }
  }
}

module.exports = CheckboxPrompt;
