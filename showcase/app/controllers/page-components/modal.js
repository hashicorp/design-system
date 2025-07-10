/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class PageModalController extends Controller {
  @tracked basicModalActive = false;
  @tracked longModalActive = false;
  @tracked formModalActive = false;
  @tracked tabsModalActive = false;
  @tracked dropdownModalActive = false;
  @tracked superselectModalActive1 = false;
  @tracked superselectModalActive2 = false;
  @tracked superselectModalActive3 = false;
  @tracked dismissDisabledModalActive = false;
  @tracked isDismissDisabled;
  @tracked dropdownInitiatedModalActive = false;
  @tracked dropdownInitiatedWithReturnedFocusModalActive = false;
  @tracked deactivateModalOnCloseActive = false;
  @tracked deactivateModalOnDestroyActive = false;
  @tracked deactivateModalOnSubmitActive = false;
  @tracked deactivateModalOnSubmitValidationError = false;

  @action
  activateModal(modal) {
    this[modal] = true;

    if (modal === 'dismissDisabledModalActive') {
      this.isDismissDisabled = true;
    }
  }

  @action
  deactivateModal(modal) {
    this[modal] = false;

    if (modal === 'dismissDisabledModalActive') {
      this.isDismissDisabled = undefined;
    }
  }

  @action
  deactivateModalOnSubmit(event) {
    event.preventDefault(); // Prevent page reload
    const formData = new FormData(event.target);
    const value = formData.get('deactivate-modal-on-submit__input');

    if (!value) {
      this.deactivateModalOnSubmitValidationError = true;
    } else {
      this.deactivateModalOnSubmitValidationError = false;
      this.deactivateModalOnSubmitActive = false;
    }
  }

  @action
  resetIsDismissDisabled() {
    this.isDismissDisabled = false;
  }
}
