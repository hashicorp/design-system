/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { fontFamilies, fontWeights, scale, styles } from '@carbon/type';

import { convertObjectToDtcgFormat } from './convertObjectToDtcgFormat.ts';
import { saveCarbonDtcgTokensAsJsonFile } from './saveCarbonDtcgTokensAsJsonFile.ts';

type CarbonStyle = {
  fontFamily?: string;
  fontSize: string;
  fontWeight: number;
  lineHeight: number;
  letterSpacing: string | number;
  breakpoints?: Record<string, unknown>;
};

type CarbonStyles = Record<string, CarbonStyle>;

type MergedStyle = {
  'font-family'?: string;
  'font-size': string;
  'font-weight': number;
  'line-height': number;
  'letter-spacing': string | number;
};

export async function extractTypography(): Promise<void> {

  // we artificially build a custom object to pass to the converter (much easier than writing custom logic for this)

  const carbonTypographyFontFamilies = {
    'font-family': {
      ...fontFamilies
    }
  };

  const carbonTypographyFontWeights = {
    'font-weight': {
      ...fontWeights
    }
  };

  // for details see: https://github.com/carbon-design-system/carbon/blob/main/packages/type/src/scale.js
  const carbonTypographyScale = {
    'scale': scale.reduce((acc: Record<string, number>, value: number) => {
      acc[value] = value;
      return acc;
    }, {})
  };

  // we break down the font styles in their individual types, and we will merge them back later
  const carbonTypographyStylesEntries = {
    fontFamily: {} as Record<string, CarbonStyle['fontFamily']>,
    fontSize: {} as Record<string, CarbonStyle['fontSize']>,
    fontWeight: {} as Record<string, CarbonStyle['fontWeight']>,
    lineHeight: {} as Record<string, CarbonStyle['lineHeight']>,
    letterSpacing: {} as Record<string, CarbonStyle['letterSpacing']>,
  };

  Object.entries(styles as CarbonStyles).forEach(([styleName, styleObj]: [string, CarbonStyle]) => {
    Object.entries(styleObj).forEach(([key, value]) => {
      // at the moment we're not interested in responsive typography
      if (key !== 'breakpoints') {
        // Type assertion to ensure key is one of the expected keys
        (carbonTypographyStylesEntries as any)[key][styleName] = value;
      }
    });
  });

  // font family
  const carbonTypographyFontFamiliesDtcg = convertObjectToDtcgFormat({ value: carbonTypographyFontFamilies, type: 'font-family', group: 'cds-typography' });
  await saveCarbonDtcgTokensAsJsonFile({ obj: carbonTypographyFontFamiliesDtcg, group: 'typography', file: 'font-families' });

  // font weights
  const carbonTypographyFontWeightsDtcg = convertObjectToDtcgFormat({ value: carbonTypographyFontWeights, type: 'font-weight', group: 'cds-typography' });
  await saveCarbonDtcgTokensAsJsonFile({ obj: carbonTypographyFontWeightsDtcg, group: 'typography', file: 'font-weights' });

  // typographic scale
  const carbonTypographyScaleDtcg = convertObjectToDtcgFormat({ value: carbonTypographyScale, type: 'number', group: 'cds-typography' });
  await saveCarbonDtcgTokensAsJsonFile({ obj: carbonTypographyScaleDtcg, group: 'typography', file: 'scale' });

  // typographic styles
  const carbonTypographyStylesFontFamilyDtcg = convertObjectToDtcgFormat({ value: carbonTypographyStylesEntries.fontFamily, type: 'font-family', group: 'cds-typography' });
  const carbonTypographyStylesFontSizeDtcg = convertObjectToDtcgFormat({ value: carbonTypographyStylesEntries.fontSize, type: 'font-size', group: 'cds-typography' });
  const carbonTypographyStylesFontWeightDtcg = convertObjectToDtcgFormat({ value: carbonTypographyStylesEntries.fontWeight, type: 'font-weight', group: 'cds-typography' });
  const carbonTypographyStylesLineHeightDtcg = convertObjectToDtcgFormat({ value: carbonTypographyStylesEntries.lineHeight, type: 'line-height', group: 'cds-typography' });
  const carbonTypographyStylesLetterSpacingDtcg = convertObjectToDtcgFormat({ value: carbonTypographyStylesEntries.letterSpacing, type: 'letter-spacing', group: 'cds-typography' });
  const carbonTypographyStyle = mergeCarbonTypographyStyles(carbonTypographyStylesFontFamilyDtcg, carbonTypographyStylesFontSizeDtcg, carbonTypographyStylesFontWeightDtcg, carbonTypographyStylesLineHeightDtcg, carbonTypographyStylesLetterSpacingDtcg);
  await saveCarbonDtcgTokensAsJsonFile({ obj: carbonTypographyStyle, group: 'typography', file: 'styles' });

}

function mergeCarbonTypographyStyles(
  fontFamily: Record<string, CarbonStyle['fontFamily']>,
  fontSize: Record<string, CarbonStyle['fontSize']>,
  fontWeight: Record<string, CarbonStyle['fontWeight']>,
  lineHeight: Record<string, CarbonStyle['lineHeight']>,
  letterSpacing: Record<string, CarbonStyle['letterSpacing']>
): Record<string, Partial<MergedStyle>> {

  const styleNamesUnion: string[] = [
    ...Object.keys(fontFamily),
    ...Object.keys(fontSize),
    ...Object.keys(fontWeight),
    ...Object.keys(lineHeight),
    ...Object.keys(letterSpacing),
  ];
  const styleNames = [...new Set(styleNamesUnion)].sort();

  const mergedStyles: Record<string, Partial<MergedStyle>> = {};

  styleNames.forEach(styleName => {
    mergedStyles[styleName] = {};
    if (fontFamily[styleName]) {
      mergedStyles[styleName]['font-family'] = fontFamily[styleName];
    }
    if (fontSize[styleName]) {
      mergedStyles[styleName]['font-size'] = fontSize[styleName];
    }
    if (fontWeight[styleName]) {
      mergedStyles[styleName]['font-weight'] = fontWeight[styleName];
    }
    if (lineHeight[styleName]) {
      mergedStyles[styleName]['line-height'] = lineHeight[styleName];
    }
    if (letterSpacing[styleName]) {
      mergedStyles[styleName]['letter-spacing'] = letterSpacing[styleName];
    }
  });

  return mergedStyles;
}
