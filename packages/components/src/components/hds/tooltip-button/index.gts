/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';

import type { Props as TippyProps } from 'tippy.js';

import hdsTooltip from '../../../modifiers/hds-tooltip.ts';
import { HdsTooltipPlacementValues } from './types.ts';
import type { HdsTooltipPlacements } from './types.ts';

export const PLACEMENTS: HdsTooltipPlacements[] = Object.values(
  HdsTooltipPlacementValues
);

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

  get isInline(): boolean {
    const { isInline = true } = this.args;
    return isInline;
  }

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

  <template>
    <button
      type="button"
      class={{this.classNames}}
      {{hdsTooltip this.text options=this.options}}
      ...attributes
    >{{~yield~}}</button>
  </template>
}
