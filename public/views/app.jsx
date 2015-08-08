import React from 'react';
import Layout from './layout';
import FileUpload from './file-upload';
import ParsedFile from './file-parser';

export default React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    _csrf: React.PropTypes.string.isRequired
  },

  getInitialState() {
    return {
      parsedFile: false
    };
  },

  render() {
    if (this.state.parsedFile) {
      return 'main section';
    }
    return (
      <Layout {...this.props}>
        <h1>{this.props.title}</h1>
        <FileUpload _csrf={this.props._csrf} />
      </Layout>
    );
  }
});
