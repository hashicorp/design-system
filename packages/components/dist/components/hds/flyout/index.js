import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { assert } from '@ember/debug';
import { getElementId } from '../../../utils/hds-get-element-id.js';
import { buildWaiter } from '@ember/test-waiters';
import { HdsFlyoutSizesValues } from './types.js';
import '../dialog-primitive/body.js';
import '../dialog-primitive/description.js';
import '../dialog-primitive/footer.js';
import '../dialog-primitive/header.js';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i, n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{!\n  Copyright (c) HashiCorp, Inc.\n  SPDX-License-Identifier: MPL-2.0\n}}\n<Hds::DialogPrimitive::Wrapper\n  class={{this.classNames}}\n  ...attributes\n  aria-labelledby={{this.id}}\n  {{did-insert this.didInsert}}\n  {{will-destroy this.willDestroyNode}}\n  {{! @glint-expect-error - https://github.com/josemarluedke/ember-focus-trap/issues/86 }}\n  {{focus-trap isActive=this._isOpen focusTrapOptions=(hash onDeactivate=this.onDismiss clickOutsideDeactivates=true)}}\n>\n  <:header>\n    {{yield\n      (hash\n        Header=(component\n          \"hds/dialog-primitive/header\"\n          id=this.id\n          onDismiss=this.onDismiss\n          contextualClassPrefix=\"hds-flyout\"\n          titleTag=\"h1\"\n        )\n        Description=(component \"hds/dialog-primitive/description\" contextualClass=\"hds-flyout__description\")\n      )\n    }}\n  </:header>\n  <:body>\n    {{yield (hash Body=(component \"hds/dialog-primitive/body\" contextualClass=\"hds-flyout__body\"))}}\n  </:body>\n  <:footer>\n    {{yield\n      (hash\n        Footer=(component \"hds/dialog-primitive/footer\" onDismiss=this.onDismiss contextualClass=\"hds-flyout__footer\")\n      )\n    }}\n  </:footer>\n</Hds::DialogPrimitive::Wrapper>\n\n{{#if this._isOpen}}\n  <Hds::DialogPrimitive::Overlay @contextualClass=\"hds-flyout__overlay\" />\n{{/if}}");

/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const waiter = buildWaiter('@hashicorp/design-system-components:flyout');
const DEFAULT_SIZE = HdsFlyoutSizesValues.Medium;
const DEFAULT_HAS_OVERLAY = true;
const SIZES = Object.values(HdsFlyoutSizesValues);
class HdsFlyout extends Component {
  static {
    g(this.prototype, "_isOpen", [tracked], function () {
      return false;
    });
  }
  #_isOpen = (i(this, "_isOpen"), void 0);
  // TODO: make this property private; currently blocked by our consumers relying on it despite not being part of the public API: https://github.com/hashicorp/cloud-ui/blob/main/engines/waypoint/addon/components/preview-pane.ts#L15
  // private _element!: HTMLDialogElement;
  _element;
  _body;
  _bodyInitialOverflowValue = '';

  /**
   * Sets the size of the flyout
   * Accepted values: medium, large
   *
   * @param size
   * @type {string}
   * @default 'medium'
   */
  get size() {
    const {
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
    const classes = ['hds-flyout'];

    // add a class based on the @size argument
    classes.push(`hds-flyout--size-${this.size}`);
    return classes.join(' ');
  }
  registerOnCloseCallback(event) {
    if (this.args.onClose && typeof this.args.onClose === 'function') {
      this.args.onClose(event);
    }
    this._isOpen = false;
  }
  static {
    n(this.prototype, "registerOnCloseCallback", [action]);
  }
  didInsert(element) {
    // Store references of `<dialog>` and `<body>` elements
    this._element = element;
    this._body = document.body;
    if (this._body) {
      // Store the initial `overflow` value of `<body>` so we can reset to it
      this._bodyInitialOverflowValue = this._body.style.getPropertyValue('overflow');
    }

    // Register "onClose" callback function to be called when a native 'close' event is dispatched
    // eslint-disable-next-line @typescript-eslint/unbound-method
    this._element.addEventListener('close', this.registerOnCloseCallback, true);

    // If the flyout dialog is not already open
    if (!this._element.open) {
      this.open();
    }
  }
  static {
    n(this.prototype, "didInsert", [action]);
  }
  willDestroyNode() {
    if (this._element) {
      this._element.removeEventListener('close',
      // eslint-disable-next-line @typescript-eslint/unbound-method
      this.registerOnCloseCallback, true);
    }
  }
  static {
    n(this.prototype, "willDestroyNode", [action]);
  }
  open() {
    // Make flyout dialog visible using the native `showModal` method
    this._element.showModal();
    this._isOpen = true;

    // Prevent page from scrolling when the dialog is open
    if (this._body) this._body.style.setProperty('overflow', 'hidden');

    // Call "onOpen" callback function
    if (this.args.onOpen && typeof this.args.onOpen === 'function') {
      this.args.onOpen();
    }
  }
  static {
    n(this.prototype, "open", [action]);
  }
  async onDismiss() {
    // allow ember test helpers to be aware of when the `close` event fires
    // when using `click` or other helpers from '@ember/test-helpers'
    // Notice: this code will get stripped out in production builds (DEBUG evaluates to `true` in dev/test builds, but `false` in prod builds)
    if (this._element.open) {
      const token = waiter.beginAsync();
      const listener = () => {
        waiter.endAsync(token);
        this._element.removeEventListener('close', listener);
      };
      this._element.addEventListener('close', listener);
    }

    // Make flyout dialog invisible using the native `close` method
    this._element.close();

    // Reset page `overflow` property
    if (this._body) {
      this._body.style.removeProperty('overflow');
      if (this._bodyInitialOverflowValue === '') {
        if (this._body.style.length === 0) {
          this._body.removeAttribute('style');
        }
      } else {
        this._body.style.setProperty('overflow', this._bodyInitialOverflowValue);
      }
    }

    // Return focus to a specific element (if provided)
    if (this.args.returnFocusTo) {
      const initiator = document.getElementById(this.args.returnFocusTo);
      if (initiator) {
        initiator.focus();
      }
    }
  }
  static {
    n(this.prototype, "onDismiss", [action]);
  }
}
setComponentTemplate(TEMPLATE, HdsFlyout);

export { DEFAULT_HAS_OVERLAY, DEFAULT_SIZE, SIZES, HdsFlyout as default };
//# sourceMappingURL=index.js.map
