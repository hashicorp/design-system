// Files:
// - https://www.figma.com/file/oQsMzMMnynfPWpMEt91OpH/branch/oYgzazyAvjWKROL8xSVqNw/HDS-Product---Foundations?node-id=2477%3A1170
// - https://www.figma.com/file/kAFajMho8bT3NwAHMHBWnD/Untitled?node-id=1%3A84

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

var getTokenValueObject = (colorHEX) => {
    return {
        "value": colorHEX.toLowerCase(),
        "type": "color",
        "group": "palette"
    }
}

var data = { color: { palette: {}}};
var allProducts = figma.currentPage.selection[0].children;

allProducts.forEach(productGroupNode => {
    var productName = productGroupNode.children[0].children[0].characters.toLowerCase();
    var productColorsGroup = productGroupNode.children[1];
    var productColorBrand = productColorsGroup.children[0];
    var productColorBrandSwatch = productColorBrand.findAll(node => node.type === "RECTANGLE");
    var productColorBrandObj = productColorBrandSwatch[0].fills[0].color;
    var productColorBrandHex = getColorHEX({
        r: productColorBrandObj.r,
        g: productColorBrandObj.g,
        b: productColorBrandObj.b,
    });
    data.color.palette[`${productName}-brand`] = getTokenValueObject(productColorBrandHex);
    var productColorPaletteGroup = productColorsGroup.children[1].children[1];
    productColorPaletteGroup.children.forEach(productColorToneGrop => {
        var productColorToneValue = productColorToneGrop.children[0].characters.split(' ')[1];
        var productColorToneObj = productColorToneGrop.children[1].fills[0].color;
        // console.log(productColorToneName, productColorToneObj, productColorToneGrop.children[1].type);
        var productColorToneHex = getColorHEX({
            r: productColorToneObj.r,
            g: productColorToneObj.g,
            b: productColorToneObj.b,
        });
        if (productColorToneHex.toLowerCase() !== productColorToneGrop.children[2].characters.toLowerCase()) {
            console.log(`in ${productName}/${productColorToneValue} ${productColorToneHex} and ${productColorToneGrop.children[2].characters} are different`);
        }
        data.color.palette[`${productName}-${productColorToneValue}`] = getTokenValueObject(productColorToneHex);
    })
})

console.log(JSON.stringify(data, null, 2));
