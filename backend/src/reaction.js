class Reaction {
  constructor(output) {
    this.output = output;
  }

  getOutput = () => {
    return {
      type: 'MESSAGE',
      message: this.output,
    }
  }
}

module.exports = Reaction;
