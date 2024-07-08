/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { guidFor } from '@ember/object/internals';

import { HdsAccordionSizeValues, HdsAccordionTypeValues } from '../types.ts';
import type { HdsAccordionSizes, HdsAccordionTypes } from '../types.ts';

export const SIZES: string[] = Object.values(HdsAccordionSizeValues);
export const DEFAULT_SIZE = HdsAccordionSizeValues.Medium;

export const TYPES: string[] = Object.values(HdsAccordionTypeValues);
export const DEFAULT_TYPE = HdsAccordionTypeValues.Card;

const TEXT_SIZE_MAP = {
  small: 100,
  medium: 200,
  large: 300,
};

export interface HdsAccordionItemSignature {
  Args: {
    ariaLabel?: string;
    isOpen?: boolean;
    isStatic?: boolean;
    containsInteractive?: boolean;
    size?: HdsAccordionSizes;
    type?: HdsAccordionTypes;
  };
  Blocks: {
    content?: [];
    toggle?: [];
  };
  Element: HTMLElement;
}

export default class HdsAccordionItemComponent extends Component<HdsAccordionItemSignature> {
  /**
   * Generates a unique ID for the Content
   *
   * @param contentId
   */
  contentId = 'content-' + guidFor(this);

  /**
   * @param ariaLabel
   * @type {string}
   * @default 'Toggle display'
   */
  get ariaLabel(): string {
    return this.args.ariaLabel ?? 'Toggle display';
  }

  /**
   * @param containsInteractive
   * @type {boolean}
   * @default false
   */
  get containsInteractive(): boolean {
    return this.args.containsInteractive ?? false;
  }

  /**
   * @param toggleTextSize
   * @type {HdsTextSizes}
   * @default 'medium'
   */
  get toggleTextSize() {
    const size = this.args.size ?? DEFAULT_SIZE;
    return TEXT_SIZE_MAP[size];
  }

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
      `@size for "Hds::Accordion::Item" must be one of the following: ${SIZES.join(
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
      `@type for "Hds::Accordion::Item" must be one of the following: ${TYPES.join(
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
  get classNames(): string {
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
}
