const _ = require('lodash');
const Tree = require('arctic-redpoll');

Tree.prototype.findDirectChild = function findDirectChild(data) {
  for (let i = 0; i < this.children.length; i++) {
    const child = this.children[i];
    if (_.isEqual(data, child.value)) {
      return child;
    }
  }
  return false;
};

Tree.prototype.findDirectChildByName = function findDirectChildByName(name) {
  for (let i = 0; i < this.children.length; i++) {
    const child = this.children[i];
    if (child.value && child.value.name === name) {
      return child;
    }
  }
  return false;
};

Tree.prototype.walkUp = function walkUp(name) {
  const path = [];
  let parent = this.parent;
  while (parent) {
    if (parent.value.name && parent.value.name === name) {
      return path;
    }
    path.unshift(parent);
    parent = parent.parent;
  }
  return path;
};

module.exports = Tree;
