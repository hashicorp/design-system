/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { ComponentLike } from '@glint/template';
import { HdsTreeGridDensityValues, HdsTreeGridThSortOrderValues, HdsTreeGridVerticalAlignmentValues } from './types.ts';
import type { HdsTreeGridColumn, HdsTreeGridDensities, HdsTreeGridHorizontalAlignment, HdsTreeGridSelectableRow, HdsTreeGridSortingFunction, HdsTreeGridThSortOrder, HdsTreeGridVerticalAlignment, HdsTreeGridModel, HdsTreeGridItem } from './types';
import type { HdsFormCheckboxBaseSignature } from '../form/checkbox/base';
import type { HdsTreeGridTdSignature } from './td.ts';
import type { HdsTreeGridThSignature } from './th.ts';
import type { HdsTreeGridThSortSignature } from './th-sort.ts';
import type { HdsTreeGridTrSignature } from './tr.ts';
export declare const DENSITIES: HdsTreeGridDensities[];
export declare const DEFAULT_DENSITY = HdsTreeGridDensityValues.Medium;
export declare const VALIGNMENTS: HdsTreeGridVerticalAlignment[];
export declare const DEFAULT_VALIGN = HdsTreeGridVerticalAlignmentValues.Top;
export interface HdsTreeGridSignature {
    Args: {
        align?: HdsTreeGridHorizontalAlignment;
        caption?: string;
        columns?: HdsTreeGridColumn[];
        density?: HdsTreeGridDensities;
        identityKey?: string;
        isFixedLayout?: boolean;
        isStriped?: boolean;
        model: HdsTreeGridModel;
        onSort?: (sortBy: string, sortOrder: HdsTreeGridThSortOrder) => void;
        sortBy?: string;
        sortedMessageText?: string;
        sortOrder?: HdsTreeGridThSortOrder;
        valign?: HdsTreeGridVerticalAlignment;
        childrenKey?: string;
    };
    Blocks: {
        head?: [
            {
                Tr?: ComponentLike<HdsTreeGridTrSignature>;
                Th?: ComponentLike<HdsTreeGridThSignature>;
                ThSort?: ComponentLike<HdsTreeGridThSortSignature>;
                sortBy?: string;
                sortOrder?: HdsTreeGridThSortOrder;
                setSortBy?: (column: string) => void;
            }
        ];
        body?: [
            {
                Td?: ComponentLike<HdsTreeGridTdSignature>;
                Tr?: ComponentLike<HdsTreeGridTrSignature>;
                Th?: ComponentLike<HdsTreeGridThSignature>;
                data?: HdsTreeGridItem;
                sortBy?: string;
                sortOrder?: HdsTreeGridThSortOrder;
            }
        ];
    };
    Element: HTMLTableElement;
}
export default class HdsTreeGrid extends Component<HdsTreeGridSignature> {
    sortBy: string | undefined;
    sortOrder: "desc" | "asc" | HdsTreeGridThSortOrderValues;
    selectAllCheckbox?: HdsFormCheckboxBaseSignature['Element'];
    selectableRows: HdsTreeGridSelectableRow[];
    isSelectAllCheckboxSelected?: boolean;
    get getSortCriteria(): string | HdsTreeGridSortingFunction<unknown>;
    get identityKey(): string | undefined;
    get sortedMessageText(): string;
    get childrenKey(): string;
    get isStriped(): boolean;
    get isFixedLayout(): boolean;
    get density(): HdsTreeGridDensities;
    get valign(): HdsTreeGridVerticalAlignment;
    get classNames(): string;
    setSortBy(column: string): void;
}
//# sourceMappingURL=index.d.ts.map