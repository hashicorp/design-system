/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type HdsAdvancedTableColumn from './models/column.ts';
import type { HdsAdvancedTableSignature } from './index.ts';
export interface HdsAdvancedTableThResizeHandleSignature {
    Args: {
        column: HdsAdvancedTableColumn;
        hasResizableColumns: HdsAdvancedTableSignature['Args']['hasResizableColumns'];
        tableHeight?: number;
        onColumnResize?: HdsAdvancedTableSignature['Args']['onColumnResize'];
    };
    Blocks: {
        default?: [];
    };
    Element: HTMLDivElement;
}
export default class HdsAdvancedTableThResizeHandle extends Component<HdsAdvancedTableThResizeHandleSignature> {
    resizing: {
        startX: number;
        startColumnPxWidth: number;
        startNextColumnPxWidth?: number;
    } | null;
    private _nextColumnDelta;
    private _handleElement;
    private _boundResize;
    private _boundStopResize;
    private _registerHandleElement;
    constructor(owner: unknown, args: HdsAdvancedTableThResizeHandleSignature['Args']);
    get height(): string | undefined;
    get classNames(): string;
    onColumnResize(key?: string, width?: string): void;
    handleKeydown(event: KeyboardEvent): void;
    startResize(event: PointerEvent): void;
    private _applyResizeDelta;
    private _resize;
    private _stopResize;
    private _setNextColumnImposedWidthDelta;
}
