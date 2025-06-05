/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

export interface HdsFormSeparatorSignature {
  Args: {
    isFullWidth?: boolean;
  };
  Element: HTMLElement;
}

export default class HdsFormSeparator extends Component<HdsFormSeparatorSignature> {
  get isFullWidth(): boolean {
    return this.args.isFullWidth ?? false;
  }

  get classNames(): string {
    const classes = ['hds-form__separator'];

    // add a class based on the @isFullWidth argument
    if (this.isFullWidth) {
      classes.push('hds-form-content--is-full-width');
    }

    return classes.join(' ');
  }
}
