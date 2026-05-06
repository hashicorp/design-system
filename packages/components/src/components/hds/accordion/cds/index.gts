/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import '@carbon/web-components/es/components/accordion/accordion.js';
import {
  ACCORDION_SIZE,
  ACCORDION_ALIGNMENT,
} from '@carbon/web-components/es/components/accordion/accordion.js';
import { assert } from '@ember/debug';
import { hash } from '@ember/helper';

import type { WithBoundArgs } from '@glint/template';

import HdsAccordionItem, {
  SIZES,
  DEFAULT_SIZE,
  TYPES,
  DEFAULT_TYPE,
} from './item/index.gts';
import {
  HdsAccordionItemTitleTagValues,
  HdsAccordionSizeValues,
  HdsAccordionTypeValues,
} from '../types.ts';

import type {
  HdsAccordionForceStates,
  HdsAccordionSizes,
  HdsAccordionTypes,
  HdsAccordionItemTitleTags,
} from '../types.ts';

export interface HdsAccordionSignature {
  Args: {
    size?: HdsAccordionSizes;
    type?: HdsAccordionTypes;
    forceState?: HdsAccordionForceStates;
    titleTag?: HdsAccordionItemTitleTags;
    disabled?: boolean;
    alignment?: ACCORDION_ALIGNMENT;
  };
  Blocks: {
    default: [
      {
        Item?: WithBoundArgs<
          typeof HdsAccordionItem,
          'titleTag' | 'type' | 'forceState' | 'size'
        >;
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class HdsAccordion extends Component<HdsAccordionSignature> {
  get size(): ACCORDION_SIZE {
    const { size = DEFAULT_SIZE } = this.args;

    assert(
      `@size for "Hds::Accordion" must be one of the following: ${SIZES.join(
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

  get isFlush(): boolean {
    return this.args.type === HdsAccordionTypeValues.Flush;
  }

  get sizeClassName(): HdsAccordionSizes {
    return this.args.size ?? DEFAULT_SIZE;
  }

  get classNames() {
    const classes = ['hds-accordion'];

    // add a class based on the @size argument
    classes.push(`hds-accordion--size-${this.sizeClassName}`);

    // add a class based on the @type argument
    classes.push(`hds-accordion--type-${this.type}`);

    return classes.join(' ');
  }

  <template>
    <cds-accordion
      class={{this.classNames}}
      size={{this.size}}
      isflush={{this.isFlush}}
      alignment={{@alignment}}
      disabled={{@disabled}}
      ...attributes
    >
      {{yield
        (hash
          Item=(component
            HdsAccordionItem
            titleTag=this.titleTag
            type=this.type
            forceState=@forceState
            size=this.sizeClassName
          )
        )
      }}
    </cds-accordion>
  </template>
}
