/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { Config, DesignToken, Dictionary } from 'style-dictionary/types';
import { getReferences, resolveReferences, outputReferencesFilter, outputReferencesTransformed } from 'style-dictionary/utils';

// import GroupMessages from 'style-dictionary/utils/groupMessages.js';
// const FILTER_WARNINGS = GroupMessages.GROUP.FilteredOutputReferences;

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

const outputReferencesStandardFunction = (token: DesignToken, options: { dictionary: Dictionary, usesDtcg?: boolean }) => {
  const isFiltered = outputReferencesFilter(token, options);
  const isTransformed = outputReferencesTransformed(token, options);
  return isFiltered && isTransformed;
}

const outputReferencesCustomFunction = (token: DesignToken, options: { dictionary: Dictionary, usesDtcg?: boolean }) => {
  // const isFiltered = outputReferencesFilter(token, options);
  // const isTransformed = outputReferencesTransformed(token, options);

  const { dictionary, usesDtcg } = options;

  console.log('\n\n--------\n\n🚧 PROCESSING', token.name)

  const value = usesDtcg ? token.$value : token.value;
  const originalValue = usesDtcg ? token.original.$value : token.original.value;

  // derived from by `outputReferencesFilter` - see: https://github.com/style-dictionary/style-dictionary/blob/main/lib/utils/references/outputReferencesFilter.js

  // get refs, pass unfilteredTokens to ensure we find the refs even if they are filtered out
  const refs = getReferences(originalValue, dictionary.tokens, {
    unfilteredTokens: dictionary.unfilteredTokens,
    usesDtcg,
    warnImmediately: false,
  });

  const hasNoPrivateReferences = refs.every((ref: DesignToken) => {
    // check whether every ref can be found in the filtered set of tokens
    const isPrivate = ref.private;
    if (!isPrivate) {
      // remove the warning about this ref being filtered out, since we now prevent it from outputting it as a ref
      // TODO!
      // GroupMessages.remove(FILTER_WARNINGS, ref.path.join('.'));
    }
    return !isPrivate;
  });

  // derived from by `outputReferencesTransformed` - https://github.com/style-dictionary/style-dictionary/blob/main/lib/utils/references/outputReferencesTransformed.js

  // double check if this is a string, technically speaking the token could also be an object
  // and pass the usesReferences check
  let hasBeenTransformed;
  if (typeof originalValue === 'string') {
    // Check if the token's value is the same as if we were resolve references on the original value
    // This checks whether the token's value has been transformed e.g. transitive transforms.
    // If it has been, that means we should not be outputting refs because this would undo the work of those transforms.
    hasBeenTransformed = (
      value ===
      resolveReferences(originalValue, dictionary.unfilteredTokens ?? dictionary.tokens, {
        usesDtcg,
        warnImmediately: false,
      })
    );
  } else {
    hasBeenTransformed = false;
  }


  console.log('DONE 🙂', token.name, originalValue, `hasNoPrivateReferences=${hasNoPrivateReferences}`, `hasBeenTransformed=${hasBeenTransformed}`);

  return hasNoPrivateReferences && hasBeenTransformed;
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
