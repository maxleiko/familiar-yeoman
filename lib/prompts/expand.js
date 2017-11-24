const Prompt = require('./prompt');

class ExpandPrompt extends Prompt {

  _run() {
    return this._answer(this.question.choices.getChoice(0));
  }
  
}

module.exports = ExpandPrompt;
