/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { tracked } from '@glimmer/tracking';

// import { HdsTableScopeValues } from './types.ts';
import HdsTableThSelectable from './th-selectable.gts';

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
    default?: [];
  };
  Element: HTMLTableRowElement;
}

/*
 * NOTE: There is currently an issue with `WithBoundArgs` or Glint that causes a typing error where @selectionKey is set as always required.
 *
 * Until this is fixed, we are holding off on doing a union with the SelectableHdsTableTrArgs
 */

// Extended interface for selectable rows
// export interface SelectableHdsTableTrArgs extends BaseHdsTableTrSignature {
//   Args: BaseHdsTableTrSignature['Args'] & {
//     isSelectable: true;
//     selectionScope?: HdsTableScopeValues.Row;
//     selectionKey: string; // Now required for selectable rows
//   };
// }

// Union type to combine both possible states
export type HdsTableTrSignature = BaseHdsTableTrSignature;
// | SelectableHdsTableTrArgs;

export default class HdsTableTr extends Component<HdsTableTrSignature> {
  @tracked private isSelectedOverride?: boolean;

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

  // Carbon applies styles to the entire row when it is selected, so we need a state to track the selection state to toggle the appropriate class.
  get isSelected(): boolean {
    return this.isSelectedOverride ?? this.args.isSelected ?? false;
  }

  get classNames(): string {
    const classes = ['hds-table__tr'];

    if (this.isSelected) {
      classes.push(`hds-table__tr--is-selected`);
    }

    return classes.join(' ');
  }

  onSelectionChange = (
    checkbox?: HdsFormCheckboxBaseSignature['Element'],
    selectionKey?: string
  ): void => {
    this.isSelectedOverride = checkbox?.checked ?? false;

    const { onSelectionChange } = this.args;
    if (typeof onSelectionChange === 'function') {
      onSelectionChange(checkbox, selectionKey);
    }
  };

  <template>
    <tr class={{this.classNames}} ...attributes>
      {{#if @isSelectable}}
        <HdsTableThSelectable
          @isSelected={{this.isSelected}}
          @selectionScope={{@selectionScope}}
          @selectionKey={{this.selectionKey}}
          @selectionAriaLabelSuffix={{@selectionAriaLabelSuffix}}
          @sortBySelectedOrder={{@sortBySelectedOrder}}
          @didInsert={{@didInsert}}
          @willDestroy={{@willDestroy}}
          @onClickSortBySelected={{@onClickSortBySelected}}
          @onSelectionChange={{this.onSelectionChange}}
        />
      {{/if}}

      {{yield}}
    </tr>
  </template>
}
