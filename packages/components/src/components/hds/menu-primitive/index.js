/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';

import {
  autoUpdate,
  computePosition,
  flip,
  // hide,
  offset,
  shift,
  // size,
} from '@floating-ui/dom';

function getFloatingUIOptions(popoverOptions) {
  const {
    popoverPlacement = 'bottom-start',
    popoverPositionStrategy = 'absolute', // we don't need to use `fixed` anymore now that we have the Popover API that puts the element in the `top-layer`
    popoverOffsetOptions,
    popoverEnableCollisionDetection,
    // we leave them from now in case they're needed (or we want to expose them as public API for the consumers)
    popoverFlipOptions = { padding: 8 },
    popoverShiftOptions = { padding: 8 },
    popoverMiddlewareExtra = [],
  } = popoverOptions;

  // we build dynamically the list of middleware functions to invoke, depending on the options provided
  const popoverMiddleware = [];

  // https://floating-ui.com/docs/offset
  popoverMiddleware.push(offset(popoverOffsetOptions));

  if (popoverEnableCollisionDetection) {
    popoverMiddleware.push(
      // https://floating-ui.com/docs/flip
      flip(popoverFlipOptions),
      // https://floating-ui.com/docs/shift
      shift(popoverShiftOptions)
    );
  }

  // TODO! commenting this for now, will need to make this conditional to some argument (and understand how this relates to the `@height` argument)
  // size({
  //   apply: ({ availableWidth, availableHeight, middlewareData }) => {
  //     middlewareData.size = { availableWidth, availableHeight };
  //   },
  // }),

  popoverMiddleware.push(...popoverMiddlewareExtra);

  return {
    placement: popoverPlacement,
    strategy: popoverPositionStrategy,
    middleware: popoverMiddleware,
  };
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
    // this.toggleElement.addEventListener('click', this.togglePopover.bind(this));
    // this.toggleElement.addEventListener('focus', this.showPopover.bind(this));
    // this.toggleElement.addEventListener(
    //   'mouseenter',
    //   this.showPopover.bind(this)
    // );
    // this.toggleElement.addEventListener('blur', this.hidePopover.bind(this));
    // this.toggleElement.addEventListener(
    //   'mouseleave',
    //   this.hidePopover.bind(this)
    // );
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

    // the `autoUpdate` function automatically updates the position of the floating element when necessary.
    // it should only be called when the floating element is mounted on the DOM or visible on the screen.
    // it returns a "cleanup" function that should be invoked when the floating element is removed from the DOM or hidden from the screen.
    // see: https://floating-ui.com/docs/autoUpdate
    this.cleanupFloatingUI = autoUpdate(
      this.toggleElement,
      this.popoverElement,
      this.computeFloatingUI
    );
  }

  @action
  async computeFloatingUI() {
    // important to know: `computePosition()` is not stateful, it only positions the "floating" element once
    const state = await computePosition(
      this.toggleElement,
      this.popoverElement,
      getFloatingUIOptions(this.args.popoverOptions ?? {})
    );

    let { strategy, x, y, middlewareData } = state;

    Object.assign(this.popoverElement.style, {
      position: strategy,
      top: `${y}px`,
      left: `${x}px`,
      // TODO! commenting this for now, will need to make this conditional to some argument (and understand how this relates to the `@height` argument)
      // maxHeight: `${middlewareData.size.availableHeight - 10}px`,
    });
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
    // if (this.popperInstance && this.popperInstance) {
    //   this.popperInstance.destroy();
    // }
    this.cleanupFloatingUI();
  }

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
  registerOnBeforeToggleEvent() {
    console.log('registerOnBeforeToggleEvent invoked');
    // we explicitly apply a focus state to the "toggle" element to overcome a bug in WebKit (see https://github.com/hashicorp/design-system/commit/40cd7f6b3cb15c45f9a1235fafd0fb3ed58e6e62)
    // TODO! if we return the focus on close, this will re-open the popover!!
    // this.toggleElement.focus();
  }

  // fired just _after_ the "popover" is shown or hidden
  @action registerOnToggleEvent(event) {
    console.log('registerOnToggleEvent invoked');
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
    // // TODO! understand if this can fix the issue with the dropdown in the modal
    // if (this.popperInstance) {
    //   // https://popper.js.org/docs/v2/constructors/#instance
    //   // ⚠️ THIS FREEZES SAFARI!!
    //   // this.popperInstance.forceUpdate();
    //   // schedule('afterRender', () => {
    //   //   if (window) window.dispatchEvent(new Event('resize'));
    //   // });
    // }
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
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.showPopover();
  }

  @action
  onMouseLeave() {
    console.log('onMouseLeave invoked');
    this.timer = setTimeout(this.hidePopover.bind(this), 500);
  }

  @action
  onFocusOut(event) {
    console.log('onFocusOut invoked');
    // due to inconsistent implementation of relatedTarget across browsers we use the activeElement as a fallback
    // if the related target is not part of the disclosed content we close the disclosed container
    if (!this.element.contains(event.relatedTarget || document.activeElement)) {
      this.hidePopover();
    }
  }

  @action
  close() {
    this.hidePopover();
  }
}
