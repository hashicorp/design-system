/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { HdsLinkColorValues, HdsLinkIconPositionValues } from './types.ts';
import type { HdsInteractiveSignature } from '../interactive/';
import type { HdsLinkColors, HdsLinkIconPositions } from './types.ts';
import type { HdsIconSignature } from '../icon';
import type Owner from '@ember/owner';
export declare const DEFAULT_ICONPOSITION = HdsLinkIconPositionValues.Trailing;
export declare const DEFAULT_COLOR = HdsLinkColorValues.Primary;
export declare const ICONPOSITIONS: string[];
export declare const COLORS: string[];
export interface HdsLinkInlineSignature {
    Args: HdsInteractiveSignature['Args'] & {
        color?: HdsLinkColors;
        icon?: HdsIconSignature['Args']['name'];
        iconPosition?: HdsLinkIconPositions;
    };
    Blocks: {
        default: [];
    };
    Element: HdsInteractiveSignature['Element'];
}
export default class HdsLinkInline extends Component<HdsLinkInlineSignature> {
    constructor(owner: Owner, args: HdsLinkInlineSignature['Args']);
    /**
     * @param color
     * @type {string}
     * @default primary
     * @description Determines the color of link to be used; acceptable values are `primary` and `secondary`
     */
    get color(): HdsLinkColors;
    /**
     * @param iconPosition
     * @type {HdsLinkIconPositions}
     * @default leading
     * @description Positions the icon before or after the text; allowed values are `leading` or `trailing`
     */
    get iconPosition(): HdsLinkIconPositions;
    /**
     * Get the class names to apply to the component.
     * @method LinkInline#classNames
     * @return {string} The "class" attribute to apply to the component.
     */
    get classNames(): string;
}
