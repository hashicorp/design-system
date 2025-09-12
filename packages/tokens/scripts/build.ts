/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import StyleDictionary from 'style-dictionary';
import type { Config, DesignToken, Platform } from 'style-dictionary/types';

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

// CUSTOM TRANSFORMS

StyleDictionary.registerTransform({
  // the CTI convention is not outdated, but we still need to use the top-level path as `category` for the token
  name: 'attributes/category',
  type: 'attribute',
  filter: function (token: DesignToken) {
    return token?.path[0];
  },
  transform: (token: DesignToken) => {
    return { category: token.path[0] };
  }
});

StyleDictionary.registerTransform({
  name: 'typography/font-family',
  type: 'value',
  transitive: true,
  filter: function (token: DesignToken) {
    // notice: we don't use `fontFamily` as `$type` because is handled internally in Style Dictionary
    // and currently the typographic transforms (and general handling) is still a bit unstable (due also to the fact the DTCG specifications are also preliminary)
    // (see https://www.designtokens.org/tr/drafts/format/#typography)
    return token.$type === 'font-family';
  },
  transform: (token: DesignToken) => {
    // inspired by the `processFamily()` method in Style Dictionary - see: https://github.com/style-dictionary/style-dictionary/blob/main/lib/common/transforms.js#L157
    const val = token.$value;
    if (typeof val === 'string') {
      return val;
    } else if (Array.isArray(val)) {
      return val.join(', ');
    } else {
      console.error(`🚨 Invalid Font-Family Value: '${token.name}' should be an array or a string to be correctly processed by our pipeline. Transformation will be skipped and the original value will be used.\n`);
      return val;
    }
  }
});

StyleDictionary.registerTransform({
  name: 'typography/font-size/to-rem',
  type: 'value',
  filter: function (token: DesignToken) {
    // notice: we don't use `fontSize` as `$type` because is handled internally in Style Dictionary
    // in a way that interferes with what we want to achieve (differentiate between font-sizes in rem and other sizes in px)
    // (see `isFontSize()` and the `transforms.sizePx` transformation, for example)
    return token.$type === 'font-size';
  },
  transform: (token: DesignToken, platform: Platform) => {
    const val = parseFloat(token.$value);
    const baseFont = platform?.basePxFontSize || 16;
    const unit = token.unit;
    if (isNaN(val)) {
      console.error(`🚨 Invalid Number: '${token.name}: ${token.$value}' is not a valid number, cannot transform to 'rem'.\n`);
    }
    if (unit === 'px') {
      return `${val / baseFont}rem`;
    } else {
      return `${val}rem`;
    }
  }
});

StyleDictionary.registerTransform({
  name: 'typography/font-size/to-px',
  type: 'value',
  filter: function (token: DesignToken) {
    // notice: we don't use `fontSize` as `$type` because is handled internally in Style Dictionary
    // in a way that interferes with what we want to achieve (differentiate between font-sizes in rem and other sizes in px)
    // (see `isFontSize()` and the `transforms.sizePx` transformation, for example)
    return token.$type === 'font-size';
  },
  transform: (token: DesignToken, platform: Platform) => {
    const val = parseFloat(token.$value);
    const unit = token.unit;
    const baseFont = platform?.basePxFontSize || 16;
    if (isNaN(val)) {
      console.error(`🚨 Invalid Number: '${token.name}: ${token.$value}' is not a valid number, cannot transform to 'px'.\n`);
    }
    if (unit === 'rem') {
      return `${val * baseFont}px`;
    } else {
      return `${val}px`;
    }
  }
});

StyleDictionary.registerTransform({
  name: 'typography/letter-spacing',
  type: 'value',
  filter: function (token: DesignToken) {
    // notice: we don't use `letterSpacing` as `$type` because is handled internally in Style Dictionary
    return token.$type === 'letter-spacing';
  },
  transform: (token: DesignToken, platform: Platform) => {
    const val = parseFloat(token.$value);
    if (isNaN(val)) {
      console.error(`🚨 Invalid Number: '${token.name}: ${token.$value}' is not a valid number, cannot use it as typography/letter-spacing.\n`);
    }
    return `${token.$value}${token.unit}`;
  }
});

