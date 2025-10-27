/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { Config, DesignToken } from 'style-dictionary/types';

export const targets = ['products', 'devdot', 'marketing', 'cloud-email'];

export type Target = typeof targets[number];

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

export function getStyleDictionaryConfig({ target }: { target: Target}): Config {

  if (target === 'products') {
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
