import { _ as _applyDecoratedDescriptor, b as _initializerDefineProperty, a as _defineProperty } from '../../../_rollupPluginBabelHelpers-KIi_qCIU.js';
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
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n{{yield\n  (hash\n    setupPrimitiveContainer=this.setupPrimitiveContainer\n    setupPrimitiveToggle=this.setupPrimitiveToggle\n    setupPrimitivePopover=this.setupPrimitivePopover\n    toggleElement=this.toggleElement\n    popoverElement=this.popoverElement\n    isOpen=this.isOpen\n    showPopover=this.showPopover\n    hidePopover=this.hidePopover\n    togglePopover=this.togglePopover\n  )\n}}");

var _class, _descriptor, _descriptor2;
let HdsPopoverPrimitiveComponent = (_class = class HdsPopoverPrimitiveComponent extends Component {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty(this, "isOpen", _descriptor, this);
    _initializerDefineProperty(this, "isClosing", _descriptor2, this);
    _defineProperty(this, "containerElement", void 0);
    _defineProperty(this, "toggleElement", void 0);
    _defineProperty(this, "popoverElement", void 0);
    // this will enable "soft" events for the toggle ("hover" and "focus")
    _defineProperty(this, "enableSoftEvents", this.args.enableSoftEvents ?? false);
    // this will enable "click" events for the toggle
    _defineProperty(this, "enableClickEvents", this.args.enableClickEvents ?? false);
    _defineProperty(this, "timer", void 0);
    _defineProperty(this, "setupPrimitiveContainer", modifier(element => {
      this.containerElement = element;

      // we register the "soft" events
      if (this.enableSoftEvents) {
        // @ts-expect-error: known issue with type of invocation
        registerEvent(this.containerElement, ['mouseenter', this.onMouseEnter]);
        // @ts-expect-error: known issue with type of invocation
        registerEvent(this.containerElement, ['mouseleave', this.onMouseLeave]);
        // @ts-expect-error: known issue with type of invocation
        registerEvent(this.containerElement, ['focusin', this.onFocusIn]);
      }
      // we always want the focusOut event
      // @ts-expect-error: known issue with type of invocation
      registerEvent(this.containerElement, ['focusout', this.onFocusOut]);
    }));
    _defineProperty(this, "setupPrimitiveToggle", modifier(element => {
      this.toggleElement = element;
      assert(`The toggle element of "Hds::PopoverPrimitive" must be a <button>; element received: <${element.tagName.toLowerCase()}>`, element instanceof HTMLButtonElement);
    }));
    _defineProperty(this, "setupPrimitivePopover", modifier((element, _positional, named) => {
      this.popoverElement = element;

      // for the click events we don't use `onclick` event listeners, but we rely on the `popovertarget` attribute
      // provided by the Popover API which does all the magic for us without needing JS code
      // (important: to work it needs to be applied to a button)
      if (this.enableClickEvents) {
        let popoverId;
        if (this.popoverElement.id) {
          popoverId = this.popoverElement.id;
        } else {
          // we need a DOM id for the `popovertarget` attribute
          popoverId = guidFor(this);
          this.popoverElement.id = popoverId;
        }
        if (this.toggleElement) {
          this.toggleElement.setAttribute('popovertarget', popoverId);
        }
      }

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
      // @ts-expect-error: known issue with type of invocation
      registerEvent(this.popoverElement, ['beforetoggle', this.onBeforeTogglePopover]);
      // @ts-expect-error: known issue with type of invocation
      registerEvent(this.popoverElement, ['toggle', this.onTogglePopover]);

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
      next(() => {
        // @ts-expect-error: known issue with type of invocation
        anchoredPositionModifier(this.popoverElement,
        // element the modifier is attached to
        [this.toggleElement],
        // positional arguments
        anchoredPositionOptions // named arguments
        );
      });
    }));
  }
  showPopover() {
    try {
      if (this.popoverElement) {
        this.popoverElement.showPopover();
      }
    } catch (error) {
      warn(`The invocation of \`showPopover\` for the popover element caused an unexpected error: ${JSON.stringify(error)}`, {
        id: 'hds-popover.show-popover-action.invocation-failed'
      });
    }
  }
  hidePopover() {
    try {
      if (this.popoverElement) {
        this.popoverElement.hidePopover();
      }
    } catch (error) {
      warn(`The invocation of \`hidePopover\` for the popover element caused an unexpected error: ${JSON.stringify(error)}`, {
        id: 'hds-popover.hide-popover-action.invocation-failed'
      });
    }
  }
  togglePopover() {
    try {
      if (this.popoverElement) {
        this.popoverElement.togglePopover();
      }
    } catch (error) {
      warn(`The invocation of \`togglePopover\` for the popover element caused an unexpected error: ${JSON.stringify(error)}`, {
        id: 'hds-popover.toggle-popover-action.invocation-failed'
      });
    }
  }

  // fired just _before_ the "popover" is shown or hidden
  onBeforeTogglePopover(event) {
    if (event.newState === 'closed') {
      // we need this flag to check if it's in the "closing" process,
      // because the browser automatically returns the focus to the "trigger" button
      // and this would re-open immediately the popover because of the `focusin` event
      this.isClosing = true;
    }
  }

  // fired just _after_ the "popover" is shown or hidden
  onTogglePopover(event) {
    if (event.newState === 'open') {
      this.isOpen = true;

      // we call the "onOpen" callback if it exists (and is a function)
      const {
        onOpen
      } = this.args;
      if (typeof onOpen === 'function') {
        onOpen();
      }
    } else {
      this.isOpen = false;

      // reset the "isClosing" flag (the `toggle` event is fired _after_ the popover is closed)
      this.isClosing = false;

      // if the popover was initially forced to be open (using the "manual" state) then revert its status to `auto` once the user interacts with it
      if (this.args.isOpen) {
        if (this.popoverElement) {
          this.popoverElement.popover = 'auto';
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
  onMouseEnter() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.showPopover();
  }
  onFocusIn() {
    // don't re-open the popover if the focus is returned because the closing
    if (!this.isClosing) {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.showPopover();
    }
  }
  onMouseLeave() {
    this.timer = setTimeout(() => this.hidePopover(), 500);
  }
  onFocusOut(event) {
    if (this.containerElement) {
      let isFocusStillInside = false;
      if (event.relatedTarget &&
      // if the related target is not part of the disclosed content we close the disclosed container
      this.containerElement.contains(event.relatedTarget)) {
        isFocusStillInside = true;
      } else if (document.activeElement &&
      // due to inconsistent implementation of relatedTarget across browsers we use the activeElement as a fallback
      this.containerElement.contains(document.activeElement)) {
        isFocusStillInside = true;
      }
      // if the target receiving the focus is _not_ part of the disclosed content we close the disclosed container
      if (!isFocusStillInside) {
        this.hidePopover();
      }
    }
  }
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "isOpen", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return this.args.isOpen ?? false;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "isClosing", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _applyDecoratedDescriptor(_class.prototype, "showPopover", [action], Object.getOwnPropertyDescriptor(_class.prototype, "showPopover"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "hidePopover", [action], Object.getOwnPropertyDescriptor(_class.prototype, "hidePopover"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "togglePopover", [action], Object.getOwnPropertyDescriptor(_class.prototype, "togglePopover"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onBeforeTogglePopover", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onBeforeTogglePopover"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onTogglePopover", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onTogglePopover"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onMouseEnter", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onMouseEnter"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onFocusIn", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onFocusIn"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onMouseLeave", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onMouseLeave"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onFocusOut", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onFocusOut"), _class.prototype)), _class);
setComponentTemplate(TEMPLATE, HdsPopoverPrimitiveComponent);

export { HdsPopoverPrimitiveComponent as default };
//# sourceMappingURL=index.js.map
