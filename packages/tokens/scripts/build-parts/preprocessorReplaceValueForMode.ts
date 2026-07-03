/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import chalk from 'chalk';
import { isEqual } from 'lodash-es';

import type { DesignToken, Preprocessor } from 'style-dictionary/types';
import type { Mode } from './getStyleDictionaryConfig.ts';

// Higher-order function: takes a `mode` and returns a Style Dictionary preprocessor that recursively traverses the token
// tree and replaces each themed token's `$value` with the corresponding colocated `$modes` theme value for that mode.
export function preprocessorReplaceValueForMode(mode: Mode): Preprocessor['preprocessor'] {
  return (dictionary, options) => {
    // we get the `buildPath` from the `PlatformConfig` option (used only for the warning/error messages)
    const buildPath = 'buildPath' in options ? options.buildPath : undefined;
    // recursively traverse token objects and replace the `$value` with the corresponding colocated `$modes` theme value
    // note: the `slice` is always an object (a token or a parent group)
    function replaceModes(slice: DesignToken, tokenPath: string[]) {
      if (slice.$modes) {
        if (mode in slice.$modes) {
          // extra validation to catch instances where the `default` mode value is different from the `$value`
          // note: we use `isEqual` for a deep/structural comparison so that object values (eg. the new DTCG `dimension` format `{ value, unit }`)
          // and array values (eg. the `cubicBezier` timing functions) don't trigger false positives when they are structurally equal
          if (mode === 'default' && !isEqual(slice.$modes[mode], slice.$value)) {
            console.warn(`⚠️ ${chalk.yellow.bold('WARNING')} - Found themed 'default' token '{${tokenPath.join('.')}}' with value different than '$value' (\`${JSON.stringify(slice.$modes[mode])}\` instead of the expected \`${JSON.stringify(slice.$value)}\`) - BuildPath: ${buildPath} - File: ${slice.filePath}`);
          }
          // note: a `$modes` entry resolves to one of two shapes, distinguished by whether it carries its own `$value`:
          // 1) a "standard" value:
          //      - a primitive value (eg. a number, a string, an alias, etc)
          //      - an array (eg. the `cubicBezier` timing function like in `accordion.item.toggle.icon.transition.timing-function`)
          //      - a DTCG object value (eg. the new `dimension` `{ value, unit }` shape) — which replaces `$value` directly.
          // 2) a "property-override" object:
          //      - by convention always an object that carries its own `$value`, optionally with sibling props (eg. `unit`/`alpha`, like in `color.palette.alpha-300`).
          //        its keys override the token's own props, and a `null` value removes that prop from the token (eg. `{ "$value": "{…}", "alpha": null }` drops the alpha).
          const modeValue = slice.$modes[mode];
          const isPropertyOverrideObject = typeof modeValue === 'object' && modeValue !== null && !Array.isArray(modeValue) && '$value' in modeValue;
          if (isPropertyOverrideObject) {
            // we spread the override object's keys/values over the token's base keys/values
            Object.keys(modeValue).forEach((key: string) => {
              if (modeValue[key] === null) {
                delete slice[key];
              } else {
                slice[key] = modeValue[key];
              }
            });
          } else {
            slice.$value = modeValue;
          }
        } else {
          // we want to interrupt the execution of the script if one of the expected modes is missing
          throw new Error(`❌ ${chalk.red.bold('ERROR')} - Found themed token '{${tokenPath.join('.')}}' without '${mode}' value - BuildPath: ${buildPath} - File: ${slice.filePath} - Path: ${tokenPath.join('.')} - ${JSON.stringify(slice, null, 2)}`);
        }
      } else {
          Object.entries(slice).forEach(([key, value]) => {
            if (typeof value === 'object') {
              replaceModes(value, [...tokenPath, key]);
            }
          });
      }
      return slice;
    }
    return replaceModes(dictionary, []);
  };
}
