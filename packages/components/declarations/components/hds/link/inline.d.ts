/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { HdsLinkColorValues, HdsLinkIconPositionValues } from './types.ts';
import type { HdsInteractiveSignature } from '../interactive/';
import type { HdsLinkColors, HdsLinkIconPositions } from './types.ts';
import type { FlightIconSignature } from '@hashicorp/ember-flight-icons/components/flight-icon';
export declare const DEFAULT_ICONPOSITION = HdsLinkIconPositionValues.Trailing;
export declare const DEFAULT_COLOR = HdsLinkColorValues.Primary;
export declare const ICONPOSITIONS: string[];
export declare const COLORS: string[];
export interface HdsLinkInlineSignature {
    Args: HdsInteractiveSignature['Args'] & {
        color?: HdsLinkColors;
        icon?: FlightIconSignature['Args']['name'];
        iconPosition?: HdsLinkIconPositions;
    };
    Blocks: {
        default: [];
    };
    Element: HdsInteractiveSignature['Element'];
}
export default class HdsLinkInlineComponent extends Component<HdsLinkInlineSignature> {
    constructor(owner: unknown, args: HdsLinkInlineSignature['Args']);
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
//# sourceMappingURL=inline.d.ts.map