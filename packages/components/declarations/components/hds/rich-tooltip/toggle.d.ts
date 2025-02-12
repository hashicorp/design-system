/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { HdsRichTooltipToggleIconPositionValues } from './types.ts';
import type { HdsRichTooltipToggleIconPositions, HdsRichTooltipToggleSizes } from './types.ts';
import type { HdsIconSignature } from '../icon';
import type { ModifierLike } from '@glint/template';
import type { SetupPrimitiveToggleModifier } from '../popover-primitive';
export declare const ICONPOSITIONS: string[];
export declare const DEFAULT_ICONPOSITION = HdsRichTooltipToggleIconPositionValues.Trailing;
export declare const SIZES: string[];
export interface HdsRichTooltipToggleSignature {
    Args: {
        text?: string;
        icon?: HdsIconSignature['Args']['name'];
        iconPosition?: HdsRichTooltipToggleIconPositions;
        size?: undefined | HdsRichTooltipToggleSizes;
        isInline?: boolean;
        isOpen?: boolean;
        popoverId: string;
        setupPrimitiveToggle: ModifierLike<SetupPrimitiveToggleModifier>;
    };
    Blocks: {
        default: [];
    };
    Element: HTMLButtonElement;
}
export default class HdsRichTooltipToggle extends Component<HdsRichTooltipToggleSignature> {
    /**
     * @param isInline
     * @type {boolean}
     * @default true
     * @description sets display inline for the element
     */
    get isInline(): boolean;
    /**
     * @param iconPosition
     * @type {string}
     * @default leading
     * @description Positions the icon before or after the text; allowed values are `leading` or `trailing`
     */
    get iconPosition(): HdsRichTooltipToggleIconPositions;
    /**
     * @param size
     * @type {string}
     * @default medium
     * @description The size of the "info" text; acceptable values are `small`, `medium`, `large`
     */
    get size(): HdsRichTooltipToggleSizes | undefined;
    /**
     * Get the class names to apply to the component.
     * @return {string} The "class" attribute to apply to the component.
     */
    get classNames(): string;
}
//# sourceMappingURL=toggle.d.ts.map