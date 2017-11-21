const tmp = require('tmp');
const yeoman = require('yeoman-environment');
const TerminalAdapter = require('./TerminalAdapter');

function generate(model) {
  return new Promise((resolve, reject) => {
    const tmpDir = tmp.dirSync();
    console.log('Generating in:', tmpDir.name);

    const args = [];
    const options = { cwd: tmpDir.name, skipInstall: true };
    const env = yeoman.createEnv(args, options, new TerminalAdapter(model));
    env.on('error', reject);

    env.register(require.resolve('generator-jhipster/generators/app'));
    const generator = env.create('jhipster', { args, options });

    generator.run(() => {
      // TODO remove tmpDir
      resolve(generator.config.getAll());
    });
  });
}

module.exports = generate;
