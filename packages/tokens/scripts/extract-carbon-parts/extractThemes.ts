/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { themes, buttonTokens, contentSwitcherTokens, notificationTokens, statusTokens, tagTokens } from '@carbon/themes';

import { CarbonDesignToken } from './@types/CarbonDesignTokens.js';

import { modernRgbColorFormatRegex, convertModernRgbToRgba } from './convertModernRgbToRgba.ts';
import { convertObjectToDtcgFormat } from './convertObjectToDtcgFormat.ts';
import { saveCarbonDtcgTokensAsJsonFile } from './saveCarbonDtcgTokensAsJsonFile.ts';
import { dimensionRegex } from './convertObjectToDtcgFormat.ts';

export async function extractThemes(): Promise<void> {

  // button tokens
  const carbonThemesButtonTokensDtcg = convertObjectToDtcgFormat({ value: cleanupObj(buttonTokens), type: 'color', group: 'cds-themes' });
  await saveCarbonDtcgTokensAsJsonFile({ obj: carbonThemesButtonTokensDtcg, group: 'themes', file: 'button-tokens' });

  // context-switcher tokens
  const carbonThemesContentSwitcherTokensDtcg = convertObjectToDtcgFormat({ value: cleanupObj(contentSwitcherTokens), type: 'color', group: 'cds-themes' });
  await saveCarbonDtcgTokensAsJsonFile({ obj: carbonThemesContentSwitcherTokensDtcg, group: 'themes', file: 'context-switcher-tokens' });

  // notification tokens
  const carbonThemesNotificationTokensDtcg = convertObjectToDtcgFormat({ value: cleanupObj(notificationTokens), type: 'color', group: 'cds-themes' });
  await saveCarbonDtcgTokensAsJsonFile({ obj: carbonThemesNotificationTokensDtcg, group: 'themes', file: 'notification-tokens' });

  // status tokens
  const carbonThemesStatusTokensDtcg = convertObjectToDtcgFormat({ value: cleanupObj(statusTokens), type: 'color', group: 'cds-themes' });
  await saveCarbonDtcgTokensAsJsonFile({ obj: carbonThemesStatusTokensDtcg, group: 'themes', file: 'status-tokens' });

  // status tokens
  const carbonThemesTagTokensDtcg = convertObjectToDtcgFormat({ value: cleanupObj(tagTokens), type: 'color', group: 'cds-themes' });
  await saveCarbonDtcgTokensAsJsonFile({ obj: carbonThemesTagTokensDtcg, group: 'themes', file: 'tag-tokens' });

  // themes (this is a special case, )
  const carbonThemesAllTokensDtcg = convertThemeObjectToDtcg(cleanupObj(themes), '[root]');
  await saveCarbonDtcgTokensAsJsonFile({ obj: carbonThemesAllTokensDtcg, group: 'themes', file: 'themes' });

}

// function that recursively iterates on an object and
// - replaces any key named 'whiteTheme' with 'white'
// - converts `rgb(** ** ** / *%)` colors to the standard `rgba(**, **, **, 0.*)` format
// - removes "colorScheme" entries (irrelevant)
// - removes entries whose value is an array (`breakpoints`)

function cleanupObj(obj: Record<string, any>): Record<string, any> {
  // Base case: if obj is not an object or is null, return it as is
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  // For arrays, map over each element and process recursively
  if (Array.isArray(obj)) {
    return obj.map(item => cleanupObj(item));
  }

  // For objects, create a new object with potentially renamed keys
  const result: Record<string, any> = {};

  for (let [key, value] of Object.entries(obj)) {
    // Skip "colorScheme" entries
    if (key === "colorScheme") {
      continue;
    }

    // Skip entries whose value is an array
    if (Array.isArray(value)) {
      continue;
    }

    // Rename 'whiteTheme' key to 'white'
    if (key === 'whiteTheme') {
      key = 'white';
    }

    // replace `rgb(** ** ** / *%)` colors with `rgba(**, **, **, 0.*)`
    // note: the reason is that the current version `1.6.0` of TinyColor does not support this format
    // and it's used in the `color/css` transform in StyleDictionary, so the alpha value is ignored
    if (typeof value === 'string' && value.match(modernRgbColorFormatRegex)) {
      value = convertModernRgbToRgba(value);
    }

    // Recursively process nested objects
    result[key] = cleanupObj(value);
  }

  return result;
}

function convertThemeObjectToDtcg(obj: Record<string, any>, key: string) {
  if (typeof obj === 'object') {
    // it's an object, process all its keys
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        obj[key] = convertThemeObjectToDtcg(obj[key], key);
      }
    }
    return obj;
  } else {
    // it's a leaf, convert it
    return convertThemeValueToDtcg(obj, key);
  }
}

function convertThemeValueToDtcg(value: string | number, key: string) {
  let type;
  // first try inferring the type from known keys
  switch (key) {
    case 'fontFamily':
      type = 'font-family';
      break;
    case 'fontSize':
      type = 'font-size';
      break;
    case 'fontWeight':
      type = 'font-weight';
      break;
    case 'lineHeight':
      type = 'line-height';
      break;
    case 'letterSpacing':
      type = 'letter-spacing';
      break;
    default:
      // as fallback, try by looking if the value has a known format
      if (typeof value === 'string') {
        // check that is a known color or a known size format
        if (value.startsWith('#') || value.startsWith('rgb')) {
          type = 'color';
        } else if (value.match(dimensionRegex)) {
          type = 'dimension';
        } else {
          type = 'unknown';
          console.error(`⚠️ convertThemeValueToDtcg: found value for key "${key}" which is a string but not a color or a size`, key, value);
        }
      } else if (typeof value === 'number') {
        type = 'number';
      } else {
        console.error(`🚨 convertThemeValueToDtcg: found value for key "${key}" with unexpected type`, key, value);
        type = 'unknown';
      }
      break;
  }

  // we create a temporary token object and convert it to DTCG format
  const tempToken: CarbonDesignToken = { '$value': value };
  const tempTokenDtcg = convertObjectToDtcgFormat({ value: tempToken, type: type, group: 'cds-themes' })
  return tempTokenDtcg.$value;
}
