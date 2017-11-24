const Prompt = require('./prompt');

class ListPrompt extends Prompt {

  _run() {
    for (let i=0; i < this.question.choices.realLength; i++) {
      const choice = this.question.choices.getChoice(i);
      if (this.questionNode.findDirectChildren({ type: 'answer', value: choice.value })) {
        continue;
      } else {
        return this._answer(choice);
      }
    }
    return this._answer(this.question.choices.getChoice(0));
  }

}

module.exports = ListPrompt;
