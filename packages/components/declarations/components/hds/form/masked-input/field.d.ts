/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
/// <reference types="ember-source/types/stable/@ember/component/template-only" />
import type { ComponentLike, WithBoundArgs } from '@glint/template';
import type HdsFormCharacterCountComponent from '../character-count';
import type { HdsFormErrorSignature } from '../error';
import type { HdsFormFieldSignature } from '../field';
import type { HdsFormHelperTextSignature } from '../helper-text';
import type { HdsFormLabelSignature } from '../label';
import type { HdsMaskedInputBaseSignature } from './base';
interface HdsMaskedInputFieldSignature {
    Args: Omit<HdsFormFieldSignature['Args'], 'contextualClass' | 'layout'> & HdsMaskedInputBaseSignature['Args'];
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
declare const HdsMaskedInputFieldComponent: import("@ember/component/template-only").TemplateOnlyComponent<HdsMaskedInputFieldSignature>;
export default HdsMaskedInputFieldComponent;
//# sourceMappingURL=field.d.ts.map