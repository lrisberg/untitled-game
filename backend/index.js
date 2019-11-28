const express = require('express')
const app = express()

var expressWs = require('express-ws')(app);

app.ws('/api/game', function(ws, req) {
  ws.on('message', function(msg) {
    ws.send("echo: " + msg);
  });
});

app.listen(3001)
