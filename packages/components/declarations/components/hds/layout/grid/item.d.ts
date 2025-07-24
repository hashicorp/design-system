/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { AvailableTagNames, AvailableElements } from './types.ts';
export interface HdsLayoutGridItemSignature {
    Args: {
        tag?: AvailableTagNames;
        colspan?: number;
        rowspan?: number;
    };
    Blocks: {
        default: [];
    };
    Element: AvailableElements;
}
export default class HdsLayoutGridItem extends Component<HdsLayoutGridItemSignature> {
    get componentTag(): AvailableTagNames;
    get inlineStyles(): Record<string, unknown>;
}
