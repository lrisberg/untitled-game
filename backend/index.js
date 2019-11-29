const express = require('express')
const app = express()

const Game = require('./game');

var expressWs = require('express-ws')(app);

app.ws('/api/game', function(ws, req) {

  // create a new game
  const game = new Game((line) => { ws.send(line); });
  // start the game...
  game.start();

  ws.on('message', function(msg) {
    // send message onto game...
    console.debug("MESSAGE IN: ", msg)
    game.acceptMessage(msg);
  });
});

app.listen(3001)
