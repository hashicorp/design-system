/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { assert } from '@ember/debug';
import { buildWaiter } from '@ember/test-waiters';
// @ts-expect-error: missing types
import focusTrap from 'ember-focus-trap/modifiers/focus-trap';
import didInsert from '@ember/render-modifiers/modifiers/did-insert';
import willDestroy from '@ember/render-modifiers/modifiers/will-destroy';
import { hash } from '@ember/helper';

import HdsDialogPrimitiveWrapper from '../dialog-primitive/wrapper.gts';
import HdsDialogPrimitiveBodyComponent from '../dialog-primitive/body.gts';
import HdsDialogPrimitiveDescriptionComponent from '../dialog-primitive/description.gts';
import HdsDialogPrimitiveFooterComponent from '../dialog-primitive/footer.gts';
import HdsDialogPrimitiveHeaderComponent from '../dialog-primitive/header.gts';
import HdsDialogPrimitiveOverlay from '../dialog-primitive/overlay.gts';
import HdsDialogPrimitiveHeader from '../dialog-primitive/header.gts';
import HdsDialogPrimitiveDescription from '../dialog-primitive/description.gts';
import HdsDialogPrimitiveBody from '../dialog-primitive/body.gts';
import HdsDialogPrimitiveFooter from '../dialog-primitive/footer.gts';
import { HdsFlyoutSizesValues } from './types.ts';
import { getElementId } from '../../../utils/hds-get-element-id.ts';

import type { WithBoundArgs } from '@glint/template';
import type { HdsFlyoutSizes } from './types.ts';

const waiter = buildWaiter('@hashicorp/design-system-components:flyout');

export const DEFAULT_SIZE = HdsFlyoutSizesValues.Medium;
export const DEFAULT_HAS_OVERLAY = true;
export const SIZES: HdsFlyoutSizes[] = Object.values(HdsFlyoutSizesValues);

export interface HdsFlyoutSignature {
  Args: {
    size?: HdsFlyoutSizes;
    returnFocusTo?: string;
    onOpen?: () => void;
    onClose?: (event: Event) => void;
  };
  Blocks: {
    default: [
      {
        Header?: WithBoundArgs<
          typeof HdsDialogPrimitiveHeaderComponent,
          'id' | 'onDismiss' | 'contextualClassPrefix'
        >;
        Description?: WithBoundArgs<
          typeof HdsDialogPrimitiveDescriptionComponent,
          'contextualClass'
        >;
        Body?: WithBoundArgs<
          typeof HdsDialogPrimitiveBodyComponent,
          'contextualClass'
        >;
        Footer?: WithBoundArgs<
          typeof HdsDialogPrimitiveFooterComponent,
          'onDismiss' | 'contextualClass'
        >;
      },
    ];
  };
  Element: HTMLDialogElement;
}

export default class HdsFlyout extends Component<HdsFlyoutSignature> {
  @tracked private _isOpen = false;
  // TODO: make this property private; currently blocked by our consumers relying on it despite not being part of the public API: https://github.com/hashicorp/cloud-ui/blob/main/engines/waypoint/addon/components/preview-pane.ts#L15
  // private _element!: HTMLDialogElement;
  _element!: HTMLDialogElement;
  private _body!: HTMLElement;
  private _bodyInitialOverflowValue = '';

  /**
   * Sets the size of the flyout
   * Accepted values: medium, large
   *
   * @param size
   * @type {string}
   * @default 'medium'
   */
  get size(): HdsFlyoutSizes {
    const { size = DEFAULT_SIZE } = this.args;

    assert(
      `@size for "Hds::Flyout" must be one of the following: ${SIZES.join(
        ', '
      )}; received: ${size}`,
      SIZES.includes(size)
    );

    return size;
  }

  /**
   * Calculates the unique ID to assign to the title
   */
  get id(): string {
    return getElementId(this);
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames(): string {
    const classes = ['hds-flyout'];

    // add a class based on the @size argument
    classes.push(`hds-flyout--size-${this.size}`);

    return classes.join(' ');
  }

  @action registerOnCloseCallback(event: Event) {
    if (this.args.onClose && typeof this.args.onClose === 'function') {
      this.args.onClose(event);
    }

    this._isOpen = false;
  }

  @action
  didInsert(element: HTMLDialogElement): void {
    // Store references of `<dialog>` and `<body>` elements
    this._element = element;
    this._body = document.body;

    if (this._body) {
      // Store the initial `overflow` value of `<body>` so we can reset to it
      this._bodyInitialOverflowValue =
        this._body.style.getPropertyValue('overflow');
    }

    // Register "onClose" callback function to be called when a native 'close' event is dispatched
    // eslint-disable-next-line @typescript-eslint/unbound-method
    this._element.addEventListener('close', this.registerOnCloseCallback, true);

    // If the flyout dialog is not already open
    if (!this._element.open) {
      this.open();
    }
  }

  @action
  willDestroyNode(): void {
    if (this._element) {
      this._element.removeEventListener(
        'close',
        // eslint-disable-next-line @typescript-eslint/unbound-method
        this.registerOnCloseCallback,
        true
      );
    }
  }

  @action
  open(): void {
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

  @action
  // eslint-disable-next-line @typescript-eslint/require-await
  async onDismiss(): Promise<void> {
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
        this._body.style.setProperty(
          'overflow',
          this._bodyInitialOverflowValue
        );
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
  <template>
    <HdsDialogPrimitiveWrapper
      class={{this.classNames}}
      ...attributes
      aria-labelledby={{this.id}}
      {{didInsert this.didInsert}}
      {{willDestroy this.willDestroyNode}}
      {{focusTrap
        isActive=this._isOpen
        focusTrapOptions=(hash
          onDeactivate=this.onDismiss clickOutsideDeactivates=true
        )
      }}
    >
      <:header>
        {{yield
          (hash
            Header=(component
              HdsDialogPrimitiveHeader
              id=this.id
              onDismiss=this.onDismiss
              contextualClassPrefix="hds-flyout"
              titleTag="h1"
            )
            Description=(component
              HdsDialogPrimitiveDescription
              contextualClass="hds-flyout__description"
            )
          )
        }}
      </:header>
      <:body>
        {{yield
          (hash
            Body=(component
              HdsDialogPrimitiveBody contextualClass="hds-flyout__body"
            )
          )
        }}
      </:body>
      <:footer>
        {{yield
          (hash
            Footer=(component
              HdsDialogPrimitiveFooter
              onDismiss=this.onDismiss
              contextualClass="hds-flyout__footer"
            )
          )
        }}
      </:footer>
    </HdsDialogPrimitiveWrapper>

    {{#if this._isOpen}}
      <HdsDialogPrimitiveOverlay @contextualClass="hds-flyout__overlay" />
    {{/if}}
  </template>
}
