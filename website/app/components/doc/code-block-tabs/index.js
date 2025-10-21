/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { guidFor } from '@ember/object/internals';

export default class DocCodeBlockTabsComponent extends Component {
  @tracked selectedTab = 'gts';

  id = guidFor(this);

  @action
  onClickTab(tab) {
    this.selectedTab = tab;
    // // Invoke the callback function if it's provided as argument
    // if (typeof tab.onClickTab === 'function') {
    //   tab.onClickTab(tab);
    // }

    // // Set focus on tab clicked
    // let tabElement = document.getElementById(tab.id);
    // tabElement.focus();
  }
}
