/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { assert, warn } from '@ember/debug';
import { next } from '@ember/runloop';
import { guidFor } from '@ember/object/internals';
import { modifier } from 'ember-modifier';

import registerEvent from '../../../modifiers/hds-register-event';
import anchoredPositionModifier from '../../../modifiers/hds-anchored-position';

// https://github.com/oddbird/popover-polyfill?tab=readme-ov-file#with-npm
// this is needed until Firefox officially supports the Popover API
// see: https://wiki.mozilla.org/Release_Management/Release_owners
import {
  // this call polyfills some of the browser methods to emulate the Popover API
  apply as applyPopoverApiPolyfill,
  // we'll use these two flags to overwrite the popover positioning strategy
  // this is specifically done for Firefox: currently it doesn't support it, but will soon (we need Firefox 127 to support the last 2 versions)
  // see: https://whattrainisitnow.com/release/?version=127
  isSupported as isPopoverApiSupported,
  isPolyfilled as isPopoverApiPolyfilled,
} from '@oddbird/popover-polyfill/fn';

// we use this to re-export the values
export {
  PLACEMENTS,
  DEFAULT_PLACEMENT,
} from '../../../modifiers/hds-anchored-position';

export default class HdsPopoverPrimitiveComponent extends Component {
  @tracked toggleElement;
  @tracked popoverElement;
  @tracked arrowElement;
  @tracked isOpen = this.args.isOpen ?? false;
  @tracked isClosing = false;
  @tracked containsInteractive = false;
  // this will enable "soft" events for the toggle ("hover" and "focus")
  @tracked enableSoftEvents = this.args.enableSoftEvents ?? false;
  // this will enable "click" events for the toggle
  @tracked enableClickEvents = this.args.enableClickEvents ?? false;

  constructor() {
    super(...arguments);

    // if the Popover API is not supported we need to polyfill it
    if (!isPopoverApiSupported()) {
      warn(
        "The browser used does not support the Popover API so it's been emulated and some functionalities may not work as expected.",
        {
          id: 'hds-popover.no-popover-api-support.polyfill-applied',
        }
      );
      // this function polyfills quite a few DOM methods and adds emulation for the Popover API
      // see: https://github.com/oddbird/popover-polyfill/blob/main/src/popover.ts#L123
      applyPopoverApiPolyfill();
    }
  }

  /**
   * Generates a unique ID for the "popover" (will be used in the `popovertarget` attribute of the toggle button)
   *
   * @param popoverId
   */
  popoverId = 'popover-' + guidFor(this);

  setupPrimitiveContainer = modifier(
    (element) => {
      this.containerElement = element;

      // we register the "soft" events
      if (this.enableSoftEvents) {
        registerEvent(this.containerElement, ['mouseenter', this.onMouseEnter]);
        registerEvent(this.containerElement, ['mouseleave', this.onMouseLeave]);
        registerEvent(this.containerElement, ['focusin', this.onFocusIn]);
      }
      // we always want the focusOut event
      registerEvent(this.containerElement, ['focusout', this.onFocusOut]);
    },
    { eager: true }
  );

  setupPrimitiveToggle = modifier(
    (element) => {
      this.toggleElement = element;

      // check if it contains interactive elements
      this.containsInteractive =
        element.querySelector(
          'a, button, input, select, textarea, details, dialog, menuitem, option'
        ) !== null;

      if (this.args.toggleAriaLabel) {
        this.toggleElement.setAttribute(
          'aria-label',
          this.args.toggleAriaLabel
        );
      }

      this.toggleElement.setAttribute(
        'aria-expanded',
        // don't use this.isOpen here because it will cause a re-rendering
        this.args.isOpen ? 'true' : 'false'
      );

      // for the click events we don't use `onclick` event listeners, but we rely on the `popovertarget` attribute
      // provided by the Popover API which does all the magic for us without needing JS code
      // (important: to work it needs to be applied to a button, so we can't safely support if the toggle contains interactive elements)
      if (this.enableClickEvents) {
        if (this.containsInteractive) {
          assert(
            'Hds::PopoverPrimitive - You have assigned `onClick` events to the "toggle" element, but it contains interactive elements: this may result in unexpected behaviours or non accessible code'
          );
        } else {
          this.toggleElement.setAttribute('popovertarget', this.popoverId);
        }
      }
    },
    { eager: true }
  );

  setupPrimitiveArrow = modifier(
    (element) => {
      this.arrowElement = element;
    },
    { eager: true }
  );

