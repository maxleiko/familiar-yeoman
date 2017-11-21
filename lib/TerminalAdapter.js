const inquirer = require('inquirer');
const InputPrompt = require('./prompts/InputPrompt');
const ConfirmPrompt = require('./prompts/ConfirmPrompt');
const ListPrompt = require('./prompts/ListPrompt');
const RawListPrompt = require('./prompts/RawListPrompt');
const CheckboxPrompt = require('./prompts/CheckboxPrompt');
const ExpandPrompt = require('./prompts/ExpandPrompt');
const NotImplementedPrompt = require('./prompts/NotImplementedPrompt');

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

        case 'rawlist':
          this.promptModule.registerPrompt(promptName, ListPrompt.bind(RawListPrompt, model));
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
      this.log[methodName] = () => {};
    }, this);
  }

  prompt(questions, cb) {
    const promise = this.promptModule(questions);
    promise.then(cb || function noop() {});
    return promise;
  }
}

module.exports = TerminalAdapter;
