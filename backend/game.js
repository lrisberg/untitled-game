const readlineSync = require('readline-sync');

class Thing {
  constructor(name, actions, printOutput) {
    this.name = name;
    this.actions = actions;
    this.printOutput = printOutput;
  }

  examine = () => {
    this.actions.map((action) => {
      this.printOutput(`${action.name} - ${action.description}`);
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
      this.examine();
    }
    else {
      const action = this.actions.find((a) => {
        return a.name === actionName
      });

      action.execute();
    }
  }
}

class Action {
  constructor(name, description, outcome, printOutput) {
    this.name = name;
    this.description = description;
    this.outcome = outcome;
    this.printOutput = printOutput;
  }

  getName = () => {
    return this.name;
  }

  getDescription = () => {
    return this.description;
  }

  execute = () => {
    this.printOutput(this.outcome);
  }
}

class Room {
  constructor(things, description, printOutput) {
    this.things = things;
    this.description = description;
    this.printOutput = printOutput;
  }

  examine = () => {
    this.printOutput("look - Look around you");
    this.printOutput("examine here - Get a list of commands for what you can do.");
    this.printOutput("quit - Quit the game.");
  }

  look = () => {
    this.printOutput(this.description);
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

class Game {
  constructor(printOutput) {
    this.printOutput = printOutput;

    const room1 = new Room(
      [
        new Thing("cat", [new Action("pet", "Pet the cat.", "The cat purrs.", this.printOutput), new Action("snuggle", "Snuggle the cat.", "The cat claws at your face. Ow!", this.printOutput)], this.printOutput),
        new Thing("chair", [new Action("nudge", "Nudge the chair with your foot.", "You nudge the chair with your foot. It doesn't respond. It's a chair.", this.printOutput), new Action("kick", "Kick the chair hard with your foot!", "You kick the chair. It doesn't respond. It's a chair.", this.printOutput)], this.printOutput)
      ],
      'You find yourself on the floor in a dark room. The floor is wet. Eww. You see a black cat staring at you. There\'s a chair in the corner. There\'s a door to the east.',
      this.printOutput
    )

    const room2 = new Room(
      [],
      "This room is full of mirrors. You see yourself everywhere! There's a door to the west.",
      this.printOutput
    )

    this.currentRoom = room1;
    this.room1 = room1;
    this.room2 = room2;

    this.wantToPlay = null;
    this.name = null;
  }

  start = () => {
    this.printOutput('Would you like to play this game? (yes/no)');
  }

  acceptMessage = (input) => {
    if (this.wantToPlay === null) {
      if (['yes', 'y'].includes(input)) {
        // continue with game
        this.wantToPlay = true;
        this.printOutput('Enter your character\'s name.');
        return;
      } else {
        // TODO: exit!
        return;
      }
    }

    if (this.name === null) {
      if (input === '') {
        this.printOutput('Name cannot be blank. Try again.');
        return;
      } else {
        this.name = input;

        this.printOutput(`Your name is ${this.name}`);

        this.printOutput('You find yourself on the floor in a dark room. The floor is wet. Eww.');

        this.printOutput('Type \'examine here\' for a list of things you can do in this room.');

        return;
      }
    }

    if (input === 'examine here') {
      this.currentRoom.examine(this.printOutput);
    }
    else if (input === 'look') {
      this.currentRoom.look(this.printOutput);
    }
    else if (input === 'quit') {
      this.printOutput('Bye.');
      // quit game?
    }
    else if (input === 'north') {
      this.printOutput('There\'s no door to the north');
    }
    else if (input === 'east') {
      if (this.currentRoom === this.room1) {
        this.printOutput('You make your way east');
        this.currentRoom = this.room2;
        this.currentRoom.look(this.printOutput);
      }
      else {
        this.printOutput('There\'s no door to the east');
      }
    }
    else if (input === 'south') {
      this.printOutput('Theres no door to the south.');
    }
    else if (input === 'west') {
      if (this.currentRoom === this.room2) {
        this.printOutput('You make your way west');
        this.currentRoom = this.room1;
        this.currentRoom.look(this.printOutput);
      }
      else {
        this.printOutput('There\'s no door to the west');
      }
    }
    else if (input.split(" ").length === 2) {

      const thingName = input.split(" ")[1];
      const actionName = input.split(" ")[0];

      if (this.currentRoom.hasThing(thingName)) {
        const thing = this.currentRoom.getThing(thingName);
        if (thing.hasAction(actionName)) {
          thing.doAction(actionName, this.printOutput);
        }
        else {
          this.printOutput(`You can't ${actionName} this ${thingName}. Try 'examine ${thingName}'.`);
        }
      }
      else {
        this.printOutput(`There's no ${thingName} here. Try 'look' to see what's around you.`);
      }
    }
    else {
      this.printOutput("Invalid command. Try 'examine here'");
    }
  }
}

module.exports = Game;
