/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';

export default class HdsMenuPrimitiveComponent extends Component {
  @tracked isOpen = this.args.isOpen;
  @tracked toggleElement;
  @tracked popoverElement;

  /**
   * Generates a unique ID for the "popover" (will be used in the `popovertarget` attribute of the toggle button)
   *
   * @param popoverId
   */
  popoverId = 'popover-' + guidFor(this);

  @action
  didInsert(element) {
    this.element = element;
  }

  @action
  didInsertToggle(element) {
    this.toggleElement = element;
  }

  @action
  didInsertPopover(element) {
    this.popoverElement = element;

    // this.popoverElement.popover = 'auto';
    // if (this.isOpen) {
    //   // if this is set to "open" with a "manual" state, then the modal can't be closed via `esc` and `click outside`
    //   // TODO in theory we could change it back to `auto` once it's closed
    //   this.popoverElement.popover = 'manual';
    //   this.popoverElement.showPopover();
    // } else {
    //   this.popoverElement.popover = 'auto';
    // }

    // Register "onToggle" callback function to be called when a native 'toggle' event is dispatched
    this.popoverElement.addEventListener(
      'toggle',
      this.registerOnToggleEvent,
      true
    );
  }

  @action
  willDestroyPopover() {
    if (this.popoverElement) {
      this.popoverElement.removeEventListener(
        'toggle',
        this.registerOnToggleEvent,
        true
      );
    }
  }

  @action registerOnToggleEvent(event) {
    if (event.newState === 'open') {
      console.log('Popover has been shown', this.popoverElement);
      this.isOpen = true;
    } else {
      console.log('Popover has been hidden', this.popoverElement);
      this.isOpen = false;
      // we explicitly apply a focus state to the toggle element to overcome a bug in WebKit (see https://github.com/hashicorp/design-system/commit/40cd7f6b3cb15c45f9a1235fafd0fb3ed58e6e62)
      this.toggleElement.focus();
      // we call the "onClose" callback if it exists (and is a function)
      let { onClose } = this.args;
      if (typeof onClose === 'function') {
        onClose();
      }
    }
  }

  // TODO! discuss what we want to do with this (probably still keep it)
  @action
  onFocusOut(event) {
    // due to inconsistent implementation of relatedTarget across browsers we use the activeElement as a fallback
    // if the related target is not part of the disclosed content we close the disclosed container
    if (!this.element.contains(event.relatedTarget || document.activeElement)) {
      this.popoverElement.hidePopover();
    }
  }

  @action
  close() {
    this.popoverElement.hidePopover();
  }
}