  setupPrimitivePopover = modifier(
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
      registerEvent(this.popoverElement, [
        'beforetoggle',
        this.onBeforeTogglePopover,
      ]);
      registerEvent(this.popoverElement, ['toggle', this.onTogglePopover]);

      // Apply the "float-popover" modifier to the "popover" element
      // (notice: this function runs the first time when the element the modifier was applied to is inserted into the DOM, and it autotracks while running.
      // Any tracked values that it accesses will be tracked, including the arguments it receives, and if any of them changes, the function will run again)
      // This modifiers uses the Floating UI library to provide:
      // - positioning of the "popover" in relation to the "toggle"
      // - collision detection (optional)
      next(() => {
        anchoredPositionModifier(
          this.popoverElement, // element the modifier is attached to
          [this.toggleElement], // positional arguments
          this.popoverOptions // named arguments
        );
      });
    },
    { eager: true }
  );

  get popoverOptions() {
    // we need to spread the argument because if it's set via `{{ hash … }}` Ember complains when we overwrite one of its values
    const popoverOptions = this.args.popoverOptions
      ? { ...this.args.popoverOptions }
      : {};

    // we overwrite the "strategy" if the Popover API is not supported (polyfill applied for the first time) of it's already been polyfilled (see above)
    // this is specifically done for Firefox: currently it doesn't support it, but will soon (we need Firefox 127 to support the last 2 versions)
    // see: https://wiki.mozilla.org/Release_Management/Release_owners
    if (!isPopoverApiSupported() || isPopoverApiPolyfilled()) {
      // when using the "absolute" strategy, the presence of a parent with "relative" position leads to wrong layout rendering (known issue in the polyfill library)
      // see: https://github.com/oddbird/popover-polyfill/tree/main?tab=readme-ov-file#caveats
      popoverOptions.strategy = 'fixed';
    }

    if (this.arrowElement) {
      popoverOptions.arrowOptions = {
        // we assign the `arrowElement` to the `element` key
        element: this.arrowElement,
        // we use the padding value from the provided options (if assigned) or use a default
        padding: popoverOptions?.arrowOptions?.padding ?? 0,
      };
    }

    return popoverOptions;
  }

  /**
   * @param isInline
   * @type {boolean}
   * @default true
   * @description sets display for the container and toggle elements
   */
  get isInline() {
    let { isInline = false } = this.args;
    return isInline;
  }

  /**
   * Get the class names to apply to the element
   * @method classNames
   * @return {string} The "class" attribute to apply to the root element
   */
  get classNames() {
    let classes = ['hds-popover-primitive'];

    // add a class based on the @isInline argument
    if (this.isInline) {
      classes.push('hds-popover-primitive--is-inline');
    } else {
      classes.push('hds-popover-primitive--is-block');
    }

    return classes.join(' ');
  }

  /**
   * Get the class names to apply to the toggle
   * @method classNamesContent
   * @return {string} The "class" attribute to apply to the toggle
   */
  get classNamesToggle() {
    let classes = ['hds-popover-primitive__toggle'];

    // add a class based on the @isInline argument
    if (this.isInline) {
      classes.push('hds-popover-primitive__toggle--is-inline');
    } else {
      classes.push('hds-popover-primitive__toggle--is-block');
    }

    return classes.join(' ');
  }

  @action
  showPopover() {
    this.popoverElement.showPopover();
  }

  @action
  hidePopover() {
    this.popoverElement.hidePopover();
  }

  @action
  togglePopover() {
    this.popoverElement.togglePopover();
  }

  // fired just _before_ the "popover" is shown or hidden
  @action
  onBeforeTogglePopover(event) {
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
    if (event.newState === 'open') {
      this.isOpen = true;
      this.toggleElement.setAttribute('aria-expanded', 'true');

      // we call the "onOpen" callback if it exists (and is a function)
      let { onOpen } = this.args;
      if (typeof onOpen === 'function') {
        onOpen();
      }
    } else {
      // if the popover was initially forced to be open (using the "manual" state) then revert its status to `auto` once the user interacts with it
      if (this.args.isOpen) {
        this.popoverElement.popover = 'auto';
      }
      this.isOpen = false;
      // reset the "isClosing" flag (the `toggle` event is fired _after_ the popover is closed)
      this.isClosing = false;
      this.toggleElement.setAttribute('aria-expanded', 'false');
      // we call the "onClose" callback if it exists (and is a function)
      let { onClose } = this.args;
      if (typeof onClose === 'function') {
        onClose();
      }
    }
  }

  @action
  onMouseEnter() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.showPopover();
  }

  @action
  onFocusIn() {
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
    this.timer = setTimeout(this.hidePopover.bind(this), 500);
  }

  @action
  onFocusOut(event) {
    // TODO! discuss with Alex if/why we need this check here
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
