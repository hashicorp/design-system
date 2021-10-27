// File: https://www.figma.com/file/LB6LrQvXpB3nL9dlCM7VUM/branch/FIUFCOb1eznYDDR6l3Tj3y/Visual-Refresh?node-id=2648%3A11147

// source: https://github.com/hashicorp/structure/tree/main/packages/pds-ember/app/styles/pds/tokens/color
// var colors = {
//     "hashicorp": {
//         "black": "#000000",
//         "white": "#ffffff",
//         "blue": "#1563ff",
//         "gray-1": "#1d1e23",
//         "gray-2": "#323339",
//         "gray-3": "#4c4c53",
//         "gray-4": "#7f7f86",
//         "gray-5": "#bdbec2",
//         "gray-6": "#dcdde0",
//         "gray-7": "#f7f7f9"
//     },
//     "consul": {
//         "l3": "#fff2f8",
//         "l2": "#f8d9e7",
//         "l1": "#e07eac",
//         "base": "#ca2171",
//         "d1": "#8e134a",
//         "d2": "#650d34"
//     },
//     "nomad": {
//         "l3": "#ebfdf7",
//         "l2": "#c1f1e0",
//         "l1": "#6bd8b4",
//         "base": "#00bc7f",
//         "d1": "#007854",
//         "d2": "#004c3a"
//     },
//     "packer": {
//         "l3": "#ebf8ff",
//         "l2": "#bfe8fe",
//         "l1": "#6bceff",
//         "base": "#00acff",
//         "d1": "#0074ba",
//         "d2": "#005283"
//     },
//     "terraform": {
//         "l3": "#f5f3ff",
//         "l2": "#ddd6fa",
//         "l1": "#a28ce8",
//         "base": "#623ce4",
//         "d1": "#3c2aa8",
//         "d2": "#2a1c73"
//     },
//     "vagrant": {
//         "l3": "#eff5ff",
//         "l2": "#d0e0ff",
//         "l1": "#66a2ff",
//         "base": "#1563ff",
//         "d1": "#0d44cc",
//         "d2": "#08368b"
//     },
//     "vault": {
//         "l5": "#f7f7f9",
//         "l4": "#dcdde0",
//         "l3": "#bdbec2",
//         "l2": "#4c4c53",
//         "l1": "#1d1e23",
//         "base": "#000000"
//     }
// };

// source: https://www.figma.com/file/B7yd8loYS7nA2TiQcJ8UtV/?node-id=202%3A1065
    // script:
    // var styles = figma.getLocalPaintStyles();

    // var brandStyles = {};

    // var rgbToHex = (r, g, b) => '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

    // var getColorHEX = (colorRGB) => {
    //     // Figma stores the "paints" styles in fractional format [0-1]
    //     // so we have to take the r/g/b values and multiply them by 255
    //     // https://forum.figma.com/t/dynamically-create-palette-with-createpaintstyle-locked-on-hextorgba-javascipt-function/5367/2
    //     const r = Math.round(colorRGB.r * 255);
    //     const g = Math.round(colorRGB.g * 255);
    //     const b = Math.round(colorRGB.b * 255);
    //     return rgbToHex(r,g,b);
    // };

    // styles.forEach(style => {
    //     const parts = style.name.toLowerCase().replace(/\s+\/\s+/g,'/').replace(' ','-').split('/');
    //     if (parts[0] === 'palette') {
    //         // console.log(style.name, parts);
    //         if (parts[1] === 'brand') {
    //             const brand = parts[2];
    //             const name = parts[3];
    //             if (!brandStyles.hasOwnProperty(brand)) {
    //                 brandStyles[brand] = {};
    //             }
    //             // Unfortunately Figma uses "proxies" so you can't pass around references
    //             // (to functions, for example, like in our case), but you have to build your own objects out of them
    //             // see: https://www.figma.com/plugin-docs/editing-properties/
    //             const colorRGB = {
    //                 r: style.paints[0].color.r,
    //                 g: style.paints[0].color.g,
    //                 b: style.paints[0].color.b,
    //             }
    //             brandStyles[brand][name] = getColorHEX(colorRGB)
    //         }
    //     }
    // });

    // console.log(JSON.stringify(brandStyles, null, 4));

