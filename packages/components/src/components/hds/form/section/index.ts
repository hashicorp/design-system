/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

export interface HdsFormSectionSignature {
  Args: {
    isFullWidth?: boolean;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class HdsFormSection extends Component<HdsFormSectionSignature> {
  get isFullWidth(): boolean {
    return this.args.isFullWidth ?? false;
  }

  get classNames(): string {
    const classes = ['hds-form__section'];

    // add a class based on the @isFullWidth argument
    if (this.isFullWidth) {
      classes.push('hds-form-content--is-full-width');
    }

    return classes.join(' ');
  }
}
