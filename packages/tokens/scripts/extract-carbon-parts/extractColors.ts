/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { colors } from '@carbon/colors';

import { convertObjectToDtcgFormat } from './convertObjectToDtcgFormat.ts';
import { saveCarbonDtcgTokensAsJsonFile } from './saveCarbonDtcgTokensAsJsonFile.ts';

export async function extractColors(): Promise<void> {

  const carbonColorsDtcg = convertObjectToDtcgFormat({ value: colors, type: 'color', group: 'cds-colors' });
  await saveCarbonDtcgTokensAsJsonFile({ obj: carbonColorsDtcg, group: 'color', file: 'colors' });

}
