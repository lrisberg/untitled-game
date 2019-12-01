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

  renderHeading = () => <h3>Navigator</h3>;

  renderThings = () => {
    const renderThing = (thing, i) => (
      <div onClick={this.handleClick(thing)} key={i}>{thing.name}</div>
    );
    return this.props.things.map(renderThing);
  }

  handleClick = (thing) => () => { this.props.examineThing(thing); }

  render() {
    return (
      <div className="navigator">
        {this.renderHeading()}
        {this.renderThings()}
      </div>
    );
  }
}
