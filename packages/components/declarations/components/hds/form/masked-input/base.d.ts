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
export default class HdsFormMaskedInputBase extends Component<HdsFormMaskedInputBaseSignature> {
    isContentMasked: boolean;
    constructor(owner: unknown, args: HdsFormMaskedInputBaseSignature['Args']);
    onClickToggleMasking(): void;
    get id(): string;
    get visibilityToggleAriaLabel(): string;
    get visibilityToggleAriaMessageText(): string;
    get copyButtonText(): string;
    get classNames(): string;
}
//# sourceMappingURL=base.d.ts.map