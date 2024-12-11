import { _ as _applyDecoratedDescriptor, b as _initializerDefineProperty, a as _defineProperty } from '../../../_rollupPluginBabelHelpers-81503waH.js';
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

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n{{yield\n  (hash\n    setupPrimitiveContainer=this.setupPrimitiveContainer\n    setupPrimitiveToggle=this.setupPrimitiveToggle\n    setupPrimitivePopover=this.setupPrimitivePopover\n    toggleElement=this._toggleElement\n    popoverElement=this._popoverElement\n    isOpen=this._isOpen\n    showPopover=this.showPopover\n    hidePopover=this.hidePopover\n    togglePopover=this.togglePopover\n  )\n}}");

var _class, _descriptor, _descriptor2;
let HdsPopoverPrimitive = (_class = class HdsPopoverPrimitive extends Component {
  constructor(owner, args) {
    super(owner, args);
    _initializerDefineProperty(this, "_isOpen", _descriptor, this);
    _initializerDefineProperty(this, "_isClosing", _descriptor2, this);
    _defineProperty(this, "_containerElement", void 0);
    _defineProperty(this, "_toggleElement", void 0);
    _defineProperty(this, "_popoverElement", void 0);
    // this will enable "soft" events for the toggle ("hover" and "focus")
    _defineProperty(this, "enableSoftEvents", this.args.enableSoftEvents ?? false);
    // this will enable "click" events for the toggle
    _defineProperty(this, "enableClickEvents", this.args.enableClickEvents ?? false);
    _defineProperty(this, "_timer", void 0);
    _defineProperty(this, "setupPrimitiveContainer", modifier(element => {
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
    }));
    _defineProperty(this, "setupPrimitiveToggle", modifier(element => {
      this._toggleElement = element;
      assert(`The toggle element of "Hds::PopoverPrimitive" must be a <button>; element received: <${element.tagName.toLowerCase()}>`, element instanceof HTMLButtonElement);
    }));
    _defineProperty(this, "setupPrimitivePopover", modifier((element, _positional, named) => {
      this._popoverElement = element;

      // for the click events we don't use `onclick` event listeners, but we rely on the `popovertarget` attribute
      // provided by the Popover API which does all the magic for us without needing JS code
      // (important: to work it needs to be applied to a button)
      if (this.enableClickEvents) {
        let popoverId;
        if (this._popoverElement.id) {
          popoverId = this._popoverElement.id;
        } else {
          // we need a DOM id for the `popovertarget` attribute
          popoverId = guidFor(this);
          this._popoverElement.id = popoverId;
        }
        if (this._toggleElement) {
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
    }));
    this._isOpen = this.args.isOpen ?? false;
  }
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
  onBeforeTogglePopover(event) {
    if (event.newState === 'closed') {
      // we need this flag to check if it's in the "closing" process,
      // because the browser automatically returns the focus to the "trigger" button
      // and this would re-open immediately the popover because of the `focusin` event
      this._isClosing = true;
    }
  }

  // fired just _after_ the "popover" is shown or hidden
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
  onMouseEnter() {
    if (this._timer) {
      clearTimeout(this._timer);
    }
    this.showPopover();
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
  onMouseLeave() {
    this._timer = setTimeout(() => this.hidePopover(), 500);
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
}, _descriptor = _applyDecoratedDescriptor(_class.prototype, "_isOpen", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "_isClosing", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _applyDecoratedDescriptor(_class.prototype, "showPopover", [action], Object.getOwnPropertyDescriptor(_class.prototype, "showPopover"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "hidePopover", [action], Object.getOwnPropertyDescriptor(_class.prototype, "hidePopover"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "togglePopover", [action], Object.getOwnPropertyDescriptor(_class.prototype, "togglePopover"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onBeforeTogglePopover", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onBeforeTogglePopover"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onTogglePopover", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onTogglePopover"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onMouseEnter", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onMouseEnter"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onFocusIn", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onFocusIn"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onMouseLeave", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onMouseLeave"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onFocusOut", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onFocusOut"), _class.prototype), _class);
setComponentTemplate(TEMPLATE, HdsPopoverPrimitive);

export { HdsPopoverPrimitive as default };
//# sourceMappingURL=index.js.map
