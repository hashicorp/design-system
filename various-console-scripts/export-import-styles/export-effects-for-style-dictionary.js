var styles = figma.getLocalEffectStyles();

var effects = { elevation: {}, surface: {} };

var rgbToHex = (r, g, b) => '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

var getColorHEX = (colorRGB) => {
    // Figma stores the "paints" styles in fractional format [0-1]
    // so we have to take the r/g/b values and multiply them by 255
    // https://forum.figma.com/t/dynamically-create-palette-with-createpaintstyle-locked-on-hextorgba-javascipt-function/5367/2
    const r = Math.round(colorRGB.r * 255);
    const g = Math.round(colorRGB.g * 255);
    const b = Math.round(colorRGB.b * 255);
    return rgbToHex(r,g,b);
};

styles.forEach(style => {
    const parts = style.name.toLowerCase().replace(' ','-').split('/');
    const category = parts[0];
    const name = parts[1];

    // init the container
    effects[category][name] = [];

    style.effects.forEach(effect => {
        const data = {
            x: effect.offset.x,
            y: effect.offset.y,
            blur: effect.radius,
            spread: effect.spread,
            // Unfortunately Figma uses "proxies" so you can't pass around references
            // (to functions, for example, like in our case), but you have to build your own objects out of them
            // see: https://www.figma.com/plugin-docs/editing-properties/
            color: getColorHEX({
                r: effect.color.r,
                g: effect.color.g,
                b: effect.color.b,
            }),
            alpha: Math.round(effect.color.a * 100) / 100,
        };

        effects[category][name].push(data);

    });
});

console.log(JSON.stringify(effects, null, 4));
