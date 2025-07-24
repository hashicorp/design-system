/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { HdsTextSizeValues, HdsTextWeightValues } from './types.ts';
import type { HdsTextAligns, HdsTextColors, HdsTextTags, HdsTextWeights } from './types.ts';
type HdsTextBodySizeNumber = Extract<HdsTextSizeValues, HdsTextSizeValues.OneHundred | HdsTextSizeValues.TwoHundred | HdsTextSizeValues.ThreeHundred>;
type HdsTextBodySizeString = `${HdsTextBodySizeNumber}`;
export type HdsTextBodySizes = HdsTextBodySizeNumber | HdsTextBodySizeString;
export declare const SIZES: HdsTextBodySizes[];
export declare const DEFAULT_SIZE = HdsTextSizeValues.TwoHundred;
export declare const DEFAULT_WEIGHT = HdsTextWeightValues.Regular;
export type HdsTextBodyWeight = Extract<HdsTextWeights, 'regular' | 'medium' | 'semibold'>;
export declare const WEIGHTS_PER_SIZE: Record<HdsTextBodySizes, HdsTextBodyWeight[]>;
export interface HdsTextBodySignature {
    Args: {
        size?: HdsTextBodySizes;
        tag?: HdsTextTags;
        weight?: HdsTextBodyWeight;
        align?: HdsTextAligns;
        color?: string | HdsTextColors;
    };
    Element: HTMLSpanElement | HTMLHeadingElement | HTMLParagraphElement | HTMLDivElement;
    Blocks: {
        default: [];
    };
}
export default class HdsTextBody extends Component<HdsTextBodySignature> {
    get size(): HdsTextBodySizes;
    get weight(): HdsTextWeights;
}
export {};
