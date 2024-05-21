/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';

import {
  HdsTableCellTextAlignValues,
  HdsTableSortOrderValues,
  HdsTableSortOrderMapValues,
} from './types.ts';

// const ALIGNMENTS = Object.values(HdsTableCellTextAlignValues);
const DEFAULT_ALIGN = HdsTableCellTextAlignValues.Left;

export interface ThSortSignature {
  Args: {
    align?: HdsTableCellTextAlignValues;
    onClickSort?: unknown;
    sortOrder?: HdsTableSortOrderValues;
    tooltip?: unknown;
    width?: unknown;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLTableCellElement;
}

export default class ThSortComponent extends Component<ThSortSignature> {
  /**
   * Generates a unique ID for the <span> element ("label")
   *
   * @param labelId
   */
  labelId = guidFor(this);

  /**
   * @param ariaSort
   * @type {string}
   * @private
   * @default HdsTableSortOrderValues.None
   * @description Sets the aria-sort attribute based on the sort order defined; acceptable values are ascending, descending, none(default) and other. Authors SHOULD only apply this property to table headers or grid headers. If the property is not provided, there is no defined sort order. For each table or grid, authors SHOULD apply aria-sort to only one header at a time.
   */
  get ariaSort() {
    return this.args.sortOrder
      ? HdsTableSortOrderMapValues[this.args.sortOrder]
      : HdsTableSortOrderMapValues[HdsTableSortOrderValues.None];
  }

  /**
   * @param align
   * @type {HdsTableCellTextAlignValues}
   * @default HdsTableCellTextAlignValues.Left
   * @description Determines the text alignment of the header or cell content. Options are: "left", "center", "right". If no align is defined, "left" is used.
   */
  get align() {
    return this.args.align ?? DEFAULT_ALIGN;
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    const classes = ['hds-table__th', 'hds-table__th--sort'];

    // add a class based on the @align argument
    if (this.align) {
      classes.push(`hds-table__th--align-${this.align}`);
    }

    return classes.join(' ');
  }
}
