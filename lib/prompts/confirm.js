const Prompt = require('./prompt');

class ConfirmPrompt extends Prompt {

  _run() {
    if (this._alreadyAnswered(true)) {
      return this._answer(false);
    } else {
      return this._answer(true);
    }
  }

}

module.exports = ConfirmPrompt;
