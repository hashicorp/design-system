/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { ComponentLike, WithBoundArgs } from '@glint/template';
import type { HdsFormFieldSignature } from '../field';
import type { HdsFormTextInputBaseSignature } from './base';
import type { HdsFormErrorSignature } from '../error';
import type { HdsFormHelperTextSignature } from '../helper-text';
import type { HdsFormLabelSignature } from '../label';
import type { HdsFormVisibilityToggleSignature } from '../visibility-toggle';
import HdsFormCharacterCountComponent from '../character-count/index.ts';
import type Owner from '@ember/owner';
export interface HdsFormTextInputFieldSignature {
    Args: Omit<HdsFormFieldSignature['Args'], 'contextualClass' | 'layout'> & HdsFormTextInputBaseSignature['Args'] & {
        visibilityToggleAriaLabel?: HdsFormVisibilityToggleSignature['Args']['ariaLabel'];
        visibilityToggleAriaMessageText?: HdsFormVisibilityToggleSignature['Args']['ariaMessageText'];
    };
    Blocks: {
        default: [
            {
                Label?: ComponentLike<HdsFormLabelSignature>;
                HelperText?: ComponentLike<HdsFormHelperTextSignature>;
                Error?: ComponentLike<HdsFormErrorSignature>;
                CharacterCount?: WithBoundArgs<typeof HdsFormCharacterCountComponent, 'value'>;
            }
        ];
    };
    Element: HdsFormFieldSignature['Element'];
}
export default class HdsFormTextInputField extends Component<HdsFormTextInputFieldSignature> {
    private _isPasswordMasked;
    type: "search" | "time" | "text" | "month" | "week" | "email" | "tel" | "url" | "password" | "date" | "datetime-local";
    constructor(owner: Owner, args: HdsFormTextInputFieldSignature['Args']);
    get hasVisibilityToggle(): boolean;
    get showVisibilityToggle(): boolean;
    get visibilityToggleAriaLabel(): string | undefined;
    get visibilityToggleAriaMessageText(): string | undefined;
    onClickTogglePasswordReadability(): void;
}
//# sourceMappingURL=field.d.ts.map