/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type HdsAdvancedTableColumn from './models/column.ts';
import type { HdsDropdownSignature } from '../dropdown/index.ts';
import type { HdsDropdownToggleIconSignature } from '../dropdown/toggle/icon.ts';
import type { HdsAdvancedTableSignature } from './index.ts';
import type { HdsAdvancedTableThResizeHandleSignature } from './th-resize-handle.ts';
interface HdsAdvancedTableThContextMenuOption {
    key: string;
    label: string;
    icon: HdsDropdownToggleIconSignature['Args']['icon'];
    action: (column: HdsAdvancedTableColumn, dropdownCloseCallback?: () => void) => void;
}
export interface HdsAdvancedTableThContextMenuSignature {
    Args: {
        column: HdsAdvancedTableColumn;
        hasResizableColumns?: boolean;
        resizeHandleElement?: HdsAdvancedTableThResizeHandleSignature['Element'];
        onColumnResize?: HdsAdvancedTableSignature['Args']['onColumnResize'];
    };
    Element: HdsDropdownSignature['Element'];
}
export default class HdsAdvancedTableThContextMenu extends Component<HdsAdvancedTableThContextMenuSignature> {
    private _element;
    get _options(): HdsAdvancedTableThContextMenuOption[];
    resizeColumn(): void;
    resetColumnWidth(column: HdsAdvancedTableColumn, dropdownCloseCallback?: () => void): void;
}
export {};
