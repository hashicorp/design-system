/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { assert, warn } from '@ember/debug';
import { next } from '@ember/runloop';
import { guidFor } from '@ember/object/internals';
import { modifier } from 'ember-modifier';
import { hash } from '@ember/helper';

import type { ModifierLike } from '@glint/template';
import type Owner from '@ember/owner';

import registerEvent from '../../../modifiers/hds-register-event.ts';
import anchoredPositionModifier from '../../../modifiers/hds-anchored-position.ts';

import type { HdsAnchoredPositionOptions } from '../../../modifiers/hds-anchored-position.ts';

export interface HdsPopoverPrimitiveSignature {
  Args: {
    isOpen?: boolean;
    enableSoftEvents?: boolean;
    enableClickEvents?: boolean;
    boundary?: HdsAnchoredPositionOptions['boundary'];
    onOpen?: () => void;
    onClose?: () => void;
    onFocusOut?: () => void;
  };
  Blocks: {
    default: [
      {
        setupPrimitiveContainer: ModifierLike<SetupPrimitiveContainerModifier>;
        setupPrimitiveToggle: ModifierLike<SetupPrimitiveToggleModifier>;
        setupPrimitivePopover: ModifierLike<SetupPrimitivePopoverModifier>;
        toggleElement?: HTMLButtonElement;
        popoverElement?: HTMLElement;
        isOpen: boolean;
        showPopover: () => void;
        hidePopover: (event?: Event) => void;
        togglePopover: () => void;
        boundary?: HdsAnchoredPositionOptions['boundary'];
      },
    ];
  };
}

interface SetupPrimitiveContainerModifier {
  Element: HTMLElement;
}

export interface SetupPrimitiveToggleModifier {
  Element: HTMLButtonElement;
}

export interface SetupPrimitivePopoverModifier {
  Element: HTMLElement;
  Args: {
    Positional: [];
    Named: { anchoredPositionOptions?: HdsAnchoredPositionOptions };
  };
}

export default class HdsPopoverPrimitive extends Component<HdsPopoverPrimitiveSignature> {
  @tracked private _isOpen;
  @tracked private _isClosing = false;
  @tracked private _anchoredPositionOptions?: HdsAnchoredPositionOptions;
  private _containerElement?: HTMLElement;
  private _toggleElement?: HTMLButtonElement;
  private _popoverElement?: HTMLElement;
  // this will enable "soft" events for the toggle ("hover" and "focus")
  enableSoftEvents = this.args.enableSoftEvents ?? false;
  // this will enable "click" events for the toggle
  enableClickEvents = this.args.enableClickEvents ?? false;
  private _timer?: ReturnType<typeof setTimeout> | null;
  private _cleanupAnchoredPosition?: () => void;
  // `@isOpen` is applied once when the popover is set up, and afterwards only when it changes
  private _isInitiallyOpen = this.args.isOpen ?? false;
  private _hasAppliedInitialState = false;
  private _isFirstSync = true;

  constructor(owner: Owner, args: HdsPopoverPrimitiveSignature['Args']) {
    super(owner, args);
    this._isOpen = this.args.isOpen ?? false;
  }

  willDestroy(): void {
    super.willDestroy();
    this._cleanupAnchoredPosition?.();
  }

  setupPrimitiveContainer = modifier<SetupPrimitiveContainerModifier>(
    (element: HTMLElement): void => {
      this._containerElement = element;

      // we register the "soft" events
      if (this.enableSoftEvents) {
        // @ts-expect-error: known issue with type of invocation
        registerEvent(this._containerElement, [
          'mouseenter',

          this.onMouseEnter,
        ]);
        // @ts-expect-error: known issue with type of invocation
        registerEvent(this._containerElement, [
          'mouseleave',

          this.onMouseLeave,
        ]);
        // @ts-expect-error: known issue with type of invocation
        registerEvent(this._containerElement, ['focusin', this.onFocusIn]);
      }
      // we always want the focusOut event
      // @ts-expect-error: known issue with type of invocation
      registerEvent(this._containerElement, ['focusout', this.onFocusOut]);

      this._syncIsOpen();
    }
  );

