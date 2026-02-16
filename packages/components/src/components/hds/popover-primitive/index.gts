/**
 * Copyright IBM Corp. 2021, 2025
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
    Named: { anchoredPositionOptions: HdsAnchoredPositionOptions };
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

  constructor(owner: Owner, args: HdsPopoverPrimitiveSignature['Args']) {
    super(owner, args);
    this._isOpen = this.args.isOpen ?? false;
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
      named: { anchoredPositionOptions: HdsAnchoredPositionOptions }
    ): void => {
      this._popoverElement = element;

      // We need to create a popoverId in order to connect the popover and the toggle with aria-controls
      // and an id is needed to implement `onclick` event listeners
      if (!this._popoverElement.id) {
        this._popoverElement.id = guidFor(this);
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
      registerEvent(this._popoverElement, [
        'beforetoggle',
        this.onBeforeTogglePopover,
      ]);
      // @ts-expect-error: known issue with type of invocation
      registerEvent(this._popoverElement, ['toggle', this.onTogglePopover]);

      // we need to spread the argument because if it's set via `{{ hash … }}` Ember complains when we overwrite one of its values
      this._anchoredPositionOptions = {
        ...named.anchoredPositionOptions,
      };

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
      this._popoverElement !== undefined &&
      this._anchoredPositionOptions !== undefined
    ) {
      // eslint-disable-next-line ember/no-runloop
      next((): void => {
        // @ts-expect-error: known issue with type of invocation
        anchoredPositionModifier(
          this._popoverElement, // element the modifier is attached to
          [this._toggleElement], // positional arguments
          this._anchoredPositionOptions // named arguments
        );
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

      // if the popover was initially forced to be open (using the "manual" state) then revert its status to `auto` once the user interacts with it
      if (this.args.isOpen) {
        if (this._popoverElement) {
          this._popoverElement.popover = 'auto';
        }
      }

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
        this.hidePopover();
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
