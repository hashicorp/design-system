/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { getElementId } from '../../../utils/hds-get-element-id.ts';
import type { WithBoundArgs } from '@glint/template';
import type { HdsPopoverPrimitiveSignature } from '../popover-primitive';
import HdsRichTooltipToggle from './toggle.ts';
import HdsRichTooltipBubble from './bubble.ts';

export interface HdsRichTooltipSignature {
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
}
