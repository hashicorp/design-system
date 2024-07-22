/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';

import { HdsTableHorizontalAlignment } from './types.ts';

export const ALIGNMENTS: string[] = Object.values(HdsTableHorizontalAlignment);
export const DEFAULT_ALIGN = HdsTableHorizontalAlignment.Left;

export interface HdsTableTdArgs {
  Args: {
    align?: HdsTableHorizontalAlignment;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLTableCellElement;
}
export default class HdsTableTdComponent extends Component<HdsTableTdArgs> {
  /**
   * @param align
   * @type {string}
   * @default left
   * @description Determines the text alignment of the header or cell content. Options are: "left", "center", "right". If no align is defined, "left" is used.
   */
  get align(): HdsTableHorizontalAlignment {
    const { align = DEFAULT_ALIGN } = this.args;

    assert(
      `@align for "Hds::Table::Td" must be one of the following: ${ALIGNMENTS.join(
        ', '
      )}; received: ${align}`,
      ALIGNMENTS.includes(align)
    );
    return align;
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames(): string {
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
