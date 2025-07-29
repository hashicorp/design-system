/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { deepTracked } from 'ember-deep-tracked';

import type { PageComponentsModalModel } from 'showcase/routes/page-components/modal';

export default class PageComponentsModalController extends Controller {
  declare model: PageComponentsModalModel;

  @deepTracked modals = {
    basicModalActive: false,
    longModalActive: false,
    formModalActive: false,
    tabsModalActive: false,
    dropdownModalActive: false,
    superselectModalActive1: false,
    superselectModalActive2: false,
    superselectModalActive3: false,
    dismissDisabledModalActive: false,
    dropdownInitiatedModalActive: false,
    dropdownInitiatedWithReturnedFocusModalActive: false,
    deactivateModalOnCloseActive: false,
    deactivateModalOnDestroyActive: false,
    deactivateModalOnSubmitActive: false,
    deactivateModalOnSubmitValidationError: false,
  };

  @tracked isDismissDisabled: boolean | undefined = undefined;

  @action
  activateModal(modal: keyof typeof this.modals) {
    this.modals[modal] = true;

    if (modal === 'dismissDisabledModalActive') {
      this.isDismissDisabled = true;
    }
  }

  @action
  deactivateModal(modal: keyof typeof this.modals) {
    this.modals[modal] = false;

    if (modal === 'dismissDisabledModalActive') {
      this.isDismissDisabled = undefined;
    }
  }

  @action
  deactivateModalOnSubmit(event: Event) {
    event.preventDefault(); // Prevent page reload

    if (event.target instanceof HTMLFormElement) {
      const formData = new FormData(event.target);
      const value = formData.get('deactivate-modal-on-submit__input');

      if (!value) {
        this.modals.deactivateModalOnSubmitValidationError = true;
      } else {
        this.modals.deactivateModalOnSubmitValidationError = false;
        this.modals.deactivateModalOnSubmitActive = false;
      }
    }
  }

  @action
  resetIsDismissDisabled() {
    this.isDismissDisabled = false;
  }
}
