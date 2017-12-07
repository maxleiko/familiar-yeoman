const _ = require('lodash');
const Choices = require('inquirer/lib/objects/choices');
const converter = require('../utils/converter');

const DEFAULTS = {
  when: () => true,
  validate: () => true,
  filter: (val) => val,
};

class Prompt {

  constructor(model, question) {
    this.model = model;
    this.question = _.defaults(_.clone(question), DEFAULTS);

    // convert raw choices to a more structured Choices object
    if (Array.isArray(this.question.choices)) {
      this.question.choices = new Choices(this.question.choices, {});
    }

    // define the number of possible transitions based on type/choices
    this.transitions = 0;
    if (this.model.hasAnswer(this.question.name)) {
      this.transitions = 1;
    } else if (this.question.type === 'checkbox') {
      this.transitions = Math.pow(2, this.question.choices.realLength) - 1;
    } else if (this.question.type === 'confirm') {
      this.transitions = 2;
    } else if (this.question.choices) {
      this.transitions = this.question.choices.realLength;
    } else {
      this.transitions = 1;
    }

    // if (this.question.name === 'serverSideOptions') {
    //   console.log(this.question.choices);
    // }
  }

  run() {
    this.questionState = this.model.currentQuestion(this.question.name, this.question.type);
    if (Object.keys(this.questionState.transitions).length === 0) {
      this.questionState.expectedTransitions = this.transitions;
    }
    if (this.model.hasAnswer(this.question.name)) {
      return this._answer(this.model.getAnswer(this.question.name));
    } else {
      return this._run();
    }
  }

  _run() {
    return Promise.reject(new Error('prompt run() method must be implemented'));
  }

  _answer(answer) {
    const value = this._valueConverter(answer);
    if (!this._alreadyAnswered(value)) {
      this.questionState.transitions[value] = null;
    }
    this.model.prevQuestion(this.question.name, value);
    return Promise.resolve(value);
  }

  _valueConverter(answer) {
    return converter(answer);
  }

  _alreadyAnswered(value) {
    return typeof this.questionState.transitions[value] !== 'undefined';
  }
}

module.exports = Prompt;
