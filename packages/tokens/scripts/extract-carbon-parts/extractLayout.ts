/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import fs from 'fs-extra';

import { baseFontSize, breakpoints, container01, container02, container03, container04, container05, iconSize01, iconSize02, miniUnit, sizes as carbonSizes, spacing01, spacing02, spacing03, spacing04, spacing05, spacing06, spacing07, spacing08, spacing09, spacing10, spacing11, spacing12, spacing13 } from '@carbon/layout';

import { convertObjectToDtcgFormat } from './convertObjectToDtcgFormat.ts';

export async function extractLayout(destinationCarbonFolder: string): Promise<void> {

  const destFolderPath = `${destinationCarbonFolder}/layout`;
  const destFilePath = `${destFolderPath}/layout.json`;

  // we artificially build a custom object to pass to the converter (much easier than writing custom logic for this)

  const carbonLayoutBaseUnits = {
    'base-unit': {
      'baseFontSize': baseFontSize,
      'miniUnit': miniUnit,
    }
  };

  const carbonLayoutSpacing = {
    'spacing': {
      '01': spacing01,
      '02': spacing02,
      '03': spacing03,
      '04': spacing04,
      '05': spacing05,
      '06': spacing06,
      '07': spacing07,
      '08': spacing08,
      '09': spacing09,
      '10': spacing10,
      '11': spacing11,
      '12': spacing12,
      '13': spacing13,
    }
  };

  const carbonLayoutIconSizes = {
    'icon-size': {
      '01': iconSize01,
      '02': iconSize02,
    }
  };

  // TODO investigate with the Carbon team what this set of tokens is used for
  const carbonLayoutContainer = {
    'container': {
      '01': container01,
      '02': container02,
      '03': container03,
      '04': container04,
      '05': container05,
    }
  };

  const carbonLayoutBreakpoints = {
    'breakpoints': {
      'sm': breakpoints.sm.width,
      'md': breakpoints.md.width,
      'lg': breakpoints.lg.width,
      'xlg': breakpoints.xlg.width,
      'max': breakpoints.max.width,
    }
  };

  const carbonLayoutBaseUnitsDtcg = convertObjectToDtcgFormat({ value: carbonLayoutBaseUnits, type: 'number', group: 'cds-layout' });
  const carbonLayoutSpacingDtcg = convertObjectToDtcgFormat({ value: carbonLayoutSpacing, type: 'size', group: 'cds-layout' });
  const carbonSizesDtcg = convertObjectToDtcgFormat({ value: carbonSizes, type: 'size', group: 'cds-layout' });
  const carbonIconSizesDtcg = convertObjectToDtcgFormat({ value: carbonLayoutIconSizes, type: 'size', group: 'cds-layout' });
  const carbonContainerDtcg = convertObjectToDtcgFormat({ value: carbonLayoutContainer, type: 'size', group: 'cds-layout' });
  const carbonBreakpointsDtcg = convertObjectToDtcgFormat({ value: carbonLayoutBreakpoints, type: 'size', group: 'cds-layout' });
  const destContent = {
    carbon: {
      layout: {
        ...carbonLayoutBaseUnitsDtcg,
        ...carbonLayoutSpacingDtcg,
        ...carbonSizesDtcg,
        ...carbonIconSizesDtcg,
        ...carbonContainerDtcg,
        ...carbonBreakpointsDtcg,
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
