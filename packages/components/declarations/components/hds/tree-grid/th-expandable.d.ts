/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { HdsTreeGridHorizontalAlignmentValues } from './types.ts';
import type { HdsTreeGridHorizontalAlignment } from './types.ts';
import type { HdsTreeGridThButtonExpandSignature } from './th-button-expand.ts';
export declare const ALIGNMENTS: string[];
export declare const DEFAULT_ALIGN = HdsTreeGridHorizontalAlignmentValues.Left;
export interface HdsTreeGridThExpandSignature {
    Args: {
        align?: HdsTreeGridHorizontalAlignment;
        onClickExpand?: HdsTreeGridThButtonExpandSignature['Args']['onClick'];
        tooltip?: string;
        width?: string;
        isGrid?: boolean;
        isExpanded?: boolean;
    };
    Blocks: {
        default: [];
    };
    Element: HTMLDivElement;
}
export default class HdsTreeGridThExpand extends Component<HdsTreeGridThExpandSignature> {
    labelId: string;
    get align(): HdsTreeGridHorizontalAlignment;
    get classNames(): string;
}
//# sourceMappingURL=th-expandable.d.ts.map