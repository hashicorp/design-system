/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';

import type RouterService from '@ember/routing/router-service';
import type { PageComponentsTabsModel } from 'showcase/routes/page-components/tabs';

const getRandomInteger = (max = 125) => Math.floor(Math.random() * max);

export default class PageComponentsTabsController extends Controller {
  declare model: PageComponentsTabsModel;

  queryParams = [
    'currentTab_demo1',
    'currentTab_demo2',
    'currentTab_demo2_subtab1',
    'currentTab_demo2_subtab2',
  ];

  @service declare router: RouterService;

  @tracked showHighlight = false;

  @tracked currentTab_demo1 = 0;
  @tracked currentTab_demo2 = 0;
  @tracked currentTab_demo2_subtab1 = 0;
  @tracked currentTab_demo2_subtab2 = 0;
  // --- we initialize to non-random values to avoid visual regression tests to fail
  @tracked count1_demo3: string | undefined = undefined;
  @tracked count2_demo3 = '2';
  @tracked count3_demo3 = '3';
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
  logClickedTab(event: MouseEvent, index: number) {
    const eventTarget = event.target as HTMLElement;
    const tabId = eventTarget?.id;
    console.log(`Tab with ID "${tabId}" and index "${index}" clicked!`);
  }

  // =============================
  // DEMOS
  // =============================

  // DEMO #1

  get selectedTabDemo1() {
    return this.currentTab_demo1 !== undefined ? this.currentTab_demo1 : 0;
  }

  @action
  updateQueryParamDemo1(_event: MouseEvent, index: number) {
    this.currentTab_demo1 = index;
  }

  // DEMO #2

  get selectedTabDemo2() {
    return this.currentTab_demo2 !== undefined ? this.currentTab_demo2 : 0;
  }

  get selectedTabDemo2_SubTab1() {
    return this.currentTab_demo2_subtab1 !== undefined
      ? this.currentTab_demo2_subtab1
      : 0;
  }

  get selectedTabDemo2_SubTab2() {
    return this.currentTab_demo2_subtab2 !== undefined
      ? this.currentTab_demo2_subtab2
      : 0;
  }

  @action
  updateQueryParamDemo2(_event: MouseEvent, index: number) {
    this.currentTab_demo2 = index;
  }

  @action
  updateQueryParamDemo2_SubTab1(_event: MouseEvent, index: number) {
    this.currentTab_demo2_subtab1 = index;
  }

  @action
  updateQueryParamDemo2_SubTab2(_event: MouseEvent, index: number) {
    this.currentTab_demo2_subtab2 = index;
  }

  // DEMO #3

  @action
  updateCountValuesDemo3() {
    this.count1_demo3 = String(getRandomInteger());
    this.count2_demo3 = String(getRandomInteger());
    this.count3_demo3 = String(getRandomInteger());
  }

  // DEMO #4

  @action
  setAtSelectedDemo4(tab: string) {
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
  setSelectedTabDemo5(tab: string) {
    this.selectedTab_demo5 = tab;
  }
}
