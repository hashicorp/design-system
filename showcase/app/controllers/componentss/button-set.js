/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ButtonSetController extends Controller {
  @tracked isLoading = false;
  @tracked timer;

  @action
  toggleIsLoading() {
    this.isLoading = !this.isLoading;

    clearTimeout(this.timer);
    // make it go back to the idle state
    this.timer = setTimeout(() => {
      this.isLoading = false;
    }, 4000);
  }
}
