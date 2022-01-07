import StyleDictionaryPackage, { DesignToken, Transform }  from 'style-dictionary';
import tinycolor from 'tinycolor2';

import fs from 'fs-extra';
import path from 'path';
import { cloneDeep } from 'lodash';

import { ConfigTargets } from './@types/Config';

import { generateCssHelpers } from './build-parts/generateCssHelpers';

// SCRIPT CONFIG

const distFolder = path.resolve(__dirname, '../dist');

// CUSTOM TRANSFORMS

const transformPxToRem: Transform['transformer'] = (token, platform) => {
    const val = parseFloat(token.value);
    const baseFont = platform?.basePxFontSize || 16;
    if (isNaN(val)) throw `Invalid Number: '${token.name}: ${token.value}' is not a valid number, cannot transform to 'rem'.\n`;
    return `${(token.value / baseFont)}rem`;
}

StyleDictionaryPackage.registerTransform({
    name: 'spacing/px',
    type: 'value',
    matcher: function(token) {
        return token.group === 'spacing';
    },
    transformer: function (token) {
        const val = parseFloat(token.value);
        if (isNaN(val)) throw `Invalid Number: '${token.name}: ${token.value}' is not a valid number, cannot transform to 'px'.\n`;
        return `${token.value}px`;
    }
});

StyleDictionaryPackage.registerTransform({
    name: 'elevation/px',
    type: 'value',
    matcher: function(token) {
        return token?.attributes?.category === 'elevation' && token.type === 'size';
    },
    transformer: function (token) {
        const val = parseFloat(token.value);
        if (isNaN(val)) throw `Invalid Number: '${token.name}: ${token.value}' is not a valid number, cannot transform to 'px'.\n`;
        return `${token.value}px`;
    }
});

StyleDictionaryPackage.registerTransform({
    name: 'spacing/pxToRem',
    type: 'value',
    matcher: function(token) {
        return token.group === 'spacing';
    },
    transformer: transformPxToRem
});

StyleDictionaryPackage.registerTransform({
    name: 'typography/pxToRem',
    type: 'value',
    matcher: function(token) {
        return token?.attributes?.category === 'typography' && token.type === 'size';
    },
    transformer: transformPxToRem
});

// NOTICE: in case in the future we need more complex transformations, we can use this approach (see the "modify" attribute):
// https://github.com/amzn/style-dictionary/blob/main/examples/advanced/transitive-transforms/
//
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
        // https://caniuse.com/mdn-css_types_color_alpha_hexadecimal_notation
        return color.setAlpha(alpha).toHex8String();
    }
});

StyleDictionaryPackage.registerTransformGroup({
    name: 'products/web',
    transforms: ['attribute/cti', 'name/cti/kebab', 'spacing/pxToRem', 'typography/pxToRem', 'elevation/px', 'color/css', 'color/with-alpha']
});

StyleDictionaryPackage.registerTransformGroup({
    name: 'marketing/web',
    transforms: ['attribute/cti', 'name/cti/kebab', 'spacing/px', 'color/css', 'color/with-alpha']
});

StyleDictionaryPackage.registerFormat({
    name: 'docs/json',
    formatter: function (dictionary: any) {
        // console.log(dictionary.allProperties);
        // Notice: this object shape is used also in the documentation so any updates
        // to this format should be reflected in the corresponding type definition.
        const output: {}[] = [];
        dictionary.allProperties.forEach((token: any) => {
            // we remove the "filePath" prop from the token because the orginal file path is irrelevant for us
            // (plus its value is an absolute path, so it causes useless diffs in git)
            const outputToken = cloneDeep(token);
            delete outputToken.filePath;
            delete outputToken.isSource;
            output.push(outputToken);
        });
        return JSON.stringify(output, null, 2);
    },
});

StyleDictionaryPackage.registerAction({
    name: 'generate-css-helpers',
    do: generateCssHelpers,
    undo: () => {}
});

// DYNAMIC CONFIG

const targets: ConfigTargets = {
    'products': {
        'source': [
            `src/global/**/*.json`,
            `src/products/shared/**/*.json`
        ],
        'transformGroup': 'products/web',
    },
    'marketing': {
        'source': [
            `src/global/**/*.json`,
            `src/marketing/**/*.json`
        ],
        'transformGroup': 'marketing/web',
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
                ],
                'actions': ['generate-css-helpers'],
            },
            "docs/json": {
                "transformGroup": targets[target].transformGroup,
                "buildPath": `dist/docs/${target}/`,
                "prefix": "token",
                "basePxFontSize": 16,
                "files": [
                    {
                        "destination": "tokens.json",
                        "format": "docs/json",
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
    StyleDictionary.buildPlatform('docs/json');
    console.log('\nEnd processing');
})


console.log('\n==============================================');
console.log('\nBuild completed!');
