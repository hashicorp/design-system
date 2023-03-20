/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { schedule } from '@ember/runloop';

export default class HdsDisclosureComponent extends Component {
  @tracked isOpen; // notice: if in the future we need to add a "@isOpen" prop to control the status from outside (eg to have the Disclosure opened on render) just add  "this.args.isOpen" here to initalize the variable
  @tracked toggleRef;

  @action
  didInsert(element) {
    this.element = element;
  }

  @action
  onClickToggle(event) {
    // we store a reference to the DOM node that has the "onClickToggle" event associated with it
    if (!this.toggleRef) {
      this.toggleRef = event.currentTarget;
    }
    this.isOpen = !this.isOpen;
    // we explicitly apply a focus state to the toggle element to overcome a bug in WebKit (see b8abfcf)
    this.toggleRef.focus();
  }

  @action
  onFocusOut(event) {
    // due to inconsitent implementation of relatedTarget across browsers we use the activeElement as a fallback
    // if the related target is not part of the disclosed content we close the disclosed container
    if (!this.element.contains(event.relatedTarget || document.activeElement)) {
      this.close();
    }
  }

  @action
  onKeyUp(event) {
    if (event.key === 'Escape') {
      this.close();
      this.toggleRef.focus();
    }
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
