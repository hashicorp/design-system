/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

const getRandomInteger = (max = 125) => Math.floor(Math.random() * max);
export default class TabsController extends Controller {
  queryParams = [
    'currentTab_demo1',
    'currentTab_demo2',
    'currentTab_demo2_subtab1',
    'currentTab_demo2_subtab2',
  ];

  @service router;

  @tracked showHighlight = false;

  @tracked currentTab_demo1;
  @tracked currentTab_demo2;
  @tracked currentTab_demo2_subtab1;
  @tracked currentTab_demo2_subtab2;
  // --- we initialize to non-random values to avoid visual regression tests to fail
  @tracked badge1_demo3 = undefined;
  @tracked badge2_demo3 = 2;
  @tracked badge3_demo3 = 3;
  // ---
  @tracked atSelected_demo4 = 'two';
  // ---
  @tracked selectedTab_demo5 = 'two';

  // =============================
  // GENERIC HANDLERS
  // =============================

  @action
  toggleHighlight() {
    this.showHighlight = !this.showHighlight;
  }

  @action
  logClickedTab(event) {
    const tabId = event.target.id;
    console.log(`Tab with ID "${tabId}" clicked!`);
  }

  // =============================
  // DEMOS
  // =============================

  // DEMO #1

  get selectedTabDemo1() {
    return this.currentTab_demo1 !== undefined
      ? parseInt(this.currentTab_demo1, 10)
      : 0;
  }

  @action
  updateQueryParamDemo1(_element, index) {
    this.currentTab_demo1 = index;
  }

  // DEMO #2

  get selectedTabDemo2() {
    return this.currentTab_demo2 !== undefined
      ? parseInt(this.currentTab_demo2, 10)
      : 0;
  }

  get selectedTabDemo2_SubTab1() {
    return this.currentTab_demo2_subtab1 !== undefined
      ? parseInt(this.currentTab_demo2_subtab1, 10)
      : 0;
  }

  get selectedTabDemo2_SubTab2() {
    return this.currentTab_demo2_subtab2 !== undefined
      ? parseInt(this.currentTab_demo2_subtab2, 10)
      : 0;
  }

  @action
  updateQueryParamDemo2(_element, index) {
    this.currentTab_demo2 = index;
  }

  @action
  updateQueryParamDemo2_SubTab1(_element, index) {
    this.currentTab_demo2_subtab1 = index;
  }

  @action
  updateQueryParamDemo2_SubTab2(_element, index) {
    this.currentTab_demo2_subtab2 = index;
  }

  // DEMO #3

  @action
  updateBadgesValuesDemo3() {
    this.badge1_demo3 = getRandomInteger();
    this.badge2_demo3 = getRandomInteger();
    this.badge3_demo3 = getRandomInteger();
  }

  // DEMO #4

  @action
  setAtSelectedDemo4(tab) {
    this.atSelected_demo4 = tab;
  }

  // DEMO #5

  get tabsDemo5() {
    return [
      {
        label: 'One',
        content: 'Content one',
        isSelected: this.selectedTab_demo5 === 'one',
      },
      {
        label: 'Two',
        content: 'Content two',
        isSelected: this.selectedTab_demo5 === 'two',
      },
      {
        label: 'Three',
        content: 'Content three',
        isSelected: this.selectedTab_demo5 === 'three',
      },
    ];
  }

  @action
  setSelectedTabDemo5(tab) {
    this.selectedTab_demo5 = tab;
  }
}
