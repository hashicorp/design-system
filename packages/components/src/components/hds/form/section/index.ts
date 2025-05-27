/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

export interface HdsFormSectionSignature {
  Args: { hasMaxWidth?: boolean };
  // Any blocks yielded by the component
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}
// More info on types and signatures: https://hashicorp.atlassian.net/wiki/spaces/HDS/pages/3245932580/Using+Typescript

export default class HdsFormSection extends Component<HdsFormSectionSignature> {
  get hasMaxWidth(): boolean {
    const { hasMaxWidth = true } = this.args;
    return hasMaxWidth;
  }

  get classNames(): string {
    const classes = ['hds-form__section'];

    if (!this.hasMaxWidth) {
      classes.push('hds-form-section--has-max-width-false');
    }

    return classes.join(' ');
  }
}
