import React from 'react';

export default React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    children: React.PropTypes.array.isRequired
  },

  render() {
    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <title>
            {this.props.title}
          </title>
          <link rel="stylesheet" href="/css/app.min.css" />
        </head>
        <body>
          {this.props.children}
        </body>
        <script src="/js/app.min.js"></script>
      </html>
    );
  }
});
