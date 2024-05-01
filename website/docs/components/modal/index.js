/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class Index extends Component {
  @tracked basicModalActive = false;
  @tracked formModalActive = false;

  @action
  noop() {
    //
  }

  @action
  activateModal(modal) {
    this[modal] = true;
  }

  @action
  deactivateModal(modal) {
    this[modal] = false;
  }

  @action
  submitForm() {
    this.formModalActive = false;
  }
}
