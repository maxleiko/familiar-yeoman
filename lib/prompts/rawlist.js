const Prompt = require('./prompt');

class RawListPrompt extends Prompt {

  _run() {
    for (let i=0; i < this.question.choices.realLength; i++) {
      const choice = this.question.choices.getChoice(i);
      if (this._alreadyAnswered(choice.value)) {
        continue;
      } else {
        return this._answer(choice);
      }
    }
    const incompletePath = this.model.getIncompletePath(this.question.name);
    if (incompletePath && incompletePath.length > 0) {
      return this._answer(incompletePath[0]);
    } else {
      return this._answer(this.question.choices.getChoice(0));
    }
  }

}

module.exports = RawListPrompt;
