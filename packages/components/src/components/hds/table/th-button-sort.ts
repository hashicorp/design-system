/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import {
  HdsTableSortOrderLongValues,
  HdsTableSortOrderValues,
  HdsThButtonSortIconMapValues,
} from './types';

const NOOP = () => {};

export interface ThButtonSortSignature {
  Args: {
    labelId: unknown;
    onClick?: () => void;
    sortOrder: HdsTableSortOrderValues;
  };
  Element: HTMLButtonElement;
}

export default class ThButtonSortComponent extends Component<ThButtonSortSignature> {
  /**
   * Generates a unique ID for the (hidden) "label prefix/suffix" <span> elements
   *
   * @param prefixLabelId/suffixLabelId
   */
  prefixLabelId = 'prefix-' + guidFor(this);
  suffixLabelId = 'suffix-' + guidFor(this);

  /**
   * @param icon
   * @type {string}
   * @private
   * @default HdsThButtonSortIconValues.SwapVertical
   * @description Determines which icon to use based on the sort order defined
   */
  get icon() {
    return this.args.sortOrder
      ? HdsThButtonSortIconMapValues[this.args.sortOrder]
      : HdsThButtonSortIconMapValues[HdsTableSortOrderValues.None];
  }

  /**
   * @param sortOrderLabel
   * @default HdsTableSortOrderLongValues.Ascending
   * @description Determines the label (suffix) to use in the `aria-labelledby` attribute of the button, used to indicate what will happen if the user clicks on the button
   */
  get sortOrderLabel(): Extract<
    HdsTableSortOrderLongValues,
    | HdsTableSortOrderLongValues.Ascending
    | HdsTableSortOrderLongValues.Descending
  > {
    return this.args.sortOrder === HdsTableSortOrderValues.Asc
      ? HdsTableSortOrderLongValues.Descending
      : HdsTableSortOrderLongValues.Ascending;
  }

  /**
   * @param onClick
   * @type {function}
   * @default () => {}
   */
  get onClick() {
    return this.args.onClick ?? NOOP;
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    const classes = ['hds-table__th-button', 'hds-table__th-button--sort'];

    // add a class based on the @sortOrder argument
    if (this.args.sortOrder === 'asc' || this.args.sortOrder === 'desc') {
      classes.push(`hds-table__th-button--is-sorted`);
    }

    return classes.join(' ');
  }
}
