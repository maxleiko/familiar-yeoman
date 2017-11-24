const _ = require('lodash');
const Tree = require('arctic-redpoll');

Tree.prototype.findDirectChildren = function findDirectChildren(data) {
  for (let i = 0; i < this.children.length; i++) {
    const child = this.children[i];
    if (_.isEqual(data, child.value)) {
      return child;
    }
  }
  return false;
};

module.exports = Tree;
