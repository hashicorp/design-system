/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import '@carbon/web-components/es/components/accordion/accordion.js';
import { ACCORDION_SIZE } from '@carbon/web-components/es/components/accordion/accordion.js';
import { assert } from '@ember/debug';
import { hash } from '@ember/helper';
import { on } from '@ember/modifier';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { modifier } from 'ember-modifier';
import { element } from 'ember-element-helper';

import {
  HdsAccordionSizeValues,
  HdsAccordionTypeValues,
  HdsAccordionItemTitleTagValues,
  HdsAccordionForceStateValues,
} from '../../types.ts';

import type {
  HdsAccordionForceStates,
  HdsAccordionSizes,
  HdsAccordionTypes,
  HdsAccordionItemTitleTags,
} from '../../types.ts';

export const SIZES: HdsAccordionSizes[] = Object.values(HdsAccordionSizeValues);
export const DEFAULT_SIZE = HdsAccordionSizeValues.Medium;

export const TYPES: HdsAccordionTypes[] = Object.values(HdsAccordionTypeValues);
export const DEFAULT_TYPE = HdsAccordionTypeValues.Card;

const TEXT_SIZE_MAP = {
  small: 100,
  medium: 200,
  large: 300,
};

export interface HdsAccordionItemSignature {
  Args: {
    ariaLabel?: string;
    /**
     * @deprecated Cannot have @containsInteractive anymore bc Carbon wraps the toggle content in a button
     */
    containsInteractive?: boolean;
    forceState?: HdsAccordionForceStates;
    isOpen?: boolean;
    isStatic?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onClickToggle?: (event: MouseEvent, ...args: any[]) => void;
    size?: HdsAccordionSizes;
    titleTag?: HdsAccordionItemTitleTags;
    type?: HdsAccordionTypes;
  };
  Blocks: {
    toggle?: [];
    content: [
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        close: (...args: any[]) => void;
      },
    ];
  };
  Element: HTMLElement;
}

export default class HdsAccordionItem extends Component<HdsAccordionItemSignature> {
  // Tracks the user-driven open state, used so the yielded `close` action and
  // user toggles can override the initial @isOpen / @forceState arguments.
  @tracked private _userOpen: boolean;
  // Non-tracked: only used to detect transitions of @forceState.
  private _lastSeenForceState?: HdsAccordionForceStates;

  constructor(owner: unknown, args: HdsAccordionItemSignature['Args']) {
    super(owner as never, args);
    this._userOpen = this.computeInitialOpen();
    this._lastSeenForceState = this.args.forceState;
  }

  private computeInitialOpen(): boolean {
    // Match the historical semantics: at construction time, only an explicit
    // `forceState='open'` overrides @isOpen. `forceState='close'` does not
    // suppress an explicitly opened item until the consumer subsequently
    // changes the forceState value.
    if (this.args.forceState === HdsAccordionForceStateValues.Open) {
      return true;
    }
    return this.args.isOpen ?? false;
  }

  get containsInteractive(): boolean {
    return this.args.containsInteractive ?? false;
  }

  get toggleTextSize(): number {
    const size = this.args.size ?? DEFAULT_SIZE;
    return TEXT_SIZE_MAP[size];
  }

  get size(): ACCORDION_SIZE {
    const { size = DEFAULT_SIZE } = this.args;

    assert(
      `@size for "Hds::Accordion::Item" must be one of the following: ${SIZES.join(
        ', '
      )}; received: ${size}`,
      SIZES.includes(size)
    );

    switch (size) {
      case HdsAccordionSizeValues.Small:
        return ACCORDION_SIZE.SMALL;
      case HdsAccordionSizeValues.Medium:
        return ACCORDION_SIZE.MEDIUM;
      case HdsAccordionSizeValues.Large:
        return ACCORDION_SIZE.LARGE;
    }

    return ACCORDION_SIZE.MEDIUM;
  }

  // Open state passed to the underlying cds-accordion-item.
  get isOpen(): boolean {
    return this._userOpen;
  }

