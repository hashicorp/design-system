/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import type { HdsFormCheckboxBaseSignature } from '../form/checkbox/base';
import type { HdsTableScope, HdsTableThSortOrder, HdsTableThSortOrderLabels } from './types';
import type { HdsTableThSignature } from './th';
export interface HdsTableThSelectableSignature {
    Args: {
        didInsert?: (checkbox: HdsFormCheckboxBaseSignature['Element'], selectionKey?: string) => void;
        isSelected?: boolean;
        onClickSortBySelected?: () => void;
        onSelectionChange?: (target: HdsFormCheckboxBaseSignature['Element'], selectionKey: string | undefined) => void;
        selectionAriaLabelSuffix?: string;
        selectionKey?: string;
        selectionScope?: HdsTableScope;
        sortBySelectedOrder?: HdsTableThSortOrder;
        willDestroy?: (selectionKey?: string) => void;
    };
    Element: HdsTableThSignature['Element'];
}
export default class HdsTableThSelectable extends Component<HdsTableThSelectableSignature> {
    isSelected: boolean;
    guid: string;
    checkboxId: string;
    labelId: string;
    get isSortable(): boolean;
    get ariaLabel(): string;
    get ariaSort(): HdsTableThSortOrderLabels | undefined;
    didInsert(checkbox: HdsFormCheckboxBaseSignature['Element']): void;
    willDestroyNode(checkbox: HdsFormCheckboxBaseSignature['Element']): void;
    onSelectionChange(event: Event): void;
    updateAriaLabel(event: Event): void;
}
//# sourceMappingURL=th-selectable.d.ts.map