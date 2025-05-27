/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

export interface HdsFormDividerSignature {
  Args: { hasMaxWidth?: boolean };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class HdsFormDivider extends Component<HdsFormDividerSignature> {
  get hasMaxWidth(): boolean {
    const { hasMaxWidth = true } = this.args;
    return hasMaxWidth;
  }

  get classNames(): string {
    const classes = ['hds-form__divider'];

    if (!this.hasMaxWidth) {
      classes.push('hds-form__divider--has-max-width-false');
    }

    return classes.join(' ');
  }
}
