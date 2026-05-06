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

import type { WithBoundArgs } from '@glint/template';
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import '@carbon/web-components/es/components/modal/index.js';

// Minimal typed view of the `cds-modal` host element so we can safely toggle
// the `open` property without resorting to `any`.
interface CDSModalElement extends HTMLElement {
  open: boolean;
}

import HdsIcon from '../../icon/index.gts';
import {
  HdsModalSizeValues,
  HdsModalColorValues,
  HDS_MODAL_SIZE_TO_CDS,
} from '../types.ts';
import { getElementId } from '../../../../utils/hds-get-element-id.ts';

import type { HdsIconSignature } from '../../icon/index.gts';
import type { HdsModalSizes, HdsModalColors } from '../types.ts';

const waiter = buildWaiter('@hashicorp/design-system-components:modal');

export const DEFAULT_SIZE = HdsModalSizeValues.Medium;
export const DEFAULT_COLOR = HdsModalColorValues.Neutral;

export const SIZES: HdsModalSizes[] = Object.values(HdsModalSizeValues);
export const COLORS: HdsModalColors[] = Object.values(HdsModalColorValues);

// ---------------------------------------------------------------------------
// Header subcomponent
// ---------------------------------------------------------------------------

interface HdsModalHeaderSignature {
  Args: {
    id?: string;
    icon?: HdsIconSignature['Args']['name'];
    tagline?: string;
  };
  Blocks: { default: [] };
  Element: Element;
}

