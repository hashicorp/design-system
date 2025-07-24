/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { ComponentLike } from '@glint/template';
import type { HdsFormSectionMultiFieldGroupItemSignature } from './item.ts';
export interface HdsFormSectionMultiFieldGroupSignature {
    Blocks: {
        default: [
            {
                Item?: ComponentLike<HdsFormSectionMultiFieldGroupItemSignature>;
            }
        ];
    };
    Element: HTMLDivElement;
}
declare const HdsFormSectionMultiFieldGroup: import("@ember/component/template-only").TemplateOnlyComponent<HdsFormSectionMultiFieldGroupSignature>;
export default HdsFormSectionMultiFieldGroup;
