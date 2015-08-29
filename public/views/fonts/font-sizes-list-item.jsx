import React from 'react';

const SizeListItem = React.createClass({
  propTypes: {
    sizes: React.PropTypes.shape({
      name: React.PropTypes.string,
      count: React.PropTypes.number
    })
  },
  render() {
    const {name, count} = this.props.sizes;
    return (
      <li style={{fontSize: name}}>{name} ({count})</li>
    );
  }
});

export default SizeListItem;
