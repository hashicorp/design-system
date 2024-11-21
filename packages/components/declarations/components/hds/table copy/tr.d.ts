/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { HdsTableScopeValues } from './types.ts';
import type { HdsTableScope, HdsTableThSortOrder } from './types.ts';
import type { HdsFormCheckboxBaseSignature } from '../form/checkbox/base';
import type { HdsTableSignature } from './index.ts';
import type { HdsTableThSelectableSignature } from './th-selectable.ts';
export interface BaseHdsTableTrSignature {
    Args: {
        selectableColumnKey?: HdsTableSignature['Args']['selectableColumnKey'];
        isSelectable?: boolean;
        isSelected?: false;
        selectionAriaLabelSuffix?: string;
        selectionKey?: string;
        selectionScope?: HdsTableScope;
        sortBySelectedOrder?: HdsTableThSortOrder;
        didInsert?: (checkbox: HdsFormCheckboxBaseSignature['Element'], selectionKey?: string) => void;
        onSelectionChange?: (checkbox?: HdsFormCheckboxBaseSignature['Element'], selectionKey?: string) => void;
        willDestroy?: () => void;
        onClickSortBySelected?: HdsTableThSelectableSignature['Args']['onClickSortBySelected'];
    };
    Blocks: {
        default: [];
    };
    Element: HTMLTableRowElement;
}
export interface SelectableHdsTableTrArgs extends BaseHdsTableTrSignature {
    Args: BaseHdsTableTrSignature['Args'] & {
        isSelectable: true;
        selectionScope?: HdsTableScopeValues.Row;
        selectionKey: string;
    };
}
export type HdsTableTrSignature = BaseHdsTableTrSignature | SelectableHdsTableTrArgs;
export default class HdsTableTr extends Component<HdsTableTrSignature> {
    get selectionKey(): string | undefined;
}
//# sourceMappingURL=tr.d.ts.map