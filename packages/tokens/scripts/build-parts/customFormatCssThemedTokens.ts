/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { fileHeader, formattedVariables, getReferences, resolveReferences } from 'style-dictionary/utils';
import type { DesignToken, TransformedToken, Dictionary, Config, LocalOptions, FormatFn }  from 'style-dictionary/types';

// since we need to differentiate the internal logic depending on the `target`, we need to use
// a high-order/curried function that takes `target` as argument and return a function of type `FormatFn`
export async function customFormatCssThemedTokensFunctionForTarget(target: string): Promise<FormatFn> {

  // get the "do not edit directly" header (to use it later inside the curried function)
  const header = await fileHeader({});

  // this is where we return the "format" function, that depending on the `target` filters the tokens to be written in the "common" file or in the "themed" file
  return function ({ dictionary, options }: { dictionary: Dictionary, options: Config & LocalOptions }): string {

    // filter out tokens based on kind of `target` and `$modes` existence
    const filteredTokens = dictionary.allTokens.filter(token => {
      // if it's private we don't want to output the token at all, not in "common" nor in "themed"
      if (token.private) {
        return false;
      } else {
        // we have to consider different conditions to decide if this should be output in "common" or in "themed"
        const isThemed = ('$modes' in token);
        const hasReferencesAndHasBeenTransformed = checkIfHasReferencesAndHasBeenTransformed(token, dictionary, options.usesDtcg);
        const hasPrivateThemedReferences = checkIfHasPrivateThemedReferences(token, dictionary, options.usesDtcg);
        const hasPrivateReferencesWithThemedDescendants = checkIfHasPrivateReferencesWithThemedDescendants(token, dictionary, options.usesDtcg);
        if (target === 'common') {
          return !isThemed && !hasReferencesAndHasBeenTransformed && !hasPrivateThemedReferences && !hasPrivateReferencesWithThemedDescendants;
        } else {
          return isThemed || (!isThemed && (hasReferencesAndHasBeenTransformed || hasPrivateThemedReferences || hasPrivateReferencesWithThemedDescendants));
        }
      }
    });

    // create a shallow copy of the dictionary with the filtered allTokens
    const filteredDictionary = {
      ...dictionary,
      allTokens: filteredTokens
    };

    // use a custom formatter for the CSS variables
    // note: initially we tried to piggyback `StyleDictionary.hooks.formats['css/variables']` but then realized that `formattedVariables` is the one that does all the heavy lifting,
    // so we went with a custom implementation to avoid hacks trying to use the hooks
    const variables = formattedVariables({
      format: 'css',
      dictionary: filteredDictionary,
      outputReferences: shouldOutputReferences,
      formatting: { indentation: '  ' },
      usesDtcg: options.usesDtcg,
    });

    // sort the CSS variables (easier to read and compare)
    const sortedVariables = variables.split('\n').sort().join('\n');

    // return the content (with the header)
    return `${header}:root {\n${sortedVariables}\n}`;
  }
}

const shouldOutputReferences = (token: TransformedToken, options: { dictionary: Dictionary, usesDtcg?: boolean }) => {
  const { dictionary, usesDtcg } = options;

  const originalValue = usesDtcg ? token.original.$value : token.original.value;

  // get all the token refs (aliases) that are referenced in its `$value`
  // e.g. `"$value": "{foo.bar} {baz}"` has two references (`foo.bar` and `baz`)
  const refs = getReferences(originalValue, dictionary.tokens, {
    // note: we pass `unfilteredTokens` to ensure we find the refs even if they are filtered out
    unfilteredTokens: dictionary.unfilteredTokens,
    usesDtcg,
    warnImmediately: false,
  });

  // check whether any of the refs is private
  const hasPrivateReferences = refs.some((ref: DesignToken) => ref.private);

  // check if the token has references and at the same time its value has been transformed along the way
  const hasReferencesAndHasBeenTransformed = checkIfHasReferencesAndHasBeenTransformed(token, dictionary, usesDtcg);

  // we output the reference only if none of the conditions above are true
  return !hasPrivateReferences && !hasReferencesAndHasBeenTransformed;
}

