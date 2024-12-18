/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsFormCheckboxBaseSignature } from '../form/checkbox/base';
import type { HdsAdvancedTableScope, HdsAdvancedTableThSortOrder, HdsAdvancedTableThSortOrderLabels } from './types';
import type { HdsAdvancedTableThSignature } from './th';
export interface HdsAdvancedTableThSelectableSignature {
    Args: {
        didInsertCheckbox?: (checkbox: HdsFormCheckboxBaseSignature['Element'], selectionKey?: string) => void;
        isSelected?: boolean;
        onClickSortBySelected?: () => void;
        onSelectionChange?: (target: HdsFormCheckboxBaseSignature['Element'], selectionKey: string | undefined) => void;
        selectionAriaLabelSuffix?: string;
        selectionKey?: string;
        selectionScope?: HdsAdvancedTableScope;
        sortBySelectedOrder?: HdsAdvancedTableThSortOrder;
        willDestroy?: (selectionKey?: string) => void;
    };
    Element: HdsAdvancedTableThSignature['Element'];
}
export default class HdsAdvancedTableThSelectable extends Component<HdsAdvancedTableThSelectableSignature> {
    isSelected: boolean;
    guid: string;
    checkboxId: string;
    labelId: string;
    get isSortable(): boolean;
    get ariaLabel(): string;
    get ariaSort(): HdsAdvancedTableThSortOrderLabels | undefined;
    didInsertCheckbox(checkbox: HdsFormCheckboxBaseSignature['Element']): void;
    willDestroyNode(checkbox: HdsFormCheckboxBaseSignature['Element']): void;
    onSelectionChange(event: Event): void;
    updateAriaLabel(event: Event): void;
}
//# sourceMappingURL=th-selectable.d.ts.map