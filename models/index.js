'use strict';
var postcss = require('postcss'),
    fs = require('fs'),
    filePath = './examples/hearthstone.css',
    styles = fs.readFileSync(filePath, 'utf8'),
    Color = require('onecolor'),
    namer = require('color-namer'),
    pipetteur = require('pipetteur');

var colors = new Map();
var incrementColor = function incrementColor(color) {
    if (colors.has(color)) {
        let count = colors.get(color);
        colors.set(color, count + 1);
    } else {
        colors.set(color, 1);
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
            let colors = pipetteur(decl.value.toLowerCase());
            colors.forEach(function(color) {
                let rgbaColor = Color(color.color).cssa();
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
    for (let entry of colors.entries()) {
        var col = Color(entry[0]).hex()
        let names = namer(col);
        colorList.push({
            count: entry[1],
            rgba: entry[0],
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
