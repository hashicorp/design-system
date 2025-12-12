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
      // const originalValue = options.usesDtcg ? token.original.$value : token.original.value;

      // const refs = getReferences(originalValue, dictionary.tokens, {
      //   unfilteredTokens: dictionary.unfilteredTokens,
      //   usesDtcg: options.usesDtcg,
      //   warnImmediately: false,
      // });

      // TODO is it really needed?
      // const hasMultipleReferences = refs.length > 1;

      const hasPrivateReferencesWithThemedDescendants = checkIfHasPrivateReferencesWithThemedDescendants(token, dictionary, options.usesDtcg)

      // TODO! add logic to handle `hds-surface-base-box-shadow`

      // hds-surface-base-box-shadow = "{hds.elevation.base.box-shadow-border}"
      // elevation.base.box-shadow-border = "0 0 0 {hds.elevation.base.border.width} {hds.elevation.base.border.color}",
      // elevation.base.border.width = 1px
      // elevation.base.border.color = {elevation.color.base} + alpha (0.2)
      // elevation.color.base = {color.palette.neutral-500} (private)
      // color.palette.neutral-500 = #hex + $modes(#hex, {carbon.color.gray.70})


      // ⚠️ the issue is likely having a private token that points to a child which has modes
      // ⚠️ probably any ref children that has modes (children of a private)

      // [
      //   {
      //     key: '{elevation.base.box-shadow-border}',
      //     '$value': '0 0 0 1px #656a7633',
      //     private: true,
      //     filePath: 'src/global/elevation/values/base-level.json',
      //     isSource: true,
      //     original: {
      //       '$value': '0 0 0 {elevation.base.border.width} {elevation.base.border.color}',
      //       private: true,
      //       key: '{elevation.base.box-shadow-border}'
      //     },
      //     name: 'token-elevation-base-box-shadow-border',
      //     attributes: { category: 'elevation' },
      //     path: [ 'elevation', 'base', 'box-shadow-border' ],
      //     ref: [ 'elevation', 'base', 'box-shadow-border' ]
      //   },
      //   {
      //     key: '{elevation.base.border.width}',
      //     '$type': 'dimension',
      //     '$value': '1px',
      //     unit: 'px',
      //     private: true,
      //     filePath: 'src/global/elevation/values/base-level.json',
      //     isSource: true,
      //     original: {
      //       '$type': 'dimension',
      //       '$value': '1',
      //       unit: 'px',
      //       private: true,
      //       key: '{elevation.base.border.width}'
      //     },
      //     name: 'token-elevation-base-border-width',
      //     attributes: { category: 'elevation' },
      //     path: [ 'elevation', 'base', 'border', 'width' ],
      //     ref: [ 'elevation', 'base', 'border', 'width' ]
      //   },
      //   {
      //     key: '{elevation.base.border.color}',
      //     '$type': 'color',
      //     '$value': '#656a7633',
      //     alpha: '0.20',
      //     private: true,
      //     filePath: 'src/global/elevation/values/base-level.json',
      //     isSource: true,
      //     original: {
      //       '$type': 'color',
      //       '$value': '{elevation.color.base}',
      //       alpha: '0.20',
      //       private: true,
      //       key: '{elevation.base.border.color}'
      //     },
      //     name: 'token-elevation-base-border-color',
      //     attributes: { category: 'elevation' },
      //     path: [ 'elevation', 'base', 'border', 'color' ],
      //     ref: [ 'elevation', 'base', 'border', 'color' ]
      //   },
      //   {
      //     key: '{elevation.color.base}',
      //     '$type': 'color',
      //     '$value': '#656a76',
      //     private: true,
      //     filePath: 'src/global/elevation/values/colors.json',
      //     isSource: true,
      //     original: {
      //       '$type': 'color',
      //       '$value': '{color.palette.neutral-500}',
      //       private: true,
      //       key: '{elevation.color.base}'
      //     },
      //     name: 'token-elevation-color-base',
      //     attributes: { category: 'elevation' },
      //     path: [ 'elevation', 'color', 'base' ],
      //     ref: [ 'elevation', 'color', 'base' ]
      //   },
      //   {
      //     key: '{color.palette.neutral-500}',
      //     '$type': 'color',
      //     '$value': '#656a76',
      //     group: 'palette',
      //     '$modes': {
      //       default: '#656a76',
      //       'cds-g0': '#525252',
      //       'cds-g10': '#525252',
      //       'cds-g90': '#525252',
      //       'cds-g100': '#525252'
      //     },
      //     filePath: 'src/global/color/palette-neutrals.json',
      //     isSource: true,
      //     original: {
      //       '$type': 'color',
      //       '$value': '#656a76',
      //       group: 'palette',
      //       '$modes': [Object],
      //       key: '{color.palette.neutral-500}'
      //     },
      //     name: 'token-color-palette-neutral-500',
      //     attributes: { category: 'color' },
      //     path: [ 'color', 'palette', 'neutral-500' ],
      //     ref: [ 'color', 'palette', 'neutral-500' ]
      //   }
      // ]

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
        // return !isPrivate && !isThemed && !isTransformed && !hasMultipleReferences;
        return !isPrivate && !isThemed && !isTransformed && !hasPrivateReferencesWithThemedDescendants;
      } else {
        // return !isPrivate && (isThemed || (!isThemed && (isTransformed || hasMultipleReferences)));
        return !isPrivate && (isThemed || (!isThemed && (isTransformed || hasPrivateReferencesWithThemedDescendants)));
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

  // if (token.name === 'token-elevation-inset-box-shadow' || token.name === 'token-surface-base-box-shadow') {
  //   const allRefs = getAllReferencesRecursively(originalValue, dictionary, options.usesDtcg);
  //   console.log('👉 👉 👉 ALL REFERENCES', token.name, allRefs);
  // }

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

// Checks if a token has any private references that themselves reference themed tokens (they have `$modes`)
const checkIfHasPrivateReferencesWithThemedDescendants = (
  token: DesignToken,
  dictionary: Dictionary,
  usesDtcg?: boolean
): boolean => {
  const visited = new Set<string>();

  const checkReferences = (currentToken: DesignToken, hasPrivateAncestor = false): boolean => {
    const originalValue = usesDtcg ? currentToken.original?.$value : currentToken.original?.value;

    const refs = getReferences(originalValue, dictionary.tokens, {
      unfilteredTokens: dictionary.unfilteredTokens,
      usesDtcg,
      warnImmediately: false,
    });

    return refs.some((ref: DesignToken) => {
      const refKey = ref.path?.join('.') || ref.name;

      // skip if already visited (avoid circular references) otherwise store it
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

/**
 * Checks if a token has any private references that themselves reference themed tokens (tokens with $modes)
 * @param token - The token to check
 * @param dictionary - The dictionary object containing tokens
 * @param usesDtcg - Whether DTCG format is used
 * @returns True if the token has private references that reference themed tokens
 */
// const checkIfHasPrivateReferencesWithThemedDescendantsOld = (
//   token: TransformedToken,
//   dictionary: Dictionary,
//   usesDtcg?: boolean
// ): boolean => {
//   const originalValue = usesDtcg ? token.original.$value : token.original.value;

//   // Get all references (direct and nested) for this token
//   const allRefs = getAllReferencesRecursively(originalValue, dictionary, usesDtcg);

//   // Check if any reference is private AND has themed descendants
//   return allRefs.some((ref: DesignToken) => {
//     if (!ref.private) {
//       return false;
//     }

//     // For this private reference, check if it or any of its descendants have $modes
//     if ('$modes' in ref) {
//       return true;
//     }

//     // Check the private token's descendants
//     const refValue = usesDtcg ? ref.original?.$value : ref.original?.value;
//     if (refValue) {
//       const nestedRefs = getAllReferencesRecursively(refValue, dictionary, usesDtcg);
//       return nestedRefs.some((nestedRef: DesignToken) => '$modes' in nestedRef);
//     }

//     return false;
//   });
// };

// recursively gets all references (direct and nested) for a given token value
// const getAllReferencesRecursively = (
//   originalValue: any,
//   dictionary: Dictionary,
//   usesDtcg?: boolean
// ): DesignToken[] => {
//   const allRefs: DesignToken[] = [];
//   const visited = new Set<string>();

//   const collectRefs = (value: any) => {
//     const refs = getReferences(value, dictionary.tokens, {
//       unfilteredTokens: dictionary.unfilteredTokens,
//       usesDtcg,
//       warnImmediately: false,
//     });

//     refs.forEach((ref: DesignToken) => {
//       // Use the token path as a unique identifier to avoid circular references
//       const refKey = ref.path?.join('.') || ref.name;

//       if (!visited.has(refKey)) {
//         visited.add(refKey);
//         allRefs.push(ref);

//         // Recursively collect references from this token's value
//         const refValue = usesDtcg ? ref.original.$value : ref.original.value;
//         if (refValue) {
//           collectRefs(refValue);
//         }
//       }
//     });
//   };

//   collectRefs(originalValue);

//   return allRefs;
// };
