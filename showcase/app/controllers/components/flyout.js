/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class FlyoutController extends Controller {
  @tracked mediumFlyoutActive = false;
  @tracked largeFlyoutActive = false;

  @action
  activateFlyout(Flyout) {
    this[Flyout] = true;
  }

  @action
  deactivateFlyout(Flyout) {
    this[Flyout] = false;
  }
}
