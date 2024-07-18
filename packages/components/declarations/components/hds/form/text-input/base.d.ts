/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { HdsFormTextInputTypeValues } from './types.ts';
import type { HdsFormTextInputTypes } from './types.ts';
export declare const DEFAULT_TYPE = HdsFormTextInputTypeValues.Text;
export declare const TYPES: string[];
export interface HdsFormTextInputBaseSignature {
    Args: {
        hasVisibilityToggle?: boolean;
        isInvalid?: boolean;
        isLoading?: boolean;
        type?: HdsFormTextInputTypes;
        value?: string;
        width?: string;
    };
    Element: HTMLInputElement;
}
export default class HdsFormTextInputBaseComponent extends Component<HdsFormTextInputBaseSignature> {
    /**
     * Sets the type of input
     *
     * @param type
     * @type {string}
     * @default 'text'
     */
    get type(): HdsFormTextInputTypes;
    /**
     * Get the class names to apply to the component.
     * @method classNames
     * @return {string} The "class" attribute to apply to the component.
     */
    get classNames(): string;
}
//# sourceMappingURL=base.d.ts.map