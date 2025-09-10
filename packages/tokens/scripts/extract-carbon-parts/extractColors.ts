/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import fs from 'fs-extra';

import { colors as carbonColors } from '@carbon/colors';

import { convertObjectToDtcgFormat } from './convertObjectToDtcgFormat.ts';

export async function extractColors(destinationCarbonFolder: string): Promise<void> {

  const destFolderPath = `${destinationCarbonFolder}/colors`;
  const destFilePath = `${destFolderPath}/colors.json`;

  const carbonColorsDtcg = convertObjectToDtcgFormat({ value: carbonColors, type: 'color', group: 'cds-colors' });
  const destContent = {
    carbon: {
      color: {
        ...carbonColorsDtcg,
      }
    }
  };

  try {
    fs.ensureDirSync(destFolderPath);
    fs.writeJsonSync(destFilePath, destContent, { spaces: 2 });
    console.log(`Saved "${destFilePath}" file`);
  } catch (err) {
      console.error(err);
  }
}
