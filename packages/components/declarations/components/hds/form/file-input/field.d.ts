/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { ComponentLike } from '@glint/template';
import type { HdsFormFieldSignature } from '../field';
import type { HdsFormLabelSignature } from '../label';
import type { HdsFormHelperTextSignature } from '../helper-text';
import type { HdsFormErrorSignature } from '../error';
export interface HdsFormFileInputFieldSignature {
    Args: Omit<HdsFormFieldSignature['Args'], 'contextualClass' | 'layout'>;
    Blocks: {
        default: [
            {
                Label?: ComponentLike<HdsFormLabelSignature>;
                HelperText?: ComponentLike<HdsFormHelperTextSignature>;
                Error?: ComponentLike<HdsFormErrorSignature>;
            }
        ];
    };
    Element: HdsFormFieldSignature['Element'];
}
declare const HdsFormFileInputField: import("@ember/component/template-only").TemplateOnlyComponent<HdsFormFileInputFieldSignature>;
export default HdsFormFileInputField;
