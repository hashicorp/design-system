/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

import type { ComponentLike } from '@glint/template';
import type { HdsButtonSetSignature } from '../../button-set/index.ts';

export interface HdsFormFooterSignature {
  Args: {
    isFullWidth?: boolean;
  };
  Blocks: {
    default: [
      {
        ButtonSet?: ComponentLike<HdsButtonSetSignature>;
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class HdsFormFooter extends Component<HdsFormFooterSignature> {
  get classNames(): string {
    const classes = ['hds-form__footer'];

    // add a class based on the @isFullWidth argument
    if (this.args.isFullWidth) {
      classes.push('hds-form-content--is-full-width');
    }

    return classes.join(' ');
  }
}
