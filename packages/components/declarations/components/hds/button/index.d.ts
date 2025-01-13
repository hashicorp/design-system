/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { HdsButtonSizeValues, HdsButtonColorValues, HdsButtonIconPositionValues } from './types.ts';
import type { HdsButtonSizes, HdsButtonColors, HdsButtonIconPositions } from './types.ts';
import type { HdsInteractiveSignature } from '../interactive/';
import type { HdsIconSignature } from '../icon';
export declare const SIZES: string[];
export declare const COLORS: string[];
export declare const ICONPOSITIONS: string[];
export declare const DEFAULT_SIZE = HdsButtonSizeValues.Medium;
export declare const DEFAULT_COLOR = HdsButtonColorValues.Primary;
export declare const DEFAULT_ICONPOSITION = HdsButtonIconPositionValues.Leading;
export interface HdsButtonSignature {
    Args: HdsInteractiveSignature['Args'] & {
        size?: HdsButtonSizes;
        color?: HdsButtonColors;
        text: string;
        icon?: HdsIconSignature['Args']['name'];
        iconPosition?: HdsButtonIconPositions;
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
    get size(): HdsButtonSizes;
    /**
     * @param color
     * @type {string}
     * @default primary
     * @description Determines the color of button to be used; acceptable values are `primary`, `secondary`, and `critical`
     */
    get color(): HdsButtonColors;
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
    get iconPosition(): HdsButtonIconPositions;
    /**
     * @param iconSize
     * @type {string}
     * @default 16
     * @description ensures that the correct icon size is used. Automatically calculated.
     */
    get iconSize(): HdsIconSignature['Args']['size'];
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