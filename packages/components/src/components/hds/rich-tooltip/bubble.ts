/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';

import type { ModifierLike } from '@glint/template';
import type { SetupPrimitivePopoverModifier } from '../popover-primitive';
import type { FloatingUIOptions } from '../../../modifiers/hds-anchored-position.ts';
import {
  DEFAULT_PLACEMENT,
  PLACEMENTS,
} from '../../../modifiers/hds-anchored-position.ts';

export interface HdsRichTooltipBubbleSignature {
  Args: {
    placement?: FloatingUIOptions['placement'];
    offset?: FloatingUIOptions['offsetOptions'];
    enableCollisionDetection?: FloatingUIOptions['enableCollisionDetection'];
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
  get placement(): FloatingUIOptions['placement'] {
    const { placement = DEFAULT_PLACEMENT } = this.args;

    assert(
      `@placement for "Hds::RichTooltip::Bubble" must be one of the following: ${PLACEMENTS.join(
        ', '
      )}; received: ${placement}`,
      PLACEMENTS.includes(placement)
    );

    return placement;
  }

  get enableCollisionDetection(): FloatingUIOptions['enableCollisionDetection'] {
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
    placement: FloatingUIOptions['placement'];
    offsetOptions: FloatingUIOptions['offsetOptions'];
    enableCollisionDetection: FloatingUIOptions['enableCollisionDetection'];
    arrowSelector: string;
    arrowPadding: FloatingUIOptions['arrowPadding'];
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
