const Base = require('yeoman-generator');

module.exports = class extends Base {
  prompting() {
    return this.prompt([
      {
        name: 'q0',
        type: 'list',
        message: 'q0',
        choices: ['one', 'two', 'three']
      },
      {
        when: ({ q0 }) => q0 === 'two',
        name: 'q1',
        message: 'q1',
        type: 'confirm'
      },
      {
        when: ({ q0 }) => q0 === 'three',
        name: 'q2',
        message: 'q2',
        type: 'input'
      },
      {
        name: 'q3',
        message: 'q3',
        type: 'input'
      },
      {
        name: 'q4',
        message: 'q4',
        type: 'checkbox',
        choices: ['docker', 'npm', 'kevoree']
      }
    ]).then((answers) => {
      this.config.set(answers);
    });
  }
};
