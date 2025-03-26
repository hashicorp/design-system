/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { getElementId } from '../../../utils/hds-get-element-id.ts';
import HdsRichTooltipToggle from './toggle.ts';
import HdsRichTooltipBubble from './bubble.ts';
import {
  DEFAULT_PLACEMENT,
  PLACEMENTS,
} from '../../../modifiers/hds-anchored-position.ts';

import type { WithBoundArgs } from '@glint/template';
import type { HdsPopoverPrimitiveSignature } from '../popover-primitive';
import type { FloatingUIOptions } from '../../../modifiers/hds-anchored-position.ts';

export interface HdsRichTooltipSignature {
  Args: Omit<HdsPopoverPrimitiveSignature['Args'], 'enableSoftEvents'> & {
    enableCollisionDetection?: FloatingUIOptions['enableCollisionDetection'];
    offset?: FloatingUIOptions['offsetOptions'];
    bubblePlacement?: FloatingUIOptions['placement'];
  };
  Blocks: {
    default: [
      {
        Toggle?: WithBoundArgs<
          typeof HdsRichTooltipToggle,
          'popoverId' | 'setupPrimitiveToggle' | 'isOpen'
        >;
        Bubble?: WithBoundArgs<
          typeof HdsRichTooltipBubble,
          'arrowId' | 'popoverId' | 'setupPrimitivePopover' | 'isOpen'
        >;
        isOpen?: boolean;
        close?: () => void;
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class HdsRichTooltip extends Component<HdsRichTooltipSignature> {
  private _elementId: string = getElementId(this);
  private _arrowId: string = `arrow-${this._elementId}`;
  private _popoverId: string = `popover-${this._elementId}`;

  get enableSoftEvents(): boolean {
    return this.args.enableClickEvents !== true;
  }

  get enableClickEvents(): boolean {
    return this.args.enableClickEvents ?? false;
  }

  get enableCollisionDetection(): FloatingUIOptions['enableCollisionDetection'] {
    return this.args.enableCollisionDetection ?? true;
  }

  get bubblePlacement(): FloatingUIOptions['placement'] {
    const { bubblePlacement = DEFAULT_PLACEMENT } = this.args;

    assert(
      `@bubblePlacement for "Hds::RichTooltip" must be one of the following: ${PLACEMENTS.join(
        ', '
      )}; received: ${bubblePlacement}`,
      PLACEMENTS.includes(bubblePlacement)
    );

    return bubblePlacement;
  }

  get anchoredPositionOptions(): Pick<
    FloatingUIOptions,
    'placement' | 'offsetOptions' | 'enableCollisionDetection' | 'arrowPadding'
  > & { arrowSelector: string } {
    // custom options specific for the `RichTooltip` component
    // for details see the `hds-anchored-position` modifier
    return {
      placement: this.bubblePlacement,
      offsetOptions: this.args.offset ?? 12,
      enableCollisionDetection: this.args.enableCollisionDetection ?? true,
      arrowSelector: `#${this._arrowId}`,
      arrowPadding: 12,
    };
  }
}
