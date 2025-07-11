/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

import type { PageComponentsFormModel } from 'showcase/routes/page-components/form/layout';

export default class PageComponentsFormController extends Controller {
  declare model: PageComponentsFormModel;

  @tracked showHighlight = false;
  @tracked showDemoCustomWidthsToggleContent = {};
  @tracked isModalActive = false;
  @tracked isFlyoutActive = false;

  @action
  toggleHighlight() {
    this.showHighlight = !this.showHighlight;
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
