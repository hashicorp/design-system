/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';

import { PLACEMENTS as PRIMITIVE_PLACEMENTS } from '../popover-primitive/index';

export const DEFAULT_PLACEMENT = 'bottom';
export const PLACEMENTS = [...PRIMITIVE_PLACEMENTS];

export default class HdsRichTooltipIndexComponent extends Component {
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
    return this.args.enableClickEvents !== true;
  }

  get enableClickEvents() {
    return this.args.enableClickEvents ?? false;
  }

  get popoverOptions() {
    return {
      placement: this.placement,
      offsetOptions: this.args.offset || 12,
      enableCollisionDetection: this.args.enableCollisionDetection ?? true,
      arrowOptions: { padding: 12 },
    };
  }
}
