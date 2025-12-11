/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { DesignToken, TransformedToken, Dictionary, Config, LocalOptions, FormatFn }  from 'style-dictionary/types';
import { formattedVariables, getReferences, resolveReferences } from 'style-dictionary/utils';

// since we need to differentiate the internal logic depending on the `target`, we need to use
// a high-order/curried function, , that takes `target` as argument and return a function of type `FormatFn`
export function customFormatCssThemedTokensFunctionForTarget(target: string): FormatFn {
  return function ({ dictionary, options }: { dictionary: Dictionary, options: Config & LocalOptions }): string {
    // filter out tokens based on kind of `target` and `$modes` existence
    const filteredTokens = dictionary.allTokens.filter(token => {
      const isPrivate = token.private;

      const isThemed = ('$modes' in token);
      const originalValue = options.usesDtcg ? token.original.$value : token.original.value;
      const refs = getReferences(originalValue, dictionary.tokens, {
        unfilteredTokens: dictionary.unfilteredTokens,
        usesDtcg: options.usesDtcg,
        warnImmediately: false,
      });

      const hasMultipleReferences = refs.length > 1;

      // TODO! add logic to handle `hds-surface-base-box-shadow`

      // hds-surface-base-box-shadow = "{hds.elevation.base.box-shadow-border}"
      // elevation.base.box-shadow-border = "0 0 0 {hds.elevation.base.border.width} {hds.elevation.base.border.color}",
      // elevation.base.border.width = 1px
      // elevation.base.border.color = {elevation.color.base} + alpha (0.2)

      // token-color-palette-alpha-100
      // token-color-palette-alpha-200
      // token-color-palette-alpha-300

      // token-elevation-base-border-color
      // token-elevation-high-border-color
      // token-elevation-high-shadow-01-color
      // token-elevation-high-shadow-02-color
      // token-elevation-higher-border-color
      // token-elevation-higher-shadow-01-color
      // token-elevation-higher-shadow-02-color
      // token-elevation-inset-border-color
      // token-elevation-inset-shadow-01-color
      // token-elevation-low-border-color
      // token-elevation-low-shadow-01-color
      // token-elevation-low-shadow-02-color
      // token-elevation-mid-border-color
      // token-elevation-mid-shadow-01-color
      // token-elevation-mid-shadow-02-color
      // token-elevation-overlay-border-color
      // token-elevation-overlay-shadow-01-color
      // token - elevation - overlay - shadow-02 - color

      // {
      //   key: "{hds.elevation.base.box-shadow-border}",
      //   $value: "0 0 0 1px #656a7633",
      //   private: true,
      //   filePath: "src/test/test.json",
      //   isSource: true,
      //   original: {
      //     $value: "0 0 0 {hds.elevation.base.border.width} {hds.elevation.base.border.color}",
      //     private: true,
      //     key: "{hds.elevation.base.box-shadow-border}",
      //   },
      //   name: "token-hds-elevation-base-box-shadow-border",
      //   attributes: {
      //     category: "hds",
      //   },
      //   path: [
      //     "hds",
      //     "elevation",
      //     "base",
      //     "box-shadow-border",
      //   ],
      //   ref: [
      //     "hds",
      //     "elevation",
      //     "base",
      //     "box-shadow-border",
      //   ],
      // }

      const isTransformed = checkIfHasBeenTransformed(token, dictionary, options.usesDtcg);

      if (target === 'common') {
        return !isPrivate && !isThemed && !isTransformed && !hasMultipleReferences;
      } else {
        return !isPrivate && (isThemed || (!isThemed && (isTransformed || hasMultipleReferences)));
      }
    });

    // create a shallow copy of the dictionary with the filtered allTokens
    const filteredDictionary = {
      ...dictionary,
      allTokens: filteredTokens
    };

    // use a custom formatter for the CSS variables
    // TODO: would make sense to use `StyleDictionary.hooks.formats['css/variables']` somehow?
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

    // sort the CSS variables (easier to read and compare)
    const sortedVariables = variables.split('\n').sort().join('\n');

    // return the content
    return `:root {\n${sortedVariables}\n}`;
  }
}

