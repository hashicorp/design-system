/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { schedule } from '@ember/runloop';

import { createPopper } from '@popperjs/core';

function getPopperOptions(popoverOptions) {
  const {
    popoverPlacement = 'bottom-start',
    popoverPositionStrategy = 'absolute', // if we use `fixed` then the overscroll of the body makes the dialog look weird when the page is overscrolled
    popoverOffsetOptions,
    popoverEnableCollisionDetection,
  } = popoverOptions;

  const options = { modifiers: [] };

  options.placement = popoverPlacement;
  options.strategy = popoverPositionStrategy;

  options.modifiers.push({
    name: 'computeStyles',
    // https://popper.js.org/docs/v2/modifiers/compute-styles/#adaptive
    options: {
      adaptive: false, // true by default
      gpuAcceleration: false, // true by default
    },
  });

  options.modifiers.push(
    // https://popper.js.org/docs/v2/modifiers/flip/
    {
      name: 'flip',
      enabled: popoverEnableCollisionDetection || false,
      options: { padding: 4 },
    },
    // https://popper.js.org/docs/v2/modifiers/prevent-overflow/
    {
      name: 'preventOverflow',
      enabled: popoverEnableCollisionDetection || false,
      options: { padding: 4 },
    }
  );

  if (popoverOffsetOptions) {
    options.modifiers.push({
      // https://popper.js.org/docs/v2/modifiers/offset/
      name: 'offset',
      options: { offset: popoverOffsetOptions },
    });
  }

  // TODO use this to implement a "same width as reference" modifier (for the dropdown, we would neeed to change the way the min/max widths are applied to the list)
  // https://popper.js.org/docs/v2/modifiers/community-modifiers/
  // https://codesandbox.io/p/sandbox/bitter-sky-pe3z9?file=%2Fsrc%2Findex.js%3A5%2C1-18%2C3
  // options.modifiers.push({
  //   name: 'sameWidth',
  //   enabled: true,
  //   phase: 'beforeWrite',
  //   requires: ['computeStyles'],
  //   fn: ({ state }) => {
  //     state.styles.popper.width = `${state.rects.reference.width}px`;
  //   },
  //   effect: ({ state }) => {
  //     state.elements.popper.style.width = `${state.elements.reference.offsetWidth}px`;
  //   },
  // });

  // TODO add custom modifier (conditional option?) to resize vertically the popper if the height is larger than the available space
  // https://popper.js.org/docs/v2/utils/detect-overflow/#example
  //
  // ➔ we can use this community package:
  // https://www.npmjs.com/package/popper-max-size-modifier
  //

  // uncomment to debug first rendering [NOTICE: doesn't seem to work]
  // options.modifiers.push({
  //   // https://popper.js.org/docs/v2/lifecycle/#hook-into-the-lifecycle
  //   onFirstUpdate: (state) => {
  //     console.log('Popper `onFirstUpdate` invoked with state', state);
  //   },
  // });

  return options;
}

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

    // this should be an extremely edge case, but in the case the popover needs to be initially forced to be open
    // we need to use the "manual" state to support the case of multiple "menus" opened at the same time
    // IMPORTANT! if a "popover" is set to "open" with a "manual" state, then it can't be closed via `esc` and `click outside`
    if (this.args.isOpen) {
      this.popoverElement.popover = 'manual';
      this.popoverElement.showPopover();
    }

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

    this.popperInstance = createPopper(
      this.toggleElement,
      this.popoverElement,
      getPopperOptions(this.args.popoverOptions ?? {})
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
    if (this.popperInstance && this.popperInstance) {
      this.popperInstance.destroy();
    }
  }

  // fired just _before_ the "popover" is shown or hidden
  @action registerOnBeforeToggleEvent() {
    // we explicitly apply a focus state to the "toggle" element to overcome a bug in WebKit (see https://github.com/hashicorp/design-system/commit/40cd7f6b3cb15c45f9a1235fafd0fb3ed58e6e62)
    this.toggleElement.focus();
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
    // TODO! understand if this can fix the issue with the dropdown in the modal
    if (this.popperInstance) {
      // https://popper.js.org/docs/v2/constructors/#instance
      // ⚠️ THIS FREEZES SAFARI!!
      // this.popperInstance.forceUpdate();
      // schedule('afterRender', () => {
      //   if (window) window.dispatchEvent(new Event('resize'));
      // });
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
