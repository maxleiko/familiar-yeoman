const Base = require('yeoman-generator');

module.exports = class extends Base {
  prompting() {
    return this.prompt([
      {
        name: 'appType',
        type: 'list',
        message: 'Type d\'application',
        choices: ['client', 'server']
      },
      {
        name: 'framework',
        when: ({ appType }) => appType === 'client',
        type: 'list',
        message: 'Frontend framework',
        choices: ['React', 'Angular JS', 'Angular 4', 'Vue']
      },
      {
        name: 'db',
        when: ({ appType }) => appType === 'server',
        type: 'list',
        message: 'Database',
        choices: ['MySQL', 'Postgres', 'MariaDB']
      },
      {
        name: 'clientOptions',
        when: ({ appType, framework }) => appType === 'client' && framework === 'Angular JS',
        type: 'list',
        message: 'clientOptions',
        choices: ['ng-router', 'Custom router', { name: 'No router', value: false }]
      },
      {
        name: 'clientOptions',
        when: ({ appType, framework }) => appType === 'client' && framework === 'React',
        type: 'list',
        message: 'clientOptions',
        choices: ['redux', 'mobx', { name: 'No UI framework', value: false }]
      },
      {
        name: 'testFramework',
        when: ({ appType }) => appType === 'client',
        type: 'list',
        message: 'Choose a test framework',
        choices: ['karma', 'gatling', 'protractor']
      },
      {
        name: 'languageLevel',
        when: ({ appType }) => appType === 'server',
        type: 'list',
        message: 'Language level',
        choices: ['7', '8']
      },
    ]).then((answers) => {
      this.config.set(answers);
    });
  }
};
