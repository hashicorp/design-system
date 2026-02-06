/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { hash } from '@ember/helper';

import type { WithBoundArgs } from '@glint/template';

import HdsAccordionItem, {
  SIZES,
  DEFAULT_SIZE,
  TYPES,
  DEFAULT_TYPE,
} from './item/index.gts';
import { HdsAccordionItemTitleTagValues } from './types.ts';

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

export default class HdsAccordion extends Component<HdsAccordionSignature> {
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

  get titleTag(): HdsAccordionItemTitleTags {
    return this.args.titleTag ?? HdsAccordionItemTitleTagValues.Div;
  }

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

  get classNames(): string {
    const classes = ['hds-accordion'];

    // add a class based on the @size argument
    classes.push(`hds-accordion--size-${this.size}`);

    // add a class based on the @type argument
    classes.push(`hds-accordion--type-${this.type}`);

    return classes.join(' ');
  }

  <template>
    <div class={{this.classNames}} ...attributes>
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
    </div>
  </template>
}
