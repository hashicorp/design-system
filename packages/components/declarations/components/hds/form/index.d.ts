/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import HdsFormHeaderTitleComponent from './header/title.ts';
import { HdsFormTagValues } from './types.ts';
import type { HdsFormTags } from './types.ts';
import type Owner from '@ember/owner';
import type { ComponentLike, WithBoundArgs } from '@glint/template';
import type { HdsFormHeaderSignature } from './header/index.ts';
import type { HdsFormHeaderTitleSignature } from './header/title.ts';
import type { HdsFormHeaderDescriptionSignature } from './header/description.ts';
import type { HdsFormSectionSignature } from './section/index.ts';
import type { HdsFormSectionHeaderSignature } from './section/header.ts';
import type { HdsFormSectionMultiFieldGroupSignature } from './section/multi-field-group/index.ts';
import type { HdsFormSectionMultiFieldGroupItemSignature } from './section/multi-field-group/item.ts';
import type { HdsFormSeparatorSignature } from './separator/index.ts';
import type { HdsFormFooterSignature } from './footer/index.ts';
export declare const DEFAULT_TAG = HdsFormTagValues.Form;
export declare const AVAILABLE_TAGS: string[];
export interface HdsFormSignature {
    Args: {
        tag?: HdsFormTags;
        sectionMaxWidth?: string;
    };
    Blocks: {
        default: [
            {
                Header?: ComponentLike<HdsFormHeaderSignature>;
                HeaderTitle?: ComponentLike<HdsFormHeaderTitleSignature>;
                HeaderDescription?: ComponentLike<HdsFormHeaderDescriptionSignature>;
                Section?: ComponentLike<HdsFormSectionSignature>;
                SectionHeader?: ComponentLike<HdsFormSectionHeaderSignature>;
                SectionHeaderTitle?: WithBoundArgs<typeof HdsFormHeaderTitleComponent, 'size'>;
                SectionHeaderDescription?: ComponentLike<HdsFormHeaderDescriptionSignature>;
                SectionMultiFieldGroup?: ComponentLike<HdsFormSectionMultiFieldGroupSignature>;
                SectionMultiFieldGroupItem?: ComponentLike<HdsFormSectionMultiFieldGroupItemSignature>;
                Separator?: ComponentLike<HdsFormSeparatorSignature>;
                Footer?: ComponentLike<HdsFormFooterSignature>;
            }
        ];
    };
    Element: HTMLFormElement | HTMLDivElement;
}
export default class HdsForm extends Component<HdsFormSignature> {
    tag: HdsFormTags;
    constructor(owner: Owner, args: HdsFormSignature['Args']);
    get sectionMaxWidthStyle(): Record<string, string>;
}
