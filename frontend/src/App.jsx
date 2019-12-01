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
    client.onmessage = (wsMessage) => {
      const data = JSON.parse(wsMessage.data);
      if (data.type === 'THINGS_UPDATED') {
        this.setState({
          things: [...data.things],
        });
      }
      if (data.type === 'MESSAGE') {
        const message = {
          text: data.message,
          type: 'inbound',
        };
        this.setState((prevState) => ({
          messages: [...prevState.messages, message],
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
    this.dispatchOutboundMessage(this.state.input);
    this.resetInput();
  }

  examineThing = (thing) => {
    const text = `examine ${thing.name}`;
    client.send(text);
    this.dispatchOutboundMessage(text);
  }

  resetInput = () => {
    this.setState({
      input: '',
    });
  }

  dispatchOutboundMessage = (text) => {
    const message = {
      text,
      type: 'outbound',
    };

    this.setState((prevState) => ({
      messages: [...prevState.messages, message],
    }));
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
