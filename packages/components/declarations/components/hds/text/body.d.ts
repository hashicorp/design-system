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
export declare const AVAILABLE_SIZES: HdsTextSizeValues[];
export declare const DEFAULT_SIZE = HdsTextSizeValues.TwoHundred;
export declare const DEFAULT_WEIGHT = HdsTextWeightValues.Regular;
export type HdsTextBodyWeight = Extract<HdsTextWeights, 'regular' | 'medium' | 'semibold'>;
export declare const AVAILABLE_WEIGHTS_PER_SIZE: Record<HdsTextBodySizes, HdsTextBodyWeight[]>;
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
export default class HdsTextBodyComponent extends Component<HdsTextBodySignature> {
    /**
     * Sets the "size" for the text
     * Accepted values: see AVAILABLE_SIZES
     *
     * @param size
     * @type {HdsTextBodySizes}
     *
     */
    get size(): HdsTextBodySizes;
    /**
     * Sets the "weight" for the text
     * Accepted values: see AVAILABLE_WEIGHTS_PER_SIZE
     *
     * @param weight
     * @type {HdsTextWeights}
     *
     */
    get weight(): HdsTextWeights;
}
export {};
//# sourceMappingURL=body.d.ts.map