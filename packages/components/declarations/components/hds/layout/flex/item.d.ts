/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { AvailableTagNames, AvailableElements } from './types.ts';
export interface HdsLayoutFlexItemSignature {
    Args: {
        tag?: AvailableTagNames;
        basis?: string | 0;
        grow?: boolean | number | string;
        shrink?: boolean | number | string;
        enableCollapseBelowContentSize?: boolean;
    };
    Blocks: {
        default: [];
    };
    Element: AvailableElements;
}
export default class HdsLayoutFlexItem extends Component<HdsLayoutFlexItemSignature> {
    get componentTag(): AvailableTagNames;
    get inlineStyles(): Record<string, unknown>;
    get classNames(): string;
}
