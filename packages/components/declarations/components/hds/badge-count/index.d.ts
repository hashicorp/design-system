/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { HdsBadgeCountColorValues, HdsBadgeCountSizeValues, HdsBadgeCountTypeValues } from './types.ts';
import type { HdsBadgeCountColors, HdsBadgeSizes, HdsBadgeTypes } from './types.ts';
export declare const SIZES: string[];
export declare const TYPES: string[];
export declare const COLORS: string[];
export declare const DEFAULT_SIZE = HdsBadgeCountSizeValues.Medium;
export declare const DEFAULT_TYPE = HdsBadgeCountTypeValues.Filled;
export declare const DEFAULT_COLOR = HdsBadgeCountColorValues.Neutral;
interface HdsBadgeCountSignature {
    Args: {
        size?: HdsBadgeSizes;
        type?: HdsBadgeTypes;
        color?: HdsBadgeCountColors;
        text: string;
    };
    Element: HTMLDivElement;
}
export default class HdsBadgeCountComponent extends Component<HdsBadgeCountSignature> {
    /**
     * Sets the size for the component
     * Accepted sizes: small, medium, large
     *
     * @param size
     * @type {string}
     * @default 'medium'
     */
    get size(): "small" | "medium" | "large" | HdsBadgeCountSizeValues.Medium;
    /**
     * Sets the type of the component
     * Accepted values: filled, inverted, outlined
     *
     * @param type
     * @type {string}
     * @default 'filled'
     */
    get type(): "filled" | "inverted" | "outlined" | HdsBadgeCountTypeValues.Filled;
    /**
     * Sets the color scheme for the component
     * Accepted colors: neutral, neutral-dark-mode
     *
     * @param color
     * @type {string}
     * @default 'neutral'
     */
    get color(): "neutral" | "neutral-dark-mode" | HdsBadgeCountColorValues.Neutral;
    /**
     * Get the class names to apply to the component.
     * @method BadgeCount#classNames
     * @return {string} The "class" attribute to apply to the component.
     */
    get classNames(): string;
}
export {};
//# sourceMappingURL=index.d.ts.map