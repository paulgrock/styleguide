import React from 'react';

export default React.createClass({
  render() {
    const similarColors = () => {
      return (
        <li>
            <a href="#{this}">
                <div className="color-block" style="background-color: {this};"></div>
                <span>{this}</span>
            </a>
        </li>
      );
    };

    return (
      <details>
          <summary>Similar Colors</summary>
          <ul>
            <li>colors</li>
          </ul>
      </details>
    );
  }
});
