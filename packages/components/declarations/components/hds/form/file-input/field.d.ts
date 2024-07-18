/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
/// <reference types="ember-source/types/stable/@ember/component/template-only" />
import type { ComponentLike } from '@glint/template';
import type { HdsFormFieldSignature } from '../field';
import type { HdsFormLabelSignature } from '../label';
import type { HdsFormHelperTextSignature } from '../helper-text';
import type { HdsFormErrorSignature } from '../error';
interface HdsFormFileInputFieldSignature {
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
declare const HdsFormFileInputFieldComponent: import("@ember/component/template-only").TemplateOnlyComponent<HdsFormFileInputFieldSignature>;
export default HdsFormFileInputFieldComponent;
//# sourceMappingURL=field.d.ts.map