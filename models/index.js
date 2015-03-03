'use strict';
var postcss = require('postcss'),
    fs = require('fs'),
    filePath = './examples/hearthstone.css',
    styles = fs.readFileSync(filePath, 'utf8'),
    Color = require('onecolor'),
    namer = require('color-namer'),
    pipetteur = require('pipetteur');

var colors = {};
var incrementColor = function incrementColor(color) {
    if (colors[color]) {
        let count = colors[color];
        colors[color] = count + 1;
    } else {
        colors[color] = 1;
    }
}
module.exports = function IndexModel() {
    var fonts = {
        families: [],
        sizes: []
    };
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
        rule.eachDecl(/font/, function(decl) {
            if (decl.prop.indexOf('size') != -1) {
                fonts.sizes.push(decl.value);
            }
            if (decl.prop.indexOf('family') != -1) {
                fonts.families.push(decl.value);
            }
        })
    });
    var colorList = []
    for (var item in colors) {
        var entry = colors[item];
        var col = Color(item).hex()
        let names = namer(col);
        colorList.push({
            count: entry,
            rgba: item,
            name: names[0].name
        })
    }
    colorList.sort(function(a, b) {
        return b.count - a.count;
    });
    return {
        colors: colorList,
        fonts: fonts
    };
};
