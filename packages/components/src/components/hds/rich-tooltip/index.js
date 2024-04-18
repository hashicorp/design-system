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
  get popoverPlacement() {
    let { popoverPlacement = DEFAULT_PLACEMENT } = this.args;

    assert(
      `@popoverPlacement for "Hds::RichTooltip" must be one of the following: ${PLACEMENTS.join(
        ', '
      )}; received: ${popoverPlacement}`,
      PLACEMENTS.includes(popoverPlacement)
    );

    return popoverPlacement;
  }

  get enableSoftEvents() {
    return this.args.enableClickEvents !== true;
  }

  get enableClickEvents() {
    return this.args.enableClickEvents ?? false;
  }

  get anchoredPositionOptions() {
    // custom options specific for the `RichTooltip` component
    // for details see the `hds-anchored-position` modifier
    return {
      placement: this.popoverPlacement,
      offsetOptions: this.args.popoverOffset ?? 12,
      enableCollisionDetection: this.args.enableCollisionDetection ?? true,
      arrowOptions: { padding: 12 },
    };
  }
}
