/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { guidFor } from '@ember/object/internals';

import { HdsAdvancedTableScopeValues } from './types.ts';
import type {
  HdsAdvancedTableScope,
  HdsAdvancedTableThSortOrder,
} from './types.ts';
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
    didInsertCheckbox?: (
      checkbox: HdsFormCheckboxBaseSignature['Element'],
      selectionKey?: string
    ) => void;
    onSelectionChange?: (
      checkbox?: HdsFormCheckboxBaseSignature['Element'],
      selectionKey?: string
    ) => void;
    willDestroy?: () => void;
    onClickSortBySelected?: HdsAdvancedTableThSelectableSignature['Args']['onClickSortBySelected'];
    depth?: number;
    didInsertChildRow?: (id: string) => void;
    childRowIds?: string[];
  };
  Blocks: {
    default: [];
  };
  Element: HTMLTableRowElement;
}

// Extended interface for selectable rows
export interface SelectableHdsAdvancedTableTrArgs
  extends BaseHdsAdvancedTableTrSignature {
  Args: BaseHdsAdvancedTableTrSignature['Args'] & {
    isSelectable: true;
    selectionScope?: HdsAdvancedTableScopeValues.Row;
    selectionKey: string; // Now required for selectable rows
  };
}

// Union type to combine both possible states
export type HdsAdvancedTableTrSignature =
  | BaseHdsAdvancedTableTrSignature
  | SelectableHdsAdvancedTableTrArgs;
export default class HdsAdvancedTableTr extends Component<HdsAdvancedTableTrSignature> {
  rowId = guidFor(this);

  get selectionKey(): string | undefined {
    if (this.args.isSelectable && this.args.selectionScope === 'row') {
      assert(
        `@selectionKey must be defined on Table::Tr or B.Tr when @isSelectable is true`,
        this.args.selectionKey
      );
      return this.args.selectionKey;
    }
    return undefined;
  }
}
