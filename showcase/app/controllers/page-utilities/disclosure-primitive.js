/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class DisclosurePrimitiveController extends Controller {
  @tracked isOpen = false;

  @action
  toggleState(state) {
    if (state === 'open') {
      this.isOpen = true;
    } else if (state === 'close') {
      this.isOpen = false;
    } else {
      this.isOpen = !this.isOpen;
    }
  }

  @action
  onClickToggle(isOpenInternalState) {
    this.isOpen = isOpenInternalState;
  }
}
