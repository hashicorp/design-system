/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { guidFor } from '@ember/object/internals';
import { hash } from '@ember/helper';

import {
  HdsAccordionSizeValues,
  HdsAccordionTypeValues,
  HdsAccordionItemTitleTagValues,
} from '../types.ts';
import HdsAccordionItemButton from './button.gts';
import HdsTextBody from '../../text/body.gts';
import HdsDisclosurePrimitive from '../../disclosure-primitive/index.gts';

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
  private _titleId = 'title-' + guidFor(this);

  get ariaLabelledBy(): string | undefined {
    if (!this.args.ariaLabel) {
      return this._titleId;
    }
    return undefined;
  }

  get containsInteractive(): boolean {
    return this.args.containsInteractive ?? false;
  }

  get toggleTextSize(): number {
    const size = this.args.size ?? DEFAULT_SIZE;
    return TEXT_SIZE_MAP[size];
  }

  get size(): HdsAccordionSizes {
    const { size = DEFAULT_SIZE } = this.args;

    assert(
      `@size for "Hds::Accordion::Item" must be one of the following: ${SIZES.join(
        ', '
      )}; received: ${size}`,
      SIZES.includes(size)
    );

    return size;
  }

  get isOpen(): boolean {
    return this.args.isOpen ?? this.args.forceState === 'open';
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
    <HdsDisclosurePrimitive
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
    </HdsDisclosurePrimitive>
  </template>
}
