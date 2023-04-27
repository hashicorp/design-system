/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';

export default class HdsSideNavHeaderIconButtonComponent extends Component {
  /**
   * @param ariaLabel
   * @type {string}
   * @description The value of `aria-label`
   */
  get ariaLabel() {
    let { ariaLabel } = this.args;

    assert(
      '@ariaLabel for "Hds::SideNav::Header::IconButton" must have a valid value',
      ariaLabel !== undefined
    );

    return ariaLabel;
  }
}
