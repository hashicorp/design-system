/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsAdvancedTableColumn } from "./types";
export interface HdsAdvancedTableTheadSignature {
    Args: {
        column: HdsAdvancedTableColumn;
        parentId?: string;
        depth?: number;
        rowIndex: number | string;
    };
    Blocks: {
        default?: [
            {
                column: HdsAdvancedTableColumn;
                id?: string;
                parentId?: string;
                depth: number;
                rowIndex?: string;
            }
        ];
    };
    Element: HTMLDivElement;
}
export default class HdsAdvancedTableThead extends Component<HdsAdvancedTableTheadSignature> {
    id: string;
    get depth(): number;
    get rowIndex(): string;
    get childrenDepth(): number;
    get children(): HdsAdvancedTableColumn[] | undefined;
    get hasChildren(): boolean;
}
//# sourceMappingURL=thead.d.ts.map