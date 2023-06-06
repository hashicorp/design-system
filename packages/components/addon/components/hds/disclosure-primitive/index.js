/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { schedule } from '@ember/runloop';

export default class HdsDisclosurePrimitiveComponent extends Component {
  @tracked isOpen; // notice: if in the future we need to add a "@isOpen" prop to control the status from outside (eg to have the DisclosurePrimitive opened on render) just add  "this.args.isOpen" here to initalize the variable

  @action
  onClickToggle() {
    this.isOpen = !this.isOpen;
  }

  @action
  close() {
    // we schedule this afterRender to avoid an error in tests caused by updating `isOpen` multiple times in the same computation
    schedule('afterRender', () => {
      this.isOpen = false;
      // we call the "onClose" callback if it exists (and is a function)
      if (this.args.onClose && typeof this.args.onClose === 'function') {
        this.args.onClose();
      }
    });
  }
}
