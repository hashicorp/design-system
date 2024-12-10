/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import StyleDictionary from 'style-dictionary';
import type { Config, DesignToken, Transform } from 'style-dictionary/types';

import tinycolor from 'tinycolor2';

import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { cloneDeep } from 'lodash-es';

import type { ConfigTargets } from './@types/Config.d.ts';

import { generateCssHelpers } from './build-parts/generateCssHelpers.ts';

// SCRIPT CONFIG

const __filename = fileURLToPath(import.meta.url); // Get the file path of the current module
const __dirname = dirname(__filename); // Get the directory name of the current module
const distFolder = path.resolve(__dirname, '../dist');

// CUSTOM PREPROCESSORS

StyleDictionary.registerPreprocessor({
    name: 'use-default-theme-values',
    preprocessor: (dictionary, _options) => {
      // recursively traverse token objects and replace composite theme values with default ("light")
      function useDefaultThemeValues(slice: DesignToken) {
        if (slice.themed) {
            if (slice.value && slice.value.light) {
                slice.value = slice.value.light;
                delete slice.themed;
            } else {
                console.error('ERROR - Found themed token without `light` value:', JSON.stringify(slice, null, 2));
            }
        } else {
            Object.values(slice).forEach((value) => {
              if (typeof value === 'object') {
                useDefaultThemeValues(value);
              }
            });
        }
        return slice;
      }
      return useDefaultThemeValues(dictionary);
    },
});

// CUSTOM TRANSFORMS

const transformPxToRem: Transform['transform'] = (token, platform) => {
    const val = parseFloat(token.value);
    const baseFont = platform?.basePxFontSize || 16;
    if (isNaN(val)) throw `Invalid Number: '${token.name}: ${token.value}' is not a valid number, cannot transform to 'rem'.\n`;
    return `${(token.value / baseFont)}rem`;
}

StyleDictionary.registerTransform({
    // TODO! there is a bug in SD where registering a transform (more in general a "hook") with the same name as a default one doesn't work if another hook is registered before it (in this case, the 'preprocessor')
    // TODO later when the bug is fixed, rename this transform to `size/px`
    name: 'size/pixel',
    type: 'value',
    filter: function(token) {
        return token.type === 'size';
    },
    transform: function (token) {
        const val = parseFloat(token.value);
        if (isNaN(val)) throw `Invalid Number: '${token.name}: ${token.value}' is not a valid number, cannot transform to 'px'.\n`;
        return `${token.value}px`;
    }
});

StyleDictionary.registerTransform({
    name: 'font-size/rem',
    type: 'value',
    filter: function(token) {
        return token.type === 'font-size';
    },
    transform: transformPxToRem
});

StyleDictionary.registerTransform({
    name: 'font-size/px',
    type: 'value',
    filter: function(token) {
        return token.type === 'font-size';
    },
    transform: function (token) {
        const val = parseFloat(token.value);
        if (isNaN(val)) throw `Invalid Number: '${token.name}: ${token.value}' is not a valid number, cannot transform to 'px'.\n`;
        return `${token.value}px`;
    }
});

// NOTICE: in case in the future we need more complex transformations, we can use this approach (see the "modify" attribute):
// https://github.com/amzn/style-dictionary/blob/main/examples/advanced/transitive-transforms/
//
StyleDictionary.registerTransform({
    name: 'color/with-alpha',
    type: 'value',
    transitive: true, // see: https://amzn.github.io/style-dictionary/#/transforms?id=transitive-transforms
    filter: function(token: DesignToken) {
        return token.type === 'color' && token.alpha;
    },
    transform: function (token) {
        const color = tinycolor(token.value);
        if (!color.isValid) throw `Invalid Color: '${token.name}: ${token.value}' is not a valid color.\n`;
        const alpha = parseFloat(token.alpha);
        if (!(alpha > 0 && alpha < 1)) throw `Invalid Alpha: '${token.name}: ${token.value}' is not a valid alpha value (should be in the format 0.x).\n`;
        // https://caniuse.com/mdn-css_types_color_alpha_hexadecimal_notation
        return color.setAlpha(alpha).toHex8String();
    }
});

StyleDictionary.registerTransform({
    name: 'time/sec',
    type: 'value',
    filter: function (token) {
        return token.type === 'time' && token.value.match(/^[\d.]+$/);
    },
    transform: function (token) {
        return `${token.value}s`;
    },
});

StyleDictionary.registerTransformGroup({
    name: 'products/web',
    transforms: ['attribute/cti', 'name/kebab', 'font-size/rem', 'size/pixel', 'color/css', 'color/with-alpha', 'time/sec']
});

StyleDictionary.registerTransformGroup({
    name: 'products/email',
    // notice: for emails we need the font-size in `px` (not `rem`)
    transforms: ['attribute/cti', 'name/kebab', 'font-size/px', 'size/pixel', 'color/css', 'color/with-alpha', 'time/sec']
});

StyleDictionary.registerTransformGroup({
    name: 'marketing/web',
    transforms: ['attribute/cti', 'name/kebab', 'font-size/rem', 'size/pixel', 'color/css', 'color/with-alpha', 'time/sec']
});

StyleDictionary.registerFormat({
    name: 'docs/json',
    format: function (dictionary: any) {
        // console.log(dictionary.allTokens);
        // Notice: this object shape is used also in the documentation so any updates
        // to this format should be reflected in the corresponding type definition.
        const output: {}[] = [];
        dictionary.allTokens.forEach((token: any) => {
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

StyleDictionary.registerAction({
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
        // this platform does not support theming (yet)
        'preprocessors': ['use-default-theme-values'],
        'transformGroup': 'products/web',
        'platforms': ['web/css-variables'],
    },
    'marketing': {
        'source': [
            `src/global/**/*.json`,
            `src/products/shared/**/*.json`,
        ],
        // this platform does not support theming (yet)
        'preprocessors': ['use-default-theme-values'],
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
        // this platform does not support theming (yet)
        'preprocessors': ['use-default-theme-values'],
        'transformGroup': 'products/email',
        'platforms': ['email/sass-variables']
    }
};

function getStyleDictionaryConfig({ target }: { target: string }): Config {
    // @ts-ignore safe to ignore, since we control the `targets` object, and the `getStyleDictionaryConfig` invocations
    const { source, transformGroup, platforms, preprocessors } = targets[target];

    // we need to explicitly initialize the `config` object this way to make TS happy
    const config: Config = {log: { verbosity: 'verbose' }};
    config.source = source;
    config.platforms = {};

    if (platforms.includes('web/css-variables')) {
        config.platforms['web/css-variables'] = {
            transformGroup,
            preprocessors,
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
            preprocessors,
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
            preprocessors,
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
            preprocessors,
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

for (const target of Object.keys(targets)) {
    const StyleDictionaryInstance = new StyleDictionary(getStyleDictionaryConfig({ target }));

    console.log(`\nProcessing target "${target}"...`);
    await StyleDictionaryInstance.hasInitialized;
    await StyleDictionaryInstance.buildAllPlatforms()
    console.log('\nEnd processing');
}


console.log('\n==============================================');
console.log('\nBuild completed!');