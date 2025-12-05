/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { baseFontSize, breakpoints, container01, container02, container03, container04, container05, iconSize01, iconSize02, miniUnit, sizes, spacing01, spacing02, spacing03, spacing04, spacing05, spacing06, spacing07, spacing08, spacing09, spacing10, spacing11, spacing12, spacing13 } from '@carbon/layout';

import { convertObjectToDtcgFormat } from './convertObjectToDtcgFormat.ts';
import { saveCarbonDtcgTokensAsJsonFile } from './saveCarbonDtcgTokensAsJsonFile.ts';

export async function extractLayout(): Promise<void> {

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

  const carbonLayoutSizes = {
    'size': {
      ...sizes
    }
  };

  const carbonLayoutIconSizes = {
    'icon-size': {
      '01': iconSize01,
      '02': iconSize02,
    }
  };

  // TODO investigate with the Carbon team what this set of tokens is used for
  const carbonLayoutContainers = {
    'container': {
      '01': container01,
      '02': container02,
      '03': container03,
      '04': container04,
      '05': container05,
    }
  };

  const carbonLayoutBreakpoints = {
    'breakpoint': {
      'sm': breakpoints.sm.width,
      'md': breakpoints.md.width,
      'lg': breakpoints.lg.width,
      'xlg': breakpoints.xlg.width,
      'max': breakpoints.max.width,
    }
  };

  // base units
  const carbonLayoutBaseUnitsDtcg = convertObjectToDtcgFormat({ value: carbonLayoutBaseUnits, type: 'number', group: 'cds-layout' });
  await saveCarbonDtcgTokensAsJsonFile({ obj: carbonLayoutBaseUnitsDtcg, group: 'layout', file: 'base-units' });

  // spacing
  const carbonLayoutSpacingDtcg = convertObjectToDtcgFormat({ value: carbonLayoutSpacing, type: 'dimension', group: 'cds-layout' });
  await saveCarbonDtcgTokensAsJsonFile({ obj: carbonLayoutSpacingDtcg, group: 'layout', file: 'spacing' });

  // sizes
  const carbonLayoutSizesDtcg = convertObjectToDtcgFormat({ value: carbonLayoutSizes, type: 'dimension', group: 'cds-layout' });
  await saveCarbonDtcgTokensAsJsonFile({ obj: carbonLayoutSizesDtcg, group: 'layout', file: 'sizes' });

  // icon sizes
  const carbonLayoutIconSizesDtcg = convertObjectToDtcgFormat({ value: carbonLayoutIconSizes, type: 'dimension', group: 'cds-layout' });
  await saveCarbonDtcgTokensAsJsonFile({ obj: carbonLayoutIconSizesDtcg, group: 'layout', file: 'icon-sizes' });

  // container
  const carbonLayoutContainersDtcg = convertObjectToDtcgFormat({ value: carbonLayoutContainers, type: 'dimension', group: 'cds-layout' });
  await saveCarbonDtcgTokensAsJsonFile({ obj: carbonLayoutContainersDtcg, group: 'layout', file: 'containers' });

  // breakpoints
  const carbonLayoutBreakpointsDtcg = convertObjectToDtcgFormat({ value: carbonLayoutBreakpoints, type: 'dimension', group: 'cds-layout' });
  await saveCarbonDtcgTokensAsJsonFile({ obj: carbonLayoutBreakpointsDtcg, group: 'layout', file: 'breakpoints' });

}
