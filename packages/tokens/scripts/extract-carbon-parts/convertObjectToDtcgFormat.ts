/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */


type Args = { key?: string, value: Record<string, any>; group?: string };

// inspired by: https://github.com/didoo/style-dictionary/blob/main/types/DesignToken.ts
interface CarbonDesignToken {
  $value?: any;
  $type?: string;
  group?: string;
  private?: boolean;
}
interface CarbonDesignTokens {
  [key: string]: CarbonDesignToken | CarbonDesignToken | string | undefined;
}

export function convertObjectToDtcgFormat({ value, group }: Args): CarbonDesignTokens | CarbonDesignToken {
  return recursivelyProcessObject({ value, group });
}

function recursivelyProcessObject({ key, value, group}: Args): CarbonDesignTokens | CarbonDesignToken | Record<string, any> {
  if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
    // recursively process each key
    const result: Record<string, any> = {};
    for (const key in value) {
      // for better safety (says Copilot)
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        result[key] = recursivelyProcessObject({ key, value: value[key] });
      }
    }
    return result;
  } else {
    let returnValue;
    // this is a leaf with a string value => convert to DTCG format
    if (typeof value === 'string') {
      returnValue = value;
    } else {
      returnValue = JSON.stringify(value, null, 2);
      console.error(`🚨 convertObjectToDtcgFormat > recursivelyProcessObject: found key "${key}" with value of type "${typeof value}", not sure how to process it, will be converted to JSON.string: ${returnValue}.\n`);
    }
    return {
      '$type': 'color',
      '$value': returnValue,
      'group': group || 'cds-token',
      'private': true
    };
  }
}
