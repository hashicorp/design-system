/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import type { ComponentLike } from '@glint/template';
import type { HdsYieldSignature } from '../../yield';

export interface HdsFormSelectBaseSignature {
  Args: {
    isInvalid?: boolean;
    width?: string;
    id?: string;
    ariaDescribedBy?: string;
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

export default class HdsFormSelectBase extends Component<HdsFormSelectBaseSignature> {
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
