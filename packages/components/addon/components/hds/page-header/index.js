/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';

export default class HdsPageHeaderComponent extends Component {
  /**
   * @param title
   * @type {string}
   */

  get title() {
    let { title } = this.args;

    assert(
      '@title for "Hds::PageHeader" must have a valid value',
      title !== undefined
    );

    return title;
  }
}
