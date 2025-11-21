/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';
import type { ModelFrom } from 'showcase/utils/model-from-route';
import { service } from '@ember/service';

import ShwThemingService from 'showcase/services/shw-theming';

export type PageComponentsFormFramelessDemoFormComplexModel =
  ModelFrom<PageComponentsFormFramelessDemoFormComplexRoute>;

export default class PageComponentsFormFramelessDemoFormComplexRoute extends Route {
  @service declare readonly shwTheming: ShwThemingService;

  // this is not a perfect solution, but for the moment it will do
  // later we can evaluate if use a different approach
  // see: https://hashicorp.atlassian.net/browse/HDS-5680
  activate() {
    this.shwTheming.setStylesheet('css-selectors--migration');
  }
}
