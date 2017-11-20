class NotImplementedPrompt {

  constructor(model, question) {
    this.model = model;
    this.question = question;
    console.log('!!! NotImplementedPrompt !!!');
    console.log(this.model);
    console.log(`[${this.question.name}] ${this.question.message}`);
  }

  run() {
    return Promise.resolve(null);
  }
}

module.exports = NotImplementedPrompt;
