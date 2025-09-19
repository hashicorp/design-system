/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';
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

export const DEFAULT_TAG = HdsFormTagValues.Form;
export const AVAILABLE_TAGS: HdsFormTags[] = Object.values(HdsFormTagValues);

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
        SectionHeaderTitle?: WithBoundArgs<
          typeof HdsFormHeaderTitleComponent,
          'size'
        >;
        SectionHeaderDescription?: ComponentLike<HdsFormHeaderDescriptionSignature>;
        SectionMultiFieldGroup?: ComponentLike<HdsFormSectionMultiFieldGroupSignature>;
        SectionMultiFieldGroupItem?: ComponentLike<HdsFormSectionMultiFieldGroupItemSignature>;
        Separator?: ComponentLike<HdsFormSeparatorSignature>;
        Footer?: ComponentLike<HdsFormFooterSignature>;
      },
    ];
  };
  Element: HTMLFormElement | HTMLDivElement;
}

export default class HdsForm extends Component<HdsFormSignature> {
  tag: HdsFormTags;

  constructor(owner: Owner, args: HdsFormSignature['Args']) {
    super(owner, args);
    this.tag = args.tag ?? DEFAULT_TAG;

    assert(
      `@tag for "Hds::Form" must be one of the following: ${AVAILABLE_TAGS.join(', ')}; received: ${this.tag}`,
      AVAILABLE_TAGS.includes(this.tag)
    );
  }

  get sectionMaxWidthStyle(): Record<string, string> {
    const sectionMaxWidthStyle: { [key: string]: string } = {};

    if (this.args.sectionMaxWidth) {
      sectionMaxWidthStyle['--hds-form-section-max-width'] =
        this.args.sectionMaxWidth;
    }
    return sectionMaxWidthStyle;
  }
}
