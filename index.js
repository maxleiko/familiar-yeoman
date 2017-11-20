const tmp = require('tmp');
const yeoman = require('yeoman-environment');
const TerminalAdapter = require('./lib/TerminalAdapter');

process.on('unhandledRejection', (err) => {
  console.error(err.stack);
  process.exit(1);
});

const tmpDir = tmp.dirSync();
tmpDir.removeCallback();
console.log('Generating in:', tmpDir.name);

const args = [];
const opts = {
  cwd: tmpDir.name
};
const model = {};
const env = yeoman.createEnv(args, opts, new TerminalAdapter(model));
env.register('./node_modules/generator-jhipster/generators/app/index.js', 'jhipster');

// TODO quit before the writing is done

env.run('jhipster');
