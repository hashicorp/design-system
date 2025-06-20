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
  @tracked isModalActive = false;
  @tracked isFlyoutActive = false;

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

  @action
  activateModal() {
    this.isModalActive = true;
  }

  @action
  deactivateModal() {
    this.isModalActive = false;
  }

  @action
  activateFlyout() {
    this.isFlyoutActive = true;
  }

  @action
  deactivateFlyout() {
    this.isFlyoutActive = false;
  }
}
