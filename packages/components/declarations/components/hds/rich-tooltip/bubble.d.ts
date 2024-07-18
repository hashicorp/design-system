/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { ModifierLike } from '@glint/template';
import type { SetupPrimitivePopoverModifier } from '../popover-primitive';
import type { FloatingUIOptions } from '../../../modifiers/hds-anchored-position.ts';
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
export default class HdsRichTooltipBubbleComponent extends Component<HdsRichTooltipBubbleSignature> {
    /**
     * @param placement
     * @type {string}
     * @description Determines the position of the "popover"
     */
    get placement(): FloatingUIOptions['placement'];
    get enableCollisionDetection(): FloatingUIOptions['enableCollisionDetection'];
    get sizingStyles(): Record<string, string>;
    get anchoredPositionOptions(): {
        placement: FloatingUIOptions['placement'];
        offsetOptions: FloatingUIOptions['offsetOptions'];
        enableCollisionDetection: FloatingUIOptions['enableCollisionDetection'];
        arrowSelector: string;
        arrowPadding: FloatingUIOptions['arrowPadding'];
    };
}
//# sourceMappingURL=bubble.d.ts.map