/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsIconTileColors, HdsIconTileProducts, HdsIconTileSizes } from './types.ts';
import type { HdsIconSignature } from '../icon';
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
        icon?: HdsIconSignature['Args']['name'];
        iconSecondary?: HdsIconSignature['Args']['name'];
    };
    Element: HTMLDivElement;
}
export default class HdsIconTile extends Component<HdsIconTileSignature> {
    get size(): HdsIconTileSizes;
    get color(): string;
    get icon(): HdsIconSignature['Args']['name'] | undefined;
    get iconSize(): HdsIconSignature['Args']['size'];
    get iconWrapperClass(): string | undefined;
    get logo(): HdsIconTileProducts | null;
    get entity(): string | undefined;
    get iconSecondary(): HdsIconSignature['Args']['name'] | undefined;
    get classNames(): string;
}
//# sourceMappingURL=index.d.ts.map