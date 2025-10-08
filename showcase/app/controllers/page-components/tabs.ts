/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class PageComponentsTabsController extends Controller {

  queryParams = [
    'currentTabWithRouting',

    'currentTabWithRoutingAndNestedTabs',
    'currentTabSubTab1WithRoutingAndNestedTabs',
    'currentTabSubTab2WithRoutingAndNestedTabs',
  ];

  @tracked currentTabWithRouting = 0;

  @tracked currentTabWithRoutingAndNestedTabs = 0;
  @tracked currentTabSubTab1WithRoutingAndNestedTabs = 0;
  @tracked currentTabSubTab2WithRoutingAndNestedTabs = 0;

  // // DEMO #2

  // get selectedTabDemo2() {
  //   return this.currentTab_demo2 !== undefined ? this.currentTab_demo2 : 0;
  // }

  // get selectedTabDemo2_SubTab1() {
  //   return this.currentTab_demo2_subtab1 !== undefined
  //     ? this.currentTab_demo2_subtab1
  //     : 0;
  // }

  // get selectedTabDemo2_SubTab2() {
  //   return this.currentTab_demo2_subtab2 !== undefined
  //     ? this.currentTab_demo2_subtab2
  //     : 0;
  // }

  // @action
  // updateQueryParamDemo2(_event: MouseEvent, index: number) {
  //   this.currentTab_demo2 = index;
  // }

  // @action
  // updateQueryParamDemo2_SubTab1(_event: MouseEvent, index: number) {
  //   this.currentTab_demo2_subtab1 = index;
  // }

  // @action
  // updateQueryParamDemo2_SubTab2(_event: MouseEvent, index: number) {
  //   this.currentTab_demo2_subtab2 = index;
  // }
}
