/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

import HdsFormIndicator from '../indicator/index.gts';

import type { HdsFormIndicatorSignature } from '../indicator/index.gts';

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

  <template>
    <legend class={{this.classNames}} id={{@id}} ...attributes>
      {{yield}}
      <HdsFormIndicator
        @isRequired={{@isRequired}}
        @isOptional={{@isOptional}}
      />
    </legend>
  </template>
}
