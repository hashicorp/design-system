/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { hash } from '@ember/helper';

import type { WithBoundArgs } from '@glint/template';
import type { ACCORDION_ALIGNMENT } from '@carbon/web-components/es/components/accordion/accordion.js';

import HdsAccordionCds from './cds/index.gts';
import HdsAccordionHds from './hds/index.gts';
import HdsAccordionItem from './item/index.gts';

import type {
  HdsAccordionForceStates,
  HdsAccordionSizes,
  HdsAccordionTypes,
  HdsAccordionItemTitleTags,
} from './types.ts';

export interface HdsAccordionSignature {
  Args: {
    size?: HdsAccordionSizes;
    type?: HdsAccordionTypes;
    forceState?: HdsAccordionForceStates;
    titleTag?: HdsAccordionItemTitleTags;
    /**
     * When true, renders the Carbon (cds) accordion implementation.
     * When false (default), renders the original HDS accordion implementation.
     */
    useCds?: boolean;
    /** Only applies when @useCds is true. */
    disabled?: boolean;
    /** Only applies when @useCds is true. */
    alignment?: ACCORDION_ALIGNMENT;
  };
  Blocks: {
    default: [
      {
        Item?: WithBoundArgs<
          typeof HdsAccordionItem,
          'titleTag' | 'type' | 'forceState' | 'size' | 'useCds'
        >;
      },
    ];
  };
  Element: HTMLElement;
}

export default class HdsAccordion extends Component<HdsAccordionSignature> {
  get useCds(): boolean {
    return this.args.useCds ?? false;
  }

  <template>
    {{#if this.useCds}}
      <HdsAccordionCds
        @size={{@size}}
        @type={{@type}}
        @forceState={{@forceState}}
        @titleTag={{@titleTag}}
        @disabled={{@disabled}}
        @alignment={{@alignment}}
        ...attributes
      >
        <:default>
          {{yield
            (hash
              Item=(component
                HdsAccordionItem
                titleTag=@titleTag
                type=@type
                forceState=@forceState
                size=@size
                useCds=true
              )
            )
          }}
        </:default>
      </HdsAccordionCds>
    {{else}}
      <HdsAccordionHds
        @size={{@size}}
        @type={{@type}}
        @forceState={{@forceState}}
        @titleTag={{@titleTag}}
        ...attributes
      >
        <:default>
          {{yield
            (hash
              Item=(component
                HdsAccordionItem
                titleTag=@titleTag
                type=@type
                forceState=@forceState
                size=@size
                useCds=false
              )
            )
          }}
        </:default>
      </HdsAccordionHds>
    {{/if}}
  </template>
}
