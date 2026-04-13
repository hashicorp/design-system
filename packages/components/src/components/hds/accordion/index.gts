/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { hash } from '@ember/helper';
import { assert } from '@ember/debug';

// Import the Carbon Web Component - this registers the custom element
import '@carbon/web-components/es/components/accordion/index.js';

// Import the Item component for yielding as a contextual component
import HdsAccordionItem from './item.gts';

// Import types and constants
import {
  HdsAccordionSizeValues,
  HdsAccordionTypeValues,
  HdsAccordionItemTitleTagValues,
} from './types.ts';
import type {
  HdsAccordionForceStates,
  HdsAccordionSizes,
  HdsAccordionTypes,
  HdsAccordionItemTitleTags,
} from './types.ts';
import type { HdsAccordionItemSignature } from './item.gts';
import type { ComponentLike } from '@glint/template';

// Export constants for validation
export const SIZES: HdsAccordionSizes[] = Object.values(HdsAccordionSizeValues);
export const DEFAULT_SIZE = HdsAccordionSizeValues.Medium;

export const TYPES: HdsAccordionTypes[] = Object.values(HdsAccordionTypeValues);
export const DEFAULT_TYPE = HdsAccordionTypeValues.Card;

/**
 * Signature for the HdsAccordion component
 *
 * This component wraps the Carbon Design System's <cds-accordion> Web Component
 * while preserving the existing Helios public API for consumers.
 */
export interface HdsAccordionSignature {
  Args: {
    /** Size variant of the accordion (small, medium, large) */
    size?: HdsAccordionSizes;
    /** Type variant of the accordion (card or flush) */
    type?: HdsAccordionTypes;
    /** Force all items to be open or closed */
    forceState?: HdsAccordionForceStates;
    /** HTML tag to use for the title element */
    titleTag?: HdsAccordionItemTitleTags;
  };
  Blocks: {
    /**
     * The default block yields a hash containing the Item contextual component.
     * Consumers can use it like: <Accordion as |A|><A.Item>...</A.Item></Accordion>
     */
    default: [
      {
        Item: ComponentLike<HdsAccordionItemSignature>;
      },
    ];
  };
  // Use Element instead of HTMLElement for Web Component compatibility
  Element: Element;
}

export default class HdsAccordion extends Component<HdsAccordionSignature> {
  /**
   * Validates and returns the size argument
   *
   * @default 'medium'
   */
  get size(): HdsAccordionSizes {
    const { size = DEFAULT_SIZE } = this.args;

    assert(
      `@size for "Hds::Accordion" must be one of the following: ${SIZES.join(
        ', '
      )}; received: ${size}`,
      SIZES.includes(size)
    );

    return size;
  }

  /**
   * Validates and returns the type argument
   *
   * @default 'card'
   */
  get type(): HdsAccordionTypes {
    const { type = DEFAULT_TYPE } = this.args;

    assert(
      `@type for "Hds::Accordion" must be one of the following: ${TYPES.join(
        ', '
      )}; received: ${type}`,
      TYPES.includes(type)
    );

    return type;
  }

  /**
   * Returns the title tag to use for accordion item titles
   *
   * @default 'div'
   */
  get titleTag(): HdsAccordionItemTitleTags {
    return this.args.titleTag ?? HdsAccordionItemTitleTagValues.Div;
  }

  /**
   * Build the CSS class names for styling hooks.
   * These classes allow Helios styles to be applied alongside Carbon styles.
   */
  get classNames(): string {
    const classes = ['hds-accordion'];

    // Add a class based on the @size argument
    classes.push(`hds-accordion--size-${this.size}`);

    // Add a class based on the @type argument
    classes.push(`hds-accordion--type-${this.type}`);

    return classes.join(' ');
  }

  <template>
    <cds-accordion class={{this.classNames}} ...attributes>
      {{yield
        (hash
          Item=(component
            HdsAccordionItem
            titleTag=this.titleTag
            size=this.size
            type=this.type
            forceState=@forceState
          )
        )
      }}
    </cds-accordion>
  </template>
}
