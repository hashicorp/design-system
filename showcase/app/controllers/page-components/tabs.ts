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
}