  setupPrimitiveToggle = modifier<SetupPrimitiveToggleModifier>(
    (element: HTMLButtonElement) => {
      this._toggleElement = element;

      assert(
        `The toggle element of "Hds::PopoverPrimitive" must be a <button>; element received: <${element.tagName.toLowerCase()}>`,
        element instanceof HTMLButtonElement
      );

      this._linkToggleAndPopover();

      // Return a teardown function to clean up the modifier's side effects.
      // This is a safeguard against bugs where this element might be
      // cached and re-parented in the DOM, rather than being fully destroyed.
      return () => {
        element.removeAttribute('aria-controls');
        element.removeAttribute('popovertarget');
      };
    }
  );

  setupPrimitivePopover = modifier(
    (
      element: HTMLElement,
      _positional,
      named: { anchoredPositionOptions?: HdsAnchoredPositionOptions }
    ): void => {
      this._popoverElement = element;

      // We need to create a popoverId in order to connect the popover and the toggle with aria-controls
      // and an id is needed to implement `onclick` event listeners
      if (!this._popoverElement.id) {
        this._popoverElement.id = guidFor(this);
      }

      // popover is now always `auto`
      this._popoverElement.popover = 'auto';

      // initial state must be applied only once
      if (!this._hasAppliedInitialState) {
        this._hasAppliedInitialState = true;

        if (this._isInitiallyOpen) {
          this.showPopover();
        }
      }

      // Register "onBeforeToggle" + "onToggle" callback functions to be called when a native 'toggle' event is dispatched
      // @ts-expect-error: known issue with type of invocation
      registerEvent(this._popoverElement, [
        'beforetoggle',
        this.onBeforeTogglePopover,
      ]);
      // @ts-expect-error: known issue with type of invocation
      registerEvent(this._popoverElement, ['toggle', this.onTogglePopover]);

      // we need to spread the argument because if it's set via `{{ hash … }}` Ember complains when we overwrite one of its values
      if (named.anchoredPositionOptions) {
        this._anchoredPositionOptions = {
          ...named.anchoredPositionOptions,
        };
      }

      this._linkToggleAndPopover();
    }
  );

  // Apply the `hds-anchored-position` modifier to the "popover" element
  // (notice: this function runs the first time when the element the modifier was applied to is inserted into the DOM, and it autotracks while running.
  // Any tracked values that it accesses will be tracked, including the arguments it receives, and if any of them changes, the function will run again)
  // This modifiers uses the Floating UI library to provide:
  // - positioning of the "popover" in relation to the "toggle"
  // - collision detection (optional)
  private _applyAnchoredPositionModifier(): void {
    if (
      this._toggleElement !== undefined &&
      this._popoverElement !== undefined
    ) {
      // eslint-disable-next-line ember/no-runloop
      next((): void => {
        if (this.isDestroying || this.isDestroyed) {
          return;
        }

        // Called as a function, the modifier hands its teardown back to us
        // instead of Ember, so we have to run it before reapplying and on destroy
        this._cleanupAnchoredPosition?.();
        // @ts-expect-error: known issue with type of invocation
        this._cleanupAnchoredPosition = anchoredPositionModifier(
          this._popoverElement, // element the modifier is attached to
          [this._toggleElement], // positional arguments
          this._anchoredPositionOptions // named arguments
        ) as () => void;
      });
    }
  }

  private _linkToggleAndPopover(): void {
    if (
      this._toggleElement === undefined ||
      this._popoverElement === undefined
    ) {
      return;
    }

    const popoverId = this._popoverElement.id;

    this._toggleElement.setAttribute('aria-controls', popoverId);

    if (this.enableClickEvents) {
      this._toggleElement.setAttribute('popovertarget', popoverId);
    } else {
      this._toggleElement.removeAttribute('popovertarget');
    }

    this._applyAnchoredPositionModifier();
  }

  private _syncIsOpen(): void {
    // modifier reruns whenever @isOpen value changes
    const { isOpen } = this.args;

    // do nothing if initial state, since handled already in setupPrimitivePopover
    if (this._isFirstSync) {
      this._isFirstSync = false;
      return;
    }

    if (isOpen === undefined || this._popoverElement === undefined) {
      return;
    }

    // using :popover-open to get current state, since this._isOpen is updated async after toggle event fires
    const isPopoverOpen = this._popoverElement.matches(':popover-open');

    // sync states to the user supplied value to @isOpen
    if (isOpen && !isPopoverOpen) {
      this.showPopover();
    } else if (!isOpen && isPopoverOpen) {
      this.hidePopover();
    }
  }

