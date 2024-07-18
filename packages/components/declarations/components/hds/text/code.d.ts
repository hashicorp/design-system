/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { HdsTextSizeValues, HdsTextWeightValues } from './types.ts';
import type { HdsTextAligns, HdsTextColors, HdsTextTags, HdsTextWeights } from './types.ts';
type HdsTextCodeSizeNumber = Extract<HdsTextSizeValues, HdsTextSizeValues.OneHundred | HdsTextSizeValues.TwoHundred | HdsTextSizeValues.ThreeHundred>;
type HdsTextCodeSizeString = `${HdsTextCodeSizeNumber}`;
export type HdsTextCodeSizes = HdsTextCodeSizeNumber | HdsTextCodeSizeString;
export declare const AVAILABLE_SIZES: HdsTextSizeValues[];
export declare const DEFAULT_SIZE = HdsTextSizeValues.TwoHundred;
export declare const DEFAULT_WEIGHT = HdsTextWeightValues.Regular;
export type HdsTextCodeWeight = Extract<HdsTextWeights, 'regular' | 'bold'>;
export declare const AVAILABLE_WEIGHTS_PER_SIZE: Record<HdsTextCodeSizes, HdsTextCodeWeight[]>;
export interface HdsTextCodeSignature {
    Args: {
        size?: HdsTextCodeSizes;
        tag?: HdsTextTags;
        weight?: HdsTextCodeWeight;
        align?: HdsTextAligns;
        color?: string | HdsTextColors;
    };
    Element: HTMLSpanElement | HTMLHeadingElement | HTMLParagraphElement | HTMLDivElement;
    Blocks: {
        default: [];
    };
}
export default class HdsTextCodeComponent extends Component<HdsTextCodeSignature> {
    /**
     * Sets the "size" for the text
     * Accepted values: see AVAILABLE_SIZES
     *
     * @type {HdsTextCodeSizes}
     *
     * @param size
     */
    get size(): HdsTextCodeSizes;
    /**
     * Sets the "weight" for the text
     * Accepted values: see AVAILABLE_WEIGHTS_PER_SIZE
     *
     * @type {string}
     *
     * @param variant
     */
    get weight(): HdsTextCodeWeight;
}
export {};
//# sourceMappingURL=code.d.ts.map