import React from 'react';
import Similar from './similar.jsx';

export default React.createClass({
  propTypes: {
    color: React.PropTypes.shape({
      name: React.PropTypes.string,
      rgba: React.PropTypes.string,
      count: React.PropTypes.number,
      similar: React.PropTypes.array
    })
  },

  render() {
    const color = this.props.color;
    return (
      <li className="color-container" id={color.rgba}>
          <div className="color-block" style={{backgroundColor: color.rgba}}></div>
          <span>{color.name} ({color.count})</span>
          <br />
          <span>{color.rgba}</span>
          <Similar similar={color.similar} />
      </li>
    );
  }
});
