var styles = figma.getLocalPaintStyles();

var paletteSD = {};
var paletteMapping = {};
var colorSD = {};

var rgbToHex = (r, g, b) => '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

var getObjectColorHEX = (colorRGB, category) => {
    // Figma stores the "paints" styles in fractional format [0-1]
    // so we have to take the r/g/b values and multiply them by 255
    // https://forum.figma.com/t/dynamically-create-palette-with-createpaintstyle-locked-on-hextorgba-javascipt-function/5367/2
    const r = Math.round(colorRGB.r * 255);
    const g = Math.round(colorRGB.g * 255);
    const b = Math.round(colorRGB.b * 255);
    return {
        value: rgbToHex(r,g,b),
        type: 'color',
        group: category,
    };
};

var getObjectColorAlias = (colorRGB, category) => {
    const colorObject = getObjectColorHEX(colorRGB, category);
    // override hex color with a Style Dictionary alias
    colorObject.value = `{color.palette.${paletteMapping[colorObject.value]}.value}`;
    return colorObject;
};


// BUILD THE "PALETTE" OF COLORS

styles.forEach(style => {
    const parts = style.name.toLowerCase().replace(' ','-').split('/');
    const category = parts[0];

    if (category === 'palette') {
        // Unfortunately Figma uses "proxies" so you can't pass around references
        // (to functions, for example, like in our case), but you have to build your own objects out of them
        // see: https://www.figma.com/plugin-docs/editing-properties/
        const colorRGB = {
            r: style.paints[0].color.r,
            g: style.paints[0].color.g,
            b: style.paints[0].color.b,
        }

        const colorGroup = parts[1];
        const colorName = parts[2];
        if (colorGroup === 'alpha') {
            return;
        }
        const hexColor = getObjectColorHEX(colorRGB, category, style.name);
        paletteSD[colorName] = hexColor;
        paletteMapping[hexColor.value] = colorName;
    }
});

console.log(JSON.stringify({ color: { palette: paletteSD } }, null, 4));
// console.log(JSON.stringify(paletteMapping, null, 4));



// BUILD THE LIST OF SEMANTIC COLORS

styles.forEach(style => {
    const parts = style.name.toLowerCase().replace(' ','-').split('/');
    const category = parts[0];
    if (category === 'palette' || category === 'gradients') {
        return;
    }
    console.log(category, parts);

    // Unfortunately Figma uses "proxies" so you can't pass around references
    // (to functions, for example, like in our case), but you have to build your own objects out of them
    // see: https://www.figma.com/plugin-docs/editing-properties/
    const colorRGB = {
        r: style.paints[0].color.r,
        g: style.paints[0].color.g,
        b: style.paints[0].color.b,
    }

    if (category === 'neutral') {
        if (!colorSD.hasOwnProperty(category)) {
            colorSD[category] = {};
        }
        const colorName = parts[1];
        if (colorName.match(/^alpha/)) { return; }
        colorSD[category][colorName] = getObjectColorAlias(colorRGB, category);
    } else {
        if (!colorSD.hasOwnProperty(category)) {
            colorSD[category] = {};
        }
        const colorContext = parts[1];
        if (!colorSD[category].hasOwnProperty(colorContext)) {
            colorSD[category][colorContext] = {};
        }
        const colorName = parts[2];
        colorSD[category][colorContext][colorName] = getObjectColorAlias(colorRGB, category);
    }

    // extra checks
    if (style.paints[0].type !== 'SOLID') {
        console.log(`ATTENTION: style ${style.name} is not a SOLID color!`);
    }
    if (style.paints[0].opacity !== 1) {
        console.log(`ATTENTION: style ${style.name} has opacity ${style.paints[0].opacity}`);
    }

});

console.log(JSON.stringify({ color: colorSD }, null, 4));
