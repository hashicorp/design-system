/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsAdvancedTableExpandState, HdsAdvancedTableHorizontalAlignment } from './types.ts';
import type HdsAdvancedTableRow from './models/row.ts';
export interface HdsAdvancedTableExpandableTrGroupSignature {
    Args: {
        align?: HdsAdvancedTableHorizontalAlignment;
        depth?: number;
        record: HdsAdvancedTableRow;
        parentId?: string;
        rowIndex: number | string;
        shouldDisplayChildRows?: boolean;
        onClickToggle?: () => void;
    };
    Blocks: {
        default?: [
            {
                data: HdsAdvancedTableRow;
                isExpandable: boolean;
                id?: string;
                parentId?: string;
                depth: number;
                isExpanded?: HdsAdvancedTableExpandState;
                rowIndex?: string;
                shouldDisplayChildRows?: boolean;
                onClickToggle?: () => void;
            }
        ];
    };
    Element: HTMLDivElement;
}
export default class HdsAdvancedTableExpandableTrGroup extends Component<HdsAdvancedTableExpandableTrGroupSignature> {
    private _id;
    get depth(): number;
    get rowIndex(): string;
    get childrenDepth(): number;
    get shouldDisplayChildRows(): boolean;
}
