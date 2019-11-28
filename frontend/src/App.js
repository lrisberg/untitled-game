import React from 'react';
import Feed from './components/feed';
import Navigator from './components/navigator';
import Stats from './components/stats';
import './styles/App.css';

import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket('ws://127.0.0.1:3001/api/game');

class App extends React.Component {
  componentWillMount() {
    client.onmessage = (message) => {
      console.log(message);
    };
  }

  render() {
    return (
      <div className="game">
        <Feed />
        <Navigator />
        <Stats />
      </div>
    );
  }
}

export default App;
