/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import StyleDictionaryPackage, { DesignToken, Transform, Config }  from 'style-dictionary';
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
    name: 'size/px',
    type: 'value',
    matcher: function(token) {
        return token.type === 'size';
    },
    transformer: function (token) {
        const val = parseFloat(token.value);
        if (isNaN(val)) throw `Invalid Number: '${token.name}: ${token.value}' is not a valid number, cannot transform to 'px'.\n`;
        return `${token.value}px`;
    }
});

StyleDictionaryPackage.registerTransform({
    name: 'font-size/rem',
    type: 'value',
    matcher: function(token) {
        return token?.attributes?.category === 'typography' && token.type === 'font-size';
    },
    transformer: transformPxToRem
});

StyleDictionaryPackage.registerTransform({
    name: 'font-size/px',
    type: 'value',
    matcher: function(token) {
        return token?.attributes?.category === 'typography' && token.type === 'font-size';
    },
    transformer: function (token) {
        const val = parseFloat(token.value);
        if (isNaN(val)) throw `Invalid Number: '${token.name}: ${token.value}' is not a valid number, cannot transform to 'px'.\n`;
        return `${token.value}px`;
    }
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

StyleDictionaryPackage.registerTransform({
    name: 'time/seconds', // notice: the name is an override of an existing predefined method
    type: 'value',
    matcher: function (token) {
        return token.type === 'time' && token.value.match(/^[\d.]+$/);
    },
    transformer: function (token) {
        return `${token.value}s`;
    },
});

StyleDictionaryPackage.registerTransformGroup({
    name: 'products/web',
    transforms: ['attribute/cti', 'name/kebab', 'font-size/rem', 'size/px', 'color/css', 'color/with-alpha', 'time/seconds']
});

StyleDictionaryPackage.registerTransformGroup({
    name: 'products/email',
    // notice: for emails we need the font-size in `px` (not `rem`)
    transforms: ['attribute/cti', 'name/kebab', 'font-size/px', 'size/px', 'color/css', 'color/with-alpha', 'time/seconds']
});

StyleDictionaryPackage.registerTransformGroup({
    name: 'marketing/web',
    transforms: ['attribute/cti', 'name/kebab', 'font-size/rem', 'size/px', 'color/css', 'color/with-alpha', 'time/seconds']
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
        'platforms': ['web/css-variables', 'docs/json']
    },
    'devdot': {
        'source': [
            `src/global/**/*.json`,
            `src/products/shared/**/*.json`,
            // just uncomment the line below to include overrides for "devdot" tokens
            `src/devdot/**/*.json`
        ],
        'transformGroup': 'products/web',
        'platforms': ['web/css-variables']
    },
    'marketing': {
        'source': [
            `src/global/**/*.json`,
            `src/products/shared/**/*.json`,
        ],
        'transformGroup': 'marketing/web',
        'platforms': ['web/css-variables', 'json']
    },
    // these tokens will be consumed by the email templating system in https://github.com/hashicorp/cloud-email
    'cloud-email': {
        // we need only foundational tokens (colors, typography, etc)
        'source': [
            `src/global/**/*.json`,
            `src/products/shared/color/**/*.json`,
            `src/products/shared/typography.json`,
        ],
        'transformGroup': 'products/email',
        'platforms': ['email/sass-variables']
    }
};

function getStyleDictionaryConfig({ target }: { target: string }): Config {
    const { source, transformGroup, platforms } = targets[target]
    const config: Config = {
        source,
        platforms: {}
    }

    if (platforms.includes('web/css-variables')) {
        config.platforms['web/css-variables'] = {
            transformGroup,
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
        }
    }

    if (platforms.includes("docs/json")) {
        config.platforms["docs/json"] = {
            transformGroup,
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

    if (platforms.includes("json")) {
        config.platforms["json"] = {
            transformGroup,
            "buildPath": `dist/${target}/`,
            "prefix": "token",
            "basePxFontSize": 16,
            "files": [
                {
                    "destination": "tokens.json",
                    "format": "json",
                    "filter": function(token: DesignToken) {
                        return !token.private;
                    },
                }
            ]
        }
    }

    if (platforms.includes("email/sass-variables")) {
        config.platforms["email/sass-variables"] = {
            transformGroup,
            "buildPath": `dist/${target}/`,
            "prefix": "token",
            "files": [
                {
                    "destination": "tokens.scss",
                    "format": "scss/variables",
                    "filter": function(token: DesignToken) {
                        return !token.private;
                    },
                }
            ],
            'actions': ['generate-css-helpers'],
        }
    }

    return config;
}

// PROCESS THE DESIGN TOKENS

console.log('Build started...');
console.log('\n==============================================');

// empty the dist folder
console.log(`\nCleaning up dist folder`);
fs.emptyDirSync(distFolder);

Object.keys(targets).forEach(async target => {
    const StyleDictionary = StyleDictionaryPackage.extend(getStyleDictionaryConfig({ target }));

    console.log(`\nProcessing target "${target}"...`);
    StyleDictionary.buildAllPlatforms()
    console.log('\nEnd processing');
})


console.log('\n==============================================');
console.log('\nBuild completed!');