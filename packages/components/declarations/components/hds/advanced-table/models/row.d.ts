/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { HdsAdvancedTableColumn } from '../types';
interface HdsAdvancedTableRowArgs {
    [key: string]: unknown;
    columns: HdsAdvancedTableColumn[];
    id?: string;
    childrenKey?: string;
}
export default class HdsAdvancedTableRow {
    id: string;
    [key: string]: unknown;
    isOpen: boolean;
    children: HdsAdvancedTableRow[];
    childrenKey: string;
    get hasChildren(): boolean;
    get showChildren(): boolean;
    constructor(args: HdsAdvancedTableRowArgs);
    openAll(): void;
    collapseAll(): void;
    onClickToggle(): void;
}
export {};
