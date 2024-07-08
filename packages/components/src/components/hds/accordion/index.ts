/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';

import { SIZES, DEFAULT_SIZE, TYPES, DEFAULT_TYPE } from './item/index.ts';

import type { ComponentLike } from '@glint/template';
import type { HdsAccordionItemSignature } from './item/index.ts';
import type {
  HdsAccordionForceStates,
  HdsAccordionSizes,
  HdsAccordionTypes,
} from './types.ts';

interface HdsAccordionSignature {
  Args: {
    size?: HdsAccordionSizes;
    type?: HdsAccordionTypes;
    forceState?: HdsAccordionForceStates;
  };
  Blocks: {
    default: [
      {
        Item?: ComponentLike<HdsAccordionItemSignature>;
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class HdsAccordionComponent extends Component<HdsAccordionSignature> {
  /**
   * Sets the size for the component
   *
   * @param size
   * @type {HdsAccordionSizes}
   * @default 'medium'
   */
  get size() {
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
   * Sets the type of the component
   *
   * @param type
   * @type {HdsAccordionTypes}
   * @default 'card'
   */
  get type() {
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
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    const classes = ['hds-accordion'];

    // add a class based on the @size argument
    classes.push(`hds-accordion--size-${this.size}`);

    // add a class based on the @type argument
    classes.push(`hds-accordion--type-${this.type}`);

    return classes.join(' ');
  }
}
