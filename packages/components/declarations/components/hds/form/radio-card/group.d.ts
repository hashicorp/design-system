/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { HdsFormFieldsetSignature } from '../fieldset';
import type { ComponentLike } from '@glint/template';
import type { HdsFormLegendSignature } from '../legend';
import type { HdsFormHelperTextSignature } from '../helper-text';
import type { HdsFormRadioCardSignature } from './index';
import type { HdsFormErrorSignature } from '../error';
import type { HdsFormRadioCardControlPositions, HdsFormRadioCardAlignments } from './types';
export interface HdsFormRadioCardGroupSignature {
    Args: HdsFormFieldsetSignature['Args'] & {
        controlPosition?: HdsFormRadioCardControlPositions;
        alignment?: HdsFormRadioCardAlignments;
        name?: string;
    };
    Blocks: {
        default: [
            {
                Legend?: ComponentLike<HdsFormLegendSignature>;
                HelperText?: ComponentLike<HdsFormHelperTextSignature>;
                RadioCard?: ComponentLike<HdsFormRadioCardSignature>;
                Error?: ComponentLike<HdsFormErrorSignature>;
            }
        ];
    };
    Element: HdsFormFieldsetSignature['Element'];
}
declare const HdsFormRadioCardGroup: import("@ember/component/template-only").TemplateOnlyComponent<HdsFormRadioCardGroupSignature>;
export default HdsFormRadioCardGroup;
//# sourceMappingURL=group.d.ts.map