class ConfirmPrompt {
  constructor(model, q) {
    this.model = model;
    this.question = q;
  }

  run() {
    return Promise.resolve(this.question.default);
  }
}

module.exports = ConfirmPrompt;
