/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import type { ComponentLike } from '@glint/template';

import type { LabelComponentSignature } from '../label';

export interface FlexItemComponentSignature {
  Args: {
    grow?: boolean;
    label?: string;
  };
  Blocks: {
    default: [
      {
        Label?: ComponentLike<LabelComponentSignature>;
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class FlexItemComponent extends Component<FlexItemComponentSignature> {
  get classNames(): string {
    const classes = ['shw-flex__item'];

    // add a class based on the @grow argument
    if (this.args.grow === true) {
      classes.push('shw-flex__item--grow');
    }

    return classes.join(' ');
  }
}
