/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type HdsAdvancedTableColumn from './models/column';
export interface HdsAdvancedTableColumnDragPreviewSignature {
    Args: {
        column: HdsAdvancedTableColumn;
    };
    Blocks: {
        default?: [];
    };
    Element: HTMLDivElement;
}
export default class HdsAdvancedTableColumnDragPreview extends Component<HdsAdvancedTableColumnDragPreviewSignature> {
    get text(): string | undefined;
}
