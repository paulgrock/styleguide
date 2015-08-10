import objectAssign from 'object-assign';
import { PARSED_FILE, ADD_COLORS, ADD_FONTS } from './actions';

const initialState = {
  colors: [],
  fonts: {},
  parsedFile: false
};


const cssApp = (state = initialState, action) => {
  switch (action.type) {
  case PARSED_FILE:
    return objectAssign({}, state, {
      parsedFile: action.parsedFile
    });

  case ADD_COLORS:
    return objectAssign({}, state, {
      colors: action.colors
    });


  case ADD_FONTS:
    return objectAssign({}, state, {
      fonts: action.fonts
    });

  default:
    return state;
  }
};

export default cssApp;
