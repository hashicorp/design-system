/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsTextAligns, HdsTextColors, HdsTextGroups, HdsTextSizes, HdsTextTags, HdsTextWeights } from './types.ts';
export declare const AVAILABLE_COLORS: string[];
export declare const AVAILABLE_ALIGNS: string[];
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
export default class HdsTextComponent extends Component<HdsTextSignature> {
    /**
     * Get a tag to render based on the `@tag` argument passed or the value of `this.size` (via mapping)
     *
     * @method #componentTag
     * @return {HdsTextTags} The html tag to use in the dynamic render of the component
     */
    get componentTag(): HdsTextTags;
    /**
     * Sets the "variant" (style) for the text
     * Accepted values: see AVAILABLE_VARIANTS
     *
     * @param variant
     * @type {string}
     */
    get variant(): string;
    /**
     * Sets the alignment of the text
     * Accepted values: see AVAILABLE_ALIGNS
     *
     * @param align
     * @type {HdsTextAligns}
     */
    get align(): HdsTextAligns | undefined;
    /**
     * Sets the color of the text as pre-defined value
     * Accepted values: see AVAILABLE_COLORS
     *
     * @param color
     * @type {HdsTextColors}
     */
    get predefinedColor(): HdsTextColors | undefined;
    /**
     * Sets the color of the text as custom value (via inline style)
     *
     * @param color
     * @type {string}
     */
    get customColor(): string | undefined;
    /**
     * Get the class names to apply to the component.
     * @method #classNames
     * @return {string} The "class" attribute to apply to the component.
     */
    get classNames(): string;
}
export {};
//# sourceMappingURL=index.d.ts.map