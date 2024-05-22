/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';

import { PLACEMENTS as PRIMITIVE_PLACEMENTS } from '../popover-primitive/index.js';

export const DEFAULT_PLACEMENT = 'bottom';
export const PLACEMENTS = [...PRIMITIVE_PLACEMENTS];

export default class HdsRichTooltipBubbleComponent extends Component {
  /**
   * @param placement
   * @type {string}
   * @description Determines the position of the "popover"
   */
  get placement() {
    const { placement = DEFAULT_PLACEMENT } = this.args;

    assert(
      `@placement for "Hds::RichTooltip::Bubble" must be one of the following: ${PLACEMENTS.join(
        ', '
      )}; received: ${placement}`,
      PLACEMENTS.includes(placement)
    );

    return placement;
  }

  get enableCollisionDetection() {
    return this.args.enableCollisionDetection ?? true;
  }

  get sizingStyles() {
    const sizingStyles = {};

    if (this.args.width) {
      sizingStyles['width'] = this.args.width;
      sizingStyles['max-width'] = 'none';
    }

    if (this.args.height) {
      sizingStyles['height'] = this.args.height;
      sizingStyles['max-height'] = 'none';
    }

    return sizingStyles;
  }

  get anchoredPositionOptions() {
    // custom options specific for the `RichTooltip` component
    // for details see the `hds-anchored-position` modifier
    return {
      placement: this.placement,
      offsetOptions: this.args.offset ?? 12,
      enableCollisionDetection: this.args.enableCollisionDetection ?? true,
      arrowSelector: `#${this.args.arrowId}`,
      arrowPadding: 12,
    };
  }
}
