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
        isOpen?: HdsPopoverPrimitiveSignature['Blocks']['default'][0]['isOpen'];
        close?: HdsPopoverPrimitiveSignature['Blocks']['default'][0]['hidePopover'];
      }
    ];
  };
  Element: HTMLDivElement;
}

export default class HdsRichTooltipComponent extends Component<HdsRichTooltipSignature> {
  elementId = getElementId(this);
  arrowId = `arrow-${this.elementId}`;
  popoverId = `popover-${this.elementId}`;

  get enableSoftEvents() {
    return this.args.enableClickEvents !== true;
  }

  get enableClickEvents() {
    return this.args.enableClickEvents ?? false;
  }
}
