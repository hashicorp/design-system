/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type HdsAdvancedTableColumn from './models/column.ts';
export interface HdsAdvancedTableThReorderDropTargetSignature {
    Args: {
        column: HdsAdvancedTableColumn;
        tableHeight?: number;
        onReorderDrop?: (column: HdsAdvancedTableColumn, side: 'left' | 'right') => void;
    };
    Blocks: {
        default?: [];
    };
    Element: HTMLDivElement;
}
export default class HdsAdvancedTableThReorderDropTarget extends Component<HdsAdvancedTableThReorderDropTargetSignature> {
    private _dragSide;
    private _isDraggingOver;
    private _dragCount;
    private _element;
    get classNames(): string;
    private _registerElement;
    private _resetDragState;
    private _getDragSide;
    handleDragOver(event: DragEvent): void;
    handleDragEnter(event: DragEvent): void;
    handleDragLeave(event: DragEvent): void;
    handleDrop(event: DragEvent): void;
}
