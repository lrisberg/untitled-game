const Reaction = require('./reaction');

class Action {
  constructor(name, description, outcome) {
    this.name = name;
    this.description = description;
    this.outcome = outcome;
  }

  getName = () => {
    return this.name;
  }

  getDescription = () => {
    return this.description;
  }

  execute = () => {
    return [new Reaction(this.outcome)];
  }
}

module.exports = Action;
