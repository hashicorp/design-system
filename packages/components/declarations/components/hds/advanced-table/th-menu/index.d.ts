/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import HdsAdvancedTableColumn from '../models/column.ts';
export interface HdsAdvancedTableThMenuSignature {
    Args: {
        column: HdsAdvancedTableColumn;
        onStartResize: () => void;
    };
    Blocks: {
        default?: [];
    };
    Element: HTMLDivElement;
}
export default class HdsAdvancedTableThMenu extends Component<HdsAdvancedTableThMenuSignature> {
    isResizing: boolean;
    enableResizing(callback: (() => void) | undefined): void;
    resetColumnWidth(callback: (() => void) | undefined): void;
}
