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
  @tracked dropdownInitiatedFlyoutActive = false;
  @tracked dropdownInitiatedWithReturnedFocusFlyoutActive = false;
  @tracked deactivateFlyoutOnCloseActive = false;
  @tracked deactivateFlyoutOnDestroyActive = false;
  @tracked deactivateFlyoutOnSubmitActive = false;
  @tracked deactivateFlyoutOnSubmitValidationError = false;

  @action
  activateFlyout(Flyout) {
    this[Flyout] = true;
  }

  @action
  deactivateFlyout(Flyout) {
    this[Flyout] = false;
  }

  @action
  deactivateFlyoutOnSubmit(event) {
    event.preventDefault(); // Prevent page reload
    const formData = new FormData(event.target);
    const value = formData.get('deactivate-flyout-on-submit__input');

    if (!value) {
      this.deactivateFlyoutOnSubmitValidationError = true;
    } else {
      this.deactivateFlyoutOnSubmitValidationError = false;
      this.deactivateFlyoutOnSubmitActive = false;
    }
  }
}
