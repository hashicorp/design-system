/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { HdsTreeGridScopeValues } from './types.ts';

export interface BaseHdsTreeGridTrSignature {
  Args: {
    isExpandable?: boolean;
    willDestroy?: () => void;
    childrenKey?: string;
    data?: Record<string, unknown>;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLTableRowElement;
}

// Extended interface for selectable rows
export interface SelectableHdsTreeGridTrArgs
  extends BaseHdsTreeGridTrSignature {
  Args: BaseHdsTreeGridTrSignature['Args'] & {
    isSelectable: true;
    selectionScope?: HdsTreeGridScopeValues.Row;
    selectionKey: string; // Now required for selectable rows
  };
}

// Union type to combine both possible states
export type HdsTreeGridTrSignature =
  | BaseHdsTreeGridTrSignature
  | SelectableHdsTreeGridTrArgs;

export default class HdsTreeGridTr extends Component<HdsTreeGridTrSignature> {
  get hasChildren(): boolean {
    const { data, childrenKey } = this.args;
    const children = data && childrenKey ? data[childrenKey] : [];

    if (
      this.args.data &&
      this.args.childrenKey &&
      Array.isArray(children) &&
      children.length > 0
    ) {
      return true;
    }

    return false;
  }
}
