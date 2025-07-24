/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsAdvancedTableThSortOrder, HdsAdvancedTableThSortOrderIcons, HdsAdvancedTableThSortOrderLabels } from './types.ts';
export interface HdsAdvancedTableThButtonSortSignature {
    Args: {
        labelId?: string;
        onClick?: () => void;
        sortOrder?: HdsAdvancedTableThSortOrder;
    };
    Element: HTMLButtonElement;
}
export default class HdsAdvancedTableThButtonSort extends Component<HdsAdvancedTableThButtonSortSignature> {
    private _prefixLabelId;
    private _suffixLabelId;
    get icon(): HdsAdvancedTableThSortOrderIcons;
    get sortOrderLabel(): HdsAdvancedTableThSortOrderLabels;
    get onClick(): () => void;
    get classNames(): string;
}
