/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

import HdsSeparator from '../../separator/index.gts';

export interface HdsFormSeparatorSignature {
  Args: {
    isFullWidth?: boolean;
  };
  Element: HTMLElement;
}

export default class HdsFormSeparator extends Component<HdsFormSeparatorSignature> {
  get classNames(): string {
    const classes = ['hds-form__separator'];

    // add a class based on the @isFullWidth argument
    if (this.args.isFullWidth) {
      classes.push('hds-form-content--is-full-width');
    }

    return classes.join(' ');
  }

  <template>
    <HdsSeparator class={{this.classNames}} @spacing="0" ...attributes />
  </template>
}
