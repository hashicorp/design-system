/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsCopyButtonSignature } from '../../copy/button/index.ts';
import type { HdsFormVisibilityToggleSignature } from '../visibility-toggle/index.ts';
export interface HdsFormMaskedInputBaseSignature {
    Args: {
        copyButtonText?: HdsCopyButtonSignature['Args']['text'];
        hasCopyButton?: boolean;
        isContentMasked?: boolean;
        isInvalid?: boolean;
        isMultiline?: boolean;
        id?: string;
        value?: string;
        visibilityToggleAriaLabel?: HdsFormVisibilityToggleSignature['Args']['ariaLabel'];
        visibilityToggleAriaMessageText?: HdsFormVisibilityToggleSignature['Args']['ariaMessageText'];
        width?: string;
        height?: string;
    };
    Element: HTMLElement;
}
export default class HdsFormMaskedInputBaseComponent extends Component<HdsFormMaskedInputBaseSignature> {
    isContentMasked: boolean;
    onClickToggleMasking(): void;
    /**
     * Calculates the unique ID to assign to the form control
     */
    get id(): string;
    /**
     * @param ariaLabel
     * @type {string}
     * @default 'Show masked content'
     */
    get visibilityToggleAriaLabel(): string;
    /**
     * @param ariaMessageText
     * @type {string}
     * @default 'Input content is now hidden'
     */
    get visibilityToggleAriaMessageText(): string;
    /**
     * @param copyButtonText
     * @type {string}
     * @default 'Copy masked content'
     */
    get copyButtonText(): string;
    /**
     * Get the class names to apply to the component.
     * @method classNames
     * @return {string} The "class" attribute to apply to the component.
     */
    get classNames(): string;
}
//# sourceMappingURL=base.d.ts.map