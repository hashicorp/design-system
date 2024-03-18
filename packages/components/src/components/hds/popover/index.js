/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';

export const DEFAULT_PLACEMENT = 'bottom';
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

export default class HdsPopoverIndexComponent extends Component {
  /**
   * @param placement
   * @type {string}
   * @description Determines the position of the "popover"
   */
  get placement() {
    let { placement = DEFAULT_PLACEMENT } = this.args;

    assert(
      `@placement for "Hds::Popover" must be one of the following: ${PLACEMENTS.join(
        ', '
      )}; received: ${placement}`,
      PLACEMENTS.includes(placement)
    );

    return placement;
  }

  get enableSoftEvents() {
    return this.args.enableSoftEvents ?? true;
  }

  get enableClickEvents() {
    return this.args.enableClickEvents ?? false;
  }

  get popoverOptions() {
    return {
      popoverPlacement: this.placement,
      popoverOffsetOptions: 12,
      popoverEnableCollisionDetection:
        this.args.enableCollisionDetection || false,
    };
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = ['hds-popover'];

    // add a class based on the @xxx argument
    // classes.push(`hds-popover--[variant]-${this.xxx}`);

    return classes.join(' ');
  }
}
