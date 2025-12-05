/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';

import type { ModifierLike } from '@glint/template';
import type { SetupPrimitivePopoverModifier } from '../popover-primitive';
import type { HdsAnchoredPositionOptions } from '../../../modifiers/hds-anchored-position.ts';
import {
  DEFAULT_PLACEMENT,
  PLACEMENTS,
} from '../../../modifiers/hds-anchored-position.ts';

export interface HdsRichTooltipBubbleSignature {
  Args: {
    placement?: HdsAnchoredPositionOptions['placement'];
    offset?: HdsAnchoredPositionOptions['offsetOptions'];
    enableCollisionDetection?: HdsAnchoredPositionOptions['enableCollisionDetection'];
    width?: string;
    height?: string;
    isOpen?: boolean;
    popoverId: string;
    arrowId: string;
    setupPrimitivePopover: ModifierLike<SetupPrimitivePopoverModifier>;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class HdsRichTooltipBubble extends Component<HdsRichTooltipBubbleSignature> {
  /**
   * @param placement
   * @type {string}
   * @description Determines the position of the "popover"
   */
  get placement(): HdsAnchoredPositionOptions['placement'] {
    const { placement = DEFAULT_PLACEMENT } = this.args;

    assert(
      `@placement for "Hds::RichTooltip::Bubble" must be one of the following: ${PLACEMENTS.join(
        ', '
      )}; received: ${placement}`,
      PLACEMENTS.includes(placement)
    );

    return placement;
  }

  get enableCollisionDetection(): HdsAnchoredPositionOptions['enableCollisionDetection'] {
    return this.args.enableCollisionDetection ?? true;
  }

  get sizingStyles(): Record<string, string> {
    const sizingStyles: {
      width?: string;
      'max-width'?: string;
      height?: string;
      'max-height'?: string;
    } = {};

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

  get anchoredPositionOptions(): {
    placement: HdsAnchoredPositionOptions['placement'];
    offsetOptions: HdsAnchoredPositionOptions['offsetOptions'];
    enableCollisionDetection: HdsAnchoredPositionOptions['enableCollisionDetection'];
    arrowSelector: string;
    arrowPadding: HdsAnchoredPositionOptions['arrowPadding'];
  } {
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
