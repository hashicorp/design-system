/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsIconSizes, HdsIconColors } from './types';
import type { IconName } from '@hashicorp/flight-icons/svg';
export declare const AVAILABLE_COLORS: string[];
export interface HdsIconSignature {
    Args: {
        name: IconName;
        color?: HdsIconColors | string | undefined;
        size?: HdsIconSizes;
        stretched?: boolean;
        isInline?: boolean;
        title?: string;
    };
    Element: SVGElement;
}
export default class HdsIcon extends Component<HdsIconSignature> {
    iconId: string;
    titleId: string;
    constructor(owner: unknown, args: HdsIconSignature['Args']);
    get isInline(): boolean;
    get predefinedColor(): HdsIconColors | undefined;
    get fillColor(): string;
    get size(): string;
    get svgSize(): {
        width: string;
        height: string;
    };
    get title(): string | null;
    get role(): string | null;
    get ariaLabelledby(): string | null;
    get classNames(): string;
}
//# sourceMappingURL=index.d.ts.map