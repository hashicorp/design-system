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
interface HdsFormTextInputFieldSignature {
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
export default class HdsFormTextInputFieldComponent extends Component<HdsFormTextInputFieldSignature> {
    isPasswordMasked: boolean;
    hasVisibilityToggle: boolean;
    type: "search" | "time" | "text" | "email" | "tel" | "password" | "url" | "date" | "datetime-local" | "month" | "week";
    /**
     * @param showVisibilityToggle
     * @type {boolean}
     * @default false
     */
    get showVisibilityToggle(): boolean;
    /**
     * @param visibilityToggleAriaLabel
     * @type {string}
     * @default 'Show password'
     */
    get visibilityToggleAriaLabel(): string | undefined;
    /**
     * @param visibilityToggleAriaMessageText
     * @type {string}
     * @default 'Password is now hidden'
     */
    get visibilityToggleAriaMessageText(): string | undefined;
    onClickTogglePasswordReadability(): void;
}
export {};
//# sourceMappingURL=field.d.ts.map