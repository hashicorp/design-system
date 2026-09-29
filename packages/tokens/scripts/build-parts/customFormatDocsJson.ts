/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import type { Dictionary, DesignToken } from 'style-dictionary/types';

import { cloneDeep, isEqual } from 'lodash-es';

// the resolved value of every token, for each mode (see how it's built in the `build` file)
export type TokensByMode = Record<string, Map<string, DesignToken['$value']>>;

export async function customFormatDocsJsonFunction({ dictionary, tokensByMode }: { dictionary: Dictionary; tokensByMode: TokensByMode }): Promise<string> {
  // Notice: this object shape is used also in the documentation so any updates
  // to this format should be reflected in the corresponding type definition.
  // See: https://github.com/search?q=repo%3Ahashicorp%2Fdesign-system%20%22dist%2Fdocs%2Fproducts%2Ftokens.json%22&type=code
  const modes = Object.keys(tokensByMode);

  const output: Record<string, unknown>[] = [];
  for (const token of dictionary.allTokens) {
    const outputToken = cloneDeep(token) as DesignToken;
    // we remove the "filePath" prop from the token because the orginal file path is irrelevant for us
    // (plus its value is an absolute path, so it causes useless diffs in git)
    delete outputToken.filePath;
    delete outputToken.isSource;
    // we remove the top-level "comments" prop (resolved into "comment" by the `resolve-comments-for-mode-*` preprocessor)
    // note: it is still preserved under the "original" key though
    delete outputToken.comments;
    // we remove the "unit"/"alpha" props, because they have already been baked into the value (they're still preserved under the "original" key)
    delete outputToken.unit;
    delete outputToken.alpha;

    for (const originalModeValue of Object.values(outputToken.original?.$modes ?? {}) as DesignToken[]) {
      if (typeof originalModeValue === 'object' && originalModeValue !== null) {
        delete originalModeValue.filePath;
        delete originalModeValue.isSource;
      }
    }

    // we replace the `$modes` values with the ones resolved by the per-mode builds: there, Style Dictionary has already
    // resolved every reference/alias against that specific mode and applied the transforms, so the values are final.
    // this also covers the tokens that don't declare their own `$modes` but are an alias of a token that does (their
    // value still changes from one mode to the other, so they need to expose it too); conversely a token whose value
    // is the same in every mode isn't themed at all, so exposing `$modes` for it would be misleading.
    output.push(withValuesByMode(outputToken, getValuesByMode({ token: outputToken, modes, tokensByMode })));
  }

  return JSON.stringify(output, null, 2);
}

// returns a copy of the token with the `$modes` prop set (or removed, when `valuesByMode` is `undefined`)
function withValuesByMode(token: DesignToken, valuesByMode: Record<string, DesignToken['$value']> | undefined): Record<string, unknown> {
  const outputToken: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(token)) {
    if (key === '$modes') continue;
    outputToken[key] = value;
    if (key === '$value' && valuesByMode) {
      // always placed right after `$value` for consistency/readability
      outputToken['$modes'] = valuesByMode;
    }
  }
  return outputToken;
}

// returns the token's value in each mode, or `undefined` when the value is the same in all of them.
function getValuesByMode({ token, modes, tokensByMode }: { token: DesignToken; modes: string[]; tokensByMode: TokensByMode }): Record<string, DesignToken['$value']> | undefined {
  if (!token.key) {
    return undefined;
  }
  const valuesByMode: Record<string, DesignToken['$value']> = {};
  for (const mode of modes) {
    const value = tokensByMode[mode]?.get(token.key);
    // a token missing from a per-mode build (eg. a token that is not part of the themed sources) can't be themed
    if (value === undefined) {
      return undefined;
    }
    valuesByMode[mode] = value;
  }
  const values = Object.values(valuesByMode);
  return values.every((value) => isEqual(value, values[0])) ? undefined : valuesByMode;
}
