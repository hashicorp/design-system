/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { assert, warn } from '@ember/debug';
import { next } from '@ember/runloop';
import { guidFor } from '@ember/object/internals';
import { modifier } from 'ember-modifier';

import registerEvent from '../../../modifiers/hds-register-event.ts';
import anchoredPositionModifier from '../../../modifiers/hds-anchored-position.ts';

import type { HdsAnchoredPositionOptions } from '../../../modifiers/hds-anchored-position.ts';
import type { ModifierLike } from '@glint/template';
import type Owner from '@ember/owner';

export interface HdsPopoverPrimitiveSignature {
  Args: {
    isOpen?: boolean;
    enableSoftEvents?: boolean;
    enableClickEvents?: boolean;
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
        hidePopover: () => void;
        togglePopover: () => void;
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
          // eslint-disable-next-line @typescript-eslint/unbound-method
          this.onMouseEnter,
        ]);
        // @ts-expect-error: known issue with type of invocation
        registerEvent(this._containerElement, [
          'mouseleave',
          // eslint-disable-next-line @typescript-eslint/unbound-method
          this.onMouseLeave,
        ]);
        // @ts-expect-error: known issue with type of invocation
        // eslint-disable-next-line @typescript-eslint/unbound-method
        registerEvent(this._containerElement, ['focusin', this.onFocusIn]);
      }
      // we always want the focusOut event
      // @ts-expect-error: known issue with type of invocation
      // eslint-disable-next-line @typescript-eslint/unbound-method
      registerEvent(this._containerElement, ['focusout', this.onFocusOut]);
    }
  );

  setupPrimitiveToggle = modifier<SetupPrimitiveToggleModifier>(
    (element: HTMLButtonElement): void => {
      this._toggleElement = element;

      assert(
        `The toggle element of "Hds::PopoverPrimitive" must be a <button>; element received: <${element.tagName.toLowerCase()}>`,
        element instanceof HTMLButtonElement
      );
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
      if (this._toggleElement) {
        let popoverId;
        if (this._popoverElement.id) {
          popoverId = this._popoverElement.id;
        } else {
          // we need a DOM id for the `aria-controls` and `popovertarget` attributes
          popoverId = guidFor(this);
          this._popoverElement.id = popoverId;
        }
        this._toggleElement.setAttribute('aria-controls', popoverId);

        // for the click events we don't use `onclick` event listeners, but we rely on the `popovertarget` attribute
        // provided by the Popover API which does all the magic for us without needing JS code
        // (important: to work it needs to be applied to a button)
        if (this.enableClickEvents) {
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
      registerEvent(this._popoverElement, [
        'beforetoggle',
        // eslint-disable-next-line @typescript-eslint/unbound-method
        this.onBeforeTogglePopover,
      ]);
      // @ts-expect-error: known issue with type of invocation
      // eslint-disable-next-line @typescript-eslint/unbound-method
      registerEvent(this._popoverElement, ['toggle', this.onTogglePopover]);

      // we need to spread the argument because if it's set via `{{ hash … }}` Ember complains when we overwrite one of its values
      const anchoredPositionOptions: HdsAnchoredPositionOptions = {
        ...named.anchoredPositionOptions,
      };

      // Apply the `hds-anchored-position` modifier to the "popover" element
      // (notice: this function runs the first time when the element the modifier was applied to is inserted into the DOM, and it autotracks while running.
      // Any tracked values that it accesses will be tracked, including the arguments it receives, and if any of them changes, the function will run again)
      // This modifiers uses the Floating UI library to provide:
      // - positioning of the "popover" in relation to the "toggle"
      // - collision detection (optional)
      // eslint-disable-next-line ember/no-runloop
      next((): void => {
        // @ts-expect-error: known issue with type of invocation
        anchoredPositionModifier(
          this._popoverElement, // element the modifier is attached to
          [this._toggleElement], // positional arguments
          anchoredPositionOptions // named arguments
        );
      });
    }
  );

  @action
  showPopover(): void {
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
  }

  @action
  hidePopover(): void {
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
  }

  @action
  togglePopover(): void {
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
  }

  // fired just _before_ the "popover" is shown or hidden
  @action
  onBeforeTogglePopover(event: ToggleEvent): void {
    if (event.newState === 'closed') {
      // we need this flag to check if it's in the "closing" process,
      // because the browser automatically returns the focus to the "trigger" button
      // and this would re-open immediately the popover because of the `focusin` event
      this._isClosing = true;
    }
  }

  // fired just _after_ the "popover" is shown or hidden
  @action
  onTogglePopover(event: ToggleEvent): void {
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
  }

  @action
  onMouseEnter(): void {
    if (this._timer) {
      clearTimeout(this._timer);
    }
    this.showPopover();
  }

  @action
  onFocusIn(): void {
    // don't re-open the popover if the focus is returned because the closing
    if (!this._isClosing) {
      if (this._timer) {
        clearTimeout(this._timer);
      }
      this.showPopover();
    }
  }

  @action
  onMouseLeave(): void {
    this._timer = setTimeout((): void => this.hidePopover(), 500);
  }

  @action
  onFocusOut(event: FocusEvent): void {
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
  }
}
