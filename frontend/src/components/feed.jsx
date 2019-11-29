import React from 'react';
import PropTypes from 'prop-types';

const { array } = PropTypes;

export default class Feed extends React.Component {
  propTypes = {
    messages: array.isRequired,
  }

  render() {
    return (
      <div className="feed">{this.renderMessages()}</div>
    )
  }

  renderMessages = () => {
    return this.props.messages.map((message) => {
      return <div>{message}</div>
    })
  }
}
