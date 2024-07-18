/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { HdsTextSizeValues } from './types.ts';
import type { HdsTextAligns, HdsTextColors, HdsTextSizes, HdsTextTags, HdsTextWeights } from './types.ts';
export declare const DEFAULT_SIZE = HdsTextSizeValues.TwoHundred;
export declare const AVAILABLE_SIZES: (string | HdsTextSizeValues)[];
export type HdsTextDisplayWeight = Extract<HdsTextWeights, 'medium' | 'semibold' | 'bold'>;
export declare const DEFAULT_WEIGHTS_PER_SIZE: Record<HdsTextSizeValues, HdsTextDisplayWeight>;
export declare const AVAILABLE_WEIGHTS_PER_SIZE: Record<HdsTextSizes, HdsTextDisplayWeight[]>;
export interface HdsTextDisplaySignature {
    Args: {
        size?: HdsTextSizes;
        tag?: HdsTextTags;
        weight?: HdsTextDisplayWeight;
        align?: HdsTextAligns;
        color?: string | HdsTextColors;
    };
    Element: HTMLSpanElement | HTMLHeadingElement | HTMLParagraphElement | HTMLDivElement;
    Blocks: {
        default: [];
    };
}
export default class HdsTextDisplayComponent extends Component<HdsTextDisplaySignature> {
    /**
     * Sets the "size" for the text
     * Accepted values: see AVAILABLE_SIZES
     *
     * @type {HdsTextSizes}
     *
     * @param size
     */
    get size(): HdsTextSizes;
    /**
     * Sets the "weight" for the text
     * Accepted values: see AVAILABLE_WEIGHTS_PER_SIZE
     *
     * @type {HdsTextDisplayWeight}
     *
     * @param variant
     */
    get weight(): HdsTextDisplayWeight;
}
//# sourceMappingURL=display.d.ts.map