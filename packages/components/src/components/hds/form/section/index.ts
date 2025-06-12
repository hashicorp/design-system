/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

import type { ComponentLike } from '@glint/template';
import type { HdsFormSectionHeaderSignature } from '../section/header/index.ts';
import type { HdsFormSectionHeaderTitleSignature } from '../section/header/title/index.ts';
import type { HdsFormSectionHeaderDescriptionSignature } from '../section/header/description/index.ts';
import type { HdsFormSectionFieldGroupSignature } from '../section/field-group/index.ts';

export interface HdsFormSectionSignature {
  Args: {
    hasBorder?: boolean;
    isFullWidth?: boolean;
  };
  Blocks: {
    default: [
      {
        Section?: ComponentLike<HdsFormSectionSignature>; // for nested sections (TODO: test if this is correct)
        Header?: ComponentLike<HdsFormSectionHeaderSignature>;
        HeaderTitle?: ComponentLike<HdsFormSectionHeaderTitleSignature>;
        HeaderDescription?: ComponentLike<HdsFormSectionHeaderDescriptionSignature>;
        FieldGroup?: ComponentLike<HdsFormSectionFieldGroupSignature>;
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class HdsFormSection extends Component<HdsFormSectionSignature> {
  get hasBorder(): boolean {
    return this.args.hasBorder ?? false;
  }

  get isFullWidth(): boolean {
    return this.args.isFullWidth ?? false;
  }

  get classNames(): string {
    const classes = ['hds-form__section'];

    // add a class based on the @hasBorder argument
    if (this.hasBorder) {
      classes.push('hds-form__section--has-border');
    }

    // add a class based on the @isFullWidth argument
    if (this.isFullWidth) {
      classes.push('hds-form-content--is-full-width');
    }

    return classes.join(' ');
  }
}