const HdsModalHeader: TemplateOnlyComponent<HdsModalHeaderSignature> =
  <template>
    {{! `cds-modal-close-button` must be rendered explicitly as a child of
        `cds-modal-header`; Carbon does not insert it automatically. }}
    <cds-modal-header class="hds-modal__header" ...attributes>
      <cds-modal-close-button
        class="hds-modal__dismiss"
        close-button-label="Close"
      ></cds-modal-close-button>
      {{#if @icon}}
        <HdsIcon class="hds-modal__icon" @name={{@icon}} @size="24" />
      {{/if}}
      {{#if @tagline}}
        <cds-modal-label
          class="hds-modal__tagline"
        >{{@tagline}}</cds-modal-label>
      {{/if}}
      <cds-modal-heading class="hds-modal__title" id={{@id}}>
        {{yield}}
      </cds-modal-heading>
    </cds-modal-header>
  </template>;

// ---------------------------------------------------------------------------
// Body subcomponent
// ---------------------------------------------------------------------------

interface HdsModalBodySignature {
  Args: Record<string, never>;
  Blocks: { default: [] };
  Element: Element;
}

const HdsModalBody: TemplateOnlyComponent<HdsModalBodySignature> = <template>
  <cds-modal-body class="hds-modal__body" ...attributes>
    {{yield}}
  </cds-modal-body>
</template>;

// ---------------------------------------------------------------------------
// Footer subcomponent
// ---------------------------------------------------------------------------

interface HdsModalFooterSignature {
  Args: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onDismiss?: (event: MouseEvent, ...args: any[]) => void;
  };
  Blocks: {
    default: [
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        close: (event: MouseEvent, ...args: any[]) => void;
      },
    ];
  };
  Element: Element;
}

const NOOP = (): void => {};

class HdsModalFooter extends Component<HdsModalFooterSignature> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get onDismiss(): (event: MouseEvent, ...args: any[]) => void {
    return typeof this.args.onDismiss === 'function'
      ? this.args.onDismiss
      : NOOP;
  }

  <template>
    <cds-modal-footer class="hds-modal__footer" ...attributes>
      {{yield (hash close=this.onDismiss)}}
    </cds-modal-footer>
  </template>
}

// ---------------------------------------------------------------------------
// Modal
// ---------------------------------------------------------------------------

export interface HdsModalSignature {
  Args: {
    /** When `true`, prevents the modal from being closed via the close button, ESC key, or click outside. */
    isDismissDisabled?: boolean;
    /** The size of the modal. Maps to the underlying `cds-modal` `size` attribute. */
    size?: HdsModalSizes;
    /**
     * @deprecated `@color` has no equivalent on the underlying Carbon `cds-modal` web
     * component. The argument is preserved for backwards-compatibility but no longer
     * affects the rendered output beyond a CSS class hook.
     */
    color?: HdsModalColors;
    /**
     * @deprecated `@returnFocusTo` has no equivalent on the underlying Carbon `cds-modal`
     * web component. Carbon automatically returns focus to the element that had focus
     * before the modal was opened.
     */
    returnFocusTo?: string;
    /**
     * @deprecated `@onOpen` has no equivalent on the underlying Carbon `cds-modal` web
     * component. The callback is still invoked once on initial render for
     * backwards-compatibility but should not be relied on.
     */
    onOpen?: () => void;
    /** Invoked after the modal has been closed by the user (close button, ESC, or click outside). */
    onClose?: (event: Event) => void;
  };
  Blocks: {
    default: [
      {
        Header?: WithBoundArgs<typeof HdsModalHeader, 'id'>;
        Body?: typeof HdsModalBody;
        Footer?: WithBoundArgs<typeof HdsModalFooter, 'onDismiss'>;
      },
    ];
  };
  Element: HTMLElement;
}

export default class HdsModal extends Component<HdsModalSignature> {
  @tracked private _isOpen = false;
  private _element!: HTMLElement;
  private _body!: HTMLElement;
  private _bodyInitialOverflowValue = '';

  get isDismissDisabled(): boolean {
    return this.args.isDismissDisabled ?? false;
  }

  get size(): HdsModalSizes {
    const { size = DEFAULT_SIZE } = this.args;
    assert(
      `@size for "Hds::Modal" must be one of the following: ${SIZES.join(
        ', '
      )}; received: ${size}`,
      SIZES.includes(size)
    );
    return size;
  }

  get cdsSize(): 'sm' | 'md' | 'lg' {
    return HDS_MODAL_SIZE_TO_CDS[this.size];
  }

  get color(): HdsModalColors {
    const { color = DEFAULT_COLOR } = this.args;
    assert(
      `@color for "Hds::Modal" must be one of the following: ${COLORS.join(
        ', '
      )}; received: ${color}`,
      COLORS.includes(color)
    );
    return color;
  }

  get id(): string {
    return getElementId(this);
  }

  get classNames(): string {
    return [
      'hds-modal',
      `hds-modal--size-${this.size}`,
      `hds-modal--color-${this.color}`,
    ].join(' ');
  }

  private _performCloseCleanup(): void {
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

    // Return focus to a specific element if `@returnFocusTo` was provided.
    // (Note: `cds-modal` already restores focus to its launcher; this only
    // runs if a consumer explicitly opted into a specific override.)
    if (this.args.returnFocusTo) {
      const initiator = document.getElementById(this.args.returnFocusTo);
      if (initiator) {
        initiator.focus();
      }
    }
  }

  // Cancellable: fired before close on user gesture (close button, ESC, click outside).
  private _handleBeforeClose = (event: Event): void => {
    if (this.isDismissDisabled) {
      event.preventDefault();
    }
  };

  private _handleClosed = (event: Event): void => {
    if (this.args.onClose && typeof this.args.onClose === 'function') {
      this.args.onClose(event);
    }
    this._performCloseCleanup();
  };

  private _registerModal = modifier((element: Element) => {
    const el = element as HTMLElement;
    this._element = el;
    this._body = document.body;

    if (this._body) {
      this._bodyInitialOverflowValue =
        this._body.style.getPropertyValue('overflow');
    }

    element.addEventListener('cds-modal-beingclosed', this._handleBeforeClose);
    element.addEventListener('cds-modal-closed', this._handleClosed);

    // Open the modal. `cds-modal` exposes an `open` boolean property — setting
    // it to `true` triggers the show animation and focus management.
    // We use a microtask to ensure the element is fully upgraded.
    queueMicrotask(() => {
      (el as CDSModalElement).open = true;
      this._isOpen = true;
      if (this._body) this._body.style.setProperty('overflow', 'hidden');
      if (this.args.onOpen && typeof this.args.onOpen === 'function') {
        this.args.onOpen();
      }
    });

    return () => {
      // If removed from DOM while open, emulate close cleanup but skip onClose
      // (matches the previous behavior of not firing onClose for direct DOM removal).
      if (this._isOpen) {
        this._performCloseCleanup();
      }
      element.removeEventListener(
        'cds-modal-beingclosed',
        this._handleBeforeClose
      );
      element.removeEventListener('cds-modal-closed', this._handleClosed);
    };
  });

  // Yielded to the Footer block as `F.close` so consumers can close via a button.
  // eslint-disable-next-line @typescript-eslint/require-await
  onDismiss = async (): Promise<void> => {
    if (this.isDismissDisabled) return;

    // allow ember test helpers to wait for the close event to fire
    if ((this._element as CDSModalElement).open) {
      const token = waiter.beginAsync();
      const listener = () => {
        waiter.endAsync(token);
        this._element.removeEventListener('cds-modal-closed', listener);
      };
      this._element.addEventListener('cds-modal-closed', listener);
    }

    (this._element as CDSModalElement).open = false;
    // `cds-modal` only fires `cds-modal-closed` for *user-initiated* closes,
    // so we manually run the closed handler here for programmatic dismissal.
    this._handleClosed(new Event('cds-modal-closed'));
  };

  <template>
    <cds-modal
      id={{this.id}}
      class={{this.classNames}}
      size={{this.cdsSize}}
      prevent-close={{this.isDismissDisabled}}
      prevent-close-on-click-outside={{this.isDismissDisabled}}
      aria-labelledby={{this.id}}
      ...attributes
      {{this._registerModal}}
    >
      {{yield
        (hash
          Header=(component HdsModalHeader id=this.id)
          Body=HdsModalBody
          Footer=(component HdsModalFooter onDismiss=this.onDismiss)
        )
      }}
    </cds-modal>
  </template>
}
