const Prompt = require('./prompt');

class RawListPrompt extends Prompt {

  _run() {
    return this._answer(this.question.choices.getChoice(0));
  }

}

module.exports = RawListPrompt;
