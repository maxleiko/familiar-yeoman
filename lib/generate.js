const tmp = require('tmp');
const yeoman = require('yeoman-environment');
const TerminalAdapter = require('./terminal-adapter');

function generate(model) {
  return new Promise((resolve, reject) => {
    tmp.dir((err, tmpDir) => {
      if (err) {
        reject(err);
      } else {
        console.log('Generating in:', tmpDir);

        const args = [];
        const options = { cwd: tmpDir, 'skip-install': true };

        const env = yeoman.createEnv(args, options, new TerminalAdapter(model));
        env.on('error', reject);
        env.register(require.resolve('generator-jhipster/generators/app'));

        const generator = env.create('jhipster', { args, options });
        generator.on('error', reject);

        generator.run(() => {
          // TODO remove tmpDir
          resolve(generator.config.getAll());
        });
      }
    });
  });
}

module.exports = generate;