// inspired by `outputReferencesTransformed` - https://github.com/style-dictionary/style-dictionary/blob/main/lib/utils/references/outputReferencesTransformed.js
const checkIfHasReferencesAndHasBeenTransformed = (token: TransformedToken, dictionary: Dictionary, usesDtcg?: boolean) => {

  const value = usesDtcg ? token.$value : token.value;
  const originalValue = usesDtcg ? token.original.$value : token.original.value;

  const refs = getReferences(originalValue, dictionary.tokens, {
    // note: we pass `unfilteredTokens` to ensure we find the refs even if they are filtered out
    unfilteredTokens: dictionary.unfilteredTokens,
    usesDtcg,
    warnImmediately: false,
  });
  const hasReferences = refs && refs.length > 0;

  let isTransformed;

  // references can live only in strings (we ignore arrays and objects, for now)
  if (typeof originalValue === 'string') {
    // Check if the token's value is the same as if we were resolving references on the original value
      const transformedValue = resolveReferences(originalValue, dictionary.unfilteredTokens ?? dictionary.tokens, {
        usesDtcg,
        warnImmediately: false,
      })
    // This checks whether the token's value has been transformed e.g. transitive transforms.
    // see: https://styledictionary.com/reference/utils/references/#resolvereferences
    isTransformed = (
      // this `value` could be the original one (eg. `#FF0000`, no transformations)
      // or the transformed one (eg. `#FF0000`→`#FF0000CC` if an `alpha` attribute was applied at token level,
      // which triggered the `color/with-alpha` transformation)
      value !== transformedValue
    );
  }
  return hasReferences && isTransformed;
}

// checks if a token has any private references that are themed (they have `$modes`)
const checkIfHasPrivateThemedReferences = (
  token: DesignToken,
  dictionary: Dictionary,
  usesDtcg?: boolean
): boolean => {

  const originalValue = usesDtcg ? token.original.$value : token.original.value;

  // get all the token refs (aliases) that are referenced in its `$value`
  // e.g. `"$value": "{foo.bar} {baz}"` has two references (`foo.bar` and `baz`)
  const refs = getReferences(originalValue, dictionary.tokens, {
    // note: we pass `unfilteredTokens` to ensure we find the refs even if they are filtered out
    unfilteredTokens: dictionary.unfilteredTokens,
    usesDtcg,
    warnImmediately: false,
  });

  // check whether any of the refs is private and themed at the same time
  const hasPrivateThemedReferences = refs.some((ref: DesignToken) => ref.private && '$modes' in ref);

  return hasPrivateThemedReferences;

};

// checks if a token has any private references that themselves reference themed tokens (they have `$modes`)
const checkIfHasPrivateReferencesWithThemedDescendants = (
  token: DesignToken,
  dictionary: Dictionary,
  usesDtcg?: boolean
): boolean => {
  const visited = new Set<string>();

  const checkReferences = (currentToken: DesignToken, hasPrivateAncestor = false): boolean => {
    const originalValue = usesDtcg ? currentToken.original?.$value : currentToken.original?.value;

    const refs = getReferences(originalValue, dictionary.tokens, {
      // note: we pass `unfilteredTokens` to ensure we find the refs even if they are filtered out
      unfilteredTokens: dictionary.unfilteredTokens,
      usesDtcg,
      warnImmediately: false,
    });

    return refs.some((ref: DesignToken) => {
      const refKey = ref.path?.join('.') || ref.name;

      // skip if already visited (avoid circular references), otherwise store it
      if (visited.has(refKey)) {
        return false;
      } else {
        visited.add(refKey);
      }

      // if we're already in a private chain this token is themed...
      if (hasPrivateAncestor && '$modes' in ref) {
        return true;
      }

      // add the current ref to the private reference logical `OR` chain
      const isInPrivateChain = ref.private || hasPrivateAncestor;

      // Recursively check descendants, passing along the private chain status
      return checkReferences(ref, isInPrivateChain);
    });
  };

  return checkReferences(token);
};
