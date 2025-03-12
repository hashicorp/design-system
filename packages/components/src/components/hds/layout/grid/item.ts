/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

// A list of all existing tag names in the HTMLElementTagNameMap interface
type AvailableTagNames = keyof HTMLElementTagNameMap;
// A union of all types in the HTMLElementTagNameMap interface
type AvailableElements = HTMLElementTagNameMap[keyof HTMLElementTagNameMap];

export interface HdsLayoutGridItemSignature {
  Args: {
    tag?: AvailableTagNames;
    colSpan?: string;
    rowSpan?: string;
  };
  Blocks: {
    default: [];
  };
  Element: AvailableElements;
}

export default class HdsLayoutFlexItem extends Component<HdsLayoutGridItemSignature> {
  get componentTag(): AvailableTagNames {
    return this.args.tag ?? 'div';
  }

  get colSpanStyle(): Record<string, string> {
    const colSpanStyle: { [key: string]: string } = {};

    colSpanStyle['--hds-layout-grid-column-span'] = this.args.colSpan ?? '1';
    return colSpanStyle;
  }

  get rowSpanStyle(): Record<string, string> {
    const rowSpanStyle: { [key: string]: string } = {};

    rowSpanStyle['--hds-layout-grid-row-span'] = this.args.rowSpan ?? '1';
    return rowSpanStyle;
  }

  get classNames(): string {
    const classes = ['hds-layout-grid-item'];

    return classes.join(' ');
  }
}
