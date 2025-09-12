/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { themes, buttonTokens, contentSwitcherTokens, notificationTokens, statusTokens, tagTokens } from '@carbon/themes';

import { convertObjectToDtcgFormat } from './convertObjectToDtcgFormat.ts';
import { saveCarbonDtcgTokensAsJsonFile } from './saveCarbonDtcgTokensAsJsonFile.ts';

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

}

// function that recursively replaces any key named 'whiteTheme' with 'white' in an object
// (name is generic so in the future can be expanded if needed)

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

  for (const [key, value] of Object.entries(obj)) {
    const newKey = key === 'whiteTheme' ? 'white' : key;
    result[newKey] = cleanupObj(value);
  }

  return result;
}
