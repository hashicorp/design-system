/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { ComponentLike, WithBoundArgs } from '@glint/template';
import type { HdsFormSectionHeaderSignature } from './header.ts';
import type HdsFormHeaderTitleComponent from '../header/title.ts';
import type { HdsFormHeaderDescriptionSignature } from '../header/description.ts';
import type { HdsFormSectionMultiFieldGroupSignature } from './multi-field-group/index.ts';
import type { HdsFormSectionMultiFieldGroupItemSignature } from './multi-field-group/item.ts';
export interface HdsFormSectionSignature {
    Args: {
        isFullWidth?: boolean;
    };
    Blocks: {
        default: [
            {
                Section?: ComponentLike<HdsFormSectionSignature>;
                Header?: ComponentLike<HdsFormSectionHeaderSignature>;
                HeaderTitle?: WithBoundArgs<typeof HdsFormHeaderTitleComponent, 'size'>;
                HeaderDescription?: ComponentLike<HdsFormHeaderDescriptionSignature>;
                MultiFieldGroup?: ComponentLike<HdsFormSectionMultiFieldGroupSignature>;
                MultiFieldGroupItem?: ComponentLike<HdsFormSectionMultiFieldGroupItemSignature>;
            }
        ];
    };
    Element: HTMLDivElement;
}
export default class HdsFormSection extends Component<HdsFormSectionSignature> {
    get classNames(): string;
}
