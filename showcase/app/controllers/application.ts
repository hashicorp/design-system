/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

import type RouterService from '@ember/routing/router-service';
import type Owner from '@ember/owner';

import type HdsThemingService from '@hashicorp/design-system-components/services/hds-theming';

export default class ApplicationController extends Controller {
  @service declare readonly router: RouterService;
  @service declare readonly hdsTheming: HdsThemingService;

  @tracked isFrameless = false;

  constructor(owner: Owner) {
    super(owner);
    this.router.on('routeDidChange', this.routeDidChange.bind(this));
    this.hdsTheming.initializeTheme();
  }

  routeDidChange() {
    // it's a "framless" page (we infer it from the URL for simplicity)
    this.isFrameless = this.router?.currentURL?.includes('frameless')
      ? true
      : false;
  }
}
