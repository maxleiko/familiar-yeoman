const fs = require('fs-extra');
const tmp = require('tmp');
const yeoman = require('yeoman-environment');
const TerminalAdapter = require('./terminal-adapter');

function generate(generatorPath, model) {
  return new Promise((resolve, reject) => {
    tmp.dir((err, tmpDir) => {
      if (err) {
        reject(err);
      } else {
        const args = [];
        process.chdir(tmpDir);
        const options = {
          cwd: tmpDir,
          'skip-install': true,
          skipInstall: true,
          skipChecks: true
        };

        const env = yeoman.createEnv(args, options, new TerminalAdapter(model));
        env.on('error', reject);
        env.register(require.resolve(generatorPath), 'my-gen-is-great');

        const generator = env.create('my-gen-is-great', { args, options });
        generator.on('error', reject);

        generator.run(() => {
          fs.remove(tmpDir)
            .then(() => {
              resolve(generator.config.getAll());
            });
        });
      }
    });
  });
}

module.exports = generate;
