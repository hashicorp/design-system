/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import chalk from 'chalk';

import type { DesignToken, Preprocessor } from 'style-dictionary/types';
import type { Mode } from './getStyleDictionaryConfig.ts';

// Higher-order function: takes a `mode` and returns a Style Dictionary preprocessor that recursively walks the whole
// token tree and resolves each token's `comments` into `comment` for that mode.
// Notice: unlike the value-replacement preprocessor (`replace-value-for-mode-*`), this traversal is NOT gated on `$modes`,
// because `comments` can also be colocated with a plain `$value` (a token without `$modes`).
export function preprocessorResolveCommentsForMode(mode: Mode): Preprocessor['preprocessor'] {
  return (dictionary, options) => {
    // we get the `buildPath` from the `PlatformConfig` option (used only for the warning message)
    const buildPath = 'buildPath' in options ? options.buildPath : undefined;

    function resolveComments(slice: DesignToken, tokenPath: string[]): void {
      // a token node carries a `$value` and (potentially) a `$modes` map; anything else is a parent group
      if ('$value' in slice || '$modes' in slice) {
        // resolve the token's `comments` (if any) into its `comment` for this mode
        if (slice.comments) {
          resolveTokenComment(slice, mode);
        }
      } else {
        // a `comments` object must live on a token node (colocated with `$value`/`$modes`), never on a parent group
        if (slice.comments) {
          console.warn(`⚠️ ${chalk.yellow.bold('WARNING')} - Found 'comments' on a non-token node '{${tokenPath.join('.')}}' (no '$value'/'$modes' sibling) - it will be ignored - BuildPath: ${buildPath} - File: ${slice.filePath}`);
        }
        Object.entries(slice).forEach(([key, value]) => {
          if (typeof value === 'object') {
            resolveComments(value, [...tokenPath, key]);
          }
        });
      }
    }

    resolveComments(dictionary, []);
    return dictionary;
  };
}

function resolveTokenComment(token: DesignToken, mode: Mode): void {
  const key = '$modes' in token && mode !== 'default' ? 'cds' : 'hds';
  if (token.comments && token.comments[key]) {
    token.comment = token.comments[key];
  }
}
