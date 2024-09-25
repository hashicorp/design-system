/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { HdsTableScopeValues } from './types.ts';
import type { HdsTableScope, HdsTableThSortOrder } from './types.ts';
import type { HdsFormCheckboxBaseSignature } from '../form/checkbox/base';
import type { HdsTableArgs } from './index.ts';
import type { HdsTableThSelectableArgs } from './th-selectable.ts';
export interface BaseHdsTableTrArgs {
    Args: {
        selectableColumnKey?: HdsTableArgs['Args']['selectableColumnKey'];
        isSelectable?: boolean;
        isSelected?: false;
        selectionAriaLabelSuffix?: string;
        selectionKey?: string;
        selectionScope: HdsTableScope;
        sortBySelectedOrder?: HdsTableThSortOrder;
        didInsert: (checkbox: HdsFormCheckboxBaseSignature['Element'], selectionKey?: string) => void;
        onSelectionChange: (checkbox?: HdsFormCheckboxBaseSignature['Element'], selectionKey?: string) => void;
        willDestroy: () => void;
        onClickSortBySelected?: HdsTableThSelectableArgs['Args']['onClickSortBySelected'];
    };
    Blocks: {
        default: [];
    };
    Element: HTMLTableRowElement;
}
export interface SelectableHdsTableTrArgs extends BaseHdsTableTrArgs {
    Args: BaseHdsTableTrArgs['Args'] & {
        isSelectable: true;
        selectionScope: HdsTableScopeValues.Row;
        selectionKey: string;
    };
}
export type HdsTableTrArgs = BaseHdsTableTrArgs | SelectableHdsTableTrArgs;
export default class HdsTableTr extends Component<HdsTableTrArgs> {
    get selectionKey(): string | undefined;
}
//# sourceMappingURL=tr.d.ts.map