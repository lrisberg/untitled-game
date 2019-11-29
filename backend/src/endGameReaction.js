const Reaction = require('./reaction');

class EndGameReaction extends Reaction {
  constructor() {
    super('Bye.');
  }
}

module.exports = EndGameReaction;
