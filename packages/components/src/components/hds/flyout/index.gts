/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { assert } from '@ember/debug';
import { buildWaiter } from '@ember/test-waiters';
import { modifier } from 'ember-modifier';
import { hash } from '@ember/helper';
// @ts-expect-error: missing types https://github.com/josemarluedke/ember-focus-trap/issues/86
import focusTrap from 'ember-focus-trap/modifiers/focus-trap';

import type { WithBoundArgs } from '@glint/template';

import { HdsFlyoutSizesValues } from './types.ts';
import HdsDialogPrimitiveBody from '../dialog-primitive/body.gts';
import HdsDialogPrimitiveDescription from '../dialog-primitive/description.gts';
import HdsDialogPrimitiveFooter from '../dialog-primitive/footer.gts';
import HdsDialogPrimitiveHeader from '../dialog-primitive/header.gts';
import HdsDialogPrimitiveOverlay from '../dialog-primitive/overlay.gts';
import HdsDialogPrimitiveWrapper from '../dialog-primitive/wrapper.gts';
import { getElementId } from '../../../utils/hds-get-element-id.ts';

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
          typeof HdsDialogPrimitiveHeader,
          'id' | 'onDismiss' | 'contextualClassPrefix'
        >;
        Description?: WithBoundArgs<
          typeof HdsDialogPrimitiveDescription,
          'contextualClass'
        >;
        Body?: WithBoundArgs<typeof HdsDialogPrimitiveBody, 'contextualClass'>;
        Footer?: WithBoundArgs<
          typeof HdsDialogPrimitiveFooter,
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

  get id(): string {
    return getElementId(this);
  }

  get classNames(): string {
    const classes = ['hds-flyout'];

    // add a class based on the @size argument
    classes.push(`hds-flyout--size-${this.size}`);

    return classes.join(' ');
  }

  private _performCloseCleanup() {
    this._isOpen = false;

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

  private _registerDialog = modifier((element: HTMLDialogElement) => {
    // Store references of `<dialog>` and `<body>` elements
    this._element = element;
    this._body = document.body;

    if (this._body) {
      // Store the initial `overflow` value of `<body>` so we can reset to it
      this._bodyInitialOverflowValue =
        this._body.style.getPropertyValue('overflow');
    }

    // Register "onClose" callback function to be called when a native 'close' event is dispatched

    this._element.addEventListener('close', this.registerOnCloseCallback, true);

    // If the flyout dialog is not already open
    if (!this._element.open) {
      this.open();
    }

    return () => {
      // if the <dialog> is removed from the dom while open we emulate the close event
      if (this._isOpen) {
        this._performCloseCleanup();
      }

      this._element?.removeEventListener(
        'close',

        this.registerOnCloseCallback,
        true
      );
    };
  });

  registerOnCloseCallback = (event: Event) => {
    if (this.args.onClose && typeof this.args.onClose === 'function') {
      this.args.onClose(event);
    }

    this._performCloseCleanup();
  };

  open = (): void => {
    // Make flyout dialog visible using the native `showModal` method
    this._element.showModal();
    this._isOpen = true;

    // Prevent page from scrolling when the dialog is open
    if (this._body) this._body.style.setProperty('overflow', 'hidden');

    // Call "onOpen" callback function
    if (this.args.onOpen && typeof this.args.onOpen === 'function') {
      this.args.onOpen();
    }
  };

  onDismiss = (): void => {
    // allow ember test helpers to be aware of when the `close` event fires
    // when using `click` or other helpers from '@ember/test-helpers'
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
  };

  <template>
    <HdsDialogPrimitiveWrapper
      class={{this.classNames}}
      ...attributes
      aria-labelledby={{this.id}}
      {{this._registerDialog}}
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
