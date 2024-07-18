/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
/// <reference types="ember-source/types/stable/@ember/component/template-only" />
import type { HdsFormFieldsetSignature } from '../fieldset';
import type { ComponentLike } from '@glint/template';
import type { HdsFormLegendSignature } from '../legend';
import type { HdsFormHelperTextSignature } from '../helper-text';
import type { HdsFormRadioFieldSignature } from './field';
import type { HdsFormErrorSignature } from '../error';
interface HdsFormRadioGroupSignature {
    Args: HdsFormFieldsetSignature['Args'] & {
        name?: string;
    };
    Blocks: {
        default: [
            {
                Legend?: ComponentLike<HdsFormLegendSignature>;
                HelperText?: ComponentLike<HdsFormHelperTextSignature>;
                RadioField?: ComponentLike<HdsFormRadioFieldSignature>;
                Error?: ComponentLike<HdsFormErrorSignature>;
            }
        ];
    };
    Element: HdsFormFieldsetSignature['Element'];
}
declare const HdsFormRadioGroupComponent: import("@ember/component/template-only").TemplateOnlyComponent<HdsFormRadioGroupSignature>;
export default HdsFormRadioGroupComponent;
//# sourceMappingURL=group.d.ts.map