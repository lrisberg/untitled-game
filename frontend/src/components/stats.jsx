import React from 'react';

export default class Stats extends React.Component {
  renderHeading = () => <h3>Stats</h3>;

  render() {
    return <div className="stats">{this.renderHeading()}</div>;
  }
}
