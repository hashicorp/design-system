/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class TabsController extends Controller {
  queryParams = ['tab'];

  @tracked tab;
  @tracked showHighlight = false;

  @action
  toggleHighlight() {
    this.showHighlight = !this.showHighlight;
  }

  @action
  logClickedTab(event) {
    const tabId = event.target.id;
    console.log(`Tab with ID "${tabId}" clicked!`);
  }

  @action
  updateQueryParam(event) {
    this.tab = event.target.parentNode.getAttribute('data-tab-key');
  }

  get selectedTabIndex() {
    const { tab } = this;
    const allTabs = [...document.querySelectorAll('[data-tab-key]')];
    const selectedTab = document.querySelector(`[data-tab-key="${tab}"]`);
    const index = allTabs.indexOf(selectedTab);
    return index >= 0 ? index : 0;
  }
}
