import React from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import Feed from './components/feed';
import Navigator from './components/navigator';
import Stats from './components/stats';
import './styles/App.css';

const client = new W3CWebSocket('ws://127.0.0.1:3001/api/game');

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      input: '',
      messages: [],
      things: [],
    };
  }

  componentDidMount() {
    client.onmessage = (message) => {
      const data = JSON.parse(message.data);
      if (data.type === 'THINGS_UPDATED') {
        this.setState({
          things: [...data.things],
        });
      }
      if (data.type === 'MESSAGE') {
        this.setState((prevState) => ({
          messages: [...prevState.messages, data.message],
        }));
      }
    };
  }

  handleChange = (event) => {
    this.setState({
      input: event.target.value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    client.send(this.state.input);
    this.setState({
      input: '',
    });
  }

  examineThing = (thing) => {
    client.send(`examine ${thing.name}`);
  }

  render() {
    return (
      <>
        <div className="game">
          <div className="input">
            <form onSubmit={this.handleSubmit}>
              <input onChange={this.handleChange} value={this.state.input} type="text" />
            </form>
          </div>
          <div className="display">
            <Feed messages={this.state.messages} />
            <Navigator things={this.state.things} examineThing={this.examineThing} />
            <Stats />
          </div>
        </div>
      </>
    );
  }
}

export default App;
