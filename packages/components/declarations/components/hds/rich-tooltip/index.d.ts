/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { WithBoundArgs } from '@glint/template';
import type { HdsPopoverPrimitiveSignature } from '../popover-primitive';
import HdsRichTooltipToggle from './toggle.ts';
import HdsRichTooltipBubble from './bubble.ts';
interface HdsRichTooltipSignature {
    Args: Omit<HdsPopoverPrimitiveSignature['Args'], 'enableSoftEvents'>;
    Blocks: {
        default: [
            {
                Toggle?: WithBoundArgs<typeof HdsRichTooltipToggle, 'popoverId' | 'setupPrimitiveToggle' | 'isOpen'>;
                Bubble?: WithBoundArgs<typeof HdsRichTooltipBubble, 'arrowId' | 'popoverId' | 'setupPrimitivePopover' | 'isOpen'>;
                isOpen?: boolean;
                close?: () => void;
            }
        ];
    };
    Element: HTMLDivElement;
}
export default class HdsRichTooltipComponent extends Component<HdsRichTooltipSignature> {
    elementId: string;
    arrowId: string;
    popoverId: string;
    get enableSoftEvents(): boolean;
    get enableClickEvents(): boolean;
}
export {};
//# sourceMappingURL=index.d.ts.map