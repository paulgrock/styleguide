import React from 'react';
import parser from '../../models/index';

const readFile = function(file, cb) {
  const reader = new FileReader();
  reader.onload = function() {
    const parsedContents = parser(reader.result, file.name);
    cb(true, parsedContents.colors, parsedContents.fonts);
  };
  reader.readAsText(file, 'utf-8');
};

export default React.createClass({
  propTypes: {
    _csrf: React.PropTypes.string.isRequired
  },

  render() {
    return (
      <form action="/file-upload" method="POST" encType="multipart/form-data">
        <input type="hidden" name="_csrf" value={this.props._csrf} />
        <input type="file" name="file-upload" onChange={this.handleChange} />
        <button type="submit" id="submit-button" onClick={this.handleClick}>Submit</button>
      </form>
    );
  },

  handleChange(e) {
    readFile(e.currentTarget.files[0], this.props.handleParseFile);
  },

  handleClick(e) {
    e.preventDefault();
    console.log(e);
    debugger;
  }
})
