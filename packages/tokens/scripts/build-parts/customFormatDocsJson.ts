/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import { getReferences } from 'style-dictionary/utils';
import type { Dictionary, DesignToken, Config, LocalOptions } from 'style-dictionary/types';

import { cloneDeep } from 'lodash-es';

// the resolved value of every token, for each mode (see how it's built in the `build` file)
export type TokensByMode = Record<string, Map<string, DesignToken['$value']>>;

export async function customFormatDocsJsonFunction({ dictionary, options, tokensByMode }: { dictionary: Dictionary; options: Config & LocalOptions; tokensByMode: TokensByMode }): Promise<string> {
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
    // this also covers the tokens that don't declare their own `$modes` but alias token(s) in their resolution chain that do
    const valuesByMode = isThemed(outputToken, dictionary, options.usesDtcg) ? getValuesByMode({ token: outputToken, modes, tokensByMode }) : undefined;
    output.push(withValuesByMode(outputToken, valuesByMode));
  }

  return JSON.stringify(output, null, 2);
}

// A token is "themed" when a `$modes` declaration exists on the token itself or anywhere in the chain of references it resolves through
function isThemed(token: DesignToken, dictionary: Dictionary, usesDtcg?: boolean, visitedKeys = new Set<string>()): boolean {
  const tokenKey = token.key ?? token.path?.join('.');
  if (token.$modes) {
    return true;
  } else if (tokenKey && visitedKeys.has(tokenKey)) {
    // we already went through this token (this also avoids looping over circular references)
    return false;
  } else {
    if (tokenKey) {
      visitedKeys.add(tokenKey);
    }
    // a value can reference more than one token (eg. the `box-shadow` ones), and any of them can bring in the theming
    // note: we search the unfiltered tokens directly because private references are intentionally part of the chain
    const references = getReferences(usesDtcg ? token.original?.$value : token.original?.value, dictionary.unfilteredTokens ?? dictionary.tokens, {
      usesDtcg,
      warnImmediately: false,
    });
    return references.some((reference: DesignToken) => isThemed(reference, dictionary, usesDtcg, visitedKeys));
  }
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

// returns the token's value in each mode, as resolved by the per-mode builds
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
  return valuesByMode;
}
