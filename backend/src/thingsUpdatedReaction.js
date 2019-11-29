class ThingsUpdatedReaction {
  constructor(things) {
    this.things = things;
  }

  getOutput = () => {
    return {
      type: 'THINGS_UPDATED',
      things: this.things.map((thing) => { return { name: thing.getName() }; }),
    }
  }
}

module.exports = ThingsUpdatedReaction;
