/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { HdsBadgeColorValues, HdsBadgeSizeValues, HdsBadgeTypeValues } from './types.ts';
import type { HdsBadgeColors, HdsBadgeSizes, HdsBadgeTypes } from './types.ts';
import type { FlightIconSignature } from '@hashicorp/ember-flight-icons/components/flight-icon';
export declare const SIZES: string[];
export declare const TYPES: string[];
export declare const COLORS: string[];
export declare const DEFAULT_SIZE = HdsBadgeSizeValues.Medium;
export declare const DEFAULT_TYPE = HdsBadgeTypeValues.Filled;
export declare const DEFAULT_COLOR = HdsBadgeColorValues.Neutral;
export interface HdsBadgeSignature {
    Args: {
        size?: HdsBadgeSizes;
        type?: HdsBadgeTypes;
        color?: HdsBadgeColors;
        text: string;
        icon?: FlightIconSignature['Args']['name'];
        isIconOnly?: boolean;
    };
    Element: HTMLDivElement;
}
export default class HdsBadgeComponent extends Component<HdsBadgeSignature> {
    /**
     * Sets the size for the component
     * Accepted values: small, medium, large
     *
     * @param size
     * @type {HdsBadgeSizes}
     * @default 'medium'
     */
    get size(): HdsBadgeSizes;
    /**
     * Sets the type of the component
     * Accepted values: filled, inverted, outlined
     *
     * @param type
     * @type {HdsBadgeTypes}
     * @default 'filled'
     */
    get type(): HdsBadgeTypes;
    /**
     * Sets the color scheme for the component
     * Accepted values: neutral, neutral-dark-mode, highlight, success, warning, critical
     *
     * @param color
     * @type {HdsBadgeColors}
     * @default 'neutral'
     */
    get color(): HdsBadgeColors;
    /**
     * @param text
     * @type {string}
     * @description The text of the badge. If `isIconOnly` is set to `true`, the text will be visually hidden but still available to assistive technology. If no text value is defined, an error will be thrown.
     */
    get text(): string;
    /**
     * Sets the icon name if there is one
     *
     * @param icon
     * @type {string|null}
     * @default null
     */
    get icon(): FlightIconSignature['Args']['name'] | null;
    /**
     * @param isIconOnly
     * @type {boolean}
     * @default false
     * @description Indicates if the badge will only contain an icon; component will also ensure that accessible text is still applied to the component.
     */
    get isIconOnly(): boolean;
    /**
     * Get the class names to apply to the component.
     * @method Badge#classNames
     * @return {string} The "class" attribute to apply to the component.
     */
    get classNames(): string;
}
//# sourceMappingURL=index.d.ts.map