const Reaction = require('./reaction');

class Thing {
  constructor(name, actions) {
    this.name = name;
    this.actions = actions;
  }

  examine = () => {
    return this.actions.map((action) => {
      return new Reaction(`${action.name} - ${action.description}`);
    });
  }

  getName = () => {
    return this.name;
  }

  getActions = () => {
    return this.actions;
  }

  hasAction = (actionName) => {
    if (actionName === 'examine') {
      return true;
    }

    const action = this.actions.find((a) => {
      return a.name === actionName;
    })

    return action !== undefined;
  }

  doAction = (actionName) => {
    if (actionName === 'examine') {
      return this.examine();
    }
    else {
      const action = this.actions.find((a) => {
        return a.name === actionName
      });

      return action.execute();
    }
  }
}

module.exports = Thing;
