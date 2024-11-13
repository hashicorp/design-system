/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ApplicationController extends Controller {
  @service router;

  @tracked isFrameless = false;

  constructor() {
    super(...arguments);
    this.router.on('routeDidChange', this, 'routeDidChange');
  }

  routeDidChange() {
    // it's a "framless" page (we infer it from the URL for simplicity)
    this.isFrameless = this.router?.currentURL?.includes('frameless');
  }

  @action
  onChangePageTheme(event) {
    console.log(`Theme: ${event.target.value}`);
  }
}
