import StyleDictionaryPackage from 'style-dictionary';
import tinycolor from 'tinycolor2';

import fs from 'fs-extra';
import path from 'path';

import { ConfigTargets } from './@types/Config';
import { DesignToken } from 'style-dictionary/types/DesignToken';

// SCRIPT CONFIG

const distFolder = path.resolve(__dirname, '../dist');

// CUSTOM TRANSFORMS

StyleDictionaryPackage.registerTransform({
    name: 'spacing/pxToRem',
    type: 'value',
    matcher: function(token) {
        return token.group === 'spacing';
    },
    transformer: function (token, platform) {
        const val = parseFloat(token.value);
        const baseFont = platform?.basePxFontSize || 16;
        if (isNaN(val)) throw `Invalid Number: '${token.name}: ${token.value}' is not a valid number, cannot transform to 'rem' \n`;
        return `${(token.value / baseFont)}rem`;
    }
});

// copy of SD "size/px" but using the "group" for matching
StyleDictionaryPackage.registerTransform({
    name: 'spacing/px',
    type: 'value',
    matcher: function(token) {
        return token.group === 'spacing';
    },
    transformer: function (token) {
        const val = parseFloat(token.value);
        if (isNaN(val)) throw `Invalid Number: '${token.name}: ${token.value}' is not a valid number, cannot transform to 'px' \n`;
        return `${token.value}px`;
    }
});

// https://caniuse.com/mdn-css_types_color_alpha_hexadecimal_notation
StyleDictionaryPackage.registerTransform({
    name: 'color/with-alpha',
    type: 'value',
    transitive: true, // see: https://amzn.github.io/style-dictionary/#/transforms?id=transitive-transforms
    matcher: function(token: DesignToken) {
        return token.type === 'color' && token.alpha;
    },
    transformer: function (token) {
        const color = tinycolor(token.value);
        if (!color.isValid) throw `Invalid Color: '${token.name}: ${token.value}' is not a valid color.\n`;
        const alpha = parseFloat(token.alpha);
        if (!(alpha > 0 && alpha < 1)) throw `Invalid Alpha: '${token.name}: ${token.value}' is not a valid alpha value (should be in the format 0.x).\n`;
        return color.setAlpha(alpha).toHex8String();
    }
});


StyleDictionaryPackage.registerTransformGroup({
    // copy of the SD "web" transform customized to support "spacing/pxToRem"
    // see: https://github.com/amzn/style-dictionary/blob/1fe585f196211200b3de671a941aae9b87e1163b/lib/common/transformGroups.js#L30-L34
    name: 'products/custom/web',
    transforms: ['attribute/cti', 'name/cti/kebab', 'spacing/pxToRem', 'color/css', 'color/with-alpha']
});

StyleDictionaryPackage.registerTransformGroup({
    // copy of the SD "web" transform customized to support "spacing/px"
    // see: https://github.com/amzn/style-dictionary/blob/1fe585f196211200b3de671a941aae9b87e1163b/lib/common/transformGroups.js#L30-L34
    name: 'marketing/custom/web',
    transforms: ['attribute/cti', 'name/cti/kebab', 'spacing/px', 'color/css', 'color/with-alpha']
});


// DYNAMIC CONFIG

const targets: ConfigTargets = {
    'products': {
        'source': [
            `src/global/**/*.json`,
            `src/products/shared/**/*.json`
        ],
        'transformGroup': 'products/custom/web',
    },
    'marketing': {
        'source': [
            `src/global/**/*.json`,
            `src/marketing/**/*.json`
        ],
        'transformGroup': 'marketing/custom/web',
    }
};

function getStyleDictionaryConfig({ target }: { target: string }) {
    return {
        "source": targets[target].source,
        "platforms": {
            "web/css-variables": {
                "transformGroup": targets[target].transformGroup,
                "buildPath": `dist/${target}/css/`,
                "prefix": "token",
                "basePxFontSize": 16,
                "files": [
                    {
                        "destination": "tokens.css",
                        "format": "css/variables",
                        "filter": function(token: DesignToken) {
                            return !token.private;
                        },
                    }
                ]
            }
        }
    };
}

// PROCESS THE DESIGN TOKENS

console.log('Build started...');
console.log('\n==============================================');

// empty the dist folder
console.log(`\nCleaning up dist folder`);
fs.emptyDirSync(distFolder);

Object.keys(targets).forEach(target => {
    const StyleDictionary = StyleDictionaryPackage.extend(getStyleDictionaryConfig({ target }));

    console.log(`\nProcessing target "${target}"...`);
    StyleDictionary.buildPlatform('web/css-variables');
    console.log('\nEnd processing');
})


console.log('\n==============================================');
console.log('\nBuild completed!');
