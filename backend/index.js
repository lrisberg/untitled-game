const express = require('express')
const app = express()

const Game = require('./game');

var expressWs = require('express-ws')(app);

app.ws('/api/game', function(ws, req) {

  // create a new game
  const game = new Game();
  // start the game...
  const reactions = game.start();
  reactions.forEach((reaction) => {
    ws.send(reaction.getOutput());
  });

  ws.on('message', function(msg) {
    // send message onto game...
    console.debug("MESSAGE IN: ", msg)
    const reactions = game.acceptMessage(msg);
    reactions.forEach((reaction) => {
      ws.send(reaction.getOutput());
    })
  });
});

app.listen(3001)
