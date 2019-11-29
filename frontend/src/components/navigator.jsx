import React from 'react';
import PropTypes from 'prop-types';

const { array } = PropTypes;

export default class Navigator extends React.Component {
  propTypes = {
    things: array.isRequired,
  }

  render() {
    return <div className="navigator">{this.renderThings()}</div>
  }

  renderThings = () => {
    return this.props.things.map((thing) => {
      return <div>{thing.name}</div>
    })
  }
}
