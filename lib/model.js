const Tree = require('./tree');

class Model {
  constructor() {
    this.configs = [];
    this.root = new Tree({ root: true });
    this.currentNode = this.root;
  }

  addNode(data) {
    const child = this.currentNode.findDirectChildren(data);
    if (child) {
      this.currentNode = child;
    } else {
      this.currentNode = this.currentNode.add(data);
    }
    return this.currentNode;
  }

  getCurrentNode() {
    return this.currentNode;
  }

  findDirectChildren(data) {
    return this.currentNode.findDirectChildren(data);
  }

  addConfig(config) {
    this.configs.push(config);
    this.currentNode = this.root;
  }

  getConfigs() {
    return {
      config: this.configs,
      tree: JSON.parse(this.root.toString())
    };
  }
}

module.exports = Model;
