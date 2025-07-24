/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type HdsAdvancedTableColumn from './models/column.ts';
export interface HdsAdvancedTableThReorderHandleSignature {
    Args: {
        column: HdsAdvancedTableColumn;
        columnWidth: number;
        tableHeight?: number;
        onReorderDragStart: (column: HdsAdvancedTableColumn) => void;
        onReorderDragEnd?: () => void;
    };
    Blocks: {
        default?: [];
    };
    Element: HTMLDivElement;
}
export default class HdsAdvancedTableThReorderHandle extends Component<HdsAdvancedTableThReorderHandleSignature> {
    private _registerElement;
    get classNames(): string;
    handleDragStart(event: DragEvent): void;
    handleDragEnd(): void;
    handleKeydown(event: KeyboardEvent): void;
}
