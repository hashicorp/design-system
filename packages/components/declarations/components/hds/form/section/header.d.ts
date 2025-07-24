/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { ComponentLike, WithBoundArgs } from '@glint/template';
import type HdsFormHeaderTitleComponent from '../header/title.ts';
import type { HdsFormHeaderDescriptionSignature } from '../header/description.ts';
export interface HdsFormSectionHeaderSignature {
    Blocks: {
        default: [
            {
                Title?: WithBoundArgs<typeof HdsFormHeaderTitleComponent, 'size'>;
                Description?: ComponentLike<HdsFormHeaderDescriptionSignature>;
            }
        ];
    };
    Element: HTMLDivElement;
}
declare const HdsFormSectionHeader: import("@ember/component/template-only").TemplateOnlyComponent<HdsFormSectionHeaderSignature>;
export default HdsFormSectionHeader;
