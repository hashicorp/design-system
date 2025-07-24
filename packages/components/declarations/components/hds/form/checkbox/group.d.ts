/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { HdsFormFieldsetSignature } from '../fieldset';
import type { ComponentLike } from '@glint/template';
import type { HdsFormLegendSignature } from '../legend';
import type { HdsFormHelperTextSignature } from '../helper-text';
import type { HdsFormCheckboxFieldSignature } from './field';
import type { HdsFormErrorSignature } from '../error';
export interface HdsFormCheckboxGroupSignature {
    Args: HdsFormFieldsetSignature['Args'] & {
        name?: string;
    };
    Blocks: {
        default: [
            {
                Legend?: ComponentLike<HdsFormLegendSignature>;
                HelperText?: ComponentLike<HdsFormHelperTextSignature>;
                CheckboxField?: ComponentLike<HdsFormCheckboxFieldSignature>;
                Error?: ComponentLike<HdsFormErrorSignature>;
            }
        ];
    };
    Element: HdsFormFieldsetSignature['Element'];
}
declare const HdsFormCheckboxGroup: import("@ember/component/template-only").TemplateOnlyComponent<HdsFormCheckboxGroupSignature>;
export default HdsFormCheckboxGroup;
