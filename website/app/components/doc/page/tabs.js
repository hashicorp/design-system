/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class DocPageTabsComponent extends Component {
  @action
  onClickTab(tab) {
    // Invoke the callback function if it's provided as argument
    if (typeof tab.onClickTab === 'function') {
      tab.onClickTab(tab);
    }

    // Set focus on tab clicked
    let tabElement = document.getElementById(tab.id);
    tabElement.focus();
  }
}
