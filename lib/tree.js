const Tree = require('arctic-redpoll');

Tree.prototype.findDirectChildren = function findDirectChildren(keyValueObj) {
  for (let i = 0; i < this.children.length; i++) {
    const child = this.children[i];
    if (child.matches(keyValueObj)) {
      return child;
    }
  }
  return false;
};

module.exports = Tree;