// source: https://github.com/hashicorp/mktg-global-styles/blob/main/custom-properties/color.css
// var colors = {
//     "hashicorp": {
//         "hc-black": "#000000",
//         "hc-white": "#ffffff",
//         "hc-secondary": "#1563ff",
//         "hc-gray 1": "#1d1e23",
//         "hc-gray 2": "#323339",
//         "hc-gray 3": "#4c4c53",
//         "hc-gray 4": "#7f7f86",
//         "hc-gray 5": "#bdbec2",
//         "hc-gray 6": "#dcdde0",
//         "hc-gray 7": "#f7f7f9"
//     },
//     "consul": {
//         "consul-l3": "#fff2f8",
//         "consul-l2": "#f8d9e7",
//         "consul-l1": "#e07eac",
//         "consul-base": "#ca2171",
//         "consul-d1": "#8e134a",
//         "consul-d2": "#650d34"
//     },
//     "nomad": {
//         "nomad-l3": "#ebfdf7",
//         "nomad-l2": "#c1f1e0",
//         "nomad-l1": "#6bd8b4",
//         "nomad-base": "#00bc7f",
//         "nomad-d1": "#007854",
//         "nomad-d2": "#004c3a"
//     },
//     "packer": {
//         "packer-l3": "#ebf8ff",
//         "packer-l2": "#bfe8fe",
//         "packer-l1": "#6bceff",
//         "packer-base": "#00acff",
//         "packer-d1": "#0074ba",
//         "packer-d2": "#005283"
//     },
//     "terraform": {
//         "terraform-l3": "#f5f3ff",
//         "terraform-l2": "#ddd6fa",
//         "terraform-l1": "#a28ce8",
//         "terraform-base": "#623ce4",
//         "terraform-d1": "#3c2aa8",
//         "terraform-d2": "#2a1c73"
//     },
//     "vagrant": {
//         "vagrant-l3": "#eff5ff",
//         "vagrant-l2": "#d0e0ff",
//         "vagrant-l1": "#66a2ff",
//         "vagrant-base": "#1563ff",
//         "vagrant-d1": "#0d44cc",
//         "vagrant-d2": "#08368b"
//     },
//     "vault": {
//         "vault-l5": "#f7f7f9",
//         "vault-l4": "#dcdde0",
//         "vault-l3": "#bdbec2",
//         "vault-l2": "#4c4c53",
//         "vault-l1": "#1d1e23",
//         "vault-base": "#000000"
//     }
// };

