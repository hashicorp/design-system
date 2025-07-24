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
        ariaDescribedBy?: string;
    };
    Element: HTMLElement;
}
export default class HdsFormMaskedInputBase extends Component<HdsFormMaskedInputBaseSignature> {
    _isContentMasked: boolean;
    private _isControlled;
    get isContentMasked(): boolean;
    set isContentMasked(value: boolean);
    onClickToggleMasking(): void;
    private _manageState;
    get id(): string;
    get visibilityToggleAriaLabel(): string;
    get visibilityToggleAriaMessageText(): string;
    get copyButtonText(): string;
    get classNames(): string;
}
