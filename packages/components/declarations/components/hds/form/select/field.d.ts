/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { ComponentLike } from '@glint/template';
import type { HdsFormErrorSignature } from '../error';
import type { HdsFormFieldSignature } from '../field';
import type { HdsFormHelperTextSignature } from '../helper-text';
import type { HdsFormLabelSignature } from '../label';
import type { HdsFormSelectBaseSignature } from './base';
import type { HdsYieldSignature } from '../../yield';
export interface HdsFormSelectFieldSignature {
    Args: Omit<HdsFormFieldSignature['Args'], 'contextualClass' | 'layout'> & HdsFormSelectBaseSignature['Args'];
    Blocks: {
        default: [
            {
                Label?: ComponentLike<HdsFormLabelSignature>;
                HelperText?: ComponentLike<HdsFormHelperTextSignature>;
                Error?: ComponentLike<HdsFormErrorSignature>;
                Options?: ComponentLike<HdsYieldSignature>;
            }
        ];
    };
    Element: HdsFormFieldSignature['Element'];
}
declare const HdsFormSelectField: import("@ember/component/template-only").TemplateOnlyComponent<HdsFormSelectFieldSignature>;
export default HdsFormSelectField;
