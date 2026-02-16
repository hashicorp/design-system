/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { hash } from '@ember/helper';

import HdsFormHeaderTitle from './title.gts';
import HdsFormHeaderDescription from './description.gts';

export interface HdsFormHeaderSignature {
  Args: {
    isFullWidth?: boolean;
  };
  Blocks: {
    default: [
      {
        Title?: typeof HdsFormHeaderTitle;
        Description?: typeof HdsFormHeaderDescription;
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class HdsFormHeader extends Component<HdsFormHeaderSignature> {
  get classNames(): string {
    const classes = ['hds-form__header'];

    // add a class based on the @isFullWidth argument
    if (this.args.isFullWidth) {
      classes.push('hds-form-content--is-full-width');
    }

    return classes.join(' ');
  }

  <template>
    <div class={{this.classNames}} ...attributes>
      {{yield
        (hash Title=HdsFormHeaderTitle Description=HdsFormHeaderDescription)
      }}
    </div>
  </template>
}
