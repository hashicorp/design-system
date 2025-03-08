import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { assert, warn } from '@ember/debug';
import { next } from '@ember/runloop';
import { guidFor } from '@ember/object/internals';
import { modifier } from 'ember-modifier';
import registerEvent from '../../../modifiers/hds-register-event.js';
import anchoredPositionModifier from '../../../modifiers/hds-anchored-position.js';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i, n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n{{yield\n  (hash\n    setupPrimitiveContainer=this.setupPrimitiveContainer\n    setupPrimitiveToggle=this.setupPrimitiveToggle\n    setupPrimitivePopover=this.setupPrimitivePopover\n    toggleElement=this._toggleElement\n    popoverElement=this._popoverElement\n    isOpen=this._isOpen\n    showPopover=this.showPopover\n    hidePopover=this.hidePopover\n    togglePopover=this.togglePopover\n  )\n}}");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

class HdsPopoverPrimitive extends Component {
  static {
    g(this.prototype, "_isOpen", [tracked]);
  }
  #_isOpen = (i(this, "_isOpen"), undefined);
  static {
    g(this.prototype, "_isClosing", [tracked], function () {
      return false;
    });
  }
  #_isClosing = (i(this, "_isClosing"), undefined);
  _containerElement;
  _toggleElement;
  _popoverElement;
  // this will enable "soft" events for the toggle ("hover" and "focus")
  enableSoftEvents = this.args.enableSoftEvents ?? false;
  // this will enable "click" events for the toggle
  enableClickEvents = this.args.enableClickEvents ?? false;
  _timer;
  constructor(owner, args) {
    super(owner, args);
    this._isOpen = this.args.isOpen ?? false;
  }
  setupPrimitiveContainer = modifier(element => {
    this._containerElement = element;

    // we register the "soft" events
    if (this.enableSoftEvents) {
      // @ts-expect-error: known issue with type of invocation
      registerEvent(this._containerElement, ['mouseenter', this.onMouseEnter]);
      // @ts-expect-error: known issue with type of invocation
      registerEvent(this._containerElement, ['mouseleave', this.onMouseLeave]);
      // @ts-expect-error: known issue with type of invocation
      registerEvent(this._containerElement, ['focusin', this.onFocusIn]);
    }
    // we always want the focusOut event
    // @ts-expect-error: known issue with type of invocation
    registerEvent(this._containerElement, ['focusout', this.onFocusOut]);
  });
  setupPrimitiveToggle = modifier(element => {
    this._toggleElement = element;
    assert(`The toggle element of "Hds::PopoverPrimitive" must be a <button>; element received: <${element.tagName.toLowerCase()}>`, element instanceof HTMLButtonElement);
  });
  setupPrimitivePopover = modifier((element, _positional, named) => {
    this._popoverElement = element;

    // We need to create a popoverId in order to connect the popover and the toggle with aria-controls
    // and an id is needed to implement `onclick` event listeners
    if (this._toggleElement) {
      let popoverId;
      if (this._popoverElement.id) {
        popoverId = this._popoverElement.id;
      } else {
        // we need a DOM id for the `aria-controls` and `popovertarget` attributes
        popoverId = guidFor(this);
        this._popoverElement.id = popoverId;
      }
      this._toggleElement.setAttribute('aria-controls', popoverId);

      // for the click events we don't use `onclick` event listeners, but we rely on the `popovertarget` attribute
      // provided by the Popover API which does all the magic for us without needing JS code
      // (important: to work it needs to be applied to a button)
      if (this.enableClickEvents) {
        this._toggleElement.setAttribute('popovertarget', popoverId);
      }
    }

    // this should be an extremely edge case, but in the case the popover needs to be initially forced to be open
    // we need to use the "manual" state to support the case of multiple "menus" opened at the same time
    // IMPORTANT! if a "popover" is set to "open" with a "manual" state, then it can't be closed via `esc` and `click outside`
    if (this.args.isOpen) {
      this._popoverElement.popover = 'manual';
      this._popoverElement.showPopover();
    } else {
      this._popoverElement.popover = 'auto';
    }

    // Register "onBeforeToggle" + "onToggle" callback functions to be called when a native 'toggle' event is dispatched
    // @ts-expect-error: known issue with type of invocation
    registerEvent(this._popoverElement, ['beforetoggle', this.onBeforeTogglePopover]);
    // @ts-expect-error: known issue with type of invocation
    registerEvent(this._popoverElement, ['toggle', this.onTogglePopover]);

    // we need to spread the argument because if it's set via `{{ hash … }}` Ember complains when we overwrite one of its values
    const anchoredPositionOptions = {
      ...named.anchoredPositionOptions
    };

    // Apply the `hds-anchored-position` modifier to the "popover" element
    // (notice: this function runs the first time when the element the modifier was applied to is inserted into the DOM, and it autotracks while running.
    // Any tracked values that it accesses will be tracked, including the arguments it receives, and if any of them changes, the function will run again)
    // This modifiers uses the Floating UI library to provide:
    // - positioning of the "popover" in relation to the "toggle"
    // - collision detection (optional)
    // eslint-disable-next-line ember/no-runloop
    next(() => {
      // @ts-expect-error: known issue with type of invocation
      anchoredPositionModifier(this._popoverElement,
      // element the modifier is attached to
      [this._toggleElement],
      // positional arguments
      anchoredPositionOptions // named arguments
      );
    });
  });
  showPopover() {
    try {
      if (this._popoverElement) {
        this._popoverElement.showPopover();
      }
    } catch (error) {
      warn(`The invocation of \`showPopover\` for the popover element caused an unexpected error: ${JSON.stringify(error)}`, {
        id: 'hds-popover.show-popover-action.invocation-failed'
      });
    }
  }
  static {
    n(this.prototype, "showPopover", [action]);
  }
  hidePopover() {
    try {
      if (this._popoverElement) {
        this._popoverElement.hidePopover();
      }
    } catch (error) {
      warn(`The invocation of \`hidePopover\` for the popover element caused an unexpected error: ${JSON.stringify(error)}`, {
        id: 'hds-popover.hide-popover-action.invocation-failed'
      });
    }
  }
  static {
    n(this.prototype, "hidePopover", [action]);
  }
  togglePopover() {
    try {
      if (this._popoverElement) {
        this._popoverElement.togglePopover();
      }
    } catch (error) {
      warn(`The invocation of \`togglePopover\` for the popover element caused an unexpected error: ${JSON.stringify(error)}`, {
        id: 'hds-popover.toggle-popover-action.invocation-failed'
      });
    }
  }

