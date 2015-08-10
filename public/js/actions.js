export const ADD_COLORS = 'ADD_COLORS';
export const ADD_FONTS = 'ADD_FONTS';
export const PARSED_FILE = 'PARSED_FILE';

export function addColors(colors) {
  return {
    type: ADD_COLORS,
    colors
  };
}

export function addFonts(fonts) {
  return {
    type: ADD_FONTS,
    fonts
  };
}

export function setParsedFile(bool) {
  return {
    type: PARSED_FILE,
    parsedFile: !!bool
  };
}
