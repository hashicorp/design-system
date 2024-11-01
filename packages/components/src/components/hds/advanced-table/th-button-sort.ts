/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import {
  HdsAdvancedTableThSortOrderIconValues,
  HdsAdvancedTableThSortOrderLabelValues,
  HdsAdvancedTableThSortOrderValues,
} from './types.ts';
import type {
  HdsAdvancedTableThSortOrder,
  HdsAdvancedTableThSortOrderIcons,
  HdsAdvancedTableThSortOrderLabels,
} from './types.ts';
export interface HdsAdvancedTableThButtonSortSignature {
  Args: {
    labelId?: string;
    onClick?: () => void;
    sortOrder?: HdsAdvancedTableThSortOrder;
  };
  Element: HTMLButtonElement;
}

const NOOP = () => {};

export default class HdsAdvancedTableThButtonSort extends Component<HdsAdvancedTableThButtonSortSignature> {
  // Generates a unique ID for the (hidden) "label prefix/suffix" <span> elements
  prefixLabelId = 'prefix-' + guidFor(this);
  suffixLabelId = 'suffix-' + guidFor(this);

  get icon(): HdsAdvancedTableThSortOrderIcons {
    switch (this.args.sortOrder) {
      case HdsAdvancedTableThSortOrderValues.Asc:
        return HdsAdvancedTableThSortOrderIconValues.ArrowUp;
      case HdsAdvancedTableThSortOrderValues.Desc:
        return HdsAdvancedTableThSortOrderIconValues.ArrowDown;
      default:
        return HdsAdvancedTableThSortOrderIconValues.SwapVertical;
    }
  }

  // Determines the label (suffix) to use in the `aria-labelledby` attribute of the button,
  // used to indicate what will happen if the user clicks on the button
  get sortOrderLabel(): HdsAdvancedTableThSortOrderLabels {
    return this.args.sortOrder === HdsAdvancedTableThSortOrderValues.Asc
      ? HdsAdvancedTableThSortOrderLabelValues.Desc
      : HdsAdvancedTableThSortOrderLabelValues.Asc;
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
    const classes = [
      'hds-advanced-table__th-button',
      'hds-advanced-table__th-button--sort',
    ];

    // add a class based on the @sortOrder argument
    if (
      this.args.sortOrder === HdsAdvancedTableThSortOrderValues.Asc ||
      this.args.sortOrder === HdsAdvancedTableThSortOrderValues.Desc
    ) {
      classes.push(`hds-advanced-table__th-button--is-sorted`);
    }

    return classes.join(' ');
  }
}
