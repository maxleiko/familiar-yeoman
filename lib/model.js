const Tree = require('./tree');
const converter = require('./utils/converter');

class Model {
  constructor() {
    this.configs = [];
    this.answers = {};
    this.tree = new Tree({ root: true });
    this.currentNode = this.tree;
  }

  currentQuestion(name, type, expectedTransitions) {
    const node = { name, type, expectedTransitions };
    const childNode = this.currentNode.findDirectChildByName(node.name);
    if (childNode) {
      this.currentNode = childNode;
    } else {
      this.currentNode = this.currentNode.add(node);
    }
    return this.currentNode;
  }

  answerQuestion(value) {
    const node = { type: 'answer', value };
    const childNode = this.currentNode.findDirectChild(node);
    if (childNode) {
      this.currentNode = childNode;
    } else {
      this.currentNode = this.currentNode.add(node);
    }
  }

  end() {
    this.currentNode = this.tree;
  }

  isComplete() {
    if (this.tree.children.length === 0) {
      return false;
    } else {
      const it = this.tree.getIterator();
      while (it.hasNext()) {
        const node = it.next();
        if (node.value.name) {
          if (node.children.length < node.value.expectedTransitions) {
            return false;
          }
        }
      }
    }
    return true;
  }

  /**
   * Iterates over every nodes in the tree in order to find an incomplete question
   * when it finds one, it walks the tree from this node to the root if "name"
   * is undefined, or until "name" node is reached.
   *
   * @param  {String} name the name of the node where to stop walking up
   * @return {Array}       a list of answer to give in order to reach the first
   *                       incompleted question (walks the tree up to "name")
   */
  getIncompletePath(name) {
    const incompletePath = [];
    if (this.tree.children.length === 0) {
      return null;
    } else {
      const it = this.tree.getIterator();
      while (it.hasNext()) {
        const node = it.next();
        if (node.value.name) {
          if (node.children.length < node.value.expectedTransitions) {
            return node.walkUp(name)
              .filter((node) => node.value.type === 'answer')
              .map((node) => node.value.value);
          }
        }
      }
    }
    return incompletePath;
  }

  setAnswer(questionName, answer) {
    this.answers[questionName] = answer;
  }

  getAnswer(questionName) {
    return this.answers[questionName];
  }

  hasAnswer(questionName) {
    return this.answers.hasOwnProperty(questionName);
  }

  addConfig(config) {
    console.log(config);
    this.configs.push(config);
  }

  getConfigs() {
    const configs = {};
    this.configs.forEach((config) => {
      Object.keys(config).forEach((key) => {
        if (!configs.hasOwnProperty(key)) {
          configs[key] = null;
        }
      });
    });

    const keys = Object.keys(configs);
    let csv = keys.join(';') + '\n';

    this.configs.forEach((config) => {
      keys.forEach((key) => {
        let value = converter(config[key]);
        if (value === null) {
          value = 'null';
        } else if (typeof value === 'string') {
          value = `"${value.trim()}"`;
        } else if (value === undefined) {
          value = '';
        }
        csv += value + ';';
      });
      csv += '\n';
    });

    return csv;
  }
}

module.exports = Model;
