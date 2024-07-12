/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import type { ComponentLike } from '@glint/template';
import type { HdsYieldSignature } from '../../yield';

interface HdsFormSelectBaseSignature {
  Args: {
    isInvalid?: boolean;
    width?: string;
  };
  Blocks: {
    default: [
      {
        Options?: ComponentLike<HdsYieldSignature>;
      },
    ];
  };
  Element: HTMLSelectElement;
}

export default class HdsFormSelectBaseComponent extends Component<HdsFormSelectBaseSignature> {
  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames(): string {
    const classes = ['hds-form-select'];

    // add typographic classes
    classes.push('hds-typography-body-200', 'hds-font-weight-regular');

    // add a class based on the @isInvalid argument
    if (this.args.isInvalid) {
      classes.push(`hds-form-select--is-invalid`);
    }

    return classes.join(' ');
  }
}
