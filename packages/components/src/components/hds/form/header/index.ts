/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

export interface HdsFormHeaderSignature {
  Args: { hasMaxWidth?: boolean };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class HdsFormHeader extends Component<HdsFormHeaderSignature> {
  get hasMaxWidth(): boolean {
    const { hasMaxWidth = true } = this.args;
    return hasMaxWidth;
  }

  get classNames(): string {
    const classes = ['hds-form__header'];

    if (this.hasMaxWidth) {
      classes.push('hds-form-content--has-max-width');
    }

    return classes.join(' ');
  }
}
