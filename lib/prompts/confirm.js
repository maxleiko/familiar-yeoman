const Prompt = require('./prompt');

class ConfirmPrompt extends Prompt {

  _run() {
    return this._answer(true);
  }

}

module.exports = ConfirmPrompt;
