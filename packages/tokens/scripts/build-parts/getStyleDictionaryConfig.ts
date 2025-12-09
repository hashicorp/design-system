/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { Config, DesignToken, Dictionary } from 'style-dictionary/types';
import { outputReferencesFilter, outputReferencesTransformed } from 'style-dictionary/utils';

export const targets = ['products', 'devdot', 'marketing', 'cloud-email'];
export const modes = ['default', 'cds-g0', 'cds-g10', 'cds-g90', 'cds-g100'];

export type Target = typeof targets[number];
export type Mode = typeof modes[number];

// uncomment this to enable debugging
const baseConfig: Config = {
  log: {
    warnings: 'warn', // options: warn | error | disabled
    verbosity: 'verbose', // options: default | silent | verbose
    errors: {
      brokenReferences: 'console', // options: throw | console
    },
  }
};

const excludePrivateTokens = (token: DesignToken) => {
  return !token.private;
}

const outputReferencesCustomFunction = (token: DesignToken, options: { dictionary: Dictionary, usesDtcg?: boolean }) => {
  const isFiltered = outputReferencesFilter(token, options);
  const isTransformed = outputReferencesTransformed(token, options);
  // {
  //   "key": "{base.themed-mixed}",
  //   "$type": "color",
  //   "$value": "#000000",
  //   "group": "palette",
  //   "$modes": {
  //     "default": "#123456",
  //     "cds-g0": "#000000",
  //     "cds-g10": "#000000",
  //     "cds-g90": "#000000",
  //     "cds-g100": "#000000"
  //   },
  //   "filePath": "src/test/test.json",
  //   "isSource": true,
  //   "original": {
  //     "$type": "color",
  //     "$value": "{base.themed}",
  //     "group": "palette",
  //     "$modes": {
  //       "default": "{base.simple}",
  //       "cds-g0": "{base.themed}",
  //       "cds-g10": "{base.themed}",
  //       "cds-g90": "{base.themed}",
  //       "cds-g100": "{base.themed}"
  //     },
  //     "key": "{base.themed-mixed}"
  //   },
  //   "name": "token-base-themed-mixed",
  //   "attributes": {
  //     "themeable": true,
  //     "category": "base"
  //   },
  //   "path": [
  //     "base",
  //     "themed-mixed"
  //   ]
  // }
  console.log(token.name, `isFiltered=${isFiltered}`, `isTransformed=${isTransformed}`);
  return isFiltered && isTransformed;
}

export function getStyleDictionaryConfig({ target, mode }: { target: Target, mode?: Mode }): Config {

  // -----------------------
  // PRODUCTS
  // -----------------------

  if (target === 'products') {

    if (mode) {

      // ⁃⁃⁃⁃⁃⁃⁃⁃⁃⁃⁃⁃⁃
      // THEMED TOKENS
      // ⁃⁃⁃⁃⁃⁃⁃⁃⁃⁃⁃⁃⁃

      return {
        ...baseConfig,
        source: [
          `src/test/**/*.json`,
          // `src/carbon-extracted/**/*.json`,
          // `src/global/**/*.json`,
          // `src/products/shared/**/*.json`
        ],
        platforms: {
          [`web/themed-css-variables--mode-${mode}`]: {
            buildPath: 'dist/products/css/',
            transformGroup: 'products/web/themed',
            prefix: 'token',
            basePxFontSize: 16,
            files: [
              {
                destination: `themed-tokens/with-root-selector/${mode}/common-tokens.css`,
                format: 'css/variables',
                options: {
                  // TODO understand if is better to output references or not for the "common" definitions (almost certainly no) - see: https://hashicorp.atlassian.net/browse/HDS-5669
                  // outputReferences: false,
                  // outputReferences: (token, { dictionary, usesDtcg }) => {
                  //   // `dictionary` contains `allTokens`, `tokens`, `tokenMap`, `unfilteredTokens`, `unfilteredAllTokens` and `unfilteredTokenMap` props
                  //   // `usesDtcg` tells you whether the Design Token Community Group spec is used with $ prefixes ($value, $type etc.)
                  //   // return true or false
                  // },
                  // see: https://styledictionary.com/reference/utils/references/#combining-multiple-outputreference-utility-functions
                    outputReferences: outputReferencesCustomFunction,
                  },
                  filter: (token: DesignToken) => {
                  return !token.private && !(token.attributes && token.attributes.themeable);
                },
              },
              {
                destination: `themed-tokens/with-root-selector/${mode}/themed-tokens.css`,
                format: 'css/variables',
                options: {
                  // TODO understand if is better to output references or not for the "themed" definitions (almost certainly no) - see: https://hashicorp.atlassian.net/browse/HDS-5669
                  // outputReferences: false,
                  // outputReferences: (token, { dictionary, usesDtcg }) => {
                  //   // `dictionary` contains `allTokens`, `tokens`, `tokenMap`, `unfilteredTokens`, `unfilteredAllTokens` and `unfilteredTokenMap` props
                  //   // `usesDtcg` tells you whether the Design Token Community Group spec is used with $ prefixes ($value, $type etc.)
                  //   // return true or false
                  // },
                  // see: https://styledictionary.com/reference/utils/references/#combining-multiple-outputreference-utility-functions
                  outputReferences: outputReferencesCustomFunction,
                },
                filter: (token: DesignToken) => {
                  return !token.private && (token.attributes && token.attributes.themeable);
                },
              }
            ],
            // this has been registered in the `build` file
            preprocessors: [`replace-value-for-mode-${mode}`],
          }
        }
      };

    } else {

      // ⁃⁃⁃⁃⁃⁃⁃⁃⁃⁃⁃⁃⁃⁃⁃
      // STANDARD TOKENS
      // ⁃⁃⁃⁃⁃⁃⁃⁃⁃⁃⁃⁃⁃⁃⁃

      return {
        ...baseConfig,
        source: [
          `src/test/**/*.json`,
          // `src/carbon-extracted/**/*.json`,
          // `src/global/**/*.json`,
          // `src/products/shared/**/*.json`
        ],
        platforms: {
          'web/css-variables': {
            buildPath: 'dist/products/css/',
            transformGroup: 'products/web',
            prefix: 'token',
            basePxFontSize: 16,
            files: [
              {
                destination: 'tokens.css',
                format: 'css/variables',
                filter: excludePrivateTokens,
              }
            ],
            actions: ['generate-css-helpers', 'generate-theming-css-files'],
          }
        }
      };
    }
  }
};
