const readlineSync = require('readline-sync');

class Thing {
  constructor(name, actions) {
    this.name = name;
    this.actions = actions;
  }

  examine = () => {
    this.actions.map((action) => {
      console.log(`${action.name} - ${action.description}`);
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
    console.log(this.outcome);
  }
}

class Room {
  constructor(things, description) {
    this.things = things;
    this.description = description;
  }

  examine = () => {
    console.log("look - Look around you");
    console.log("examine here - Get a list of commands for what you can do.");
    console.log("quit - Quit the game.");
  }

  look = () => {
    console.log(this.description);
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

console.log('Would you like to play this game? (yes/no)');
const answer = readlineSync.question('');

if (['yes', 'y'].includes(answer)) {
  console.log('Enter your character\'s name.');
  let name = readlineSync.question();

  while (name === '') {
    console.log('Name cannot be blank. Try again.');
    name = readlineSync.question('');
  }

  console.log(`Your name is ${name}`);

  console.log('You find yourself on the floor in a dark room. The floor is wet. Eww.');

  console.log('Type \'examine here\' for a list of things you can do in this room.');
  let input = readlineSync.question('');

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

  let currentRoom = room1;

  while (true) {
    if (input === 'examine here') {
      currentRoom.examine();
    }
    else if (input === 'look') {
      currentRoom.look();
    }
    else if (input === 'quit') {
      console.log('Bye.');
      break;
    }
    else if (input === 'north') {
      console.log('There\'s no door to the north');
    }
    else if (input === 'east') {
      if (currentRoom === room1) {
        console.log('You make your way east');
        currentRoom = room2;
        currentRoom.look();
      }
      else {
        console.log('There\'s no door to the east');
      }
    }
    else if (input === 'south') {
      console.log('Theres no door to the south.');
    }
    else if (input === 'west') {
      if (currentRoom === room2) {
        console.log('You make your way west');
        currentRoom = room1;
        currentRoom.look();
      }
      else {
        console.log('There\'s no door to the west');
      }
    }
    else if (input.split(" ").length === 2) {

      const thingName = input.split(" ")[1];
      const actionName = input.split(" ")[0];

      if (currentRoom.hasThing(thingName)) {
        const thing = currentRoom.getThing(thingName);
        if (thing.hasAction(actionName)) {
          thing.doAction(actionName);
        }
        else {
          console.log(`You can't ${actionName} this ${thingName}. Try 'examine ${thingName}'.`);
        }
      }
      else {
        console.log(`There's no ${thingName} here. Try 'look' to see what's around you.`);
      }
    }
    else {
      console.log("Invalid command. Try 'examine here'");
    }

    input = readlineSync.question();
  }
}
else {
  console.log('Bye.');
}
