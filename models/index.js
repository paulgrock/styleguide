'use strict';
var postcss = require('postcss'),
    fs = require('fs'),
    filePath = './examples/hearthstone.css',
    styles = fs.readFileSync(filePath, 'utf8'),
    Color = require('onecolor'),
    namer = require('color-namer'),
    pipetteur = require('pipetteur'),
    colorDiff = require('color-diff');

var precompiledRegexSize = /(size)/i;
var precompiledRegexRem = /(rem)/i;
var precompiledRegexFamily = /(family)/i;
var pallette = [];
var incrementor = function incrementor(obj) {
    return function(key) {
        if (obj[key]) {
            let count = obj[key];
            obj[key] = count + 1;
        } else {
            obj[key] = 1;
        }
        return obj;
    }
}

var sortByCount = function(list) {
    list.sort(function(a, b) {
        return b.count - a.count;
    });
}

var rgbToLab = function(rgb) {
    return colorDiff.rgb_to_lab(rgb);
}

module.exports = function IndexModel() {
    var colors = {};
    var fonts = {
        families: [],
        sizes: []
    };
    var fontSizes = {};
    var fontFamilies = {};
    var incrementColor = incrementor(colors);
    var incrementSizes = incrementor(fontSizes);
    var incrementFamilies = incrementor(fontFamilies);
    var parsedStyles = postcss.parse(styles, {
        from: filePath
    });
    parsedStyles.eachRule(function (rule) {
        rule.eachDecl(function(decl) {
            var declColors = pipetteur(decl.value.toLowerCase());
            declColors.forEach(function(color) {
                var rgbaColor = Color(color.color).cssa();
                incrementColor(rgbaColor);
            })
        })
        rule.eachDecl(/font/, function(decl, idx) {
            if (precompiledRegexSize.test(decl.prop)) {
                if (precompiledRegexRem.test(decl.value)) {
                    fonts.sizes.pop();
                }
                fonts.sizes.push(decl.value);
            }
            if (precompiledRegexFamily.test(decl.prop)) {
                incrementFamilies(decl.value);
            }
        })
    });
    fonts.sizes.forEach(incrementSizes);
    var colorList = []
    for (var item in colors) {
        var entry = colors[item];
        var oneColor = Color(item);
        var col = oneColor.hex();
        let names = namer(col).ntc;
        var rgb = {
            R: Math.round(oneColor.red() * 255),
            G: Math.round(oneColor.green() * 255),
            B: Math.round(oneColor.blue() * 255)
        }
        pallette.push(rgb)
        colorList.push({
            count: entry,
            rgba: item,
            name: names[0].name,
            rgb: rgb,
            similar: []
        })
    }

    colorList.forEach(function(color) {
        for (var i = 0, len = pallette.length; i < len; i += 1) {
            var similarColor = pallette[i];
            var diff = colorDiff.diff(rgbToLab(color.rgb), rgbToLab(similarColor));
            if (diff < 3 && diff > 0) {
                var colorString = 'rgb(' + similarColor.R + ', ' + similarColor.G + ', ' + similarColor.B + ')';
                color.similar.push(Color(colorString).cssa());
            }
        }
    });

    fonts.sizes = [];
    for (var item in fontSizes) {
        if (fontSizes.hasOwnProperty(item)) {
            fonts.sizes.push({
                name: item,
                count: fontSizes[item]
            })
        }
    }
    for (var item in fontFamilies) {
        if (fontFamilies.hasOwnProperty(item)) {
            fonts.families.push({
                name: item,
                count: fontFamilies[item]
            })
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
