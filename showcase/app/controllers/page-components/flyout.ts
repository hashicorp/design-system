/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { TrackedObject } from 'tracked-built-ins';
import { tracked } from '@glimmer/tracking';

import type { PageComponentsFlyoutModel } from 'showcase/routes/page-components/flyout';

export default class PageComponentsFlyoutController extends Controller {
  declare model: PageComponentsFlyoutModel;

  flyouts = new TrackedObject({
    mediumFlyoutActive: false,
    largeFlyoutActive: false,
    dropdownInitiatedFlyoutActive: false,
    dropdownInitiatedWithReturnedFocusFlyoutActive: false,
    deactivateFlyoutOnCloseActive: false,
    deactivateFlyoutOnDestroyActive: false,
    deactivateFlyoutOnSubmitActive: false,
  });

  @tracked deactivateFlyoutOnSubmitValidationError = false;

  @action
  activateFlyout(flyout: keyof typeof this.flyouts) {
    this.flyouts[flyout] = true;
  }

  @action
  deactivateFlyout(flyout: keyof typeof this.flyouts) {
    this.flyouts[flyout] = false;
  }

  @action
  deactivateFlyoutOnSubmit(event: Event) {
    event.preventDefault(); // Prevent page reload

    if (event.target instanceof HTMLFormElement) {
      const formData = new FormData(event.target);
      const value = formData.get('deactivate-flyout-on-submit__input');

      if (!value) {
        this.deactivateFlyoutOnSubmitValidationError = true;
      } else {
        this.deactivateFlyoutOnSubmitValidationError = false;
        this.flyouts.deactivateFlyoutOnSubmitActive = false;
      }
    }
  }
}
