/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

export default class DocPageContentComponent extends Component {
  get links() {
    let { extra } = this.args;

    if (extra?.links) {
      return extra?.links;
    } else {
      return false;
    }
  }
}
