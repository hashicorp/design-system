/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { assert } from '@ember/debug';
import { guidFor } from '@ember/object/internals';
import { modifier } from 'ember-modifier';

import registerEvent from '../../../modifiers/hds-register-event';
import floatPopoverModifier from '../../../modifiers/hds-float-popover';

export default class HdsMenuPrimitiveComponent extends Component {
  @tracked toggleElement;
  @tracked popoverElement;
  @tracked isOpen = this.args.isOpen ?? false;

  /**
   * Generates a unique ID for the "popover" (will be used in the `popovertarget` attribute of the toggle button)
   *
   * @param popoverId
   */
  popoverId = 'popover-' + guidFor(this);

  setupMenuPrimitiveContainer = modifier(
    (element) => {
      this.containerElement = element;

      assert(
        'The browser used does not support the Popover API so some functionalities will not work as expected. Please check the minimum browser requirements.',
        // eslint-disable-next-line no-prototype-builtins
        HTMLElement.prototype.hasOwnProperty('popover')
      );

      // we always want the focusOut event
      registerEvent(this.containerElement, ['focusout', this.onFocusOut]);
    },
    { eager: false }
  );

  setupMenuPrimitiveToggle = modifier(
    (element) => {
      this.toggleElement = element;
      this.toggleElement.setAttribute('popovertarget', this.popoverId);
    },
    { eager: false }
  );

  setupMenuPrimitivePopover = modifier(
    (element) => {
      this.popoverElement = element;

      this.popoverElement.id = this.popoverId;

      // this should be an extremely edge case, but in the case the popover needs to be initially forced to be open
      // we need to use the "manual" state to support the case of multiple "menus" opened at the same time
      // IMPORTANT! if a "popover" is set to "open" with a "manual" state, then it can't be closed via `esc` and `click outside`
      if (this.args.isOpen) {
        this.popoverElement.popover = 'manual';
        this.popoverElement.showPopover();
      } else {
        this.popoverElement.popover = 'auto';
      }

      // Register "onToggle" callback function to be called when a native 'toggle' event is dispatched
      registerEvent(this.popoverElement, ['toggle', this.onTogglePopover]);

      // apply the "float-popover" modifier to the "popover" element
      // (notice: this function runs the first time when the element the modifier was applied to is inserted into the DOM, and it autotracks while running. Any tracked values that it accesses will be tracked, including the arguments it receives, and if any of them changes, the function will run again)
      // this modifiers uses the Floating UI library to provide:
      // - positioning of the "popover" in relation to the "toggle"
      // - collision detection (optional)
      floatPopoverModifier(
        this.popoverElement, // element the modifier is attached to
        [this.toggleElement], // positional arguments
        { popoverOptions: this.args.popoverOptions } // named arguments
      );
    },
    { eager: false }
  );

  // fired just _after_ the "popover" is shown or hidden
  @action
  onTogglePopover(event) {
    console.log('onTogglePopover invoked', event, event.newState, this.isOpen);
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
      // if the popover was initially forced to be open (using the "manual" state) then revert its status to `auto` once the user interacts with it
      if (this.args.isOpen) {
        this.popoverElement.popover = 'auto';
      }
      this.isOpen = false;
      // we call the "onClose" callback if it exists (and is a function)
      let { onClose } = this.args;
      if (typeof onClose === 'function') {
        onClose();
      }
    }
  }

  @action
  onFocusOut(event) {
    console.log('onFocusOut invoked');
    // due to inconsistent implementation of relatedTarget across browsers we use the activeElement as a fallback
    // if the related target is not part of the disclosed content we close the disclosed container
    if (
      !this.containerElement.contains(
        event.relatedTarget || document.activeElement
      )
    ) {
      this.popoverElement.hidePopover();
    }
  }

  // this is exposed to the consumers to programmatically "close" the menu
  @action
  close() {
    this.popoverElement.hidePopover();
  }
}
