/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { HdsBadgeCountColorValues, HdsBadgeCountSizeValues, HdsBadgeCountTypeValues } from './types.ts';
import type { HdsBadgeCountColors, HdsBadgeCountSizes, HdsBadgeCountTypes } from './types.ts';
export declare const SIZES: string[];
export declare const TYPES: string[];
export declare const COLORS: string[];
export declare const DEFAULT_SIZE = HdsBadgeCountSizeValues.Medium;
export declare const DEFAULT_TYPE = HdsBadgeCountTypeValues.Filled;
export declare const DEFAULT_COLOR = HdsBadgeCountColorValues.Neutral;
export interface HdsBadgeCountSignature {
    Args: {
        size?: HdsBadgeCountSizes;
        type?: HdsBadgeCountTypes;
        color?: HdsBadgeCountColors;
        text: string | number;
    };
    Element: HTMLDivElement;
}
export default class HdsBadgeCount extends Component<HdsBadgeCountSignature> {
    /**
     * Sets the size for the component
     * Accepted sizes: small, medium, large
     *
     * @param size
     * @type {string}
     * @default 'medium'
     */
    get size(): HdsBadgeCountSizes;
    /**
     * Sets the type of the component
     * Accepted values: filled, inverted, outlined
     *
     * @param type
     * @type {string}
     * @default 'filled'
     */
    get type(): HdsBadgeCountTypes;
    /**
     * Sets the color scheme for the component
     * Accepted colors: neutral, neutral-dark-mode
     *
     * @param color
     * @type {string}
     * @default 'neutral'
     */
    get color(): HdsBadgeCountColors;
    /**
     * Get the class names to apply to the component.
     * @method BadgeCount#classNames
     * @return {string} The "class" attribute to apply to the component.
     */
    get classNames(): string;
}
//# sourceMappingURL=index.d.ts.map