  showPopover = (): void => {
    try {
      if (this._popoverElement) {
        this._popoverElement.showPopover();
      }
    } catch (error) {
      warn(
        `The invocation of \`showPopover\` for the popover element caused an unexpected error: ${JSON.stringify(
          error
        )}`,
        {
          id: 'hds-popover.show-popover-action.invocation-failed',
        }
      );
    }
  };

  // the event may be passed by the `on` modifier, so we need to keep it as an argument here
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  hidePopover = (_event?: Event): void => {
    try {
      if (this._popoverElement) {
        this._popoverElement.hidePopover();
      }
    } catch (error) {
      warn(
        `The invocation of \`hidePopover\` for the popover element caused an unexpected error: ${JSON.stringify(
          error
        )}`,
        {
          id: 'hds-popover.hide-popover-action.invocation-failed',
        }
      );
    }
  };

  togglePopover = (): void => {
    try {
      if (this._popoverElement) {
        this._popoverElement.togglePopover();
      }
    } catch (error) {
      warn(
        `The invocation of \`togglePopover\` for the popover element caused an unexpected error: ${JSON.stringify(
          error
        )}`,
        {
          id: 'hds-popover.toggle-popover-action.invocation-failed',
        }
      );
    }
  };

  // fired just _before_ the "popover" is shown or hidden
  onBeforeTogglePopover = (event: ToggleEvent): void => {
    if (event.newState === 'closed') {
      // we need this flag to check if it's in the "closing" process,
      // because the browser automatically returns the focus to the "trigger" button
      // and this would re-open immediately the popover because of the `focusin` event
      this._isClosing = true;
    }
  };

  // fired just _after_ the "popover" is shown or hidden
  onTogglePopover = (event: ToggleEvent): void => {
    if (event.newState === 'open') {
      this._isOpen = true;

      // we call the "onOpen" callback if it exists (and is a function)
      const { onOpen } = this.args;
      if (typeof onOpen === 'function') {
        onOpen();
      }
    } else {
      this._isOpen = false;

      // reset the "isClosing" flag (the `toggle` event is fired _after_ the popover is closed)
      this._isClosing = false;

      // we call the "onClose" callback if it exists (and is a function)
      const { onClose } = this.args;
      if (typeof onClose === 'function') {
        onClose();
      }
    }
  };

  onMouseEnter = (): void => {
    if (this._timer) {
      clearTimeout(this._timer);
    }
    this.showPopover();
  };

  onFocusIn = (): void => {
    // don't re-open the popover if the focus is returned because the closing
    if (!this._isClosing) {
      if (this._timer) {
        clearTimeout(this._timer);
      }
      this.showPopover();
    }
  };

  onMouseLeave = (): void => {
    this._timer = setTimeout((): void => this.hidePopover(), 500);
  };

  onFocusOut = (event: FocusEvent): void => {
    if (this._containerElement) {
      let isFocusStillInside = false;
      if (
        event.relatedTarget &&
        // if the related target is not part of the disclosed content we close the disclosed container
        this._containerElement.contains(event.relatedTarget as Node)
      ) {
        isFocusStillInside = true;
      } else if (
        document.activeElement &&
        // due to inconsistent implementation of relatedTarget across browsers we use the activeElement as a fallback
        this._containerElement.contains(document.activeElement)
      ) {
        isFocusStillInside = true;
      }
      // if the target receiving the focus is _not_ part of the disclosed content we close the disclosed container
      if (!isFocusStillInside) {
        const { onFocusOut } = this.args;
        if (!event.relatedTarget && typeof onFocusOut === 'function') {
          onFocusOut();
        } else {
          this.hidePopover();
        }
      }
    }
  };

  <template>
    {{yield
      (hash
        setupPrimitiveContainer=this.setupPrimitiveContainer
        setupPrimitiveToggle=this.setupPrimitiveToggle
        setupPrimitivePopover=this.setupPrimitivePopover
        toggleElement=this._toggleElement
        popoverElement=this._popoverElement
        isOpen=this._isOpen
        showPopover=this.showPopover
        hidePopover=this.hidePopover
        togglePopover=this.togglePopover
        boundary=@boundary
      )
    }}
  </template>
}
