import React from 'react';
import PropTypes from 'prop-types';

const { array, func } = PropTypes;

export default class Navigator extends React.Component {
  propTypes = {
    things: array.isRequired,
    examineThing: func.isRequired,
  }

  render() {
    return <div className="navigator">{this.renderThings()}</div>
  }

  renderThings = () => {
    return this.props.things.map((thing) => {
      return <div onClick={this.handleClick(thing)}>{thing.name}</div>
    })
  }

  handleClick = (thing) => {
    return () => {
      this.props.examineThing(thing);
    }
  }
}
