const inquirer = require('inquirer');
const InputPrompt = require('./InputPrompt');
const ConfirmPrompt = require('./ConfirmPrompt');
const ListPrompt = require('./ListPrompt');
const CheckboxPrompt = require('./CheckboxPrompt');
const ExpandPrompt = require('./ExpandPrompt');
const NotImplementedPrompt = require('./NotImplementedPrompt');

class TerminalAdapter {
  constructor(model) {
    this.promptModule = inquirer.createPromptModule();

    Object.keys(this.promptModule.prompts).forEach((promptName) => {
      switch (promptName) {
        case 'input':
          this.promptModule.registerPrompt(promptName, InputPrompt.bind(InputPrompt, model));
          break;

        case 'confirm':
          this.promptModule.registerPrompt(promptName, ConfirmPrompt.bind(ConfirmPrompt, model));
          break;

        case 'list':
          this.promptModule.registerPrompt(promptName, ListPrompt.bind(ListPrompt, model));
          break;

        case 'expand':
          this.promptModule.registerPrompt(promptName, ExpandPrompt.bind(ExpandPrompt, model));
          break;

        case 'checkbox':
          this.promptModule.registerPrompt(promptName, CheckboxPrompt.bind(CheckboxPrompt, model));
          break;

        default:
          this.promptModule.registerPrompt(promptName, NotImplementedPrompt.bind(NotImplementedPrompt, model));
          break;
      }
    });

    this.diff = function diff() {};
    this.log = function log() {};

    // make sure all log methods are defined
    [
      'write',
      'writeln',
      'ok',
      'error',
      'skip',
      'force',
      'create',
      'invoke',
      'conflict',
      'identical',
      'info',
      'table'
    ].forEach((methodName) => {
      this.log[methodName] = console.log;
    }, this);
  }

  prompt(questions, cb) {
    const promise = this.promptModule(questions);
    promise.then(cb || function noop() {});
    return promise.then((answers) => {
      console.log('===== ANSWERS =====');
      console.log(answers);
      console.log('===================');
      return answers;
    });
  }
}

module.exports = TerminalAdapter;
