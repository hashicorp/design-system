/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsTextAligns, HdsTextColors, HdsTextGroups, HdsTextSizes, HdsTextTags, HdsTextWeights } from './types.ts';
export declare const COLORS: HdsTextColors[];
export declare const ALIGNS: HdsTextAligns[];
type AvailableElements = HTMLElementTagNameMap[keyof HTMLElementTagNameMap];
export interface HdsTextSignature {
    Args: {
        size: HdsTextSizes;
        tag?: HdsTextTags;
        weight?: HdsTextWeights;
        align?: HdsTextAligns;
        color?: HdsTextColors | string | undefined;
        group: HdsTextGroups;
    };
    Element: AvailableElements;
    Blocks: {
        default: [];
    };
}
export default class HdsText extends Component<HdsTextSignature> {
    get componentTag(): HdsTextTags;
    get variant(): string;
    get align(): HdsTextAligns | undefined;
    get predefinedColor(): HdsTextColors | undefined;
    get customColor(): string | undefined;
    get classNames(): string;
}
export {};
