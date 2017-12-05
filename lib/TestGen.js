const Base = require('yeoman-generator');

module.exports = class extends Base {
  prompting() {
    return this.prompt([
      {
        name: 'name',
        type: 'input',
        message: 'What\'s the name of your app',
      },
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
        name: 'tsOptions',
        when: ({ appType, framework }) => appType === 'client' && framework === 'Angular 4',
        type: 'checkbox',
        message: 'TypeScript options',
        choices: ['allowUnreachableCode', 'allowJs', 'AllowUnusedLabels', 'alwaysStrict']
      },
      {
        name: 'reactOptions',
        when: ({ appType, framework }) => appType === 'client' && framework === 'React',
        type: 'checkbox',
        message: 'React options',
        choices: ['Redux', 'Bootstrap', 'FontAwesome']
      },
      {
        name: 'db',
        when: ({ appType }) => appType === 'server',
        type: 'list',
        message: 'Database',
        choices: ['MySQL', 'Postgres', 'MariaDB']
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
