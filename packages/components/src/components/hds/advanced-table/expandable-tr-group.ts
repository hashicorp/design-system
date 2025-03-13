/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

import type {
  HdsAdvancedTableExpandState,
  HdsAdvancedTableHorizontalAlignment,
} from './types.ts';
import type Owner from '@ember/owner';
import type HdsAdvancedTableRow from './models/row.ts';
export interface HdsAdvancedTableExpandableTrGroupSignature {
  Args: {
    align?: HdsAdvancedTableHorizontalAlignment;
    depth?: number;
    record: HdsAdvancedTableRow;
    parentId?: string;
    rowIndex: number | string;
    didInsertExpandButton?: (button: HTMLButtonElement) => void;
    willDestroyExpandButton?: (button: HTMLButtonElement) => void;
    onClickToggle?: () => void;
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
        onClickToggle?: (newValue?: HdsAdvancedTableExpandState) => void;
        isExpanded?: HdsAdvancedTableExpandState;
        rowIndex?: string;
        didInsertExpandButton?: (button: HTMLButtonElement) => void;
        willDestroyExpandButton?: (button: HTMLButtonElement) => void;
        shouldDisplayChildRows?: boolean;
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

  get shouldDisplayChildRows(): boolean {
    if (
      typeof this.args.record.isExpanded === 'boolean' &&
      this.args.shouldDisplayChildRows !== false
    ) {
      return this.args.record.hasChildren && this.args.record.isExpanded;
    }

    return false;
  }

  @action onClickToggle(newValue?: boolean | 'mixed') {
    this.args.record.onClickToggle(newValue);

    if (this.args.onClickToggle) {
      this.args.onClickToggle();
    }
  }
}
