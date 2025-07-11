/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

import type { HdsFormIndicatorSignature } from '../indicator/index.ts';

export interface HdsFormLegendSignature {
  Args: {
    contextualClass?: string;
    isOptional?: HdsFormIndicatorSignature['Args']['isOptional'];
    isRequired?: HdsFormIndicatorSignature['Args']['isRequired'];
    id?: string;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLLegendElement;
}

export default class HdsFormLegend extends Component<HdsFormLegendSignature> {
  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames(): string {
    const classes = ['hds-form-legend'];

    // add typographic classes
    classes.push('hds-typography-body-200', 'hds-font-weight-semibold');

    // add a class based on the @contextualClass argument
    // notice: this will *not* be documented for public use
    // the reason for this is that the contextual component declarations don't pass attributes to the component
    if (this.args.contextualClass) {
      classes.push(this.args.contextualClass);
    }

    return classes.join(' ');
  }
}
