/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { HdsTextSizeValues } from './types.ts';
import type { HdsTextAligns, HdsTextColors, HdsTextSizes, HdsTextTags, HdsTextWeights } from './types.ts';
export declare const DEFAULT_SIZE = HdsTextSizeValues.TwoHundred;
export declare const SIZES: HdsTextSizes[];
export type HdsTextDisplayWeight = Extract<HdsTextWeights, 'medium' | 'semibold' | 'bold'>;
export declare const DEFAULT_WEIGHTS_PER_SIZE: Record<HdsTextSizeValues, HdsTextDisplayWeight>;
export declare const WEIGHTS_PER_SIZE: Record<HdsTextSizes, HdsTextDisplayWeight[]>;
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
export default class HdsTextDisplay extends Component<HdsTextDisplaySignature> {
    get size(): HdsTextSizes;
    get weight(): HdsTextDisplayWeight;
}
