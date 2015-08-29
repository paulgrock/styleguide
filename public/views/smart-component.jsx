import React from 'react';
import { connect } from 'react-redux';
import { addColors, addFonts, setParsedFile } from '../js/actions';

import Color from './colors/colors.jsx';
import Font from './fonts/fonts.jsx';
import FileUpload from './file-upload.jsx';

const Wrapper = React.createClass({
  render() {
    const { dispatch, colors } = this.props;
    let colorContent;
    let fonts;
    if (this.props.parsedFile) {
      colorContent = <Color {...this.props} />;
      fonts = <Font {...this.props.fonts} />;
    }

    return (
      <div>
        <FileUpload _csrf={this.props._csrf} handleParseFile={this.handleParseFile} />
        {colorContent}
        {fonts}
      </div>
    );
  },

  handleParseFile(bool, colors, fonts) {
    const { dispatch } = this.props;
    dispatch(addColors(colors));
    dispatch(addFonts(fonts));
    dispatch(setParsedFile(bool));
  }
});

const select = function select(state) {
  return {
    colors: state.colors,
    fonts: state.fonts,
    parsedFile: state.parsedFile
  };
};

export default connect(select)(Wrapper);
