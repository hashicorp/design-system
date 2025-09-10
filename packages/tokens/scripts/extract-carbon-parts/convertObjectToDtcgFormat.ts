/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */


type Args = { key?: string, value: Record<string, any>; type: string; group?: string };

import { CarbonDesignTokens, CarbonDesignToken } from './@types/CarbonDesignTokens.d.ts'

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
    // this is a leaf with a string value => convert to DTCG format
    if (typeof value === 'string') {
      switch (type) {
        case 'color':
          return {
            '$type': 'color',
            '$value': value,
            'group': group || 'cds-undefined-color',
            'private': true
          };
        case 'duration':
          const { $value, $unit } = convertDurationValue(value);
          return {
            '$type': 'duration',
            '$value': $value,
            '$unit': $unit,
            'group': group || 'cds-undefined-duration',
            'private': true
          };
        case 'cubic-bezier':
          return {
            // TODO convert to `cubicBezier` per DTCG specificagtions when we are sure that Style Dictionary process it correctly
            // see: https://www.designtokens.org/tr/drafts/format/#cubic-bezier
            '$type': 'cubic-bezier',
            '$value': value,
            'group': group || 'cds-undefined-cubic-bezier',
            'private': true
          };
        default:
          return {
            '$type': 'unknown',
            '$value': value,
            'group': group || 'cds-unknown-token',
            'private': true
          };
        }
        } else {
          const returnValue = JSON.stringify(value, null, 2);
          console.error(`🚨 convertObjectToDtcgFormat > recursivelyProcessObject: found key "${key}" with value of type "${typeof value}", not sure how to process it, will be converted to JSON.string: ${returnValue}.\n`);
          return {
            '$type': 'unknown',
            '$value': returnValue,
            'group': group || 'cds-unknown-token',
            'private': true
          };
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
    return { $value: '0', $unit: 's' };
  }
}
