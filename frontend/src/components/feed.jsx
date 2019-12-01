import React from 'react';
import PropTypes from 'prop-types';

const { arrayOf, string } = PropTypes;

export default class Feed extends React.Component {
  static propTypes = {
    messages: arrayOf(string).isRequired,
  }

  renderMessages = () => {
    const renderMessage = (message, i) => <div key={i}>{message}</div>;
    return this.props.messages.map(renderMessage);
  }

  render() {
    return (
      <div className="feed">{this.renderMessages()}</div>
    );
  }
}
