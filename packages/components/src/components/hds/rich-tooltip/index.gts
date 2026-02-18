/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { hash } from '@ember/helper';

import type { WithBoundArgs } from '@glint/template';

import { getElementId } from '../../../utils/hds-get-element-id.ts';
import HdsRichTooltipToggle from './toggle.gts';
import HdsRichTooltipBubble from './bubble.gts';
import HdsPopoverPrimitive from '../popover-primitive/index.gts';

import type { HdsPopoverPrimitiveSignature } from '../popover-primitive/index.gts';

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
        close: (event?: Event) => void;
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

  <template>
    {{! IMPORTANT: we need to add "squishies" here (~) because otherwise the whitespace added by Ember becomes visible in the underlined text (being an inline element) - See https://handlebarsjs.com/guide/expressions.html#whitespace-control }}
    <HdsPopoverPrimitive
      @isOpen={{@isOpen}}
      @onOpen={{@onOpen}}
      @onClose={{@onClose}}
      @enableSoftEvents={{this.enableSoftEvents}}
      @enableClickEvents={{this.enableClickEvents}}
      as |PP|
    ><div class="hds-rich-tooltip" ...attributes {{PP.setupPrimitiveContainer}}>
        {{~yield
          (hash
            Toggle=(component
              HdsRichTooltipToggle
              popoverId=this._popoverId
              setupPrimitiveToggle=PP.setupPrimitiveToggle
              isOpen=PP.isOpen
            )
            Bubble=(component
              HdsRichTooltipBubble
              arrowId=this._arrowId
              popoverId=this._popoverId
              setupPrimitivePopover=PP.setupPrimitivePopover
              isOpen=PP.isOpen
            )
            isOpen=PP.isOpen
            close=PP.hidePopover
          )
        ~}}
      </div></HdsPopoverPrimitive>
  </template>
}
