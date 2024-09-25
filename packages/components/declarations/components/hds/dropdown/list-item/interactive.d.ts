/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { HdsDropdownListItemInteractiveColorValues } from './types.ts';
import type { HdsIconSignature } from '../../icon';
import type { HdsInteractiveSignature } from '../../interactive';
import type { HdsDropdownListItemInteractiveColors } from './types.ts';
import type { ComponentLike } from '@glint/template';
import type { HdsBadgeSignature } from '../../badge/index.ts';
export declare const DEFAULT_COLOR = HdsDropdownListItemInteractiveColorValues.Action;
export declare const COLORS: string[];
export interface HdsDropdownListItemInteractiveSignature {
    Args: HdsInteractiveSignature['Args'] & {
        color?: HdsDropdownListItemInteractiveColors;
        icon?: HdsIconSignature['Args']['name'];
        isLoading?: boolean;
        text?: string;
        trailingIcon?: HdsIconSignature['Args']['name'];
    };
    Blocks: {
        default?: [
            {
                Badge?: ComponentLike<HdsBadgeSignature>;
            }
        ];
    };
    Element: HTMLDivElement | HdsInteractiveSignature['Element'];
}
export default class HdsDropdownListItemInteractive extends Component<HdsDropdownListItemInteractiveSignature> {
    constructor(owner: unknown, args: HdsDropdownListItemInteractiveSignature['Args']);
    get text(): string;
    get color(): HdsDropdownListItemInteractiveColors;
    get classNames(): string;
}
//# sourceMappingURL=interactive.d.ts.map