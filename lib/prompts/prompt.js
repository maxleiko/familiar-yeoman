const _ = require('lodash');
const Choice = require('inquirer/lib/objects/choice');
const Choices = require('inquirer/lib/objects/choices');

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
    if (this.question.type === 'checkbox') {
      this.transitions = Math.pow(2, this.question.choices.realLength) - 1;
    } else if (this.question.type === 'confirm') {
      this.transitions = 2;
    } else if (this.question.choices) {
      this.transitions = this.question.choices.realLength;
    } else {
      this.transitions = 1;
    }
  }

  run() {
    this.questionState = this.model.currentQuestion(this.question.name, this.question.type);
    this.questionState.expectedTransitions = this.transitions;
    return this._run();
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
    if (answer instanceof Choice) {
      return answer.value;
    } else {
      if (_.isObjectLike(answer)) {
        if (answer instanceof Array) {
          return answer.map((elem) => {
            if (elem instanceof Choice) {
              return elem.value;
            } else {
              return elem;
            }
          });
        } else {
          return JSON.stringify(answer);
        }
      } else {
        return answer;
      }
    }
  }

  _alreadyAnswered(value) {
    return typeof this.questionState.transitions[value] !== 'undefined';
  }
}

module.exports = Prompt;
