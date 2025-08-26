/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';

import HdsTableThSelectable from './th-selectable.gts';
import { HdsTableScopeValues } from './types.ts';

import type { HdsTableScope, HdsTableThSortOrder } from './types.ts';
import type { HdsFormCheckboxBaseSignature } from '../form/checkbox/base.gts';
import type { HdsTableSignature } from './index.gts';
import type { HdsTableThSelectableSignature } from './th-selectable.gts';

export interface BaseHdsTableTrSignature {
  Args: {
    selectableColumnKey?: HdsTableSignature['Args']['selectableColumnKey'];
    isSelectable?: boolean;
    isSelected?: boolean;
    selectionAriaLabelSuffix?: string;
    selectionKey?: string;
    selectionScope?: HdsTableScope;
    sortBySelectedOrder?: HdsTableThSortOrder;
    didInsert?: (
      checkbox: HdsFormCheckboxBaseSignature['Element'],
      selectionKey?: string
    ) => void;
    onSelectionChange?: (
      checkbox?: HdsFormCheckboxBaseSignature['Element'],
      selectionKey?: string
    ) => void;
    willDestroy?: () => void;
    onClickSortBySelected?: HdsTableThSelectableSignature['Args']['onClickSortBySelected'];
  };
  Blocks: {
    default: [];
  };
  Element: HTMLTableRowElement;
}

// Extended interface for selectable rows
export interface SelectableHdsTableTrArgs extends BaseHdsTableTrSignature {
  Args: BaseHdsTableTrSignature['Args'] & {
    isSelectable: true;
    selectionScope?: HdsTableScopeValues.Row;
    selectionKey: string; // Now required for selectable rows
  };
}

// Union type to combine both possible states
export type HdsTableTrSignature =
  | BaseHdsTableTrSignature
  | SelectableHdsTableTrArgs;
export default class HdsTableTr extends Component<HdsTableTrSignature> {
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

  <template>
    <tr class="hds-table__tr" ...attributes>
      {{#if @isSelectable}}
        <HdsTableThSelectable
          @isSelected={{@isSelected}}
          @selectionScope={{@selectionScope}}
          @selectionKey={{this.selectionKey}}
          @selectionAriaLabelSuffix={{@selectionAriaLabelSuffix}}
          @sortBySelectedOrder={{@sortBySelectedOrder}}
          @didInsert={{@didInsert}}
          @willDestroy={{@willDestroy}}
          @onClickSortBySelected={{@onClickSortBySelected}}
          @onSelectionChange={{@onSelectionChange}}
        />
      {{/if}}

      {{yield}}
    </tr>
  </template>
}
