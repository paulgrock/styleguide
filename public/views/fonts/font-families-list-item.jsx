import React from 'react';

const FamilyListItem = React.createClass({
  propTypes: {
    family: React.PropTypes.shape({
      name: React.PropTypes.string,
      count: React.PropTypes.number
    })
  },
  render() {
    const {name, count} = this.props.family;
    return (
      <li style={{fontFamily: name}}>{name} ({count})</li>
    );
  }
});

export default FamilyListItem;
