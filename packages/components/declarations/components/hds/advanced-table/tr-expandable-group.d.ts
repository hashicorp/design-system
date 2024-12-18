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
    };
    Blocks: {
        default?: [];
    };
    Element: HTMLTableElement;
}
export default class HdsAdvancedTableTrExpandableGroup extends Component<HdsAdvancedTableTrExpandableGroupSignature> {
    get children(): Array<Record<string, unknown>> | undefined;
    get hasChildren(): boolean;
    get newDepth(): number;
}
//# sourceMappingURL=tr-expandable-group.d.ts.map