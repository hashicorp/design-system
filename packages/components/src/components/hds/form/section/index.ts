/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

export interface HdsFormSectionSignature {
  Args: { hasMaxWidth?: boolean };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class HdsFormSection extends Component<HdsFormSectionSignature> {
  get hasMaxWidth(): boolean {
    const { hasMaxWidth = true } = this.args;
    return hasMaxWidth;
  }

  get classNames(): string {
    const classes = ['hds-form__section'];

    if (this.hasMaxWidth) {
      classes.push('hds-form__section--has-max-width');
    }

    return classes.join(' ');
  }
}
