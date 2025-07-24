/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { ModifierLike } from '@glint/template';
import type { SetupPrimitivePopoverModifier } from '../popover-primitive';
import type { HdsAnchoredPositionOptions } from '../../../modifiers/hds-anchored-position.ts';
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
    get placement(): HdsAnchoredPositionOptions['placement'];
    get enableCollisionDetection(): HdsAnchoredPositionOptions['enableCollisionDetection'];
    get sizingStyles(): Record<string, string>;
    get anchoredPositionOptions(): {
        placement: HdsAnchoredPositionOptions['placement'];
        offsetOptions: HdsAnchoredPositionOptions['offsetOptions'];
        enableCollisionDetection: HdsAnchoredPositionOptions['enableCollisionDetection'];
        arrowSelector: string;
        arrowPadding: HdsAnchoredPositionOptions['arrowPadding'];
    };
}
