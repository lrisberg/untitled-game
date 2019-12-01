import React from 'react';
import PropTypes from 'prop-types';

const { arrayOf, string, shape } = PropTypes;

const messageShape = shape({
  text: string.isRequired,
  type: string.isRequired,
});

export default class Feed extends React.Component {
  static propTypes = {
    messages: arrayOf(messageShape).isRequired,
  }

  renderHeading = () => <h3>Feed</h3>;

  renderMessages = () => {
    const renderMessage = (message, i) => (
      <div className={message.type} key={i}>{message.text}</div>
    );
    return this.props.messages.map(renderMessage);
  }

  render() {
    return (
      <div className="feed">
        {this.renderHeading()}
        {this.renderMessages()}
      </div>
    );
  }
}
