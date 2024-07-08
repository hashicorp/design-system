/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { getElementId } from '../../../utils/hds-get-element-id.js';
import type { WithBoundArgs } from '@glint/template';
import type { HdsPopoverPrimitiveSignature } from '../popover-primitive';
import HdsRichTooltipToggle from './toggle.ts';
import HdsRichTooltipBubble from './bubble.ts';

interface HdsRichTooltipSignature {
  Args: Omit<HdsPopoverPrimitiveSignature['Args'], 'enableSoftEvents'>;
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

export default class HdsRichTooltipComponent extends Component<HdsRichTooltipSignature> {
  elementId: string = getElementId(this);
  arrowId: string = `arrow-${this.elementId}`;
  popoverId: string = `popover-${this.elementId}`;

  get enableSoftEvents(): boolean {
    return this.args.enableClickEvents !== true;
  }

  get enableClickEvents(): boolean {
    return this.args.enableClickEvents ?? false;
  }
}
