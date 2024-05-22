/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { HdsTableCellTextAlignValues } from './types.ts';

// Do we need it?
// const ALIGNMENTS = Object.values(HdsTableCellTextAlignValues);
const DEFAULT_ALIGN = HdsTableCellTextAlignValues.Left;

interface TdSignature {
  Args: {
    align?: HdsTableCellTextAlignValues;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLTableCellElement;
}

export default class TdComponent extends Component<TdSignature> {
  /**
   * @param align
   * @typedef {HdsTableCellTextAlignValues}
   * @default left
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
    const classes = [
      'hds-table__td',
      'hds-typography-body-200',
      'hds-font-weight-regular',
    ];

    // add a class based on the @align argument
    if (this.align) {
      classes.push(`hds-table__td--align-${this.align}`);
    }

    return classes.join(' ');
  }
}
