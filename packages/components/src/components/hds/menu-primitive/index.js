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

import registerFocusAndMouseEvents from './modifiers/register-focus-and-mouse-events';
import floatPopoverModifier from './modifiers/float-popover';

export default class HdsMenuPrimitiveComponent extends Component {
  @tracked toggleElement;
  @tracked popoverElement;
  @tracked isOpen = this.args.isOpen;
  @tracked isClosing = false;
  // this will enable "click" events for the toggle
  @tracked enableClickEvents = this.args.enableClickEvents || false;
  // this will enable "soft" events for the toggle ("hover" and "focus")
  @tracked enableSoftEvents = this.args.enableSoftEvents || false;

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

      if (this.enableSoftEvents) {
        // we register all the events
        registerFocusAndMouseEvents(this.containerElement, {
          onMouseEnter: this.onMouseEnter,
          onMouseLeave: this.onMouseLeave,
          onFocusIn: this.onFocusIn,
          onFocusOut: this.onFocusOut,
        });
      } else {
        // we register only the focusOut event (we always want it)
        registerFocusAndMouseEvents(this.containerElement, {
          onFocusOut: this.onFocusOut,
        });
      }
    },
    { eager: false }
  );

  setupMenuPrimitiveToggle = modifier(
    (element) => {
      this.toggleElement = element;

      // for the click events we don't have `onclick` event listeners,
      // we rely on the `popovertarget` attribute provided by the Popover API
      // which does all the magic for us without needing JS code
      // (notice: to work it needs to be applied to a button)
      /// see:
      if (this.enableClickEvents) {
        this.toggleElement.setAttribute('popovertarget', this.popoverId);
      }

      // this (teardown) function is run when the element is removed
      // return () => {
      // };
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

      // Register "onBeforeToggle" + "onToggle" callback functions to be called when a native 'toggle' event is dispatched
      this.popoverElement.addEventListener(
        'beforetoggle',
        this.onBeforeTogglePopover
      );
      this.popoverElement.addEventListener('toggle', this.onTogglePopover);

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

      // this (teardown) function is run when the element is removed
      return () => {
        this.popoverElement.removeEventListener(
          'beforetoggle',
          this.onBeforeTogglePopover
        );
        this.popoverElement.removeEventListener('toggle', this.onTogglePopover);
      };
    },
    { eager: false }
  );

  @action
  showPopover() {
    console.log('showPopover invoked');
    this.popoverElement.showPopover();
  }

  @action
  hidePopover() {
    console.log('hidePopover invoked');
    this.popoverElement.hidePopover();
  }

  @action
  togglePopover() {
    console.log('togglePopover invoked', this.isOpen);
    this.popoverElement.togglePopover();
  }

  // fired just _before_ the "popover" is shown or hidden
  @action
  onBeforeTogglePopover(event) {
    console.log('onBeforeTogglePopover invoked', event);
    if (event.newState === 'closed') {
      // we need this flag to check if it's in the "closing" process,
      // because the browser automatically returns the focus to the "trigger" button
      // and this would re-open immediately the popover because of the `focusin` event
      this.isClosing = true;
    }
  }

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
      // reset the "isClosing" flag (the `toggle` event is fired _after_ the popover is closed)
      this.isClosing = false;
      // we call the "onClose" callback if it exists (and is a function)
      let { onClose } = this.args;
      if (typeof onClose === 'function') {
        onClose();
      }
    }
  }

  @action
  onMouseEnter() {
    console.log('onMouseEnter invoked');
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.showPopover();
  }

  @action
  onFocusIn() {
    console.log('onFocusIn invoked');
    // don't re-open the popover if the focus is returned because the closing
    if (!this.isClosing) {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.showPopover();
    }
  }

  @action
  onMouseLeave() {
    console.log('onMouseLeave invoked');
    this.timer = setTimeout(this.hidePopover.bind(this), 500);
  }

  @action
  onFocusOut(event) {
    console.log('onFocusOut invoked');
    // TODO! discuss with Alex if/why we still need this check here
    // due to inconsistent implementation of relatedTarget across browsers we use the activeElement as a fallback
    // if the related target is not part of the disclosed content we close the disclosed container
    if (
      !this.containerElement.contains(
        event.relatedTarget || document.activeElement
      )
    ) {
      this.hidePopover();
    }
  }

  // this is exposed to the consumers to programmatically "close" the popover
  @action
  close() {
    this.hidePopover();
  }
}
