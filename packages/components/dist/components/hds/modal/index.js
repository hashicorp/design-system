import { _ as _applyDecoratedDescriptor, b as _initializerDefineProperty, a as _defineProperty } from '../../../_rollupPluginBabelHelpers-KIi_qCIU.js';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { assert } from '@ember/debug';
import { getElementId } from '../../../utils/hds-get-element-id.js';
import { buildWaiter } from '@ember/test-waiters';
import '../dialog-primitive/header.js';
import '../dialog-primitive/body.js';
import '../dialog-primitive/footer.js';
import { HdsModalSizeValues, HdsModalColorValues } from './types.js';
import { precompileTemplate } from '@ember/template-compilation';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<Hds::DialogPrimitive::Wrapper\n  class={{this.classNames}}\n  ...attributes\n  aria-labelledby={{this.id}}\n  {{did-insert this.didInsert}}\n  {{will-destroy this.willDestroyNode}}\n  {{! @glint-expect-error - https://github.com/josemarluedke/ember-focus-trap/issues/86 }}\n  {{focus-trap isActive=this.isOpen focusTrapOptions=(hash onDeactivate=this.onDismiss clickOutsideDeactivates=true)}}\n>\n  <:header>\n    {{yield\n      (hash\n        Header=(component\n          \"hds/dialog-primitive/header\"\n          id=this.id\n          onDismiss=this.onDismiss\n          contextualClassPrefix=\"hds-modal\"\n          titleTag=\"h1\"\n        )\n      )\n    }}\n  </:header>\n  <:body>\n    {{yield (hash Body=(component \"hds/dialog-primitive/body\" contextualClass=\"hds-modal__body\"))}}\n  </:body>\n  <:footer>\n    {{yield\n      (hash\n        Footer=(component \"hds/dialog-primitive/footer\" onDismiss=this.onDismiss contextualClass=\"hds-modal__footer\")\n      )\n    }}\n  </:footer>\n</Hds::DialogPrimitive::Wrapper>\n\n{{#if this.isOpen}}\n  <Hds::DialogPrimitive::Overlay @contextualClass=\"hds-modal__overlay\" />\n{{/if}}");

var _class, _descriptor;
const waiter = buildWaiter('@hashicorp/design-system-components:modal');
const DEFAULT_SIZE = HdsModalSizeValues.Medium;
const DEFAULT_COLOR = HdsModalColorValues.Neutral;
const SIZES = Object.values(HdsModalSizeValues);
const COLORS = Object.values(HdsModalColorValues);
let HdsModal = (_class = class HdsModal extends Component {
  constructor(...args) {
    super(...args);
    _initializerDefineProperty(this, "isOpen", _descriptor, this);
    _defineProperty(this, "element", void 0);
    _defineProperty(this, "body", void 0);
    _defineProperty(this, "bodyInitialOverflowValue", '');
  }
  get isDismissDisabled() {
    return this.args.isDismissDisabled ?? false;
  }
  get size() {
    const {
      size = DEFAULT_SIZE
    } = this.args;
    assert(`@size for "Hds::Modal" must be one of the following: ${SIZES.join(', ')}; received: ${size}`, SIZES.includes(size));
    return size;
  }
  get color() {
    const {
      color = DEFAULT_COLOR
    } = this.args;
    assert(`@color for "Hds::Modal" must be one of the following: ${COLORS.join(', ')}; received: ${color}`, COLORS.includes(color));
    return color;
  }
  get id() {
    return getElementId(this);
  }
  get classNames() {
    const classes = ['hds-modal'];

    // add a class based on the @size argument
    classes.push(`hds-modal--size-${this.size}`);

    // add a class based on the @color argument
    classes.push(`hds-modal--color-${this.color}`);
    return classes.join(' ');
  }
  registerOnCloseCallback(event) {
    if (!this.isDismissDisabled && this.args.onClose && typeof this.args.onClose === 'function') {
      this.args.onClose(event);
    }

    // If the dismissal of the modal is disabled, we keep the modal open/visible otherwise we mark it as closed
    if (this.isDismissDisabled) {
      // If, in a chain of events, the element is not attached to the DOM, the `showModal` would fail
      // so we add this safeguard condition that checks for the `<dialog>` to have a parent
      if (this.element.parentElement) {
        // As there is no way to `preventDefault` on `close` events, we call the `showModal` function
        // preserving the state of the modal dialog
        this.element.showModal();
      }
    } else {
      this.isOpen = false;
    }
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

    // If the modal dialog is not already open
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
    // Make modal dialog visible using the native `showModal` method
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
      const token = waiter.beginAsync();
      const listener = () => {
        waiter.endAsync(token);
        this.element.removeEventListener('close', listener);
      };
      this.element.addEventListener('close', listener);
    }

    // Make modal dialog invisible using the native `close` method
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
setComponentTemplate(TEMPLATE, HdsModal);

export { COLORS, DEFAULT_COLOR, DEFAULT_SIZE, SIZES, HdsModal as default };
//# sourceMappingURL=index.js.map