// source https://github.com/hashicorp/mktg-global-styles/blob/main/custom-properties/color.css
// var colors = {
//     "hashicorp": {
//         "hashicorp": "#2e71e5;",
//         "hashicorp-secondary": "#f2f2f3",
//         "hashicorp-logomark": "#000000",
//         "hashicorp-accent": "#f2f2f3",
//         "hashicorp-link": "#2264d6",
//         "hashicorp-link-on-dark": "#4294ff"
//     },
//     "boundary": {
//         "boundary": "#ec585d",
//         "boundary-logomark": "#f24c53",
//         "boundary-secondary": "#ffecec",
//         "boundary-link": "#d3353f",
//         "boundary-link-on-dark": "#ff6068",
//         "boundary-accent": "#fff4d4"
//     },
//     "consul": {
//         "consul": "#dc477d",
//         "consul-logomark": "#e84580",
//         "consul-secondary": "#ffe9f1",
//         "consul-link": "#ca3066",
//         "consul-link-on-dark": "#f85c94",
//         "consul-accent": "#d1ebff"
//     },
//     "nomad": {
//         "nomad": "#60dea9",
//         "nomad-logomark": "#06d092",
//         "nomad-secondary": "#d3fdeb",
//         "nomad-link": "#008661",
//         "nomad-link-on-dark": "#60dea9",
//         "nomad-accent": "#f1fdcd"
//     },
//     "packer": {
//         "packer": "#63d0ff",
//         "packer-logomark": "#02a8ef",
//         "packer-secondary": "#d4f2ff",
//         "packer-link": "#007db4",
//         "packer-link-on-dark": "#63d0ff",
//         "packer-accent": "#cefcf2"
//     },
//     "terraform": {
//         "terraform": "#844fba",
//         "terraform-logomark": "#7b42bc",
//         "terraform-secondary": "#f4ecff",
//         "terraform-link": "#8040c9",
//         "terraform-link-on-dark": "#ac72f0",
//         "terraform-accent": "#d1ebff"
//     },
//     "vagrant": {
//         "vagrant": "#2e71e5",
//         "vagrant-logomark": "#1868f2",
//         "vagrant-secondary": "#d6ebff",
//         "vagrant-link": "#2264d6",
//         "vagrant-link-on-dark": "#4294ff",
//         "vagrant-accent": "#d2f8fe"
//     },
//     "vault": {
//         "vault": "#ffec6e",
//         "vault-logomark": "#00000",
//         "vault-secondary": "#fff9cf",
//         "vault-link": "#9c6d03",
//         "vault-link-on-dark": "#ffec6e",
//         "vault-accent": "#f2f2f3"
//     },
//     "waypoint": {
//         "waypoint": "#62d4dc",
//         "waypoint-logomark": "#14c6cb",
//         "waypoint-secondary": "#d7f8fa",
//         "waypoint-link": "#008196",
//         "waypoint-link-on-dark": "#62d4dc",
//         "waypoint-accent": "#d3fddb"
//     }
// };

// source: https://www.figma.com/file/8iryEikGV4Z5fVYmQH4WTi/01---Visual-Guidelines-v3.0?node-id=18222%3A14751
// script:
// var frame = figma.currentPage.selection[0];

// var allSwatches = frame.findAll(node => node.type === "INSTANCE" && node.name === 'Color swatch');

// var brandStyles = {};

// var rgbToHex = (r, g, b) => '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

// var getColorHEX = (colorRGB) => {
//     // Figma stores the "paints" styles in fractional format [0-1]
//     // so we have to take the r/g/b values and multiply them by 255
//     // https://forum.figma.com/t/dynamically-create-palette-with-createpaintstyle-locked-on-hextorgba-javascipt-function/5367/2
//     const r = Math.round(colorRGB.r * 255);
//     const g = Math.round(colorRGB.g * 255);
//     const b = Math.round(colorRGB.b * 255);
//     return rgbToHex(r,g,b);
// };

// if (allSwatches.length > 0) {
//     console.log(`Found ${allSwatches.length} swatches.`);
//     allSwatches.forEach((node) => {
//         var brand = node.parent.name.toLowerCase();
//         var name = node.children[3].characters.toLowerCase();
//         var hex1 = getColorHEX({
//             r: node.children[0].fills[0].color.r,
//             g: node.children[0].fills[0].color.g,
//             b: node.children[0].fills[0].color.b,
//         }).toLowerCase();
//         var hex2 = node.children[4].characters.toLowerCase();
//         if (hex1 !== hex2) { console.log(`${name} has different colors! ${hex1} vs ${hex2}`); }
//         if (!brandStyles.hasOwnProperty(brand)) {
//             brandStyles[brand] = {};
//         }
//         brandStyles[brand][name] = hex1;
//     });
//     console.log(JSON.stringify(brandStyles, null, 4));
// } else {
//     console.log('No components found!');
// }

// Notice: boundary secondary has different colors! #ffe9f1 vs #ffecec

