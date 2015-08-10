'use strict';
const postcss = require('postcss');
const Color = require('onecolor');
const namer = require('color-namer');
const pipetteur = require('pipetteur');
const colorDiff = require('color-diff');
// const specificityGraph = require('specificity-graph');
const precompiledRegexSize = /(size)/i;
const precompiledRegexRem = /(rem)/i;
const precompiledRegexFamily = /(family)/i;
const pallette = [];

const incrementor = function incrementor(obj) {
  return function(key) {
    if (obj[key]) {
      const count = obj[key];
      obj[key] = count + 1;
    } else {
      obj[key] = 1;
    }

    return obj;
  };
};

const sortByCount = function(list) {
  list.sort(function(a, b) {
    return b.count - a.count;
  });
};

const rgbToLab = function(rgb) {
  return colorDiff.rgb_to_lab(rgb);
};

module.exports = function IndexModel(styles, filePath) {
  const colors = {};
  const fonts = {
    families: [],
    sizes: []
  };
  const fontSizes = {};
  const fontFamilies = {};
  const incrementColor = incrementor(colors);
  const incrementSizes = incrementor(fontSizes);
  const incrementFamilies = incrementor(fontFamilies);
  const parsedStyles = postcss.parse(styles, {
    from: filePath
  });
  parsedStyles.eachRule(function(rule) {
    rule.eachDecl(function(decl) {
      const declColors = pipetteur(decl.value.toLowerCase());
      declColors.forEach(function(color) {
        const rgbaColor = Color(color.color).cssa();
        incrementColor(rgbaColor);
      });
    });

    rule.eachDecl(/font/, function(decl) {
      if (precompiledRegexSize.test(decl.prop)) {
        if (precompiledRegexRem.test(decl.value)) {
          fonts.sizes.pop();
        }
        fonts.sizes.push(decl.value);
      }
      if (precompiledRegexFamily.test(decl.prop)) {
        incrementFamilies(decl.value);
      }
    });
  });
  fonts.sizes.forEach(incrementSizes);
  const colorList = [];

  for (let item in colors) {
    const entry = colors[item];
    const oneColor = Color(item);
    const col = oneColor.hex();
    const names = namer(col).ntc;
    const rgb = {
      R: Math.round(oneColor.red() * 255),
      G: Math.round(oneColor.green() * 255),
      B: Math.round(oneColor.blue() * 255)
    };
    pallette.push(rgb);
    colorList.push({
      count: entry,
      rgba: item,
      name: names[0].name,
      rgb: rgb,
      similar: []
    });
  }

  colorList.forEach(function(color) {
    for (let i = 0, len = pallette.length; i < len; i += 1) {
      const similarColor = pallette[i];
      const diff = colorDiff.diff(rgbToLab(color.rgb), rgbToLab(similarColor));
      if (diff < 3 && diff > 0) {
        const colorString = 'rgb(' + similarColor.R + ', ' + similarColor.G + ', ' + similarColor.B + ')';
        color.similar.push(Color(colorString).cssa());
      }
    }
  });

  fonts.sizes = [];
  for (let item in fontSizes) {
    if (fontSizes.hasOwnProperty(item)) {
      fonts.sizes.push({
        name: item,
        count: fontSizes[item]
      });
    }
  }

  for (let item in fontFamilies) {
    if (fontFamilies.hasOwnProperty(item)) {
      fonts.families.push({
        name: item,
        count: fontFamilies[item]
      });
    }
  }

  sortByCount(colorList);
  sortByCount(fonts.sizes);
  sortByCount(fonts.families);

  return {
    colors: colorList,
    fonts: fonts
  };
};

// specificityGraph('public/static/specificity-graph', styles, function(dest, err) {
//   if (err) console.error(err);
//   console.log(dest);
// });
