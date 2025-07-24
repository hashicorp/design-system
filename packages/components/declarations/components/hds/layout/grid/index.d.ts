/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { ComponentLike } from '@glint/template';
import type { HdsLayoutGridItemSignature } from '../grid/item.ts';
import { HdsLayoutGridGapValues } from './types.ts';
import type { HdsLayoutGridAligns, HdsLayoutGridGaps, AvailableTagNames, AvailableElements } from './types.ts';
export declare const ALIGNS: HdsLayoutGridAligns[];
export declare const DEFAULT_GAP = HdsLayoutGridGapValues['Zero'];
export declare const GAPS: HdsLayoutGridGaps[];
export interface HdsLayoutGridSignature {
    Args: {
        tag?: AvailableTagNames;
        columnMinWidth?: string;
        columnWidth?: string;
        align?: HdsLayoutGridAligns;
        gap?: HdsLayoutGridGaps | [HdsLayoutGridGaps, HdsLayoutGridGaps];
    };
    Blocks: {
        default: [
            {
                Item?: ComponentLike<HdsLayoutGridItemSignature>;
            }
        ];
    };
    Element: AvailableElements;
}
export default class HdsLayoutGrid extends Component<HdsLayoutGridSignature> {
    get componentTag(): AvailableTagNames;
    get align(): HdsLayoutGridAligns | undefined;
    get gap(): [HdsLayoutGridGaps] | [HdsLayoutGridGaps, HdsLayoutGridGaps] | undefined;
    get inlineStyles(): Record<string, unknown>;
    get classNames(): string;
}
