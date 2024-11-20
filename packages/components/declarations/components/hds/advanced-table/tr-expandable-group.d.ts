/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsAdvancedTableHorizontalAlignment } from './types';
export interface HdsAdvancedTableTrExpandableGroupSignature {
    Args: {
        align?: HdsAdvancedTableHorizontalAlignment;
        depth?: number;
        record: Record<string, unknown>;
        hasExpandableRows?: boolean;
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
            }
        ];
    };
    Element: HTMLTableElement;
}
export default class HdsAdvancedTableTrExpandableGroup extends Component<HdsAdvancedTableTrExpandableGroupSignature> {
    parentRowHeaderId: string;
    isExpanded: boolean;
    get children(): Array<Record<string, unknown>> | undefined;
    get hasChildren(): boolean;
    get newDepth(): number;
    get classes(): string;
    onClickToggle(): void;
}
//# sourceMappingURL=tr-expandable-group.d.ts.map