/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

import type { PageComponentButtonSetModel } from 'showcase/routes/page-components/button-set';

export default class PageComponentsButtonSetController extends Controller {
  declare model: PageComponentButtonSetModel;

  @tracked isLoading = false;
  @tracked timer: ReturnType<typeof setTimeout> | undefined;

  @action
  toggleIsLoading() {
    this.isLoading = !this.isLoading;

    if (this.timer) {
      clearTimeout(this.timer);
    }
    // make it go back to the idle state
    this.timer = setTimeout(() => {
      this.isLoading = false;
    }, 4000);
  }
}
