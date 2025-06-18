/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

export interface HdsFormFooterSignature {
  Args: {
    isFullWidth?: boolean;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class HdsFormFooter extends Component<HdsFormFooterSignature> {
  get classNames() {
    const classes = ['hds-form__footer'];

    // add a class based on the @isFullWidth argument
    if (this.args.isFullWidth) {
      classes.push('hds-form-content--is-full-width');
    }

    return classes.join(' ');
  }
}
