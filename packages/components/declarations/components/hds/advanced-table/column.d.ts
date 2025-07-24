/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsAdvancedTableColumn as HdsAdvancedTableColumnType } from './types';
import type { HdsDropdownListItemInteractiveSignature } from '../dropdown/list-item/interactive';
interface HdsAdvancedTableThContextMenuOption {
    key: string;
    label: string;
    icon: HdsDropdownListItemInteractiveSignature['Args']['icon'];
    action: (dropdownCloseCallback?: () => void) => void;
}
export interface HdsAdvancedTableColumnSignature {
    Args: {
        column: HdsAdvancedTableColumnType;
        nextColumn?: HdsAdvancedTableColumnType;
        tableHeight?: number;
    };
    Blocks: {
        default?: [];
    };
}
export default class HdsAdvancedTableColumn extends Component<HdsAdvancedTableColumnSignature> {
    private _originalWidth?;
    width?: string;
    constructor(owner: unknown, args: HdsAdvancedTableColumnSignature['Args']);
    get pxWidth(): number | undefined;
    set pxWidth(value: number);
    get pxMinWidth(): number | undefined;
    get pxMaxWidth(): number | undefined;
    get showContextMenu(): boolean;
    get isLastColumn(): boolean;
    get contextMenuOptions(): HdsAdvancedTableThContextMenuOption[];
    setPxWidth(pxWidth: number): void;
    resetWidth(): void;
}
export {};
