const yeoman = require('yeoman-environment');
const TerminalAdapter = require('./lib/TerminalAdapter');

process.on('unhandledRejection', (err) => {
  console.error(err.stack);
  process.exit(1);
});

const model = {};
const env = yeoman.createEnv([], {}, new TerminalAdapter(model));
env.register('./node_modules/generator-jhipster/generators/app/index.js', 'jhipster');

env.on('prompting', () => {
  console.log();
  console.log('=======> PROMPTING');
  console.log();
});

env.on('writing', () => {
  console.log();
  console.log('=======> WRITING');
  console.log();
  process.exit(0);
});

env.on('end', () => {
  console.log();
  console.log('=======> END');
  console.log();
});

env.run('jhipster');
