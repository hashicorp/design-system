/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { hash } from '@ember/helper';

import HdsAccordionItemCds from '../cds/item/index.gts';
import HdsAccordionItemHds from '../hds/item/index.gts';

export {
  SIZES,
  DEFAULT_SIZE,
  TYPES,
  DEFAULT_TYPE,
} from '../cds/item/index.gts';

import type {
  HdsAccordionForceStates,
  HdsAccordionSizes,
  HdsAccordionTypes,
  HdsAccordionItemTitleTags,
} from '../types.ts';

export interface HdsAccordionItemSignature {
  Args: {
    ariaLabel?: string;
    /**
     * Only meaningful for the original HDS implementation. Ignored when @useCds is true,
     * since Carbon wraps the toggle content in a button.
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
    /**
     * When true, renders the Carbon (cds) accordion item implementation.
     * When false (default), renders the original HDS accordion item implementation.
     */
    useCds?: boolean;
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
  get useCds(): boolean {
    return this.args.useCds ?? false;
  }

  <template>
    {{#if this.useCds}}
      <HdsAccordionItemCds
        @ariaLabel={{@ariaLabel}}
        @containsInteractive={{@containsInteractive}}
        @forceState={{@forceState}}
        @isOpen={{@isOpen}}
        @isStatic={{@isStatic}}
        @onClickToggle={{@onClickToggle}}
        @size={{@size}}
        @titleTag={{@titleTag}}
        @type={{@type}}
        ...attributes
      >
        <:toggle>{{yield to="toggle"}}</:toggle>
        <:content as |c|>{{yield (hash close=c.close) to="content"}}</:content>
      </HdsAccordionItemCds>
    {{else}}
      <HdsAccordionItemHds
        @ariaLabel={{@ariaLabel}}
        @containsInteractive={{@containsInteractive}}
        @forceState={{@forceState}}
        @isOpen={{@isOpen}}
        @isStatic={{@isStatic}}
        @onClickToggle={{@onClickToggle}}
        @size={{@size}}
        @titleTag={{@titleTag}}
        @type={{@type}}
        ...attributes
      >
        <:toggle>{{yield to="toggle"}}</:toggle>
        <:content as |c|>{{yield (hash close=c.close) to="content"}}</:content>
      </HdsAccordionItemHds>
    {{/if}}
  </template>
}
