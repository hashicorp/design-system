/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsIconSizes } from './types';
import type { IconName } from '@hashicorp/flight-icons/svg';
export interface HdsIconSignature {
    Args: {
        name: IconName;
        color?: string;
        size?: HdsIconSizes;
        stretched?: boolean;
        isInline?: boolean;
        title?: string;
    };
    Element: SVGElement;
}
export default class HdsIcon extends Component<HdsIconSignature> {
    constructor(owner: unknown, args: HdsIconSignature['Args']);
    get isInline(): boolean;
    get color(): string;
    iconId: string;
    get size(): string;
    get svgSize(): {
        width: string;
        height: string;
    };
    titleId: string;
    get title(): string | null;
    get role(): string | null;
    get ariaLabelledby(): string | null;
    get classNames(): string;
}
//# sourceMappingURL=index.d.ts.map