/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { HdsDropdownToggleIconSizeValues } from './types.ts';
import type { HdsIconSignature } from '../../icon';
import type { HdsDropdownToggleIconSizes } from './types';
import type { ModifierLike } from '@glint/template';
import type { SetupPrimitiveToggleModifier } from '../../popover-primitive/index.ts';
export declare const DEFAULT_SIZE = HdsDropdownToggleIconSizeValues.Medium;
export declare const SIZES: string[];
export interface HdsDropdownToggleIconSignature {
    Args: {
        hasChevron?: boolean;
        icon?: HdsIconSignature['Args']['name'];
        imageSrc?: string;
        isOpen?: boolean;
        size?: HdsDropdownToggleIconSizes;
        text: string;
        setupPrimitiveToggle?: ModifierLike<SetupPrimitiveToggleModifier>;
    };
    Element: HTMLButtonElement;
}
export default class HdsDropdownToggleIcon extends Component<HdsDropdownToggleIconSignature> {
    hasImage: boolean;
    constructor(owner: unknown, args: HdsDropdownToggleIconSignature['Args']);
    onDidUpdateImageSrc(): void;
    onImageLoadError(): void;
    /**
     * @param text
     * @type {string}
     * @description The text of the `aria-label` applied to the toggle
     */
    get text(): string;
    /**
     * @param size
     * @type {string}
     * @default medium
     * @description The size of the button; acceptable values are `small` and `medium`
     */
    get size(): HdsDropdownToggleIconSizes;
    /**
     * @param iconSize
     * @type {string}
     * @default 24
     * @description ensures that the correct icon size is used
     */
    get iconSize(): HdsIconSignature['Args']['size'];
    /**
     * Indicates if a dropdown chevron icon should be displayed; should be displayed unless the "more-horizontal" icon is used.
     *
     * @param hasChevron
     * @type {boolean}
     * @default true
     */
    get hasChevron(): boolean;
    /**
     * Get the class names to apply to the component.
     * @method ToggleIcon#classNames
     * @return {string} The "class" attribute to apply to the component.
     */
    get classNames(): string;
}
//# sourceMappingURL=icon.d.ts.map