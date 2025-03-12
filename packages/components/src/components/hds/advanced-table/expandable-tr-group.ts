/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';

import type {
  HdsAdvancedTableExpandState,
  HdsAdvancedTableHorizontalAlignment,
} from './types.ts';
import type HdsAdvancedTableRow from './models/row.ts';
export interface HdsAdvancedTableExpandableTrGroupSignature {
  Args: {
    align?: HdsAdvancedTableHorizontalAlignment;
    depth?: number;
    record: HdsAdvancedTableRow;
    parentId?: string;
    rowIndex: number | string;
    shouldDisplayChildRows?: boolean;
    onClickToggle?: (newValue?: HdsAdvancedTableExpandState) => void;
  };
  Blocks: {
    default?: [
      {
        data: HdsAdvancedTableRow;
        depth: number;
        isExpandable: boolean;
        id?: string;
        isOpen?: HdsAdvancedTableExpandState;
        parentId?: string;
        rowIndex?: string;
        shouldDisplayChildRows?: boolean;
        onClickToggle?: (newValue?: HdsAdvancedTableExpandState) => void;
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class HdsAdvancedTableExpandableTrGroup extends Component<HdsAdvancedTableExpandableTrGroupSignature> {
  private _id = guidFor(this);

  get depth(): number {
    const { depth = 0 } = this.args;

    return depth;
  }

  get rowIndex(): string {
    const { rowIndex } = this.args;
    return `${rowIndex}`;
  }

  get childrenDepth(): number {
    return this.depth + 1;
  }
}
