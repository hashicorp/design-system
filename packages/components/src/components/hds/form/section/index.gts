/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { hash } from '@ember/helper';

import type { WithBoundArgs } from '@glint/template';

import HdsFormSectionHeader from './header.gts';
import HdsFormSectionMultiFieldGroup from './multi-field-group/index.gts';
import HdsFormHeaderTitle from '../header/title.gts';
import HdsFormHeaderDescription from '../header/description.gts';
import HdsFormSectionMultiFieldGroupItem from './multi-field-group/item.gts';

export interface HdsFormSectionSignature {
  Args: {
    isFullWidth?: boolean;
  };
  Blocks: {
    default: [
      {
        Section?: typeof HdsFormSection; // for nested sections
        Header?: typeof HdsFormSectionHeader;
        HeaderTitle?: WithBoundArgs<typeof HdsFormHeaderTitle, 'size'>;
        HeaderDescription?: typeof HdsFormHeaderDescription;
        MultiFieldGroup?: typeof HdsFormSectionMultiFieldGroup;
        MultiFieldGroupItem?: typeof HdsFormSectionMultiFieldGroupItem;
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class HdsFormSection extends Component<HdsFormSectionSignature> {
  get classNames(): string {
    const classes = ['hds-form__section'];

    // add a class based on the @isFullWidth argument
    if (this.args.isFullWidth) {
      classes.push('hds-form-content--is-full-width');
    }

    return classes.join(' ');
  }

  <template>
    {{! IMPORTANT: we need to add "squishies" here (~) because otherwise the whitespace added by Ember causes the empty element to still occupy space - See https://handlebarsjs.com/guide/expressions.html#whitespace-control }}
    <div class={{this.classNames}} ...attributes>
      {{~yield
        (hash
          Header=HdsFormSectionHeader
          HeaderTitle=(component HdsFormHeaderTitle size="300")
          HeaderDescription=HdsFormHeaderDescription
          MultiFieldGroup=HdsFormSectionMultiFieldGroup
          MultiFieldGroupItem=HdsFormSectionMultiFieldGroupItem
        )
      ~}}
    </div>
  </template>
}
