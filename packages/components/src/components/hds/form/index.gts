/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { eq } from 'ember-truth-helpers';
import { hash } from '@ember/helper';
import style from 'ember-style-modifier';

import type { WithBoundArgs } from '@glint/template';
import type Owner from '@ember/owner';

import { HdsFormTagValues } from './types.ts';
import HdsFormHeaderTitle from './header/title.gts';
import HdsFormHeaderDescription from './header/description.gts';
import HdsFormSectionHeader from './section/header.gts';
import HdsFormSectionMultiFieldGroup from './section/multi-field-group/index.gts';
import HdsFormSectionMultiFieldGroupItem from './section/multi-field-group/item.gts';
import HdsFormSeparator from './separator/index.gts';
import HdsFormFooter from './footer/index.gts';
import HdsFormHeader from './header/index.gts';
import HdsFormSection from './section/index.gts';

import type { HdsFormTags } from './types.ts';

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
        Header?: typeof HdsFormHeader;
        HeaderTitle?: typeof HdsFormHeaderTitle;
        HeaderDescription?: typeof HdsFormHeaderDescription;
        Section?: typeof HdsFormSection;
        SectionHeader?: typeof HdsFormSectionHeader;
        SectionHeaderTitle?: WithBoundArgs<typeof HdsFormHeaderTitle, 'size'>;
        SectionHeaderDescription?: typeof HdsFormHeaderDescription;
        SectionMultiFieldGroup?: typeof HdsFormSectionMultiFieldGroup;
        SectionMultiFieldGroupItem?: typeof HdsFormSectionMultiFieldGroupItem;
        Separator?: typeof HdsFormSeparator;
        Footer?: typeof HdsFormFooter;
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

  <template>
    {{#if (eq this.tag "form")}}
      <form class="hds-form" {{style this.sectionMaxWidthStyle}} ...attributes>
        {{yield
          (hash
            Header=HdsFormHeader
            HeaderTitle=HdsFormHeaderTitle
            HeaderDescription=HdsFormHeaderDescription
            Section=HdsFormSection
            SectionHeader=HdsFormSectionHeader
            SectionHeaderTitle=(component HdsFormHeaderTitle size="300")
            SectionHeaderDescription=HdsFormHeaderDescription
            SectionMultiFieldGroup=HdsFormSectionMultiFieldGroup
            SectionMultiFieldGroupItem=HdsFormSectionMultiFieldGroupItem
            Separator=HdsFormSeparator
            Footer=HdsFormFooter
          )
        }}
      </form>
    {{else}}
      <div class="hds-form" {{style this.sectionMaxWidthStyle}} ...attributes>
        {{yield
          (hash
            Header=HdsFormHeader
            HeaderTitle=HdsFormHeaderTitle
            HeaderDescription=HdsFormHeaderDescription
            Section=HdsFormSection
            SectionHeader=HdsFormSectionHeader
            SectionHeaderTitle=(component HdsFormHeaderTitle size="300")
            SectionHeaderDescription=HdsFormHeaderDescription
            SectionMultiFieldGroup=HdsFormSectionMultiFieldGroup
            SectionMultiFieldGroupItem=HdsFormSectionMultiFieldGroupItem
            Separator=HdsFormSeparator
            Footer=HdsFormFooter
          )
        }}
      </div>
    {{/if}}
  </template>
}
