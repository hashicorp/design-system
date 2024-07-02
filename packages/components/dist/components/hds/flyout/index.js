import { _ as _applyDecoratedDescriptor, b as _initializerDefineProperty } from '../../../_rollupPluginBabelHelpers-KIi_qCIU.js';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { assert } from '@ember/debug';
import { getElementId } from '../../../utils/hds-get-element-id.js';
import { buildWaiter } from '@ember/test-waiters';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{! @glint-nocheck: not typesafe yet }}\n{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<dialog\n  class={{this.classNames}}\n  ...attributes\n  aria-labelledby={{this.id}}\n  {{did-insert this.didInsert}}\n  {{will-destroy this.willDestroyNode}}\n  {{focus-trap isActive=this.isOpen focusTrapOptions=(hash onDeactivate=this.onDismiss clickOutsideDeactivates=true)}}\n>\n  {{yield (hash Header=(component \"hds/flyout/header\" id=this.id onDismiss=this.onDismiss))}}\n  {{yield (hash Description=(component \"hds/flyout/description\"))}}\n  {{yield (hash Body=(component \"hds/flyout/body\"))}}\n  {{yield (hash Footer=(component \"hds/flyout/footer\" onDismiss=this.onDismiss))}}\n</dialog>\n{{#if this.isOpen}}\n  <div class=\"hds-flyout__overlay\"></div>\n{{/if}}");

var _class, _descriptor;
let waiter = buildWaiter('@hashicorp/design-system-components:flyout');
const DEFAULT_SIZE = 'medium';
const DEFAULT_HAS_OVERLAY = true;
const SIZES = ['medium', 'large'];
let HdsFlyoutIndexComponent = (_class = class HdsFlyoutIndexComponent extends Component {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty(this, "isOpen", _descriptor, this);
  }
  /**
   * Sets the size of the flyout
   * Accepted values: medium, large
   *
   * @param size
   * @type {string}
   * @default 'medium'
   */
  get size() {
    let {
      size = DEFAULT_SIZE
    } = this.args;
    assert(`@size for "Hds::Flyout" must be one of the following: ${SIZES.join(', ')}; received: ${size}`, SIZES.includes(size));
    return size;
  }

  /**
   * Calculates the unique ID to assign to the title
   */
  get id() {
    return getElementId(this);
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-flyout'];

    // add a class based on the @size argument
    classes.push(`hds-flyout--size-${this.size}`);
    return classes.join(' ');
  }
  registerOnCloseCallback() {
    if (this.args.onClose && typeof this.args.onClose === 'function') {
      this.args.onClose();
    }
    this.isOpen = false;
  }
  didInsert(element) {
    // Store references of `<dialog>` and `<body>` elements
    this.element = element;
    this.body = document.body;
    if (this.body) {
      // Store the initial `overflow` value of `<body>` so we can reset to it
      this.bodyInitialOverflowValue = this.body.style.getPropertyValue('overflow');
    }

    // Register "onClose" callback function to be called when a native 'close' event is dispatched
    this.element.addEventListener('close', this.registerOnCloseCallback, true);

    // If the flyout dialog is not already open
    if (!this.element.open) {
      this.open();
    }
  }
  willDestroyNode() {
    if (this.element) {
      this.element.removeEventListener('close', this.registerOnCloseCallback, true);
    }
  }
  open() {
    // Make flyout dialog visible using the native `showModal` method
    this.element.showModal();
    this.isOpen = true;

    // Prevent page from scrolling when the dialog is open
    if (this.body) this.body.style.setProperty('overflow', 'hidden');

    // Call "onOpen" callback function
    if (this.args.onOpen && typeof this.args.onOpen === 'function') {
      this.args.onOpen();
    }
  }
  async onDismiss() {
    // allow ember test helpers to be aware of when the `close` event fires
    // when using `click` or other helpers from '@ember/test-helpers'
    // Notice: this code will get stripped out in production builds (DEBUG evaluates to `true` in dev/test builds, but `false` in prod builds)
    if (this.element.open) {
      let token = waiter.beginAsync();
      let listener = () => {
        waiter.endAsync(token);
        this.element.removeEventListener('close', listener);
      };
      this.element.addEventListener('close', listener);
    }

    // Make flyout dialog invisible using the native `close` method
    this.element.close();

    // Reset page `overflow` property
    if (this.body) {
      this.body.style.removeProperty('overflow');
      if (this.bodyInitialOverflowValue === '') {
        if (this.body.style.length === 0) {
          this.body.removeAttribute('style');
        }
      } else {
        this.body.style.setProperty('overflow', this.bodyInitialOverflowValue);
      }
    }
  }
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "isOpen", [tracked], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function () {
    return false;
  }
}), _applyDecoratedDescriptor(_class.prototype, "registerOnCloseCallback", [action], Object.getOwnPropertyDescriptor(_class.prototype, "registerOnCloseCallback"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "didInsert", [action], Object.getOwnPropertyDescriptor(_class.prototype, "didInsert"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "willDestroyNode", [action], Object.getOwnPropertyDescriptor(_class.prototype, "willDestroyNode"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "open", [action], Object.getOwnPropertyDescriptor(_class.prototype, "open"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onDismiss", [action], Object.getOwnPropertyDescriptor(_class.prototype, "onDismiss"), _class.prototype)), _class);
setComponentTemplate(TEMPLATE, HdsFlyoutIndexComponent);

export { DEFAULT_HAS_OVERLAY, DEFAULT_SIZE, SIZES, HdsFlyoutIndexComponent as default };
//# sourceMappingURL=index.js.map
