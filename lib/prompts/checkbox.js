const Prompt = require('./prompt');
const combine = require('../utils/combine');

class CheckboxPrompt extends Prompt {

  _run() {
    const choices = [];
    this.question.choices.forEach((c) => choices.push(c.value));
    const combinedChoices = combine(choices);

    for (let i=0; i < combinedChoices.length; i++) {
      const choice = combinedChoices[i];
      if (this._alreadyAnswered(choice)) {
        continue;
      } else {
        return this._answer(choice);
      }
    }

    const incompletePath = this.model.getIncompletePath(this.question.name);
    if (incompletePath && incompletePath.length > 0) {
      return this._answer(incompletePath[0]);
    } else {
      return this._answer([this.question.choices.getChoice(0)]);
    }
  }
}

module.exports = CheckboxPrompt;
