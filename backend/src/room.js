const Reaction = require('./reaction');

class Room {
  constructor(things, description) {
    this.things = things;
    this.description = description;
  }

  examine = () => {
    return [
      new Reaction("look - Look around you"),
      new Reaction("examine here - Get a list of commands for what you can do."),
      new Reaction("quit - Quit the game."),
    ]
  }

  look = () => {
    return [new Reaction(this.description)];
  }

  getThing = (thingName) => {
    return this.things.find((t) => {
      return t.getName() === thingName;
    })
  }

  hasThing = (thingName) => {
    return this.getThing(thingName) !== undefined;
  }
}

module.exports = Room;
