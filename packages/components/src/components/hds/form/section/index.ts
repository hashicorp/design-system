/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

import type { ComponentLike } from '@glint/template';
import type { HdsFormSectionHeaderSignature } from './header.ts';
import type { HdsFormHeaderTitleSignature } from '../header/title.ts';
import type { HdsFormHeaderDescriptionSignature } from '../header/description.ts';
import type { HdsFormSectionMultiFieldGroupSignature } from './multi-field-group/index.ts';
import type { HdsFormSectionMultiFieldGroupItemSignature } from './multi-field-group/item/index.ts';

export interface HdsFormSectionSignature {
  Args: {
    hasBorder?: boolean;
    isFullWidth?: boolean;
  };
  Blocks: {
    default: [
      {
        Section?: ComponentLike<HdsFormSectionSignature>; // for nested sections
        Header?: ComponentLike<HdsFormSectionHeaderSignature>;
        HeaderTitle?: ComponentLike<HdsFormHeaderTitleSignature>;
        HeaderDescription?: ComponentLike<HdsFormHeaderDescriptionSignature>;
        MultiFieldGroup?: ComponentLike<HdsFormSectionMultiFieldGroupSignature>;
        MultiFieldGroupItem?: ComponentLike<HdsFormSectionMultiFieldGroupItemSignature>;
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class HdsFormSection extends Component<HdsFormSectionSignature> {
  get classNames(): string {
    const classes = ['hds-form__section'];

    // add a class based on the @hasBorder argument
    if (this.args.hasBorder) {
      classes.push('hds-form__section--has-border');
    }

    // add a class based on the @isFullWidth argument
    if (this.args.isFullWidth) {
      classes.push('hds-form-content--is-full-width');
    }

    return classes.join(' ');
  }
}
