/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { HdsTableScopeValues } from './types.ts';
import type { HdsTableScope, HdsTableThSortOrder } from './types.ts';
import type { HdsFormCheckboxBaseSignature } from '../form/checkbox/base';
import type { HdsTableArgs } from './index.ts';

export interface BaseHdsTableTrArgs {
  Args: {
    selectableColumnKey?: HdsTableArgs['Args']['selectableColumnKey'];
    isSelectable?: boolean;
    isSelected?: false;
    selectionAriaLabelSuffix?: string;
    selectionKey?: string;
    selectionScope: HdsTableScope;
    sortBySelectedOrder?: HdsTableThSortOrder;
    didInsert: (
      checkbox: HdsFormCheckboxBaseSignature['Element'],
      selectionKey?: string
    ) => void;
    onSelectionChange: (
      checkbox?: HdsFormCheckboxBaseSignature['Element'],
      selectionKey?: string
    ) => void;
    willDestroy: () => void;
    onClickSortBySelected?: () => void;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLTableRowElement;
}

// Extended interface for selectable rows
export interface SelectableHdsTableTrArgs extends BaseHdsTableTrArgs {
  Args: BaseHdsTableTrArgs['Args'] & {
    isSelectable: true;
    selectionScope: HdsTableScopeValues.Row;
    selectionKey: string; // Now required for selectable rows
  };
}

// Union type to combine both possible states
export type HdsTableTrArgs = BaseHdsTableTrArgs | SelectableHdsTableTrArgs;
export default class HdsTableTr extends Component<HdsTableTrArgs> {
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