const outputReferencesCustomFunction = (token: TransformedToken, options: { dictionary: Dictionary, usesDtcg?: boolean }) => {
  const { dictionary, usesDtcg } = options;

  // const value = usesDtcg ? token.$value : token.value;
  const originalValue = usesDtcg ? token.original.$value : token.original.value;

  // decide if output reference for the token, based on its ancestors being private or not
  // note: derived from `outputReferencesFilter` - see: https://github.com/style-dictionary/style-dictionary/blob/main/lib/utils/references/outputReferencesFilter.js

  // get all the token refs (aliases) that are referenced in its `$value`
  // e.g. `"$value": "{foo.bar} {baz}"` has two references (`foo.bar` and `baz`)
  // note: pass unfilteredTokens to ensure we find the refs even if they are filtered out
  const refs = getReferences(originalValue, dictionary.tokens, {
    unfilteredTokens: dictionary.unfilteredTokens,
    usesDtcg,
    warnImmediately: false,
  });

  // check whether any of the refs if private
  const hasPrivateReferences = refs.some((ref: DesignToken) => ref.private);

  // decide if output reference for the token, based on the fact that it's been transformed or not
  const hasBeenTransformed = checkIfHasBeenTransformed(token, dictionary, usesDtcg);

  // double check if this is a string, technically speaking the token could also be an object and pass the usesReferences check
  // let hasBeenTransformed;
  // if (typeof originalValue === 'string') {
  //   // Check if the token's value is the same as if we were resolve references on the original value
  //   // This checks whether the token's value has been transformed e.g. transitive transforms.
  //   // If it has been, that means we should not be outputting refs because this would undo the work of those transforms.
  //   hasBeenTransformed = (
  //     // this `value` could be the original one (eg. `#FF0000`, no transformations)
  //     // or the transformed one (eg. `#FF0000`→`#FF0000CC` if an `alpha` attribute was applied at token level,
  //     // which triggered the `color/with-alpha` transformation)
  //     value !==
  //     // see: https://styledictionary.com/reference/utils/references/#resolvereferences
  //     resolveReferences(originalValue, dictionary.unfilteredTokens ?? dictionary.tokens, {
  //       usesDtcg,
  //       warnImmediately: false,
  //     })
  //   );
  // } else {
  //   hasBeenTransformed = true;
  // }

  return !hasPrivateReferences && !hasBeenTransformed;
  // return !hasPrivateReferences;
}

// derived from `outputReferencesTransformed` - https://github.com/style-dictionary/style-dictionary/blob/main/lib/utils/references/outputReferencesTransformed.js
const checkIfHasBeenTransformed = (token: TransformedToken, dictionary: Dictionary, usesDtcg?: boolean) => {

  const value = usesDtcg ? token.$value : token.value;
  const originalValue = usesDtcg ? token.original.$value : token.original.value;

  // double check if this is a string, technically speaking the token could also be an object and pass the usesReferences check
  let isTransformed;
  if (typeof originalValue === 'string') {
    // Check if the token's value is the same as if we were resolve references on the original value
    // This checks whether the token's value has been transformed e.g. transitive transforms.
    // If it has been, that means we should not be outputting refs because this would undo the work of those transforms.
    // see: https://styledictionary.com/reference/utils/references/#resolvereferences
    const transformedValue = resolveReferences(originalValue, dictionary.unfilteredTokens ?? dictionary.tokens, {
      usesDtcg,
      warnImmediately: false,
    })

    isTransformed = (
      // this `value` could be the original one (eg. `#FF0000`, no transformations)
      // or the transformed one (eg. `#FF0000`→`#FF0000CC` if an `alpha` attribute was applied at token level,
      // which triggered the `color/with-alpha` transformation)
      value !== transformedValue
    );
  } else {
    isTransformed = true;
  }

  return isTransformed;
}