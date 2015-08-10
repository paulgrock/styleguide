import React from 'react';
import ColorListItem from './color-list-item.jsx';

const Colors = React.createClass({
  propTypes: {
    colors: React.PropTypes.array.isRequired
  },

  render() {
    const colorList = this.props.colors.map((color, idx)=> {
      return <ColorListItem key={idx} color={color} />;
    });
    return (
      <div>
          <h1>Colors ({this.props.colors.length})</h1>
          <ul>
            {colorList}
          </ul>
      </div>
    );
  }
});

export default Colors;
