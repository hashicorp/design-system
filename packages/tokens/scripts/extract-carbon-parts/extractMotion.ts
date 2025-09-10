/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { durationFast01, durationFast02, durationModerate01, durationModerate02, durationSlow01, durationSlow02, easings } from '@carbon/motion';

import { convertObjectToDtcgFormat } from './convertObjectToDtcgFormat.ts';
import { saveCarbonDtcgTokensAsJsonFile } from './saveCarbonDtcgTokensAsJsonFile.ts';

export async function extractMotion(): Promise<void> {

  // we artificially build a custom object to pass to the converter (much easier than writing custom logic for this)
  const carbonMotionDurations = {
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
  };

  const carbonMotionEasings = {
    'easing': {
      ...easings,
    }
  }

  // durations
  const carbonMotionDurationsDtcg = convertObjectToDtcgFormat({ value: carbonMotionDurations, type: 'duration', group: 'cds-motion' });
  await saveCarbonDtcgTokensAsJsonFile({ obj: carbonMotionDurationsDtcg, group: 'motion', file: 'durations' });

  // easings
  const carbonMotionEasingsDtcg = convertObjectToDtcgFormat({ value: carbonMotionEasings, type: 'cubic-bezier', group: 'cds-motion' });
  await saveCarbonDtcgTokensAsJsonFile({ obj: carbonMotionEasingsDtcg, group: 'motion', file: 'easings' });
}
