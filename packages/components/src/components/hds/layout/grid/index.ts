/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import type { ComponentLike } from '@glint/template';
// TODO: Determine if "GridItem" should be created & used instead of "FlexItem"
import type { HdsLayoutFlexItemSignature } from '../flex/item.ts';

// A list of all existing tag names in the HTMLElementTagNameMap interface
type AvailableTagNames = keyof HTMLElementTagNameMap;
// A union of all types in the HTMLElementTagNameMap interface
type AvailableElements = HTMLElementTagNameMap[keyof HTMLElementTagNameMap];

export interface HdsLayoutGridSignature {
  Args: {
    tag?: AvailableTagNames;
    isInline?: boolean;
  };
  Blocks: {
    default: [
      {
        // TODO: Determine if "GridItem" should be created & used instead of "FlexItem"
        Item?: ComponentLike<HdsLayoutFlexItemSignature>;
      },
    ];
  };
  Element: AvailableElements;
}
// More info on types and signatures: https://hashicorp.atlassian.net/wiki/spaces/HDS/pages/3245932580/Using+Typescript

export default class HdsLayoutGrid extends Component<HdsLayoutGridSignature> {
  get componentTag(): AvailableTagNames {
    return this.args.tag ?? 'div';
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames(): string {
    const classes = ['hds-layout-grid'];

    // add a class based on the @xxx argument
    // classes.push(`hds-layout-grid--[variant]-${this.xxx}`);

    return classes.join(' ');
  }
}
