const fs = require('fs-extra');
const debug = require('debug')('familiar-yeoman');
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
    if (options.cleanup) {
      writeFiles(CWD, model);
      console.log('Generated: configs.csv, tree.json');
      console.log('Bye.');
    }

    if (err) {
      console.error(err.stack);
    }

    if (options.exit) {
      process.exit();
    }
  });

  const JHIPSTER = 'generator-jhipster/generators/app';
  // const WEBAPP = 'generator-webapp/app';
  // const TEST = './TestGen.js';

  let count = 1;
  while (!model.isComplete()) {
    debug('Pass', count++);
    try {
      const config = await generate(JHIPSTER, model);
      if (config.jwtSecretKey) {
        config.jwtSecretKey = 'aaaabbbbccccddddeeeeffffgggghhhhiiiijjjj';
      }
      model.addConfig(config);
      if (count%1000 === 0) {
        writeFiles(CWD, model);
      }
    } catch (err) {
      console.error(err.stack);
    } finally {
      model.end();
    }
  }
}

function writeFiles(cwd, model) {
  process.chdir(cwd);
  // write configs to configs.csv
  fs.writeFileSync('configs.csv', model.getConfigs(), 'utf-8');
  // write tree to tree.json
  fs.writeJsonSync('tree.json', JSON.parse(model.tree.toString()), { spaces: 2 });
}

main();
