/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { HdsTagColorValues } from './types.ts';
import type { HdsTagColors } from './types.ts';
import { HdsTagTooltipPlacementValues } from './types.ts';
import type { HdsTagTooltipPlacements } from './types.ts';
import type { HdsInteractiveSignature } from '../interactive/';
export declare const COLORS: string[];
export declare const DEFAULT_COLOR = HdsTagColorValues.Primary;
export declare const TOOLTIP_PLACEMENTS: string[];
export declare const DEFAULT_TOOLTIP_PLACEMENT = HdsTagTooltipPlacementValues.Top;
export interface HdsTagSignature {
    Args: HdsInteractiveSignature['Args'] & {
        color?: HdsTagColors;
        text: string;
        ariaLabel?: string;
        tooltipPlacement?: HdsTagTooltipPlacements;
        onDismiss?: (event: MouseEvent, ...args: any[]) => void;
    };
    Element: HTMLSpanElement;
}
export default class HdsTag extends Component<HdsTagSignature> {
    private _isTextOverflow;
    private _observer;
    private _setUpObserver;
    /**
     * @param tooltioPlacement
     * @type {string}
     * @default top
     * @description The placement property of the tooltip attached to the tag text.
     */
    get tooltipPlacement(): HdsTagTooltipPlacements;
    /**
     * @param onDismiss
     * @type {function}
     * @default () => {}
     */
    get onDismiss(): ((event: MouseEvent, ...args: any[]) => void) | false;
    /**
     * @param text
     * @type {string}
     * @description The text of the tag. If no text value is defined, an error will be thrown.
     */
    get text(): string;
    /**
     * @param ariaLabel
     * @type {string}
     * @default 'Dismiss'
     */
    get ariaLabel(): string;
    /**
     * @param color
     * @type {string}
     * @default primary
     * @description Determines the color of link to be used; acceptable values are `primary` and `secondary`
     */
    get color(): HdsTagColors | false;
    /**
     * Get the class names to apply to the component.
     * @method classNames
     * @return {string} The "class" attribute to apply to the component.
     */
    get classNames(): string;
    private _isOverflow;
}
//# sourceMappingURL=index.d.ts.map