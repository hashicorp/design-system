/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

import type { ComponentLike } from '@glint/template';
import type { LabelComponentSignature } from '../label';

export interface GridItemComponentSignature {
  Args: {
    forceMinWidth?: boolean;
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

export default class GridItemComponent extends Component<GridItemComponentSignature> {
  get classNames(): string {
    const classes = ['shw-grid__item'];

    // add a class based on the @grow argument
    if (this.args.grow === true) {
      classes.push('shw-grid__item--grow');
    }

    // add a class based on the @forceMinWidth argument
    if (this.args.forceMinWidth === true) {
      classes.push('shw-grid__item--force-min-width');
    }

    return classes.join(' ');
  }
}