StyleDictionary.registerTransform({
  name: 'dimension/unit',
  type: 'value',
  filter: function (token: DesignToken) {
    // we use this filter to differentiate from the `size/px` (`transforms.sizePx`) built-in tranformation
    // because it includes also `$type=fontSize` but in our case we want to handle font sizes differently
    return token.$type === 'dimension';
  },
  transform: function (token: DesignToken) {
    const val = parseFloat(token.$value);
    if (isNaN(val)) {
      console.error(`🚨 Invalid Number: '${token.name}: ${token.$value}' is not a valid number, cannot use it as dimension/unit.\n`);
    }
    return `${token.$value}${token.unit}`;
  }
});

// NOTICE: in case in the future we need more complex transformations, we can use this approach (see the "modify" attribute):
// https://github.com/amzn/style-dictionary/blob/main/examples/advanced/transitive-transforms/
//
StyleDictionary.registerTransform({
  name: 'color/with-alpha',
  type: 'value',
  transitive: true, // see: https://styledictionary.com/reference/hooks/transforms/#transitive-transforms
  filter: function(token: DesignToken) {
    return token.$type === 'color' && token.alpha;
  },
  transform: function (token: DesignToken) {
    const color = tinycolor(token.$value);
    if (!color.isValid) {
      console.error(`🚨 Invalid Color: '${token.name}: ${token.$value}' is not a valid color.\n`);
    }
    const alpha = parseFloat(token.alpha);
    if (!(alpha > 0 && alpha < 1)) {
      console.error(`🚨 Invalid Alpha: '${token.name}: ${token.$value}' is not a valid alpha value (should be in the format 0.x).\n`);
    }
    // https://caniuse.com/mdn-css_types_color_alpha_hexadecimal_notation
    return color.setAlpha(alpha).toHex8String();
  }
});

StyleDictionary.registerTransform({
  name: 'time/duration',
  type: 'value',
  filter: function (token: DesignToken) {
    return token.$type === 'duration';
  },
  transform: function (token: DesignToken) {
    const val = parseFloat(token.$value);
    const unit = token.unit;
    if (isNaN(val)) {
      console.error(`🚨 Invalid Number: '${token.name}: ${token.$value}' is not a valid number, cannot use it as time/duration.\n`);
    }
    return `${val}${unit}`;
  },
});

StyleDictionary.registerTransformGroup({
  name: 'products/web',
  transforms: ['name/kebab', 'typography/font-family', 'typography/font-size/to-rem', 'typography/letter-spacing', 'dimension/unit', 'color/css', 'color/with-alpha', 'time/duration', 'cubicBezier/css', 'attributes/category']
});

StyleDictionary.registerTransformGroup({
  name: 'products/email',
  // notice: for emails we need the font-size in `px` (not `rem`)
  transforms: ['name/kebab', 'typography/font-family', 'typography/font-size/to-px', 'typography/letter-spacing', 'dimension/unit', 'color/css', 'color/with-alpha', 'time/duration', 'cubicBezier/css', 'attributes/category']
});

StyleDictionary.registerTransformGroup({
  name: 'marketing/web',
  transforms: ['name/kebab', 'typography/font-family', 'typography/font-size/to-rem', 'typography/letter-spacing', 'dimension/unit', 'color/css', 'color/with-alpha', 'time/duration', 'cubicBezier/css', 'attributes/category']
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
  // @ts-ignore safe to ignore, since we control the `targets` object, and the `getStyleDictionaryConfig` invocations
  const { source, transformGroup, platforms } = targets[target];

  // we need to explicitly initialize the `config` object this way to make TS happy
  const config: Config = {
    // log: {
    //   // options: warn | error | disabled
    //   warnings: 'warn',
    //   // options: default | silent | verbose
    //   verbosity: 'verbose',
    //   errors: {
    //     // options: throw | console
    //     brokenReferences: 'console',
    //   },
    // }
  };
  config.source = source;
  config.platforms = {};

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

for (const target of Object.keys(targets)) {
  const StyleDictionaryInstance = new StyleDictionary(getStyleDictionaryConfig({ target }));

  console.log(`\nProcessing target "${target}"...`);
  await StyleDictionaryInstance.hasInitialized;
  await StyleDictionaryInstance.buildAllPlatforms()
  console.log('\nEnd processing');
}


console.log('\n==============================================');
console.log('\nBuild completed!');
