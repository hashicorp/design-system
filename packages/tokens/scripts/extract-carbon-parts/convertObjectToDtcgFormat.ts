/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */


type Args = { key?: string, value: Record<string, any>; type: string; group?: string };

import type { CarbonDesignTokens, CarbonDesignToken } from './@types/CarbonDesignTokens.d.ts'

import { baseFontSize } from '@carbon/layout';

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
            'group': group || 'cds-undefined-color',
            'private': true,
            'original': value
          };
        case 'cubic-bezier':
          return {
            // TODO convert to `cubicBezier` per DTCG specificagtions when we are sure that Style Dictionary process it correctly
            // see: https://www.designtokens.org/tr/drafts/format/#cubic-bezier
            '$type': 'cubic-bezier',
            '$value': value,
            'group': group || 'cds-undefined-cubic-bezier',
            'private': true,
            'original': value
          };
        case 'duration':
          const convertedDurationValue = convertDurationValue(value);
          if (convertedDurationValue !== undefined) {
            return {
              '$type': 'duration',
              '$value': convertedDurationValue.$value,
              '$unit': convertedDurationValue.$unit,
              'group': group || 'cds-undefined-duration',
              'private': true,
              'original': value
            };
          } else {
            const unknownDurationToken = returnUnknownToken(value, '🚨 convertDurationValue: value is not in the expected format:');
            return unknownDurationToken;
          }
        case 'number':
          return {
            '$type': 'number',
            '$value': value,
            'group': group || 'cds-undefined-number',
            'private': true,
            'original': value
          };
        case 'size':
          const convertedSizeValue = convertSizeValue(value);
          if (convertedSizeValue !== undefined) {
            return {
              '$type': 'size',
              '$value': convertedSizeValue.$value,
              '$unit': convertedSizeValue.$unit,
              'group': group || 'cds-undefined-size',
              'private': true,
              'original': value
            };
          } else {
            const unknownSizeToken = returnUnknownToken(value, `🚨 convertSizeValue: value is not in the expected format:`);
            return unknownSizeToken;
          }
        default:
          return {
            '$type': 'unknown',
            '$value': value,
            'group': group || 'cds-unknown-token',
            'private': true,
            'original': value
          };
        }
      } else {
        const unknownToken = returnUnknownToken(value, `🚨 convertObjectToDtcgFormat > recursivelyProcessObject: found key "${key}" with value of type "${typeof value}", not sure how to process it, will be converted to JSON.string:`);
        return unknownToken;
    }
  }
}

function convertDurationValue(value: string) {
  const match = value.match(/^(\d+)(s|ms)$/);
  if (match) {
    const $value = Number(match[1]);
    const $unit = match[2];
    return { $value, $unit };
  } else {
    return undefined;
  }
}

function convertSizeValue(value: string | number) {
  if (typeof value === 'string') {
    const match = value.match(/^([\d\.]+)(px|rem)$/);
    if (match) {
      const $value = Number(match[1]);
      const $unit = match[2];
      let returnValue;
      if ($unit === 'rem') {
        // we convert everything to px, because in HDS we use px (except for font sizes)
        returnValue = $value * baseFontSize;
      } else {
        returnValue = $value;
      }
      return { $value: returnValue, $unit: 'px' };
    } else {
      return undefined;
    }
  } else if (typeof value === 'number') {
    if (value === 0) {
      return { $value: 0, $unit: 'px' };
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
    'original': value
  };
}