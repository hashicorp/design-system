/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class FormController extends Controller {
  @tracked showHighlight = false;
  @tracked showDemoCustomWidthsToggleContent = {};

  @action
  toggleHighlight() {
    this.showHighlight = !this.showHighlight;
  }

  @action
  toggleDemoCustomWidthsStatus(usecase) {
    const current = this.showDemoCustomWidthsToggleContent[usecase] ?? false;
    // re-assign to trigger tracking
    this.showDemoCustomWidthsToggleContent = {
      ...this.showDemoCustomWidthsToggleContent,
    };
    this.showDemoCustomWidthsToggleContent[usecase] = !current;
  }
}
