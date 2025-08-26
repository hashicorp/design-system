/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { assert } from '@ember/debug';
import Component from '@glimmer/component';
import { eq } from 'ember-truth-helpers';

import HdsAdvancedTableThSelectable from './th-selectable.gts';

import type { HdsFormCheckboxBaseSignature } from '../form/checkbox/base.gts';
import type { HdsAdvancedTableSignature } from './index.gts';
import type { HdsAdvancedTableThSelectableSignature } from './th-selectable.gts';
import type {
  HdsAdvancedTableScope,
  HdsAdvancedTableThSortOrder,
} from './types.ts';

export interface BaseHdsAdvancedTableTrSignature {
  Args: {
    selectableColumnKey?: HdsAdvancedTableSignature['Args']['selectableColumnKey'];
    isLastRow?: boolean;
    isSelectable?: boolean;
    isSelected?: boolean;
    isParentRow?: boolean;
    selectionAriaLabelSuffix?: string;
    selectionKey?: string;
    selectionScope?: HdsAdvancedTableScope;
    sortBySelectedOrder?: HdsAdvancedTableThSortOrder;
    depth?: number;
    didInsert?: (
      checkbox: HdsFormCheckboxBaseSignature['Element'],
      selectionKey?: string
    ) => void;
    onSelectionChange?: (
      checkbox?: HdsFormCheckboxBaseSignature['Element'],
      selectionKey?: string
    ) => void;
    willDestroy?: () => void;
    onClickSortBySelected?: HdsAdvancedTableThSelectableSignature['Args']['onClickSortBySelected'];
    displayRow?: boolean;
    hasStickyColumn?: boolean;
    isStickyColumnPinned?: boolean;
  };
  Blocks: {
    default?: [];
  };
  Element: HTMLDivElement;
}

/*
 * NOTE: There is currently an issue with `WithBoundArgs` or Glint that causes a typing error where @selectionKey is set as always required.
 *
 * Until this is fixed, we are holding off on doing a union with the SelectableHdsAdvancedTableTrArgs
 */

// Extended interface for selectable rows
// export interface SelectableHdsAdvancedTableTrArgs
//   extends BaseHdsAdvancedTableTrSignature {
//   Args: BaseHdsAdvancedTableTrSignature['Args'] & {
//     isSelectable: true;
//     selectionScope?: HdsAdvancedTableScopeValues.Row;
//     selectionKey: string; // Now required for selectable rows
//   };
// }

// Union type to combine both possible states
export type HdsAdvancedTableTrSignature = BaseHdsAdvancedTableTrSignature;
// | SelectableHdsAdvancedTableTrArgs;

export default class HdsAdvancedTableTr extends Component<HdsAdvancedTableTrSignature> {
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

  get classNames(): string {
    const { depth, isLastRow, isParentRow, displayRow } = this.args;
    const classes = ['hds-advanced-table__tr'];

    if (depth && depth > 0) {
      classes.push('hds-advanced-table__tr--nested');
    }

    if (isParentRow) {
      classes.push('hds-advanced-table__tr--parent-row');
    }

    if (displayRow === false) {
      classes.push('hds-advanced-table__tr--hidden');
    }

    if (isLastRow) {
      classes.push('hds-advanced-table__tr--last-row');
    }

    return classes.join(' ');
  }

  <template>
    <div class={{this.classNames}} role="row" ...attributes>
      {{#if @isSelectable}}
        <HdsAdvancedTableThSelectable
          role={{if (eq @selectionScope "row") "gridcell" "columnheader"}}
          @isSelected={{@isSelected}}
          @selectionScope={{@selectionScope}}
          @selectionKey={{this.selectionKey}}
          @selectionAriaLabelSuffix={{@selectionAriaLabelSuffix}}
          @sortBySelectedOrder={{@sortBySelectedOrder}}
          @didInsert={{@didInsert}}
          @willDestroy={{@willDestroy}}
          @onClickSortBySelected={{@onClickSortBySelected}}
          @onSelectionChange={{@onSelectionChange}}
          @isStickyColumn={{@hasStickyColumn}}
          @isStickyColumnPinned={{@isStickyColumnPinned}}
        />
      {{/if}}

      {{yield}}
    </div>
  </template>
}
