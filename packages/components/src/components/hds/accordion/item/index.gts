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
  HdsAccordionForceStateValues,
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
    /**
     * Accepts a string. The ariaLabel value is applied to the HTML button
     * which controls visibility of the content block content.
     * @default "Toggle display"
     */
    ariaLabel?: string;

    /**
     * Controls whether the entire toggle block is interactive for toggling
     * the content display or whether only the chevron button itself is
     * interactive which allows for adding other interactive content in the toggle area.
     * @default false
     */
    containsInteractive?: boolean;

    /**
     * Controls the state of an Accordion::Item after the initial render
     * by overriding its current state.
     */
    forceState?: HdsAccordionForceStates;

    /**
     * Toggles the visibility of the content. To display content on page load,
     * set the value to true.
     * @default false
     */
    isOpen?: boolean;

    /**
     * Removes the ability to interact with the toggle and hides the
     * chevron element when set to true.
     * @default false
     */
    isStatic?: boolean;

    /**
     * Callback function invoked when the toggle is clicked.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onClickToggle?: (event: MouseEvent, ...args: any[]) => void;

    /**
     * The size of the accordion item.
     * @default "medium"
     */
    size?: HdsAccordionSizes;

    /**
     * The HTML tag that wraps the content of the Accordion Item "toggle" block.
     * @default "div"
     */
    titleTag?: HdsAccordionItemTitleTags;

    /**
     * The visual style of the accordion item.
     * @default "card"
     */
    type?: HdsAccordionTypes;
  };
  Blocks: {
    /**
     * A named block that works as a “toggle” for the Accordion::Item.
     * Elements passed as children are yielded as inner content of the "toggle" block.
     */
    toggle?: [];

    /**
     * A named block for the content that is shown/hidden upon toggling.
     * Elements passed as children are yielded as inner content of the "content" block.
     */
    content: [
      {
        /**
         * A function to programmatically close the Accordion::Item.
         */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        close: (...args: any[]) => void;
      },
    ];
  };
  /**
   * Supports all standard HTML attributes, including `...attributes`.
   */
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
