/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import StyleDictionary from 'style-dictionary';
import { formattedVariables, getReferences, resolveReferences } from 'style-dictionary/utils';
import type { DesignToken, TransformedToken, PlatformConfig, Dictionary, Config, LocalOptions } from 'style-dictionary/types';

import tinycolor from 'tinycolor2';
import chalk from 'chalk';

import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { cloneDeep } from 'lodash-es';

import { targets, modes, getStyleDictionaryConfig } from './build-parts/getStyleDictionaryConfig.ts';
import { generateCssHelpers } from './build-parts/generateCssHelpers.ts';
import { generateThemingCssFiles } from './build-parts/generateThemingCssFiles.ts';
import { generateThemingDocsFiles } from './build-parts/generateThemingDocsFiles.ts';

// SCRIPT CONFIG

const __filename = fileURLToPath(import.meta.url); // Get the file path of the current module
const __dirname = dirname(__filename); // Get the directory name of the current module
const distFolder = path.resolve(__dirname, '../dist');


// •••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
// •••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••


// CUSTOM PREPROCESSORS

for (const mode of modes) {
  StyleDictionary.registerPreprocessor({
    name: `replace-value-for-mode-${mode}`,
    preprocessor: (dictionary, options) => {
      // we get the `buildPath` from the `PlatformConfig` option
      const buildPath = (options as any).buildPath;
      // recursively traverse token objects and replace the `$value` with the corresponding colocated `$modes` theme value
      // note: the `slice` is always an object (a token or a parent group)
      function replaceModes(slice: DesignToken, tokenPath: string[]) {
        if (slice.$modes) {
          if (mode in slice.$modes) {
            // extra validation to catch instances where the `default` mode value is different from the `$value`
            if (mode === 'default' && slice.$modes[mode] !== slice.$value) {
              console.warn(`⚠️ ${chalk.yellow.bold('WARNING')} - Found themed 'default' token '{${tokenPath.join('.')}}' with value different than '$value' (\`${slice.$modes[mode]}\` instead of the expected \`${slice.$value}\`) - BuildPath: ${buildPath} - File: ${slice.filePath}`);
            }
            slice.$value = slice.$modes[mode];
          } else {
            // we want to interrupt the execution of the script if one of the expected modes is missing
            throw new Error(`❌ ${chalk.red.bold('ERROR')} - Found themed token '{${tokenPath.join('.')}}' without '${mode}' value - BuildPath: ${buildPath} - File: ${slice.filePath} - Path: ${tokenPath.join('.')} - ${JSON.stringify(slice, null, 2)}`);
          }
        } else {
            Object.entries(slice).forEach(([key, value]) => {
              if (typeof value === 'object') {
                replaceModes(value, [...tokenPath, key]);
              }
            });
        }
        return slice;
      }
      return replaceModes(dictionary, []);
    },
  });
}

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
  transform: (token: DesignToken, platformConfig: PlatformConfig) => {
    const val = parseFloat(token.$value);
    const baseFont = platformConfig?.basePxFontSize || 16;
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
  transform: (token: DesignToken, platformConfig: PlatformConfig) => {
    const val = parseFloat(token.$value);
    const unit = token.unit;
    const baseFont = platformConfig?.basePxFontSize || 16;
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
  transform: (token: DesignToken) => {
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
  transforms: ['attributes/category', 'name/kebab', 'typography/font-family', 'typography/font-size/to-rem', 'typography/letter-spacing', 'dimension/unit', 'color/css', 'color/with-alpha', 'time/duration', 'cubicBezier/css']
});

StyleDictionary.registerTransformGroup({
  name: 'products/web/themed',
  transforms: ['attributes/category', 'name/kebab', 'typography/font-family', 'typography/font-size/to-rem', 'typography/letter-spacing', 'dimension/unit', 'color/css', 'color/with-alpha', 'time/duration', 'cubicBezier/css']
});

StyleDictionary.registerTransformGroup({
  name: 'products/email',
  // notice: for emails we need the font-size in `px` (not `rem`)
  transforms: ['attributes/category', 'name/kebab', 'typography/font-family', 'typography/font-size/to-px', 'typography/letter-spacing', 'dimension/unit', 'color/css', 'color/with-alpha', 'time/duration', 'cubicBezier/css']
});

StyleDictionary.registerTransformGroup({
  name: 'marketing/web',
  transforms: ['attributes/category', 'name/kebab', 'typography/font-family', 'typography/font-size/to-rem', 'typography/letter-spacing', 'dimension/unit', 'color/css', 'color/with-alpha', 'time/duration', 'cubicBezier/css']
});

// CUSTOM FORMATS

const outputReferencesCustomFunction = (token: TransformedToken, options: { dictionary: Dictionary, usesDtcg?: boolean }) => {
  const { dictionary, usesDtcg } = options;

  const value = usesDtcg ? token.$value : token.value;
  const originalValue = usesDtcg ? token.original.$value : token.original.value;

  // decide if output reference for the token, based on its ancestors being private or not
  // note: derived from by `outputReferencesFilter` - see: https://github.com/style-dictionary/style-dictionary/blob/main/lib/utils/references/outputReferencesFilter.js

  // get refs, pass unfilteredTokens to ensure we find the refs even if they are filtered out
  const refs = getReferences(originalValue, dictionary.tokens, {
    unfilteredTokens: dictionary.unfilteredTokens,
    usesDtcg,
    warnImmediately: false,
  });

  // check whether every ref can be found in the filtered set of tokens
  const hasPrivateReferences = refs.some((ref: DesignToken) => ref.private);

  // decide if output reference for the token, based on the fact that it's been transformed or not
  // derived from by `outputReferencesTransformed` - https://github.com/style-dictionary/style-dictionary/blob/main/lib/utils/references/outputReferencesTransformed.js

  // double check if this is a string, technically speaking the token could also be an object and pass the usesReferences check
  let hasBeenTransformed;
  if (typeof originalValue === 'string') {
    // Check if the token's value is the same as if we were resolve references on the original value
    // This checks whether the token's value has been transformed e.g. transitive transforms.
    // If it has been, that means we should not be outputting refs because this would undo the work of those transforms.
    hasBeenTransformed = (
      value !==
      resolveReferences(originalValue, dictionary.unfilteredTokens ?? dictionary.tokens, {
        usesDtcg,
        warnImmediately: false,
      })
    );
  } else {
    hasBeenTransformed = true;
  }

  return !hasPrivateReferences && !hasBeenTransformed;
}

for (const target of ['common', 'themed']) {
  StyleDictionary.registerFormat({
    name: `css/themed-tokens/with-root-selector/${target}`,
    format: function ({ dictionary, options }: { dictionary: Dictionary, options: Config & LocalOptions }) {

      // filter out tokens that have/don't have `$modes` (based on the `target`)
      const filteredTokens = dictionary.allTokens.filter(token => {
        const isPrivate = token.private;
        const isThemed = ('$modes' in token);
        return !isPrivate && (target === 'themed' ? isThemed : !isThemed);
      });

      // create a shallow copy of the dictionary with the filtered allTokens
      const filteredDictionary = {
        ...dictionary,
        allTokens: filteredTokens
      };

      // use a custom formatter for the CSS variables
      const variables = formattedVariables({
        format: 'css',
        dictionary: filteredDictionary,
        // TODO!
        // TODO look into this: https://styledictionary.com/reference/hooks/formats/#custom-format-with-output-references
        // outputReferences: outputReferencesStandardFunction,
        outputReferences: outputReferencesCustomFunction,
        formatting: { indentation: '  ' },
        usesDtcg: options.usesDtcg,
      });

      // return the content
      return `:root {\n${variables}\n}`;
    }
  });
}

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

StyleDictionary.registerAction({
    name: 'generate-theming-css-files',
    do: generateThemingCssFiles,
    undo: () => {}
});

StyleDictionary.registerAction({
    name: 'generate-theming-docs-files',
    do: generateThemingDocsFiles,
    undo: () => {}
});


// •••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
// •••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••


// PROCESS THE DESIGN TOKENS

console.log('Build started...');
console.log('\n==============================================');

// empty the dist folder
console.log(`\nCleaning up dist folder`);
fs.emptyDirSync(distFolder);

// generate themed tokens
for (const mode of modes) {
// for (const mode of ['default']) {
  const StyleDictionaryInstance = new StyleDictionary(getStyleDictionaryConfig({ target: 'products', mode }));
  console.log(`\n---\n\nProcessing mode "${mode}"...`);
  await StyleDictionaryInstance.hasInitialized;
  await StyleDictionaryInstance.buildAllPlatforms()
  console.log('\nEnd processing');
}

// generate standard tokens
for (const target of targets) {
  const StyleDictionaryInstance = new StyleDictionary(getStyleDictionaryConfig({ target }));
  console.log(`\n---\n\nProcessing target "${target}"...`);
  await StyleDictionaryInstance.hasInitialized;
  await StyleDictionaryInstance.buildAllPlatforms()
  console.log('\nEnd processing');
}
