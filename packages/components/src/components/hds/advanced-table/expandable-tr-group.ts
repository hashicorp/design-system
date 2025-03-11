/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { action } from '@ember/object';
import type { InternalModelItem } from './index.ts';

import type {
  HdsAdvancedTableExpandState,
  HdsAdvancedTableHorizontalAlignment,
} from './types.ts';
export interface HdsAdvancedTableExpandableTrGroupSignature {
  Args: {
    align?: HdsAdvancedTableHorizontalAlignment;
    depth?: number;
    record: InternalModelItem;
    parentId?: string;
    childrenKey?: string;
    rowIndex: number | string;
    didInsertExpandButton?: (button: HTMLButtonElement) => void;
    willDestroyExpandButton?: (button: HTMLButtonElement) => void;
    onClickToggle?: () => void;
    shouldDisplayChildRows?: boolean;
  };
  Blocks: {
    default?: [
      {
        data: Record<string, unknown>;
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
    return `${this.args.rowIndex}`;
  }

  get childrenDepth(): number {
    return this.depth + 1;
  }

  // @action onClickToggle(newValue?: boolean | 'mixed') {
  @action onClickToggle() {
    // fix the state
    this.args.record.toggleOpen();

    if (this.args.onClickToggle) {
      this.args.onClickToggle();
    }
  }
}
