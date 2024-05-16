/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { assert } from '@ember/debug';

export interface TrSignature {
  Args: {
    didInsert: unknown;
    isSelectable: unknown;
    isSelected: unknown;
    onSelectionChange: unknown;
    selectionAriaLabelSuffix: unknown;
    selectionKey: unknown;
    selectionScope: unknown;
    willDestroy: unknown;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLTableRowElement;
}

export default class TrComponent extends Component<TrSignature> {
  /**
   * @param selectionKey
   * @type {string}
   * @default undefined
   */
  get selectionKey() {
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
