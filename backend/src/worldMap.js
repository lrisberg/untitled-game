const Reaction = require('./reaction');
const ThingsUpdatedReaction = require('./thingsUpdatedReaction');

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
      return [new Reaction('You make your way east.')]
        .concat(this.currentRoom.look())
        .concat([new ThingsUpdatedReaction(this.currentRoom.getThings())]);
    }
    else {
      return [new Reaction('There\'s no door to the east.')];
    }
  }

  moveWest() {
    if (this.westOf.has(this.currentRoom)) {
      this.currentRoom = this.westOf.get(this.currentRoom);
      return [new Reaction('You make your way west.')]
        .concat(this.currentRoom.look())
        .concat([new ThingsUpdatedReaction(this.currentRoom.getThings())]);
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

module.exports = WorldMap;
