/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import {
  HdsTableThSortOrderIconValues,
  HdsTableThSortOrderLabelValues,
  HdsTableThSortOrderValues,
} from './types.ts';
import type {
  HdsTableThSortOrder,
  HdsTableThSortOrderIcons,
  HdsTableThSortOrderLabels,
} from './types.ts';
export interface HdsTableThButtonSortArgs {
  Args: {
    labelId?: string;
    onClick?: () => void;
    sortOrder?: HdsTableThSortOrder;
  };
  Element: HTMLButtonElement;
}

const NOOP = () => {};

export default class HdsTableThButtonSort extends Component<HdsTableThButtonSortArgs> {
  prefixLabelId = 'prefix-' + guidFor(this);
  suffixLabelId = 'suffix-' + guidFor(this);

  get icon(): HdsTableThSortOrderIcons {
    switch (this.args.sortOrder) {
      case HdsTableThSortOrderValues.Asc:
        return HdsTableThSortOrderIconValues.ArrowUp;
      case HdsTableThSortOrderValues.Desc:
        return HdsTableThSortOrderIconValues.ArrowDown;
      default:
        return HdsTableThSortOrderIconValues.SwapVertical;
    }
  }

  get sortOrderLabel(): HdsTableThSortOrderLabels {
    return this.args.sortOrder === HdsTableThSortOrderValues.Asc
      ? HdsTableThSortOrderLabelValues.Desc
      : HdsTableThSortOrderLabelValues.Asc;
  }

  get onClick(): () => void {
    const { onClick } = this.args;

    if (typeof onClick === 'function') {
      return onClick;
    } else {
      return NOOP;
    }
  }

  get classNames(): string {
    const classes = ['hds-table__th-button', 'hds-table__th-button--sort'];

    // add a class based on the @sortOrder argument
    if (
      this.args.sortOrder === HdsTableThSortOrderValues.Asc ||
      this.args.sortOrder === HdsTableThSortOrderValues.Desc
    ) {
      classes.push(`hds-table__th-button--is-sorted`);
    }

    return classes.join(' ');
  }
}
