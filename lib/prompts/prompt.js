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
  }

  run() {
    this.questionNode = this.model.addNode({
      type: this.question.type,
      name: this.question.name
    });
    return this._run();
  }

  _run() {
    return Promise.reject(new Error('prompt run() method must be implemented'));
  }

  _answer(answer) {
    const value = this._valueConverter(answer);
    this.model.addNode({ type: 'answer', value });
    return Promise.resolve(value);
  }

  _valueConverter(answer) {
    if (answer instanceof Choice) {
      return answer.value;
    } else {
      if (answer instanceof Array) {
        return answer.map((elem) => {
          if (elem instanceof Choice) {
            return elem.value;
          } else {
            return elem;
          }
        });
      } else {
        return answer;
      }
    }
  }
}

module.exports = Prompt;
