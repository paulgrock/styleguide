import React from 'react';

export default React.createClass({
  propTypes: {
    _csrf: React.PropTypes.string.isRequired
  },

  render() {
    return (
      <form action="/file-upload" method="POST" encType="multipart/form-data">
        <input type="hidden" name="_csrf" value={this.props._csrf} />
        <input type="file" name="file-upload" />
        <button type="submit" id="submit-button">Submit</button>
      </form>
    );
  }
})
