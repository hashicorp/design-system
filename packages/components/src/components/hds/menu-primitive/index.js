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

    // Register "onBeforeToggle" + "onToggle" callback functions to be called when a native 'toggle' event is dispatched
    this.popoverElement.addEventListener(
      'beforetoggle',
      this.registerOnBeforeToggleEvent,
      true
    );
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
        'beforetoggle',
        this.registerOnBeforeToggleEvent,
        true
      );
      this.popoverElement.removeEventListener(
        'toggle',
        this.registerOnToggleEvent,
        true
      );
    }
  }

  // fired just _before_ the "popover" is shown or hidden
  @action registerOnBeforeToggleEvent(event) {
    // we explicitly apply a focus state to the toggle element to overcome a bug in WebKit (see https://github.com/hashicorp/design-system/commit/40cd7f6b3cb15c45f9a1235fafd0fb3ed58e6e62)
    if (event.newState === 'closed') {
      this.toggleElement.focus();
    }
  }

  // fired just _after_ the "popover" is shown or hidden
  @action registerOnToggleEvent(event) {
    if (event.newState === 'open') {
      console.log('Popover has been shown');
      this.isOpen = true;
      // we call the "onOpen" callback if it exists (and is a function)
      let { onOpen } = this.args;
      if (typeof onOpen === 'function') {
        onOpen();
      }
    } else {
      console.log('Popover has been hidden');
      this.isOpen = false;
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
