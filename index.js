const fs = require('fs-extra');
const Model = require('./lib/model');
const generate = require('./lib/generate');
const attachExitHandler = require('./lib/attach-exit-handler');

async function main() {
  const model = new Model();
  attachExitHandler((options, err) => {
    if (options.cleanup) {
      console.log('Writing configurations to "output.json"...');
      // write model to output.json
      fs.writeJsonSync('output.json', model.getConfigs(), { spaces: 2 });
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
  const TEST = './TestGen.js';

  while (!model.isComplete()) {
    console.log(model.getIncomplete());
    model.addConfig(await generate(TEST, model));
  }
}

main();
