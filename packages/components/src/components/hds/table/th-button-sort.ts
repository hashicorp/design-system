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

export default class HdsTableThButtonSortComponent extends Component<HdsTableThButtonSortArgs> {
  /**
   * Generates a unique ID for the (hidden) "label prefix/suffix" <span> elements
   *
   * @param prefixLabelId/suffixLabelId
   */
  prefixLabelId = 'prefix-' + guidFor(this);
  suffixLabelId = 'suffix-' + guidFor(this);

  /**
   * @param icon
   * @type {HdsTableThSortOrderIcons}
   * @private
   * @default swap-vertical
   * @description Determines which icon to use based on the sort order defined
   */
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

  /**
   * @param sortOrderLabel
   * @default 'ascending'
   * @description Determines the label (suffix) to use in the `aria-labelledby` attribute of the button, used to indicate what will happen if the user clicks on the button
   */
  get sortOrderLabel(): HdsTableThSortOrderLabels {
    return this.args.sortOrder === HdsTableThSortOrderValues.Asc
      ? HdsTableThSortOrderLabelValues.Desc
      : HdsTableThSortOrderLabelValues.Asc;
  }

  /**
   * @param onClick
   * @type {function}
   * @default () => {}
   */
  get onClick(): () => void {
    const { onClick } = this.args;

    if (typeof onClick === 'function') {
      return onClick;
    } else {
      return NOOP;
    }
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
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
