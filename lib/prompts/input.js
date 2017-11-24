const Prompt = require('./prompt');

class InputPrompt extends Prompt {

  _run() {
    return this._answer('foo');
  }

}

module.exports = InputPrompt;
