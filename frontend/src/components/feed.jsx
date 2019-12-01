import React from 'react';
import PropTypes from 'prop-types';

const { arrayOf, string } = PropTypes;

export default class Feed extends React.Component {
  propTypes = {
    messages: arrayOf(string).isRequired,
  }

  renderMessages = () => {
    const renderMessage = (message) => <div>{message}</div>;
    return this.props.messages.map(renderMessage);
  }

  render() {
    return (
      <div className="feed">{this.renderMessages()}</div>
    );
  }
}
