/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ModalController extends Controller {
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
  resetIsDismissDisabled() {
    this.isDismissDisabled = false;
  }
}
