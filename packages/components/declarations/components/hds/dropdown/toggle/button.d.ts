/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { HdsDropdownToggleButtonSizeValues, HdsDropdownToggleButtonColorValues } from './types.ts';
import type { HdsIconSignature } from '../../icon';
import type { HdsBadgeSignature } from '../../badge';
import type { HdsBadgeCountSignature } from '../../badge-count';
import type { HdsDropdownToggleButtonSizes, HdsDropdownToggleButtonColors } from './types';
import type { ModifierLike } from '@glint/template';
import type { SetupPrimitiveToggleModifier } from '../../popover-primitive/index.ts';
export declare const DEFAULT_SIZE = HdsDropdownToggleButtonSizeValues.Medium;
export declare const DEFAULT_COLOR = HdsDropdownToggleButtonColorValues.Primary;
export declare const SIZES: string[];
export declare const COLORS: string[];
export interface HdsDropdownToggleButtonSignature {
    Args: {
        badge?: HdsBadgeSignature['Args']['text'];
        badgeIcon?: HdsBadgeSignature['Args']['icon'];
        color?: HdsDropdownToggleButtonColors;
        count?: HdsBadgeCountSignature['Args']['text'];
        icon?: HdsIconSignature['Args']['name'];
        isFullWidth?: boolean;
        isOpen?: boolean;
        size?: HdsDropdownToggleButtonSizes;
        text: string;
        setupPrimitiveToggle?: ModifierLike<SetupPrimitiveToggleModifier>;
    };
    Element: HTMLButtonElement;
}
export default class HdsDropdownToggleButton extends Component<HdsDropdownToggleButtonSignature> {
    /**
     * Generates a unique ID for the button
     *
     * @param toggleButtonId
     */
    toggleButtonId: string;
    /**
     * @param text
     * @type {string}
     * @description The text of the button. If no text value is defined an error will be thrown.
     */
    get text(): string;
    /**
     * @param size
     * @type {string}
     * @default medium
     * @description The size of the button; acceptable values are `small` and `medium`
     */
    get size(): HdsDropdownToggleButtonSizes;
    /**
     * @param color
     * @type {string}
     * @default primary
     * @description Determines the color of button to be used; acceptable values are `primary` and  `secondary`
     */
    get color(): HdsDropdownToggleButtonColors;
    /**
     * @param isFullWidth
     * @type {boolean}
     * @default false
     * @description Indicates that a button should take up the full width of the parent container. The default is false.
     */
    get isFullWidth(): boolean;
    /**
     * @param badgeType
     * @type {string}
     * @default 'filled'
     * @description ensures that the correct Badge/BadgeCount type is used to meet contrast requirements
     */
    get badgeType(): HdsBadgeCountSignature['Args']['type'];
    /**
     * Get the class names to apply to the component.
     * @method ToggleButton#classNames
     * @return {string} The "class" attribute to apply to the component.
     */
    get classNames(): string;
}
//# sourceMappingURL=button.d.ts.map