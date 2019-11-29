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

class Reaction {
  constructor(output) {
    this.output = output;
  }

  getOutput = () => {
    return this.output;
  }
}

class WorldMap {
  constructor(initialRoom) {
    this.eastOf = new Map();
    this.westOf = new Map();
    this.northOf = new Map();
    this.southOf = new Map();
    this.currentRoom = initialRoom;
  }

  getCurrentRoom = () => {
    return this.currentRoom;
  }

  addEastOf(eastern, center) {
    this.eastOf.set(center, eastern);
    this.westOf.set(eastern, center);
  }

  moveEast() {
    if (this.eastOf.has(this.currentRoom)) {
      this.currentRoom = this.eastOf.get(this.currentRoom);
      return [new Reaction('You make your way east.')].concat(this.currentRoom.look());
    }
    else {
      return [new Reaction('There\'s no door to the east.')];
    }
  }

  moveWest() {
    if (this.westOf.has(this.currentRoom)) {
      this.currentRoom = this.westOf.get(this.currentRoom);
      return [new Reaction('You make your way west.')].concat(this.currentRoom.look())
    }
    else {
      return [new Reaction('There\'s no door to the west.')];
    }
  }

  moveNorth() {
    if (this.northOf.has(this.currentRoom)) {
      this.currentRoom = this.northOf.get(this.currentRoom);
      return [new Reaction('You make your way north.')].concat(this.currentRoom.look())
    }
    else {
      return [new Reaction('There\'s no door to the north.')];
    }
  }

  moveNorth() {
    if (this.southOf.has(this.currentRoom)) {
      this.currentRoom = this.southOf.get(this.currentRoom);
      return [new Reaction('You make your way south.')].concat(this.currentRoom.look())
    }
    else {
      return [new Reaction('There\'s no door to the south.')];
    }
  }
}

class Game {
  constructor() {
    const room1 = new Room(
      [
        new Thing("cat", [new Action("pet", "Pet the cat.", "The cat purrs."), new Action("snuggle", "Snuggle the cat.", "The cat claws at your face. Ow!")]),
        new Thing("chair", [new Action("nudge", "Nudge the chair with your foot.", "You nudge the chair with your foot. It doesn't respond. It's a chair."), new Action("kick", "Kick the chair hard with your foot!", "You kick the chair. It doesn't respond. It's a chair.")])
      ],
      'You find yourself on the floor in a dark room. The floor is wet. Eww. You see a black cat staring at you. There\'s a chair in the corner. There\'s a door to the east.'
    )

    const room2 = new Room(
      [],
      "This room is full of mirrors. You see yourself everywhere! There's a door to the west."
    )

    this.worldMap = new WorldMap(room1);
    this.worldMap.addEastOf(room2, room1);


    this.wantToPlay = null;
    this.name = null;
  }

  start = () => {
    return [new Reaction('Would you like to play this game? (yes/no)')];
  }

  acceptMessage = (input) => {
    if (this.wantToPlay === null) {
      if (['yes', 'y'].includes(input)) {
        // continue with game
        this.wantToPlay = true;
        return [new Reaction('Enter your character\'s name.')];
      } else {
        // TODO: exit!
        return;
      }
    }

    if (this.name === null) {
      if (input === '') {
        return [new Reaction('Name cannot be blank. Try again.')];
      } else {
        this.name = input;

        return [
          new Reaction(`Your name is ${this.name}`),
          new Reaction('You find yourself on the floor in a dark room. The floor is wet. Eww.'),
          new Reaction('Type \'examine here\' for a list of things you can do in this room.')
        ];
      }
    }

    if (input === 'examine here') {
      return this.worldMap.getCurrentRoom().examine();
    }
    else if (input === 'look') {
      return this.worldMap.getCurrentRoom().look();
    }
    else if (input === 'quit') {
      return [new Reaction('Bye.')];
      // quit game?
    }
    else if (input === 'north') {
      return this.worldMap.moveNorth();
    }
    else if (input === 'east') {
      return this.worldMap.moveEast();
    }
    else if (input === 'south') {
      return this.worldMap.moveSouth();
    }
    else if (input === 'west') {
      return this.worldMap.moveWest();
    }
    else if (input.split(" ").length === 2) {

      const thingName = input.split(" ")[1];
      const actionName = input.split(" ")[0];

      if (this.worldMap.getCurrentRoom().hasThing(thingName)) {
        const thing = this.worldMap.getCurrentRoom().getThing(thingName);
        if (thing.hasAction(actionName)) {
          return thing.doAction(actionName);
        }
        else {
          return [new Reaction(`You can't ${actionName} this ${thingName}. Try 'examine ${thingName}'.`)];
        }
      }
      else {
        return [new Reaction(`There's no ${thingName} here. Try 'look' to see what's around you.`)];
      }
    }
    else {
      return [new Reaction("Invalid command. Try 'examine here'")];
    }
  }
}

module.exports = Game;
