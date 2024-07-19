/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import {
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
      case HdsTableThSortOrder.Asc:
        return HdsTableThSortOrderIcons.ArrowUp;
      case HdsTableThSortOrder.Desc:
        return HdsTableThSortOrderIcons.ArrowDown;
      default:
        return HdsTableThSortOrderIcons.SwapVertical;
    }
  }

  /**
   * @param sortOrderLabel
   * @default 'ascending'
   * @description Determines the label (suffix) to use in the `aria-labelledby` attribute of the button, used to indicate what will happen if the user clicks on the button
   */
  get sortOrderLabel(): HdsTableThSortOrderLabels {
    return this.args.sortOrder === HdsTableThSortOrder.Asc
      ? HdsTableThSortOrderLabels.Desc
      : HdsTableThSortOrderLabels.Asc;
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
      this.args.sortOrder === HdsTableThSortOrder.Asc ||
      this.args.sortOrder === HdsTableThSortOrder.Desc
    ) {
      classes.push(`hds-table__th-button--is-sorted`);
    }

    return classes.join(' ');
  }
}
