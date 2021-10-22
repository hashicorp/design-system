var styles = figma.getLocalPaintStyles();

var paletteSD = { palette: {} };
var colorSD = { color: {} };

var rgbToHex2 = (r, g, b) => '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

var getColorHEX = (colorRGB, category, name) => {
    // Figma stores the "paints" styles in fractional format [0-1]
    // so we have to take the r/g/b values and multiply them by 255
    // https://forum.figma.com/t/dynamically-create-palette-with-createpaintstyle-locked-on-hextorgba-javascipt-function/5367/2
    const r = Math.round(colorRGB.r * 255);
    const g = Math.round(colorRGB.g * 255);
    const b = Math.round(colorRGB.b * 255);
    return {
        value: rgbToHex2(r,g,b),
        type: 'color',
        group: category,
    };
};

styles.forEach(style => {
    const parts = style.name.toLowerCase().replace(' ','-').split('/');
    const category = parts[0];
    if (category === 'old' || category === 'gradients') {
        return;
    }

    // Unfortunately Figma uses "proxies" so you can't pass around references
    // (to functions, for example, like in our case), but you have to build your own objects out of them
    // see: https://www.figma.com/plugin-docs/editing-properties/
    const colorRGB = {
        r: style.paints[0].color.r,
        g: style.paints[0].color.g,
        b: style.paints[0].color.b,
    }

    if (category === 'palette') {
        const colorGroup = parts[1];
        const colorName = parts[2];
        if (colorGroup === 'alpha') {
            return;
        }
        paletteSD.palette[colorName] = getColorHEX(colorRGB, category, style.name);
    } else if (category === 'neutral') {
        if (!colorSD.color.hasOwnProperty(category)) {
            colorSD.color[category] = {};
        }
        const colorName = parts[1];
        if (colorName.match(/^alpha/)) { return; }
        colorSD.color[category][colorName] = getColorHEX(colorRGB, category, style.name);
    } else {
        if (!colorSD.color.hasOwnProperty(category)) {
            colorSD.color[category] = {};
        }
        const colorContext = parts[1];
        if (!colorSD.color[category].hasOwnProperty(colorContext)) {
            colorSD.color[category][colorContext] = {};
        }
        const colorName = parts[2];
        colorSD.color[category][colorContext][colorName] = getColorHEX(colorRGB, category, style.name);
    }

    // extra checks
    if (style.paints[0].type !== 'SOLID') {
        console.log(`ATTENTION: style ${style.name} is not a SOLID color!`);
    }
    if (style.paints[0].opacity !== 1) {
        console.log(`ATTENTION: style ${style.name} has opacity ${style.paints[0].opacity}`);
    }

});

console.log(JSON.stringify(paletteSD, null, 4));
console.log(JSON.stringify(colorSD, null, 4));
