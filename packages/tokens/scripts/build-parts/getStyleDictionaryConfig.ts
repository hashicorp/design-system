/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { Config, DesignToken } from 'style-dictionary/types';

export const targets = ['products', 'devdot', 'marketing', 'cloud-email'];
export const modes = ['default', 'cds-g0', 'cds-g10', 'cds-g90', 'cds-g100'];

export type Target = typeof targets[number];
export type Mode = typeof modes[number];

// comment/uncomment this to disable/enable debugging
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
          `src/carbon-extracted/**/*.json`,
          `src/global/**/*.json`,
          `src/products/shared/**/*.json`
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
                // IMPORTANT: filtering, formatting, outputReferences, etc. are done directly in the custom format function
                format: 'css/themed-tokens/with-root-selector/common',
              },
              {
                destination: `themed-tokens/with-root-selector/${mode}/themed-tokens.css`,
                // IMPORTANT: filtering, formatting, outputReferences, etc. are done directly in the custom format function
                format: 'css/themed-tokens/with-root-selector/themed',
              }
            ],
            // this has been registered in the `build` file
            preprocessors: [`replace-value-for-mode-${mode}`],
          },
          [`docs/themed-json--mode-${mode}`]: {
            buildPath: 'dist/docs/products/',
            transformGroup: 'products/web',
            prefix: 'token',
            basePxFontSize: 16,
            files: [
              {
                destination: `themed-tokens/${mode}.json`,
                format: 'docs/json',
                filter: excludePrivateTokens,
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
          `src/carbon-extracted/**/*.json`,
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
            actions: ['generate-css-helpers', 'generate-theming-css-files'],
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
            ],
            actions: ['generate-theming-docs-files'],
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
        `src/carbon-extracted/**/*.json`,
        `src/global/**/*.json`,
        `src/products/shared/**/*.json`,
        // custom overrides for 'devdot' tokens
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
        `src/carbon-extracted/**/*.json`,
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
        `src/carbon-extracted/**/*.json`,
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
