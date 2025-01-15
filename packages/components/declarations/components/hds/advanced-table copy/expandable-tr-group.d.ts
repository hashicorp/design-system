/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsAdvancedTableHorizontalAlignment } from './types';
export interface HdsAdvancedTableExpandableTrGroupSignature {
    Args: {
        align?: HdsAdvancedTableHorizontalAlignment;
        depth?: number;
        record: Record<string, unknown>;
        parentId?: string;
        childrenKey?: string;
        rowIndex: number | string;
    };
    Blocks: {
        default?: [
            {
                data: Record<string, unknown>;
                isExpandable: boolean;
                id?: string;
                parentId?: string;
                depth: number;
                onClickToggle?: () => void;
                isExpanded?: boolean;
                rowIndex?: string;
            }
        ];
    };
    Element: HTMLDivElement;
}
export default class HdsAdvancedTableExpandableTrGroup extends Component<HdsAdvancedTableExpandableTrGroupSignature> {
    private _isExpanded;
    private _id;
    constructor(owner: unknown, args: HdsAdvancedTableExpandableTrGroupSignature['Args']);
    get childrenKey(): string;
    get children(): Array<Record<string, unknown>> | undefined;
    get hasChildren(): boolean;
    get depth(): number;
    get rowIndex(): string;
    get childrenDepth(): number;
    onClickToggle(): void;
}
//# sourceMappingURL=expandable-tr-group.d.ts.map