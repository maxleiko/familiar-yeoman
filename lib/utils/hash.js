const crypto = require('crypto');

function hash(input) {
  return crypto.createHash('sha256')
               .update(input, 'utf8')
               .digest('hex')
               .substr(0, 6);
}

module.exports = hash;
