/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import {
  HdsTreeGridThSortOrderIconValues,
  HdsTreeGridThSortOrderLabelValues,
  HdsTreeGridThSortOrderValues,
} from './types.ts';
import type {
  HdsTreeGridThSortOrder,
  HdsTreeGridThSortOrderIcons,
  HdsTreeGridThSortOrderLabels,
} from './types.ts';
export interface HdsTreeGridThButtonSortSignature {
  Args: {
    labelId?: string;
    onClick?: () => void;
    sortOrder?: HdsTreeGridThSortOrder;
  };
  Element: HTMLButtonElement;
}

const NOOP = () => {};

export default class HdsTreeGridThButtonSort extends Component<HdsTreeGridThButtonSortSignature> {
  // Generates a unique ID for the (hidden) "label prefix/suffix" <span> elements
  prefixLabelId = 'prefix-' + guidFor(this);
  suffixLabelId = 'suffix-' + guidFor(this);

  get icon(): HdsTreeGridThSortOrderIcons {
    switch (this.args.sortOrder) {
      case HdsTreeGridThSortOrderValues.Asc:
        return HdsTreeGridThSortOrderIconValues.ArrowUp;
      case HdsTreeGridThSortOrderValues.Desc:
        return HdsTreeGridThSortOrderIconValues.ArrowDown;
      default:
        return HdsTreeGridThSortOrderIconValues.SwapVertical;
    }
  }

  // Determines the label (suffix) to use in the `aria-labelledby` attribute of the button,
  // used to indicate what will happen if the user clicks on the button
  get sortOrderLabel(): HdsTreeGridThSortOrderLabels {
    return this.args.sortOrder === HdsTreeGridThSortOrderValues.Asc
      ? HdsTreeGridThSortOrderLabelValues.Desc
      : HdsTreeGridThSortOrderLabelValues.Asc;
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
      this.args.sortOrder === HdsTreeGridThSortOrderValues.Asc ||
      this.args.sortOrder === HdsTreeGridThSortOrderValues.Desc
    ) {
      classes.push(`hds-table__th-button--is-sorted`);
    }

    return classes.join(' ');
  }
}
