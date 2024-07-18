/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
/// <reference types="ember-source/types/stable/@ember/component/template-only" />
import type { HdsFormFieldsetSignature } from '../fieldset';
import type { ComponentLike } from '@glint/template';
import type { HdsFormLegendSignature } from '../legend';
import type { HdsFormHelperTextSignature } from '../helper-text';
import type { HdsFormToggleFieldSignature } from './field';
import type { HdsFormErrorSignature } from '../error';
interface HdsFormToggleGroupSignature {
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
declare const HdsFormToggleGroupComponent: import("@ember/component/template-only").TemplateOnlyComponent<HdsFormToggleGroupSignature>;
export default HdsFormToggleGroupComponent;
//# sourceMappingURL=group.d.ts.map