/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { hash } from '@ember/helper';
import { on } from '@ember/modifier';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import didUpdate from '@ember/render-modifiers/modifiers/did-update';
import { element } from 'ember-element-helper';

// Import the Carbon Web Component - this registers the custom element
import '@carbon/web-components/es/components/accordion/index.js';

// Import the sync-props modifier for syncing Ember args to Web Component properties
import hdsSyncProps from '../../../modifiers/hds-sync-props.ts';

import { HdsAccordionItemTitleTagValues } from './types.ts';
import type {
  HdsAccordionForceStates,
  HdsAccordionSizes,
  HdsAccordionTypes,
  HdsAccordionItemTitleTags,
} from './types.ts';

/**
 * Signature for the HdsAccordionItem component
 *
 * This component wraps the Carbon Design System's <cds-accordion-item> Web Component
 * while preserving the existing Helios public API for consumers.
 */
export interface HdsAccordionItemSignature {
  Args: {
    /** Optional aria-label for accessibility */
    ariaLabel?: string;
    /** Whether the accordion content contains interactive elements */
    containsInteractive?: boolean;
    /** Force the accordion to be open or closed */
    forceState?: HdsAccordionForceStates;
    /** Whether the accordion item is currently open */
    isOpen?: boolean;
    /** Whether the accordion item is static (always visible, no toggle) */
    isStatic?: boolean;
    /** Callback fired when the accordion is toggled */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onClickToggle?: (event: Event, ...args: any[]) => void;
    /** Size variant of the accordion */
    size?: HdsAccordionSizes;
    /** HTML tag to use for the title element */
    titleTag?: HdsAccordionItemTitleTags;
    /** Type variant of the accordion (card or flush) */
    type?: HdsAccordionTypes;
  };
  Blocks: {
    /** Named block for toggle/title content */
    toggle: [];
    /** Named block for accordion content body, yields close action */
    content: [{ close: () => void }];
  };
  // Use Element instead of HTMLElement for Web Component compatibility
  Element: Element;
}

export default class HdsAccordionItem extends Component<HdsAccordionItemSignature> {
  // Unique ID for content element (used for CSS class compatibility)
  private _contentId = 'content-' + guidFor(this);

  // Internal tracked state for managing open/close
  // This allows the close() action to work independently of @isOpen
  @tracked private _internalIsOpen: boolean | null = null;

  // Tracks whether the state is controlled externally (via forceState change)
  // Initially false - on initial render we use @isOpen
  // After forceState changes, we set to true so forceState takes control
  // After user interaction, we set to false so internal state takes control
  @tracked private _isControlled = false;

  /**
   * Computes the effective open state.
   *
   * The logic follows the original DisclosurePrimitive pattern:
   * 1. On initial render, use @isOpen (forceState doesn't override on initial render)
   * 2. After forceState CHANGES (via did-update), forceState takes full control
   * 3. After user interaction (toggle/close), internal state takes over
   * 4. If forceState CHANGES again, forceState re-takes control
   */
  get isOpen(): boolean {
    const { isOpen = false, forceState } = this.args;

    // If controlled externally by forceState
    if (this._isControlled) {
      return forceState === 'open';
    }

    // If user has interacted, use internal state
    if (this._internalIsOpen !== null) {
      return this._internalIsOpen;
    }

    // Initial render - use @isOpen
    return isOpen;
  }

  /**
   * Called when forceState changes via did-update modifier.
   * This is the key to matching the original DisclosurePrimitive behavior.
   */
  @action
  onForceStateChange(): void {
    this._isControlled = true;
    // Reset internal state so forceState takes full control
    this._internalIsOpen = null;
  }

  /**
   * Returns whether the accordion item is static (no toggle interaction)
   */
  get isStatic(): boolean {
    return this.args.isStatic ?? false;
  }

  /**
   * Returns the HTML tag to use for the title element
   */
  get titleTag(): HdsAccordionItemTitleTags {
    return this.args.titleTag ?? HdsAccordionItemTitleTagValues.Div;
  }

  /**
   * Build the CSS class names for styling hooks
   * These classes allow Helios styles to be applied alongside Carbon styles
   */
  get classNames(): string {
    const classes = ['hds-accordion-item'];

    if (this.isOpen) {
      classes.push('hds-accordion-item--is-open');
    }

    if (this.isStatic) {
      classes.push('hds-accordion-item--is-static');
    }

    if (this.args.size) {
      classes.push(`hds-accordion-item--size-${this.args.size}`);
    }

    if (this.args.type) {
      classes.push(`hds-accordion-item--type-${this.args.type}`);
    }

    if (this.args.containsInteractive) {
      classes.push('hds-accordion-item--contains-interactive');
    } else {
      classes.push('hds-accordion-item--does-not-contain-interactive');
    }

    return classes.join(' ');
  }

  /**
   * Close action that can be called from within the content block
   * This allows content to programmatically close the accordion
   */
  @action
  close(): void {
    this._internalIsOpen = false;
    this._isControlled = false; // User action takes over control
  }

  /**
   * Handles the 'cds-accordion-item-toggled' event from the Carbon Web Component
   *
   * This bridges the Web Component's event system back to Ember's action system,
   * allowing consumers to use familiar @onClickToggle callbacks.
   *
   * @param event - The event fired by cds-accordion-item (CustomEvent at runtime)
   */
  @action
  handleToggle(event: Event): void {
    const target = event.target;

    // Type guard: ensure target is the expected Web Component with 'open' property
    if (!(target instanceof Element) || !('open' in target)) {
      return;
    }

    // Get the new state from Carbon's web component
    const newOpenState = (target as Element & { open: boolean }).open;

    // Only update if this represents an actual state change from the current computed value
    // This prevents event handlers from overriding state during initial render or programmatic updates
    if (newOpenState === this.isOpen) {
      return;
    }

    // Update internal state to reflect the new open state from Web Component
    this._internalIsOpen = newOpenState;
    this._isControlled = false; // User action takes over control

    // Call the consumer's callback if provided
    if (this.args.onClickToggle) {
      this.args.onClickToggle(event);
    }
  }

  <template>
    <cds-accordion-item
      class={{this.classNames}}
      aria-label={{@ariaLabel}}
      {{hdsSyncProps open=this.isOpen disabled=this.isStatic}}
      {{didUpdate this.onForceStateChange @forceState}}
      {{on "cds-accordion-item-toggled" this.handleToggle}}
      ...attributes
    >
      {{! Title slot: Carbon renders this inside its own button }}
      {{#let (element this.titleTag) as |TitleTag|}}
        <TitleTag slot="title" class="hds-accordion-item__toggle-content">
          {{yield to="toggle"}}
        </TitleTag>
      {{/let}}

      {{! Default slot: Carbon renders this in the content area }}
      {{! We wrap in our content div for CSS class compatibility }}
      {{#if this.isOpen}}
        <div id={{this._contentId}} class="hds-accordion-item__content">
          {{yield (hash close=this.close) to="content"}}
        </div>
      {{/if}}
    </cds-accordion-item>
  </template>
}
