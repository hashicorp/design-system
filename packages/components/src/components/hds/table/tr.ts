/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { HdsTableScopeValues } from './types.ts';
import type { HdsTableScope } from './types.ts';
import type { HdsFormCheckboxBaseSignature } from '../form/checkbox/base';

export interface BaseHdsTableTrArgs {
  Args: {
    isSelectable?: boolean;
    isSelected?: false;
    selectionAriaLabelSuffix?: string;
    selectionKey?: string;
    selectionScope: HdsTableScope;
    didInsert: (
      checkbox: HdsFormCheckboxBaseSignature['Element'],
      selectionKey?: string
    ) => void;
    onSelectionChange: () => void;
    willDestroy: () => void;
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

export default class HdsTableTrComponent extends Component<HdsTableTrArgs> {
  /**
   * @param selectionKey
   * @type {string}
   * @default undefined
   */
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
