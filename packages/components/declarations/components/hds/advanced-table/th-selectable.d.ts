/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsFormCheckboxBaseSignature } from '../form/checkbox/base';
import type { HdsAdvancedTableScope, HdsAdvancedTableThSortOrder, HdsAdvancedTableThSortOrderLabels } from './types.ts';
import type { HdsAdvancedTableThSignature } from './th.ts';
export interface HdsAdvancedTableThSelectableSignature {
    Args: {
        didInsert?: (checkbox: HdsFormCheckboxBaseSignature['Element'], selectionKey?: string) => void;
        isSelected?: boolean;
        onClickSortBySelected?: () => void;
        onSelectionChange?: (target: HdsFormCheckboxBaseSignature['Element'], selectionKey: string | undefined) => void;
        selectionAriaLabelSuffix?: string;
        selectionKey?: string;
        selectionScope?: HdsAdvancedTableScope;
        sortBySelectedOrder?: HdsAdvancedTableThSortOrder;
        willDestroy?: (selectionKey?: string) => void;
        isStickyColumn?: boolean;
        isStickyColumnPinned?: boolean;
    };
    Element: HdsAdvancedTableThSignature['Element'];
}
export default class HdsAdvancedTableThSelectable extends Component<HdsAdvancedTableThSelectableSignature> {
    private _isSelected;
    private _guid;
    private _checkboxId;
    private _labelId;
    get isSortable(): boolean;
    get ariaLabel(): string;
    get ariaSort(): HdsAdvancedTableThSortOrderLabels | undefined;
    private _manageCheckbox;
    onSelectionChange(event: Event): void;
}
