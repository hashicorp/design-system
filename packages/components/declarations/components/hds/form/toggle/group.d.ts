/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { HdsFormFieldsetSignature } from '../fieldset';
import type { ComponentLike } from '@glint/template';
import type { HdsFormLegendSignature } from '../legend';
import type { HdsFormHelperTextSignature } from '../helper-text';
import type { HdsFormToggleFieldSignature } from './field';
import type { HdsFormErrorSignature } from '../error';
export interface HdsFormToggleGroupSignature {
    Args: HdsFormFieldsetSignature['Args'] & {
        name?: string;
    };
    Blocks: {
        default: [
            {
                Legend?: ComponentLike<HdsFormLegendSignature>;
                HelperText?: ComponentLike<HdsFormHelperTextSignature>;
                ToggleField?: ComponentLike<HdsFormToggleFieldSignature>;
                Error?: ComponentLike<HdsFormErrorSignature>;
            }
        ];
    };
    Element: HdsFormFieldsetSignature['Element'];
}
declare const HdsFormToggleGroup: import("@ember/component/template-only").TemplateOnlyComponent<HdsFormToggleGroupSignature>;
export default HdsFormToggleGroup;
