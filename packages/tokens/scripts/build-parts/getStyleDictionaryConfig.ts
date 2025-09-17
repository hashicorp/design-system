/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { Config, DesignToken } from 'style-dictionary/types';

export const targets = ['products', 'devdot', 'marketing', 'cloud-email'];
export const modes = ['hds', 'cds-0', 'cds-10', 'cds-90', 'cds-100'];

export type Target = typeof targets[number];
export type Mode = typeof modes[number];

// uncomment this to enable debugging
const baseConfig: Config = {
  // log: {
  //   warnings: 'warn', // options: warn | error | disabled
  //   verbosity: 'verbose', // options: default | silent | verbose
  //   errors: {
  //     brokenReferences: 'console', // options: throw | console
  //   },
  // }
};

const excludePrivateTokens = (token: DesignToken) => {
  return !token.private;
}

// const getFilterForMode = (mode: Mode) => {
//   // this function returns a function to filter based on
//   return function (token: DesignToken) {
//     // TODO!
//     console.log('xxx filter for mode', mode);
//     return !token.private;
//   };
// }

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
          `src/modes-testing/**/*.json`,
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
                  // TODO understand if is better to output references or not (probably not)
                  outputReferences: true,
                  // outputReferences: (token, { dictionary, usesDtcg }) => {
                  //   // `dictionary` contains `allTokens`, `tokens`, `tokenMap`, `unfilteredTokens`, `unfilteredAllTokens` and `unfilteredTokenMap` props
                  //   // `usesDtcg` tells you whether the Design Token Community Group spec is used with $ prefixes ($value, $type etc.)
                  //   // return true or false
                  // },
                  // see: https://styledictionary.com/reference/utils/references/#combining-multiple-outputreference-utility-functions
                  // outputReferences: (token, options) => outputReferencesFilter(token, options) && outputReferencesTransformed(token, options),
                },
                filter: (token: DesignToken) => {
                  return !token.private && !(token.attributes && token.attributes.themeable);
                },
              },
              {
                destination: `themed-tokens/with-root-selector/${mode}/themed-tokens.css`,
                format: 'css/variables',
                options: {
                  // TODO understand if is better to output references or not (probably not)
                  outputReferences: true,
                  // outputReferences: (token, { dictionary, usesDtcg }) => {
                  //   // `dictionary` contains `allTokens`, `tokens`, `tokenMap`, `unfilteredTokens`, `unfilteredAllTokens` and `unfilteredTokenMap` props
                  //   // `usesDtcg` tells you whether the Design Token Community Group spec is used with $ prefixes ($value, $type etc.)
                  //   // return true or false
                  // },
                  // see: https://styledictionary.com/reference/utils/references/#combining-multiple-outputreference-utility-functions
                  // outputReferences: (token, options) => outputReferencesFilter(token, options) && outputReferencesTransformed(token, options),
                },
                filter: (token: DesignToken) => {
                  return !token.private && (token.attributes && token.attributes.themeable);
                },
              }
            ],
            // this has been registered in the `build` file
            preprocessors: [`replace-value-for-mode-${mode}`],
            // TODO! do we need this? how do we manage CSS helpers for themed tokens?
            // actions: ['generate-css-helpers'],
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
          `src/global/**/*.json`,
          `src/products/shared/**/*.json`
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
            actions: ['generate-css-helpers'],
          },
          'docs/json': {
            buildPath: 'dist/docs/products/',
            transformGroup: 'products/web',
            prefix: 'token',
            basePxFontSize: 16,
            files: [
              {
                destination: 'tokens.json',
                format: 'docs/json',
                filter: excludePrivateTokens,
              }
            ]
          }
        }
      };
    }
  }

  // -----------------------
  // DEVDOT
  // -----------------------

  if (target === 'devdot') {
    return {
      ...baseConfig,
      'source': [
        `src/global/**/*.json`,
        `src/products/shared/**/*.json`,
        // just uncomment the line below to include overrides for 'devdot' tokens
        `src/devdot/**/*.json`
      ],
      'platforms': {
        'web/css-variables': {
          buildPath: 'dist/devdot/css/',
          'transformGroup': 'products/web',
          prefix: 'token',
          basePxFontSize: 16,
          files: [
            {
              destination: 'tokens.css',
              format: 'css/variables',
              filter: excludePrivateTokens,
            }
          ],
          actions: ['generate-css-helpers'],
        }
      }
    };
  }

  // -----------------------
  // MARKETING
  // -----------------------

  if (target === 'marketing') {
    return {
      ...baseConfig,
      'source': [
        `src/global/**/*.json`,
        `src/products/shared/**/*.json`,
      ],
      'platforms': {
        'web/css-variables': {
          buildPath: 'dist/marketing/css/',
          'transformGroup': 'marketing/web',
          prefix: 'token',
          basePxFontSize: 16,
          files: [
            {
              destination: 'tokens.css',
              format: 'css/variables',
              filter: excludePrivateTokens,
            }
          ],
          actions: ['generate-css-helpers'],
        },
        'json': {
          buildPath: 'dist/marketing/',
          'transformGroup': 'marketing/web',
          prefix: 'token',
          basePxFontSize: 16,
          files: [
            {
              destination: 'tokens.json',
              format: 'json',
              filter: excludePrivateTokens,
            }
          ]
        }
      }
    };
  }

  // -----------------------
  // CLOUD-EMAIL
  // -----------------------

  if (target === 'cloud-email') {
    // these tokens will be consumed by the email templating system in https://github.com/hashicorp/cloud-email
    return {
      ...baseConfig,
      // we need only foundational tokens (colors, typography, etc)
      'source': [
        `src/global/**/*.json`,
        `src/products/shared/color/**/*.json`,
        `src/products/shared/typography.json`,
      ],
      'platforms': {
        'email/sass-variables': {
          buildPath: `dist/cloud-email/`,
          'transformGroup': 'products/email',
          prefix: 'token',
          files: [
            {
              destination: 'tokens.scss',
              format: 'scss/variables',
              filter: excludePrivateTokens,
            }
          ],
          actions: ['generate-css-helpers'],
        }
      }
    }
  };
};
