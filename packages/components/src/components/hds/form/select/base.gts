/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { hash } from '@ember/helper';
import style from 'ember-style-modifier';

import HdsYield from '../../yield/index.gts';

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
        Options?: typeof HdsYield;
      },
    ];
  };
  Element: HTMLSelectElement;
}

export default class HdsFormSelectBase extends Component<HdsFormSelectBaseSignature> {
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

  <template>
    <select
      class={{this.classNames}}
      {{style width=@width}}
      id={{@id}}
      aria-describedby={{@ariaDescribedBy}}
      ...attributes
    >
      {{yield (hash Options=HdsYield)}}
    </select>
  </template>
}
