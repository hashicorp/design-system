/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { action } from '@ember/object';

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
  };
  Blocks: {
    default?: [
      {
        data: HdsAdvancedTableRow;
        isExpandable: boolean;
        id?: string;
        parentId?: string;
        depth: number;
        isExpanded?: HdsAdvancedTableExpandState;
        rowIndex?: string;
        shouldDisplayChildRows?: boolean;
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class HdsAdvancedTableExpandableTrGroup extends Component<HdsAdvancedTableExpandableTrGroupSignature> {
  private _id = guidFor(this);

  get depth(): number {
    return this.args.depth ?? 0;
  }

  get rowIndex(): string {
    return `${this.args.rowIndex}`;
  }

  get childrenDepth(): number {
    return this.depth + 1;
  }

  get shouldDisplayChildRows(): boolean {
    if (this.args.shouldDisplayChildRows !== false) {
      return this.args.record.hasChildren && this.args.record.isOpen;
    }

    return false;
  }

  @action onClickToggle() {
    this.args.record.onClickToggle();
  }
}
