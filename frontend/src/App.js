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

  state = {
    input: '',
  }

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} value={this.state.input} type="text" />
        </form>
        <div className="game">
          <Feed />
          <Navigator />
          <Stats />
        </div>
      </>
    );
  }

  handleChange = (event) => {
    this.setState({
      input: event.target.value,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    client.send(this.state.input);
    this.setState({
      input: '',
    })
  }
}

export default App;
