/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

import type { ComponentLike } from '@glint/template';
import type { HdsFormHeaderTitleSignature } from './title/index.ts';
import type { HdsFormHeaderDescriptionSignature } from './description/index.ts';

export interface HdsFormHeaderSignature {
  Args: {
    isFullWidth?: boolean;
  };
  Blocks: {
    default: [
      {
        HeaderTitle?: ComponentLike<HdsFormHeaderTitleSignature>;
        HeaderDescription?: ComponentLike<HdsFormHeaderDescriptionSignature>;
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class HdsFormHeader extends Component<HdsFormHeaderSignature> {
  get isFullWidth(): boolean {
    return this.args.isFullWidth ?? false;
  }

  get classNames(): string {
    const classes = ['hds-form__header'];

    // add a class based on the @isFullWidth argument
    if (this.isFullWidth) {
      classes.push('hds-form-content--is-full-width');
    }

    return classes.join(' ');
  }
}
