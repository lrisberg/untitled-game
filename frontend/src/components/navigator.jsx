import React from 'react';
import PropTypes from 'prop-types';

const { arrayOf, func, shape, string } = PropTypes;

const thingShape = shape({
  name: string.isRequired,
});

export default class Navigator extends React.Component {
  static propTypes = {
    things: arrayOf(thingShape).isRequired,
    examineThing: func.isRequired,
  }

  renderThings = () => {
    const renderThing = (thing) => <div onClick={this.handleClick(thing)}>{thing.name}</div>;
    return this.props.things.map(renderThing);
  }

  handleClick = (thing) => () => { this.props.examineThing(thing); }

  render() {
    return <div className="navigator">{this.renderThings()}</div>;
  }
}
