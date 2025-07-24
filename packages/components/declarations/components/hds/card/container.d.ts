/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { HdsCardBackgroundValues, HdsCardLevelValues, HdsCardOverflowValues, HdsCardTagValues } from './types.ts';
import type { HdsCardBackground, HdsCardLevel, HdsCardOverflow, HdsCardTag } from './types.ts';
export declare const DEFAULT_LEVEL = HdsCardLevelValues.Base;
export declare const DEFAULT_BACKGROUND = HdsCardBackgroundValues.NeutralPrimary;
export declare const DEFAULT_OVERFLOW = HdsCardOverflowValues.Visible;
export declare const DEFAULT_TAG = HdsCardTagValues.Div;
export declare const AVAILABLE_LEVELS: string[];
export declare const AVAILABLE_BACKGROUNDS: string[];
export declare const AVAILABLE_OVERFLOWS: string[];
export declare const AVAILABLE_TAGS: string[];
export interface HdsCardContainerSignature {
    Args: {
        level?: HdsCardLevel;
        levelActive?: HdsCardLevel;
        levelHover?: HdsCardLevel;
        background?: HdsCardBackground;
        hasBorder?: boolean;
        overflow?: HdsCardOverflow;
        tag?: HdsCardTag;
    };
    Blocks: {
        default: [];
    };
    Element: HTMLElement;
}
export default class HdsCardContainer extends Component<HdsCardContainerSignature> {
    get level(): HdsCardLevel;
    get levelHover(): HdsCardLevel | undefined;
    get levelActive(): HdsCardLevel | undefined;
    get background(): HdsCardBackground;
    get overflow(): HdsCardOverflow;
    get componentTag(): HdsCardTag;
    get classNames(): string;
}
