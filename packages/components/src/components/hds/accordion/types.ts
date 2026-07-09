/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import HdsAccordionItem from './item/index.gts';

import type { WithBoundArgs } from '@glint/template';

export enum HdsAccordionTypeValues {
  Card = 'card',
  Flush = 'flush',
}
export type HdsAccordionTypes = `${HdsAccordionTypeValues}`;

export enum HdsAccordionSizeValues {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}
export type HdsAccordionSizes = `${HdsAccordionSizeValues}`;

export enum HdsAccordionForceStateValues {
  Open = 'open',
  Close = 'close',
}
export type HdsAccordionForceStates = `${HdsAccordionForceStateValues}`;

export enum HdsAccordionItemTitleTagValues {
  Div = 'div',
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4',
  H5 = 'h5',
  H6 = 'h6',
}

export type HdsAccordionItemTitleTags = `${HdsAccordionItemTitleTagValues}`;

export interface HdsAccordionSignature {
  Args: {
    /**
     * @defaultValue 'medium'
     */
    size?: HdsAccordionSizes;

    /**
     * @defaultValue 'card'
     */
    type?: HdsAccordionTypes;

    /**
     * Controls the state of all items within a group. Can be used to expand or collapse all items at once.
     * @defaultValue 'close'
     */
    forceState?: HdsAccordionForceStates;

    /**
     * The HTML tag that wraps the content of each Accordion Item "toggle" block.
     * @defaultValue 'div'
     */
    titleTag?: HdsAccordionItemTitleTags;
  };
  Blocks: {
    default: [
      {
        Item?: WithBoundArgs<
          typeof HdsAccordionItem,
          'titleTag' | 'size' | 'type' | 'forceState'
        >;
      },
    ];
  };
  Element: HTMLDivElement;
}
