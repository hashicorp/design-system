/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsIconTileColors, HdsIconTileProducts, HdsIconTileSizes } from './types.ts';
import type { FlightIconSignature } from '@hashicorp/ember-flight-icons/components/flight-icon';
export declare const DEFAULT_SIZE = "medium";
export declare const DEFAULT_COLOR = "neutral";
export declare const SIZES: string[];
export declare const COLORS: string[];
export declare const PRODUCTS: string[];
export interface HdsIconTileSignature {
    Args: {
        size?: HdsIconTileSizes;
        color?: HdsIconTileColors;
        logo?: HdsIconTileProducts;
        icon?: FlightIconSignature['Args']['name'];
        iconSecondary?: FlightIconSignature['Args']['name'];
    };
    Element: HTMLDivElement;
}
export default class HdsIconTileComponent extends Component<HdsIconTileSignature> {
    /**
     * Sets the size for the component
     * Accepted values: small, medium, large
     *
     * @param size
     * @type {string}
     * @default 'medium'
     */
    get size(): HdsIconTileSizes;
    /**
     * Sets the color scheme for the component
     * Accepted values: see THE COLORS LIST
     *
     * @param color
     * @type {string}
     * @default 'neutral'
     */
    get color(): string;
    /**
     * Sets the icon name (one of the FlightIcons)
     *
     * @param icon
     * @type {string|null}
     * @default null
     */
    get icon(): FlightIconSignature['Args']['name'] | undefined;
    /**
     * @param iconSize
     * @type {string}
     * @default 16
     * @description ensures that the correct icon size is used. Automatically calculated.
     */
    get iconSize(): '16' | '24';
    /**
     * Sets the logo name if there is one
     *
     * @param logo
     * @type {string|null}
     * @default null
     */
    get logo(): HdsIconTileProducts | null;
    /**
     * We need to differentiate between a logo and an icon
     * @method IconTile#entity
     * @return {string} The kind of entity we're dealing with ("logo" or "icon")
     */
    get entity(): string | undefined;
    /**
     * Sets the "secondary" icon name (one of the FlightIcons)
     *
     * @param iconSecondary
     * @type {string|null}
     * @default null
     */
    get iconSecondary(): FlightIconSignature['Args']['name'] | null;
    /**
     * Get the class names to apply to the component.
     * @method IconTile#classNames
     * @return {string} The "class" attribute to apply to the component.
     */
    get classNames(): string;
}
//# sourceMappingURL=index.d.ts.map