const _ = require('lodash');
const inquirer = require('inquirer');
const InputPrompt = require('./prompts/input');
const ConfirmPrompt = require('./prompts/confirm');
const ListPrompt = require('./prompts/list');
const RawListPrompt = require('./prompts/rawlist');
const CheckboxPrompt = require('./prompts/checkbox');
const ExpandPrompt = require('./prompts/expand');
const EditorPrompt = require('./prompts/editor');
const PasswordPrompt = require('./prompts/password');


class TerminalAdapter {
  constructor(model) {
    this.promptModule = inquirer.createPromptModule();

    this.promptModule.registerPrompt('list',      ListPrompt.bind(null, model));
    this.promptModule.registerPrompt('input',     InputPrompt.bind(null, model));
    this.promptModule.registerPrompt('expand',    ExpandPrompt.bind(null, model));
    this.promptModule.registerPrompt('confirm',   ConfirmPrompt.bind(null, model));
    this.promptModule.registerPrompt('rawlist',   RawListPrompt.bind(null, model));
    this.promptModule.registerPrompt('checkbox',  CheckboxPrompt.bind(null, model));
    this.promptModule.registerPrompt('editor',    EditorPrompt.bind(null, model));
    this.promptModule.registerPrompt('password',  PasswordPrompt.bind(null, model));

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
    const p = this.promptModule(questions);
    p.then(cb || _.noop);
    return p;
  }
}

module.exports = TerminalAdapter;
