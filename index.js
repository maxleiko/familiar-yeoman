const fs = require('fs-extra');
const path = require('path');
const debug = require('debug')('familiar-yeoman');
const Model = require('./lib/model');
const generate = require('./lib/generate');
const attachExitHandler = require('./lib/attach-exit-handler');
const config = require('./lib/default-config');

async function main() {
  const configFile = process.argv[2];
  if (configFile) {
    Object.assign(config, require(path.resolve(configFile)));
  }
  const CWD = process.cwd();
  const model = new Model();

  // default answers
  model.setAnswer('action', 'skip');
  // user-defined answers
  console.log('Forced answers:', config);
  Object.keys(config).forEach((key) => {
    model.setAnswer(key, config[key]);
  });

  attachExitHandler((options, err) => {
    if (options.cleanup) {
      writeFiles(CWD, model);
      console.log('Generated: configs.csv');
      console.log('Bye.');
    }

    if (err) {
      console.error(err.stack);
    }

    if (options.exit) {
      process.exit();
    }
  });

  const GENERATOR = 'generator-jhipster/generators/app';
  // const GENERATOR = 'generator-webapp/app';
  // const GENERATOR = './TestGen.js';

  let count = 1;
  console.log('Go grab a coffee that might last long...');
  while (!model.isComplete()) {
    debug('Pass', count++);
    try {
      const start = Date.now();
      const config = await generate(GENERATOR, model);
      if (config.jwtSecretKey) {
        config.jwtSecretKey = 'aaaabbbbccccddddeeeeffffgggghhhhiiiijjjj';
      }
      const end = Date.now();
      config.__time = end - start;
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
  fs.writeFileSync(`configs.csv`, model.getConfigs(), 'utf-8');
  // write tree to tree.json
  //fs.writeJsonSync('tree.json', JSON.parse(model.tree.toString()), { spaces: 2 });
}

main();
