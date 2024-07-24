/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import type { HdsTextBodySignature } from '../../text/body';

interface HdsDropdownListItemTitleSignature {
  Args: {
    text: string;
  };
  Element: HdsTextBodySignature['Element'];
}

export default class HdsDropdownListItemTitleComponent extends Component<HdsDropdownListItemTitleSignature> {
  /**
   * @param text
   * @type {string}
   * @description The text of the item. If no text value is defined an error will be thrown
   */
  get text(): string {
    const { text } = this.args;

    assert(
      '@text for "Hds::Dropdown::ListItem::Title" must have a valid value',
      text !== undefined
    );

    return text;
  }
}
