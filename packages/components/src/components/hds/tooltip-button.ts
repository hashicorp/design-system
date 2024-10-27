/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';

import type { Props as TippyProps } from 'tippy.js';

import { HdsTooltipPlacementValues } from './tooltip-button/types.ts';
import type { HdsTooltipPlacements } from './tooltip-button/types.ts';

export const PLACEMENTS: string[] = Object.values(HdsTooltipPlacementValues);

export interface HdsTooltipSignature {
  Args: {
    extraTippyOptions?: Partial<Omit<TippyProps, 'placement' | 'offset'>>;
    isInline?: boolean;
    offset?: [number, number];
    placement?: HdsTooltipPlacements;
    text: string;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLButtonElement;
}

export default class HdsTooltip extends Component<HdsTooltipSignature> {
  /**
   * @param text
   * @type {string}
   * @description text content for tooltip
   */
  get text(): string {
    const { text } = this.args;

    assert(
      '@text for "Hds::TooltipButton" must have a valid value',
      text !== undefined
    );

    return text;
  }

  get options(): Partial<TippyProps> {
    const { placement = HdsTooltipPlacementValues.Top, extraTippyOptions } =
      this.args;

    assert(
      '@placement for "Hds::TooltipButton" must have a valid value',
      placement == undefined || PLACEMENTS.includes(placement)
    );

    return {
      ...(extraTippyOptions ? extraTippyOptions : {}),
      placement: placement,
      // takes array of 2 numbers (skidding, distance): array(0, 10)
      offset: this.args.offset ? this.args.offset : [0, 10],
    };
  }

  /**
   * @param isInline
   * @type {boolean}
   * @default true
   * @description sets display for the button
   */
  get isInline(): boolean {
    const { isInline = true } = this.args;
    return isInline;
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames(): string {
    const classes = ['hds-tooltip-button'];

    // add a class based on the @isInline argument
    if (this.isInline) {
      classes.push('hds-tooltip-button--is-inline');
    } else {
      classes.push('hds-tooltip-button--is-block');
    }

    return classes.join(' ');
  }
}
