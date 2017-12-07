const Choice = require('inquirer/lib/objects/choice');

function converter(value) {
  if (value instanceof Choice) {
    return converter(value.value);
  }

  if (value instanceof Array) {
    return value.map((elem) => converter(elem));
  }

  if (value instanceof Object) {
    return JSON.stringify(value);
  }

  return value;
}

module.exports = converter;