  // fired just _before_ the "popover" is shown or hidden
  static {
    n(this.prototype, "togglePopover", [action]);
  }
  onBeforeTogglePopover(event) {
    if (event.newState === 'closed') {
      // we need this flag to check if it's in the "closing" process,
      // because the browser automatically returns the focus to the "trigger" button
      // and this would re-open immediately the popover because of the `focusin` event
      this._isClosing = true;
    }
  }

  // fired just _after_ the "popover" is shown or hidden
  static {
    n(this.prototype, "onBeforeTogglePopover", [action]);
  }
  onTogglePopover(event) {
    if (event.newState === 'open') {
      this._isOpen = true;

      // we call the "onOpen" callback if it exists (and is a function)
      const {
        onOpen
      } = this.args;
      if (typeof onOpen === 'function') {
        onOpen();
      }
    } else {
      this._isOpen = false;

      // reset the "isClosing" flag (the `toggle` event is fired _after_ the popover is closed)
      this._isClosing = false;

      // if the popover was initially forced to be open (using the "manual" state) then revert its status to `auto` once the user interacts with it
      if (this.args.isOpen) {
        if (this._popoverElement) {
          this._popoverElement.popover = 'auto';
        }
      }

      // we call the "onClose" callback if it exists (and is a function)
      const {
        onClose
      } = this.args;
      if (typeof onClose === 'function') {
        onClose();
      }
    }
  }
  static {
    n(this.prototype, "onTogglePopover", [action]);
  }
  onMouseEnter() {
    if (this._timer) {
      clearTimeout(this._timer);
    }
    this.showPopover();
  }
  static {
    n(this.prototype, "onMouseEnter", [action]);
  }
  onFocusIn() {
    // don't re-open the popover if the focus is returned because the closing
    if (!this._isClosing) {
      if (this._timer) {
        clearTimeout(this._timer);
      }
      this.showPopover();
    }
  }
  static {
    n(this.prototype, "onFocusIn", [action]);
  }
  onMouseLeave() {
    this._timer = setTimeout(() => this.hidePopover(), 500);
  }
  static {
    n(this.prototype, "onMouseLeave", [action]);
  }
  onFocusOut(event) {
    if (this._containerElement) {
      let isFocusStillInside = false;
      if (event.relatedTarget &&
      // if the related target is not part of the disclosed content we close the disclosed container
      this._containerElement.contains(event.relatedTarget)) {
        isFocusStillInside = true;
      } else if (document.activeElement &&
      // due to inconsistent implementation of relatedTarget across browsers we use the activeElement as a fallback
      this._containerElement.contains(document.activeElement)) {
        isFocusStillInside = true;
      }
      // if the target receiving the focus is _not_ part of the disclosed content we close the disclosed container
      if (!isFocusStillInside) {
        this.hidePopover();
      }
    }
  }
  static {
    n(this.prototype, "onFocusOut", [action]);
  }
}
setComponentTemplate(TEMPLATE, HdsPopoverPrimitive);

export { HdsPopoverPrimitive as default };
//# sourceMappingURL=index.js.map
