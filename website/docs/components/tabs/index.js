/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class Index extends Component {
  @service router;

  @tracked
  selectedTabIndex = 0;

  @action
  logClickedTab(event) {
    const tabId = event.target.id;
    console.log(`Tab with ID "${tabId}" clicked!`);
  }

  @action
  changeActiveTab() {
    const allTabs = [
      ...document.querySelectorAll('.dynamic-index-control .hds-tabs__tab'),
    ];
    const currentTab = document.querySelector(
      '.dynamic-index-control .hds-tabs__tab--is-selected'
    );
    const currentIndex = allTabs.indexOf(currentTab);
    this.selectedTabIndex =
      currentIndex < allTabs.length - 1 ? currentIndex + 1 : 0;
  }
}
