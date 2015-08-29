import React from 'react';
import FamilyListItem from './font-families-list-item.jsx';
import SizeListItem from './font-sizes-list-item.jsx';

const Fonts = React.createClass({
  propTypes: {
    families: React.PropTypes.array,
    sizes: React.PropTypes.array
  },

  render() {
    const familyListItem = this.props.families.map((family, idx) => {
      return <FamilyListItem family={family} key={idx} />;
    });

    const sizeListItem = this.props.sizes.map((size, idx) => {
      return <SizeListItem key={idx} sizes={size} />
    });

    return (
      <div>
        <div className="font-familes">
          <h1>Fonts Families ({this.props.families.length})</h1>
          <ul>
            {familyListItem}
          </ul>
        </div>
        <div>
          <h1>Fonts Sizes ({this.props.sizes.length})</h1>
          <ul>
            {sizeListItem}
          </ul>
        </div>
      </div>
    );
  }
});

export default Fonts;
/*
{#fonts}
    <h2>Families ({@size key=families /})</h2>
    <ul>
        {#families}
            <li>
                <p>{name} ({count})</p>
            </li>
        {/families}
    </ul>
    <h2>Sizes ({@size key=sizes /})</h2>
    <ul>
        {#sizes}
            <li>
                <p>{name} ({count})</p>
            </li>
        {/sizes}
    </ul>
{/fonts}
*/
