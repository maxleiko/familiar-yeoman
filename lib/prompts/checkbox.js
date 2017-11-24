const Prompt = require('./prompt');

class CheckboxPrompt extends Prompt {

  _run() {
    for (let i=0; i < this.question.choices.realLength; i++) {
      const choice = this.question.choices.getChoice(i);
      if (this.questionNode.findDirectChildren({ value: [choice] })) {
        continue;
      } else {
        return this._answer([choice]);
      }
    }
    return this._answer([this.question.choices.getChoice(0)]);
  }
}

module.exports = CheckboxPrompt;
