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
        parentId?: string;
        childrenKey?: string;
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
    Element: HTMLDivElement;
}
export default class HdsAdvancedTableTrExpandableGroup extends Component<HdsAdvancedTableTrExpandableGroupSignature> {
    id: string;
    isExpanded: boolean;
    constructor(owner: unknown, args: HdsAdvancedTableTrExpandableGroupSignature['Args']);
    get childrenKey(): string;
    get children(): Array<Record<string, unknown>> | undefined;
    get hasChildren(): boolean;
    get depth(): number;
    get childrenDepth(): number;
    onClickToggle(): void;
}
//# sourceMappingURL=tr-expandable-group.d.ts.map