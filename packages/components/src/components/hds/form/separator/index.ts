/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

export interface HdsFormSeparatorSignature {
  Args: { hasMaxWidth?: boolean };
  Element: HTMLElement;
}

export default class HdsFormSeparator extends Component<HdsFormSeparatorSignature> {
  get hasMaxWidth(): boolean {
    const { hasMaxWidth = true } = this.args;
    return hasMaxWidth;
  }

  get classNames(): string {
    const classes = ['hds-form__separator'];

    if (!this.hasMaxWidth) {
      classes.push('hds-form__separator--has-max-width-false');
    }

    return classes.join(' ');
  }
}