var colors = {
    "boundary": {
        "boundary": "#ec585d",
        "boundary logomark": "#f24c53",
        "boundary secondary": "#ffe9f1",
        "boundary link on black": "#ff6068",
        "boundary accent": "#fff4d4",
        "boundary link on white": "#d3353f"
    },
    "consul": {
        "consul": "#dc477d",
        "consul logomark": "#e03875",
        "consul secondary": "#ffe9f1",
        "consul link on black": "#f85c94",
        "consul accent": "#d1ebff",
        "consul link on white": "#ca3066"
    },
    "nomad": {
        "nomad": "#60dea9",
        "nomad logomark": "#00ca8e",
        "nomad secondary": "#d3fdeb",
        "nomad link on black": "#60dea9",
        "nomad accent": "#f1fdcd",
        "nomad link on white": "#008661"
    },
    "packer": {
        "packer": "#63d0ff",
        "packer logomark": "#02a8ef",
        "packer secondary": "#d4f2ff",
        "packer link on black": "#63d0ff",
        "packer accent": "#cefcf2",
        "packer link on white": "#007db4"
    },
    "terraform": {
        "terraform": "#844fba",
        "terraform logomark": "#7b42bc",
        "terraform secondary": "#f4ecff",
        "terraform link on black": "#ac72f0",
        "terraform accent": "#d1ebff",
        "terraform link on white": "#8040c9"
    },
    "vagrant": {
        "vagrant": "#2e71e5",
        "vagrant logomark": "#1868f2",
        "vagrant secondary": "#d6ebff",
        "vagrant link on black": "#4294ff",
        "vagrant accent": "#d2f8fe",
        "vagrant link on white": "#2264d6"
    },
    "vault": {
        "vault": "#ffec6e",
        "vault logomark": "#000000",
        "vault secondary": "#fff9cf",
        "vault link on black": "#ffec6e",
        "vault accent": "#f2f2f3",
        "vault link on white": "#9c6d03"
    },
    "waypoint": {
        "waypoint": "#62d4dc",
        "waypoint logomark": "#14c6cb",
        "waypoint secondary": "#d7f8fa",
        "waypoint link on black": "#62d4dc",
        "waypoint accent": "#d3fddb",
        "waypoint link on white": "#008196"
    }
};

// this is the ID of the "swatch" component
var swatchComponent = figma.getNodeById('2648:11147');

// let's preload the fonts
var swatchNameFont = swatchComponent.children[1].fontName;
var swatchHexFont = swatchComponent.children[2].fontName;
await figma.loadFontAsync(swatchNameFont);
await figma.loadFontAsync(swatchHexFont);

var row = 0;
var col = 0;

var hexToFigmaRGB = (hex) => {
    let r = 0, g = 0, b = 0;

    if (hex.length == 4) {
        r = "0x" + hex[1] + hex[1];
        g = "0x" + hex[2] + hex[2];
        b = "0x" + hex[3] + hex[3];
    } else if (hex.length == 7) {
        r = "0x" + hex[1] + hex[2];
        g = "0x" + hex[3] + hex[4];
        b = "0x" + hex[5] + hex[6];
    }

    // Figma uses fractional RGB values [0-1]
    return {
        r: r / 255,
        g: g / 255,
        b: b / 255,
    };
};

// see https://www.figma.com/plugin-docs/editing-properties/
var cloneFigmaObject = (val) => {
    return JSON.parse(JSON.stringify(val))
};

Object.keys(colors).forEach(group => {
    Object.keys(colors[group]).forEach(color => {
        var instance = swatchComponent.createInstance();
        var rectangle = instance.children[0];
        var name = instance.children[1];
        var value = instance.children[2];
        var hex = colors[group][color];
        // set position
        instance.x = col * 220;
        instance.y = 0;
        // set rectangle color (we need to clone it)
        var fills = cloneFigmaObject(rectangle.fills);
        fills[0].color = hexToFigmaRGB(hex);
        rectangle.fills = fills;
        // set color name
        // name.characters = `${group} / ${color}`;
        name.characters = `${color}`;
        // set color value
        value.characters = hex;
        // increment counter
        col++;
    });
});
