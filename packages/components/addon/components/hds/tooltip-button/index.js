/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';

export const PLACEMENTS = [
  'top',
  'top-start',
  'top-end',
  'right',
  'right-start',
  'right-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'left',
  'left-start',
  'left-end',
];

export default class HdsTooltipIndexComponent extends Component {
  /**
   * @param text
   * @type {string}
   * @description text content for tooltip
   */
  get text() {
    let { text } = this.args;

    assert(
      '@text for "Hds::TooltipButton" must have a valid value',
      text !== undefined
    );

    return text;
  }

  get options() {
    let { placement } = this.args;

    assert(
      '@placement for "Hds::TooltipButton" must have a valid value',
      placement == undefined || PLACEMENTS.includes(placement)
    );

    return {
      ...this.args.extraTippyOptions,
      // parse `content` strings as HTML
      allowHTML: true,
      // takes string
      placement: placement,
      // takes array of 2 numbers (skidding, distance): array(0, 0)
      offset: this.args.offset,
    };
  }
}
