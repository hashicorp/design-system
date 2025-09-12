/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */


type Args = { key?: string, value: Record<string, any>; type: string; group?: string };

import type { CarbonDesignTokens, CarbonDesignToken } from './@types/CarbonDesignTokens.d.ts'

import { baseFontSize } from '@carbon/layout';

export const dimensionRegex: RegExp = /^([+-]?\d+(?:\.\d+)?)(?:(px|rem|em|%|vw|vh|vmin|vmax)|)$/;

export function convertObjectToDtcgFormat({ value, type, group }: Args): CarbonDesignTokens | CarbonDesignToken {
  return recursivelyProcessObject({ value, type, group });
}

function recursivelyProcessObject({ key, value, type, group}: Args): CarbonDesignTokens | CarbonDesignToken | Record<string, any> {
  if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
    // recursively process each key
    const result: Record<string, any> = {};
    for (const key in value) {
      // for better safety (says Copilot)
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        result[key] = recursivelyProcessObject({ key, value: value[key], type, group });
      }
    }
    return result;
  } else {
    // this is a leaf with a string or number value => convert to DTCG format
    if (typeof value === 'string' || typeof value === 'number') {
      switch (type) {
        case 'color':
          return {
            '$type': 'color',
            '$value': value,
            'group': group || 'cds-generic-color',
            'private': true,
            'cds-original-value': value
          };
        case 'cubic-bezier':
          return {
            // TODO convert to `cubicBezier` per DTCG specifications when we are sure that Style Dictionary process it correctly
            // see: https://www.designtokens.org/tr/drafts/format/#cubic-bezier
            '$type': 'cubic-bezier',
            '$value': value,
            'group': group || 'cds-generic-cubic-bezier',
            'private': true,
            'cds-original-value': value
          };
        case 'duration':
          const convertedDurationValue = convertDurationValue(value);
          if (convertedDurationValue !== undefined) {
            return {
              '$type': 'duration',
              '$value': convertedDurationValue.$value,
              'unit': convertedDurationValue.unit,
              'group': group || 'cds-generic-duration',
              'private': true,
              'cds-original-value': value
            };
          } else {
            const unknownDurationToken = returnUnknownToken(value, `🚨 convertDurationValue: value for key "${key}" / group "${group}" is not in the expected format:`);
            return unknownDurationToken;
          }
        case 'font-family':
          return {
            '$type': 'font-family',
            '$value': value,
            'group': group || 'cds-generic-font-family',
            'private': true,
            'cds-original-value': value
          };
        case 'font-size':
          const convertedFontSizeValue = convertSizeValue(value, false);
          if (convertedFontSizeValue !== undefined) {
            return {
              '$type': 'font-size',
              '$value': convertedFontSizeValue.$value,
              'unit': convertedFontSizeValue.unit,
              'group': group || 'cds-generic-font-size',
              'private': true,
              'cds-original-value': value
            };
          } else {
            const unknownSizeToken = returnUnknownToken(value, `🚨 convertSizeValue: value for key "${key}" / group "${group}" is not in the expected format:`);
            return unknownSizeToken;
          }
        case 'font-weight':
          return {
            '$type': 'font-weight',
            '$value': value,
            'group': group || 'cds-generic-font-weight',
            'private': true,
            'cds-original-value': value
          };
        case 'line-height':
          return {
            '$type': 'number',
            '$value': value,
            'group': group || 'cds-generic-line-height',
            'private': true,
            'cds-original-value': value
          };
        case 'letter-spacing':
          const convertedLetterSpacingValue = convertSizeValue(value, false);
          if (convertedLetterSpacingValue !== undefined) {
            return {
              '$type': 'letter-spacing',
              '$value': convertedLetterSpacingValue.$value,
              'unit': convertedLetterSpacingValue.unit,
              'group': group || 'cds-generic-letter-spacing',
              'private': true,
              'cds-original-value': value
            };
          } else {
            const unknownSizeToken = returnUnknownToken(value, `🚨 convertSizeValue: value for key "${key}" / group "${group}" is not in the expected format:`);
            return unknownSizeToken;
          }
        case 'number':
          return {
            '$type': 'number',
            '$value': value,
            'group': group || 'cds-generic-number',
            'private': true,
            'cds-original-value': value
          };
        case 'dimension':
          const convertedSizeValue = convertSizeValue(value);
          if (convertedSizeValue !== undefined) {
            return {
              '$type': 'dimension',
              '$value': convertedSizeValue.$value,
              'unit': convertedSizeValue.unit,
              'group': group || 'cds-generic-size',
              'private': true,
              'cds-original-value': value
            };
          } else {
            const unknownSizeToken = returnUnknownToken(value, `🚨 convertSizeValue: value for key "${key}" / group "${group}" is not in the expected format:`);
            return unknownSizeToken;
          }
        default:
          return {
            '$type': 'unknown',
            '$value': value,
            'group': group || 'cds-unknown-token',
            'private': true,
            'cds-original-value': value
          };
        }
      } else {
        const unknownToken = returnUnknownToken(value, `🚨 convertObjectToDtcgFormat > recursivelyProcessObject: value for key "${key}" / group "${group}" has type "${typeof value}", not sure how to process it, will be converted to JSON.string:`);
        return unknownToken;
    }
  }
}

function convertDurationValue(value: string) {
  const match = value.match(/^(\d+)(s|ms)$/);
  if (match) {
    const $value = Number(match[1]);
    const unit = match[2];
    return { $value, unit };
  } else {
    return undefined;
  }
}

function convertSizeValue(value: string | number, convertRemToPx: boolean = true) {
  if (typeof value === 'string') {
    const match = value.match(dimensionRegex);
    if (match) {
      const $value = Number(match[1]);
      const unit = match[2];
      let returnValue;
      if (convertRemToPx && unit === 'rem') {
        // we convert everything to px, because in HDS we use px (except for font sizes)
        returnValue = $value * baseFontSize;
      } else {
        returnValue = $value;
      }
      return { $value: returnValue, unit: 'px' };
    } else {
      return undefined;
    }
  } else if (typeof value === 'number') {
    if (value === 0) {
      return { $value: 0, unit: 'px' };
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
}

function returnUnknownToken(value: unknown, error: string) {
  const returnValue = JSON.stringify(value, null, 2);
  console.error(`${error} ${returnValue}.\n`);
  return {
    '$type': 'unknown',
    '$value': returnValue,
    'group': 'cds-unknown-token',
    'private': true,
    'cds-original-value': value
  };
}