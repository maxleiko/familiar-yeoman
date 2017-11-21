const tmp = require('tmp');
const yeoman = require('yeoman-environment');
const TerminalAdapter = require('./lib/TerminalAdapter');

process.on('unhandledRejection', (err) => {
  console.error(err.stack);
  process.exit(1);
});

const tmpDir = tmp.dirSync();
console.log('Generating in:', tmpDir.name);

const args = [];
const options = { cwd: tmpDir.name };
const model = {};
const env = yeoman.createEnv(args, options, new TerminalAdapter(model));
env.on('error', (err) => {
  console.error(err.stack);
  process.exit(1);
});

env.register(require.resolve('generator-jhipster/generators/app'));

env.run('jhipster', () => {
  console.log('Done');
});
