/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { HdsCardBackgroundValues, HdsCardLevelValues, HdsCardOverflowValues } from './types.ts';
import type { HdsCardBackground, HdsCardLevel, HdsCardOverflow } from './types.ts';
export declare const DEFAULT_LEVEL = HdsCardLevelValues.Base;
export declare const DEFAULT_BACKGROUND = HdsCardBackgroundValues.NeutralPrimary;
export declare const DEFAULT_OVERFLOW = HdsCardOverflowValues.Visible;
export declare const AVAILABLE_LEVELS: string[];
export declare const AVAILABLE_BACKGROUNDS: string[];
export declare const AVAILABLE_OVERFLOWS: string[];
export interface HdsCardContainerSignature {
    Args: {
        level?: HdsCardLevel;
        levelActive?: HdsCardLevel;
        levelHover?: HdsCardLevel;
        background?: HdsCardBackground;
        hasBorder?: boolean;
        overflow?: HdsCardOverflow;
    };
    Blocks: {
        default: [];
    };
    Element: HTMLDivElement;
}
export default class HdsCardContainerComponent extends Component<HdsCardContainerSignature> {
    /**
     * Sets the "elevation" level for the component
     * Accepted values: base, mid, high
     *
     * @param level
     * @type {HdsCardLevel}
     * @default 'base'
     */
    get level(): HdsCardLevel;
    /**
     * Sets the "elevation" level for the component on ":hover" state
     * Accepted values: base, mid, high
     *
     * @param levelHover
     * @type {HdsCardLevel}
     */
    get levelHover(): HdsCardLevel | undefined;
    /**
     * Sets the "elevation" level for the component on ":active" state
     * Accepted values: base, mid, high
     *
     * @param levelActive
     * @type {HdsCardLevel}
     */
    get levelActive(): HdsCardLevel | undefined;
    /**
     * Sets the background for the component
     * Accepted values: neutral-primary, neutral-secondary
     *
     * @param background
     * @type {HdsCardBackground}
     * @default 'base'
     */
    get background(): HdsCardBackground;
    /**
     * Sets the level for the card
     * Accepted values: visible, hidden
     *
     * @param overflow
     * @type {HdsCardOverflow}
     * @default 'visible'
     */
    get overflow(): HdsCardOverflow;
    /**
     * Get the class names to apply to the component.
     * @method Card#classNames
     * @return {string} The "class" attribute to apply to the component.
     */
    get classNames(): string;
}
//# sourceMappingURL=container.d.ts.map