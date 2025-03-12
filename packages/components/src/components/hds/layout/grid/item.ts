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

  get classNames(): string {
    const classes = ['hds-layout-grid-item'];

    return classes.join(' ');
  }
}
