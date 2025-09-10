/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import fs from 'fs-extra';

import { durationFast01, durationFast02, durationModerate01, durationModerate02, durationSlow01, durationSlow02, easings as carbonEasings } from '@carbon/motion';

import { convertObjectToDtcgFormat } from './convertObjectToDtcgFormat.ts';

export async function extractMotion(destinationCarbonFolder: string): Promise<void> {

  const destFolderPath = `${destinationCarbonFolder}/motion`;
  const destFilePath = `${destFolderPath}/motion.json`;

  // we artificially build a custom object to pass to the converter (much easier than writing custom logic for this)

  const carbonMotion = {
    'duration': {
      'slow': {
        '01': durationSlow01,
        '02': durationSlow02,
      },
      'moderate': {
        '01': durationModerate01,
        '02': durationModerate02,
      },
      'fast': {
        '01': durationFast01,
        '02': durationFast02,
      }
    }
  }

  const carbonMotionDurationDtcg = convertObjectToDtcgFormat({ value: carbonMotion, type: 'duration', group: 'cds-motion' });
  const carbonMotionEasingsDtcg = convertObjectToDtcgFormat({ value: carbonEasings, type: 'cubic-bezier', group: 'cds-motion' });
  const destContent = {
    carbon: {
      motion: {
        ...carbonMotionDurationDtcg,
        ...carbonMotionEasingsDtcg
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
