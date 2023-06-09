/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

import {
  COLORS,
  SIZES,
} from '@hashicorp/design-system-components/components/hds/modal';

export default class Index extends Component {
  @tracked basicModalActive = false;
  @tracked formModalActive = false;
  @tracked isModalDismissDisabled = false;

  get SIZES() {
    return SIZES;
  }

  get COLORS() {
    return COLORS;
  }
  @action
  noop() {
    //
  }

  @action
  activateModal(modal) {
    this.isModalDismissDisabled = false;
    this[modal] = true;
  }

  @action
  deactivateModal(modal) {
    this.isModalDismissDisabled = false;
    this[modal] = false;
  }

  @action markFormAsChanged() {
    this.isModalDismissDisabled = true;
  }

  @action saveFormAndClose(modal) {
    this.isModalDismissDisabled = false;
    this.deactivateModal(modal);
  }

  @action checkBeforeDeactivate(modal) {
    if (this.isModalDismissDisabled) {
      if (window.confirm('Changes that you made may not be saved')) {
        this.deactivateModal(modal);
      }
    } else {
      this.deactivateModal(modal);
    }
  }
}
