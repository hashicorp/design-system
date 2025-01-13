/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { HdsAdvancedTableScopeValues } from './types.ts';
import type { HdsAdvancedTableScope, HdsAdvancedTableThSortOrder } from './types.ts';
import type { HdsFormCheckboxBaseSignature } from '../form/checkbox/base';
import type { HdsAdvancedTableSignature } from './index.ts';
import type { HdsAdvancedTableThSelectableSignature } from './th-selectable.ts';
export interface BaseHdsAdvancedTableTrSignature {
    Args: {
        selectableColumnKey?: HdsAdvancedTableSignature['Args']['selectableColumnKey'];
        isSelectable?: boolean;
        isSelected?: false;
        selectionAriaLabelSuffix?: string;
        selectionKey?: string;
        selectionScope?: HdsAdvancedTableScope;
        sortBySelectedOrder?: HdsAdvancedTableThSortOrder;
        depth?: number;
        didInsert?: (checkbox: HdsFormCheckboxBaseSignature['Element'], selectionKey?: string) => void;
        onSelectionChange?: (checkbox?: HdsFormCheckboxBaseSignature['Element'], selectionKey?: string) => void;
        willDestroy?: () => void;
        onClickSortBySelected?: HdsAdvancedTableThSelectableSignature['Args']['onClickSortBySelected'];
    };
    Blocks: {
        default?: [];
    };
    Element: HTMLDivElement;
}
export interface SelectableHdsAdvancedTableTrArgs extends BaseHdsAdvancedTableTrSignature {
    Args: BaseHdsAdvancedTableTrSignature['Args'] & {
        isSelectable: true;
        selectionScope?: HdsAdvancedTableScopeValues.Row;
        selectionKey: string;
    };
}
export type HdsAdvancedTableTrSignature = BaseHdsAdvancedTableTrSignature | SelectableHdsAdvancedTableTrArgs;
export default class HdsAdvancedTableTr extends Component<HdsAdvancedTableTrSignature> {
    get selectionKey(): string | undefined;
    get classNames(): string;
}
//# sourceMappingURL=tr.d.ts.map