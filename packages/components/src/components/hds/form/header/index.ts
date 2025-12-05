/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

import type { ComponentLike } from '@glint/template';
import type { HdsFormHeaderTitleSignature } from './title.ts';
import type { HdsFormHeaderDescriptionSignature } from './description.ts';

export interface HdsFormHeaderSignature {
  Args: {
    isFullWidth?: boolean;
  };
  Blocks: {
    default: [
      {
        Title?: ComponentLike<HdsFormHeaderTitleSignature>;
        Description?: ComponentLike<HdsFormHeaderDescriptionSignature>;
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
}
