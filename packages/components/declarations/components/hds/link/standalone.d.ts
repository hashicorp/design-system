/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { HdsLinkIconPositionValues, HdsLinkColorValues, HdsLinkStandaloneSizeValues } from './types.ts';
import type { HdsInteractiveSignature } from '../interactive/';
import type { HdsLinkColors, HdsLinkIconPositions, HdsLinkStandaloneSizes } from './types.ts';
import type { FlightIconSignature } from '@hashicorp/ember-flight-icons/components/flight-icon';
export interface HdsLinkStandaloneSignature {
    Args: HdsInteractiveSignature['Args'] & {
        size?: HdsLinkStandaloneSizes;
        color?: HdsLinkColors;
        text: string;
        icon: FlightIconSignature['Args']['name'];
        iconPosition?: HdsLinkIconPositions;
    };
    Element: HdsInteractiveSignature['Element'];
}
export declare const DEFAULT_ICONPOSITION = HdsLinkIconPositionValues.Leading;
export declare const DEFAULT_COLOR = HdsLinkColorValues.Primary;
export declare const DEFAULT_SIZE = HdsLinkStandaloneSizeValues.Medium;
export declare const ICONPOSITIONS: string[];
export declare const COLORS: string[];
export declare const SIZES: string[];
export default class HdsLinkStandaloneComponent extends Component<HdsLinkStandaloneSignature> {
    constructor(owner: unknown, args: HdsLinkStandaloneSignature['Args']);
    /**
     * @param text
     * @type {string}
     * @description The text of the link. If no text value is defined an error will be thrown.
     */
    get text(): string;
    /**
     * @param color
     * @type {string}
     * @default primary
     * @description Determines the color of link to be used; acceptable values are `primary` and `secondary`
     */
    get color(): HdsLinkColors;
    /**
     * @param icon
     * @type {string|null}
     * @default null
     * @description The name of the icon to be used. An icon name must be defined.
     */
    get icon(): FlightIconSignature['Args']['name'];
    /**
     * @param iconPosition
     * @type {HdsLinkIconPositions}
     * @default leading
     * @description Positions the icon before or after the text; allowed values are `leading` or `trailing`
     */
    get iconPosition(): HdsLinkIconPositions;
    /**
     * @param size
     * @type {HdsLinkStandaloneSizes}
     * @default medium
     * @description The size of the standalone link; acceptable values are `small`, `medium`, and `large`
     */
    get size(): HdsLinkStandaloneSizes;
    /**
     * @param iconSize
     * @type {string}
     * @default 16
     * @description ensures that the correct icon size is used. Automatically calculated.
     */
    get iconSize(): '24' | '16';
    /**
     * Get the class names to apply to the component.
     * @method LinkStandalone#classNames
     * @return {string} The "class" attribute to apply to the component.
     */
    get classNames(): string;
}
//# sourceMappingURL=standalone.d.ts.map