/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsInteractiveSignature } from '../interactive/';
import type { HdsIconSignature } from '../icon';
export declare const DEFAULT_SIZE = "medium";
export declare const DEFAULT_COLOR = "primary";
export declare const DEFAULT_ICONPOSITION = "leading";
export declare const SIZES: readonly ["small", "medium", "large"];
export declare const COLORS: readonly ["primary", "secondary", "tertiary", "critical"];
export declare const ICONPOSITIONS: readonly ["leading", "trailing"];
export type HdsButtonSize = (typeof SIZES)[number];
export type HdsButtonColor = (typeof COLORS)[number];
export type HdsButtonIconPosition = (typeof ICONPOSITIONS)[number];
export interface HdsButtonSignature {
    Args: HdsInteractiveSignature['Args'] & {
        size?: HdsButtonSize;
        color?: HdsButtonColor;
        text: string;
        icon?: HdsIconSignature['Args']['name'];
        iconPosition?: HdsButtonIconPosition;
        isIconOnly?: boolean;
        isFullWidth?: boolean;
        isInline?: boolean;
    };
    Element: HdsInteractiveSignature['Element'];
}
export default class HdsButton extends Component<HdsButtonSignature> {
    /**
     * @param text
     * @type {string}
     * @description The text of the button or value of `aria-label` if `isIconOnly` is set to `true`. If no text value is defined an error will be thrown.
     */
    get text(): string;
    /**
     * @param size
     * @type {string}
     * @default medium
     * @description The size of the button; acceptable values are `small`, `medium`, and `large`
     */
    get size(): "small" | "medium" | "large";
    /**
     * @param color
     * @type {string}
     * @default primary
     * @description Determines the color of button to be used; acceptable values are `primary`, `secondary`, and `critical`
     */
    get color(): "primary" | "critical" | "secondary" | "tertiary";
    get icon(): HdsIconSignature['Args']['name'] | undefined;
    /**
     * @param isIconOnly
     * @type {boolean}
     * @default false
     * @description Indicates if the button will only contain an icon; component will also ensure that accessible text is still applied to the component.
     */
    get isIconOnly(): boolean;
    /**
     * @param iconPosition
     * @type {string}
     * @default leading
     * @description Positions the icon before or after the text; allowed values are `leading` or `trailing`
     */
    get iconPosition(): "leading" | "trailing";
    /**
     * @param iconSize
     * @type {string}
     * @default 16
     * @description ensures that the correct icon size is used. Automatically calculated.
     */
    get iconSize(): "16" | "24";
    /**
     * @param isFullWidth
     * @type {boolean}
     * @default false
     * @description Indicates that a button should take up the full width of the parent container. The default is false.
     */
    get isFullWidth(): boolean;
    /**
     * Get the class names to apply to the component.
     * @method Button#classNames
     * @return {string} The "class" attribute to apply to the component.
     */
    get classNames(): string;
}
//# sourceMappingURL=index.d.ts.map