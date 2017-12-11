const fs = require('fs-extra');
const Model = require('./lib/model');
const generate = require('./lib/generate');
const attachExitHandler = require('./lib/attach-exit-handler');

async function main() {
  const CWD = process.cwd();
  const model = new Model();

  model.setAnswer('action', 'skip');
  model.setAnswer('nativeLanguage', 'en');
  model.setAnswer('languages', ['en']);
  model.setAnswer('serverPort', 8080);
  model.setAnswer('testFrameworks', ['gatling', 'cucumber', 'protractor']);
  model.setAnswer('installModules', false);

  attachExitHandler((options, err) => {
    process.chdir(CWD);
    if (options.cleanup) {
      // write configs to configs.csv
      console.log('Writing configurations to configs.csv...');
      fs.writeFileSync('configs.csv', model.getConfigs(), 'utf-8');
      // write tree to tree.json
      console.log('Writing tree to tree.json...');
      fs.writeJsonSync('tree.json', JSON.parse(model.tree.toString()), { spaces: 2 });
      console.log('Done');
    }

    if (err) {
      console.error(err.stack);
    }

    if (options.exit) {
      process.exit();
    }
  });

  const JHIPSTER = 'generator-jhipster/generators/app';
  const WEBAPP = 'generator-webapp/app';
  const TEST = './TestGen.js';

  let count = 1;
  while (!model.isComplete()) {
    console.log('Pass', count++);
    try {
      const config = await generate(JHIPSTER, model);
      if (config.jwtSecretKey) {
        config.jwtSecretKey = 'aaaabbbbccccddddeeeeffffgggghhhhiiiijjjj';
      }
      model.addConfig(config);
    } catch (err) {
      console.error(err.stack);
    } finally {
      model.end();
    }
  }
}

main();
