const Prompt = require('./prompt');

class ConfirmPrompt extends Prompt {

  _run() {
    if (!this._alreadyAnswered(true)) {
      return this._answer(true);
    }

    if (!this._alreadyAnswered(false)) {
      return this._answer(false);
    }

    const incompletePath = this.model.getIncompletePath(this.question.name);
    if (incompletePath && incompletePath.length > 0) {
      return this._answer(incompletePath[0]);
    } else {
      return this._answer(true);
    }
  }

}

module.exports = ConfirmPrompt;
