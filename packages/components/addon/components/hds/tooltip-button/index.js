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
      // takes string
      placement: placement,
      // takes array of 2 numbers (skidding, distance): array(0, 0)
      offset: this.args.offset,
    };
  }

  /**
   * @param isInline
   * @type {boolean}
   * @default true
   * @description sets display for the button
   */
  get isInline() {
    let { isInline = true } = this.args;
    return isInline;
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-tooltip-button'];

    // add a class based on the @isInline argument
    if (this.isInline) {
      classes.push('hds-tooltip-button--is-inline');
    } else {
      classes.push('hds-tooltip-button--is-block');
    }

    return classes.join(' ');
  }
}
