process.on('unhandledRejection', (err) => {
  console.error(err.stack);
  process.exit(1);
});

const generate = require('./lib/generate');

const model = {};
Promise.all([
  generate(model),
  // generate(model),
]).then((configs) => {
  console.log(configs);
});