  // Modifier that watches @forceState and acts as an external override:
  // every time the consumer changes @forceState, the internal toggle state
  // is reset to match. Internal toggles (user clicks or the yielded `close`
  // action) take precedence between forceState changes.
  syncForceState = modifier(
    (
      _element: Element,
      _positional: [],
      { forceState }: { forceState?: HdsAccordionForceStates }
    ) => {
      if (forceState === this._lastSeenForceState) {
        return;
      }
      this._lastSeenForceState = forceState;
      if (forceState === HdsAccordionForceStateValues.Open) {
        this._userOpen = true;
      } else if (forceState === HdsAccordionForceStateValues.Close) {
        this._userOpen = false;
      }
    }
  );

  get type(): HdsAccordionTypes {
    const { type = DEFAULT_TYPE } = this.args;

    assert(
      `@type for "Hds::Accordion::Item" must be one of the following: ${TYPES.join(
        ', '
      )}; received: ${type}`,
      TYPES.includes(type)
    );

    return type;
  }

  get titleTag(): HdsAccordionItemTitleTags {
    return this.args.titleTag ?? HdsAccordionItemTitleTagValues.Div;
  }

  get sizeClassName(): HdsAccordionSizes {
    return this.args.size ?? DEFAULT_SIZE;
  }

  get classNames() {
    const classes = ['hds-accordion-item'];

    // add a class based on the @isOpen argument
    if (this.isOpen) {
      classes.push('hds-accordion-item--is-open');
    }

    // add a class based on the @isStatic argument
    if (this.args.isStatic) {
      classes.push('hds-accordion-item--is-static');
    }

    // add a class based on the @size argument
    classes.push(`hds-accordion-item--size-${this.sizeClassName}`);

    // add a class based on the @type argument
    classes.push(`hds-accordion-item--type-${this.type}`);

    if (this.containsInteractive) {
      // Entire accordion item including the chevron is interactive:
      classes.push('hds-accordion-item--contains-interactive');
    } else {
      // Only chevron is interactive:
      classes.push('hds-accordion-item--does-not-contain-interactive');
    }

    return classes.join(' ');
  }

  // Handler for the cds-accordion-item-toggled event fired by the underlying
  // Carbon web component after a user gesture toggles the item.
  // Note: the cds event bubbles, so a nested accordion item toggling would
  // otherwise also reach the parent's handler. We guard by checking that the
  // event originated from this item's own host element.
  @action
  handleToggled(event: Event): void {
    if (event.currentTarget !== event.target) {
      return;
    }
    const customEvent = event as CustomEvent<{ open: boolean }>;
    const open = customEvent.detail?.open ?? false;
    this._userOpen = open;
    this.args.onClickToggle?.(event as unknown as MouseEvent);
  }

  // Yielded action allowing consumers to programmatically close the item
  // from within its content block.
  @action
  close(): void {
    this._userOpen = false;
  }

  <template>
    <cds-accordion-item
      class={{this.classNames}}
      aria-label={{@ariaLabel}}
      size={{this.size}}
      open={{this.isOpen}}
      {{on "cds-accordion-item-toggled" this.handleToggled}}
      {{this.syncForceState forceState=@forceState}}
      ...attributes
    >
      {{! Title slot: Carbon renders this inside its own button }}
      {{#let (element this.titleTag) as |TitleTag|}}
        <TitleTag slot="title" class="hds-accordion-item__toggle-content">
          {{yield to="toggle"}}
        </TitleTag>
      {{/let}}

      {{! Default slot: Carbon renders this in the content area }}
      {{! We wrap in our content div for CSS class compatibility and only
          render it when open so hds-accordion-item__content visibility
          tracks the actual open state. }}
      {{#if this.isOpen}}
        <div class="hds-accordion-item__content">
          {{yield (hash close=this.close) to="content"}}
        </div>
      {{/if}}
    </cds-accordion-item>
  </template>
}
