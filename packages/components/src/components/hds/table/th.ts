/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { HdsTableCellTextAlignValues } from './types.ts';

const DEFAULT_ALIGN = HdsTableCellTextAlignValues.Left;

export interface ThSignature {
  Args: {
    align: HdsTableCellTextAlignValues;
    isVisuallyHidden: boolean;
    scope: unknown;
    tooltip: unknown;
    width: unknown;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLTableCellElement;
}

export default class ThComponent extends Component<ThSignature> {
  /**
   * Generates a unique ID for the <span> element ("label")
   *
   * @param labelId
   */
  labelId = guidFor(this);

  /**
   * @param align
   * @type {string}
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
    // eslint-disable-next-line prefer-const
    let classes = ['hds-table__th'];

    // add a class based on the @align argument
    if (this.align) {
      classes.push(`hds-table__th--align-${this.align}`);
    }

    return classes.join(' ');
  }
}
