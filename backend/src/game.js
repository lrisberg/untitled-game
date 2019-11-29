const Thing = require('./thing');
const Action = require('./action');
const Room = require('./room');
const Reaction = require('./reaction');
const ThingsUpdatedReaction = require('./thingsUpdatedReaction');
const EndGameReaction = require('./endGameReaction');
const WorldMap = require('./worldMap');

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
        this.wantToPlay = true;
        return [new Reaction('Enter your character\'s name.')];
      } else {
        return [new EndGameReaction()];
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
          new Reaction('Type \'examine here\' for a list of things you can do in this room.'),
          new ThingsUpdatedReaction(this.worldMap.getCurrentRoom().getThings()),
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
      return [new EndGameReaction()];
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
