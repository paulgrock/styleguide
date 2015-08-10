import React from 'react';

export default React.createClass({
  propTypes: {
    similar: React.PropTypes.array.isRequired
  },

  render() {
    const similarList = this.props.similar.map((similar, idx)=> {
      return (
        <li key={idx}>
          <a href={'#' + similar}>
            <span className="color-block" style={{backgroundColor: similar}}></span>
            <span>{similar}</span>
          </a>
        </li>
      );
    });

    return (
      <details>
          <summary>Similar Colors</summary>
          <ul>
            {similarList}
          </ul>
      </details>
    );
  }
});
