class CheckboxPrompt {
  constructor(model, question) {
    this.model = model;
    this.question = question;
  }

  run() {
    let answer = this.question.choices[this.question.default];
    if (typeof answer === 'undefined') {
      answer = this.question.choices[0];
    }
    return Promise.resolve([(typeof answer.value !== 'undefined') ? answer.value : answer]);
  }
}

module.exports = CheckboxPrompt;
