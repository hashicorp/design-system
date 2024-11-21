/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsFormCheckboxBaseSignature } from '../form/checkbox/base';
import type { HdsTreeGridScope, HdsTreeGridThSortOrder, HdsTreeGridThSortOrderLabels } from './types';
import type { HdsTreeGridThSignature } from './th';
export interface HdsTreeGridThSelectableSignature {
    Args: {
        didInsert: (element: HTMLTableCellElement, isGrid: boolean) => void;
        didInsertCheckbox?: (checkbox: HdsFormCheckboxBaseSignature['Element'], selectionKey?: string) => void;
        isSelected?: boolean;
        onClickSortBySelected?: () => void;
        onSelectionChange?: (target: HdsFormCheckboxBaseSignature['Element'], selectionKey: string | undefined) => void;
        selectionAriaLabelSuffix?: string;
        selectionKey?: string;
        selectionScope?: HdsTreeGridScope;
        sortBySelectedOrder?: HdsTreeGridThSortOrder;
        willDestroy?: (selectionKey?: string) => void;
        onKeyPress?: (event: KeyboardEvent) => void;
        isGrid?: boolean;
    };
    Element: HdsTreeGridThSignature['Element'];
}
export default class HdsTreeGridThSelectable extends Component<HdsTreeGridThSelectableSignature> {
    isSelected: boolean;
    guid: string;
    checkboxId: string;
    labelId: string;
    get isSortable(): boolean;
    get ariaLabel(): string;
    get ariaSort(): HdsTreeGridThSortOrderLabels | undefined;
    didInsertCheckbox(checkbox: HdsFormCheckboxBaseSignature['Element']): void;
    willDestroyNode(checkbox: HdsFormCheckboxBaseSignature['Element']): void;
    onSelectionChange(event: Event): void;
    updateAriaLabel(event: Event): void;
}
//# sourceMappingURL=th-selectable.d.ts.map