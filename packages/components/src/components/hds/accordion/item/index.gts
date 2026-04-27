/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import '@carbon/web-components/es/components/accordion/accordion.js';
import { ACCORDION_SIZE } from '@carbon/web-components/es/components/accordion/accordion.js';
import { assert } from '@ember/debug';
// import { hash } from '@ember/helper';
import { element } from 'ember-element-helper';

import {
  HdsAccordionSizeValues,
  HdsAccordionTypeValues,
  HdsAccordionItemTitleTagValues,
  HdsAccordionForceStateValues,
} from '../types.ts';

import type {
  HdsAccordionForceStates,
  HdsAccordionSizes,
  HdsAccordionTypes,
  HdsAccordionItemTitleTags,
} from '../types.ts';

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

  get isOpen(): boolean {
    if (
      this.args.isOpen ||
      this.args.forceState === HdsAccordionForceStateValues.Open
    ) {
      return true;
    } else {
      return false;
    }
  }

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

  get classNames() {
    const classes = ['hds-accordion-item'];

    // add a class based on the @isOpen argument
    if (this.args.isOpen) {
      classes.push('hds-accordion-item--is-open');
    }

    // add a class based on the @isStatic argument
    if (this.args.isStatic) {
      classes.push('hds-accordion-item--is-static');
    }

    // add a class based on the @size argument
    classes.push(`hds-accordion-item--size-${this.size}`);

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

  <template>
    <cds-accordion-item
      {{!-- class={{this.classNames}} --}}
      aria-label={{@ariaLabel}}
      size={{this.size}}
      open={{this.isOpen}}
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
      {{!-- {{#if this.isOpen}} --}}
      <div
        {{!-- id={{this._contentId}}  --}}
        class="hds-accordion-item__content"
      >
        {{yield to="content"}}
        {{!-- {{yield (hash close=this.close) to="content"}} --}}
      </div>
      {{!-- {{/if}} --}}
    </cds-accordion-item>
    {{!-- <HdsDisclosurePrimitive
      class={{this.classNames}}
      @isOpen={{this.isOpen}}
      @onClickToggle={{@onClickToggle}}
      ...attributes
    >
      <:toggle as |t|>
        <div class="hds-accordion-item__toggle">
          <HdsAccordionItemButton
            @isOpen={{t.isOpen}}
            @onClickToggle={{t.onClickToggle}}
            @contentId={{t.contentId}}
            @ariaLabel={{@ariaLabel}}
            @ariaLabelledBy={{this.ariaLabelledBy}}
            @size={{this.size}}
            @parentContainsInteractive={{this.containsInteractive}}
          />

          <HdsTextBody
            @tag={{this.titleTag}}
            @size={{this.toggleTextSize}}
            @weight="semibold"
            @color="strong"
            id={{this._titleId}}
            class="hds-accordion-item__toggle-content"
          >
            {{yield to="toggle"}}
          </HdsTextBody>
        </div>
      </:toggle>

      <:content as |c|>
        <HdsTextBody
          class="hds-accordion-item__content"
          @tag="div"
          @size="200"
          @weight="regular"
          @color="primary"
        >
          {{yield (hash close=c.close) to="content"}}
        </HdsTextBody>
      </:content>
    </HdsDisclosurePrimitive> --}}
  </template>
}
