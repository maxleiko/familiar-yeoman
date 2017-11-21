class InputPrompt {
  constructor(model, question) {
    this.model = model;
    this.question = question;
  }

  run() {
    return Promise.resolve(this.question.default);
  }
}

module.exports = InputPrompt;
