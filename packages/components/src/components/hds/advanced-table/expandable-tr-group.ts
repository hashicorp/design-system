/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

import type { HdsAdvancedTableHorizontalAlignment } from './types.ts';
import type Owner from '@ember/owner';
export interface HdsAdvancedTableExpandableTrGroupSignature {
  Args: {
    align?: HdsAdvancedTableHorizontalAlignment;
    depth?: number;
    record: Record<string, unknown>;
    parentId?: string;
    childrenKey?: string;
    rowIndex: number | string;
    didInsertExpandButton?: (button: HTMLButtonElement) => void;
    willDestroyExpandButton?: () => void;
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
        onClickToggle?: (newValue?: boolean | 'mixed') => void;
        isExpanded?: boolean | 'mixed';
        rowIndex?: string;
        didInsertExpandButton?: (button: HTMLButtonElement) => void;
        willDestroyExpandButton?: () => void;
        shouldDisplayChildRows?: boolean;
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class HdsAdvancedTableExpandableTrGroup extends Component<HdsAdvancedTableExpandableTrGroupSignature> {
  @tracked private _isExpanded: boolean | 'mixed' = false;

  private _id = guidFor(this);

  constructor(
    owner: Owner,
    args: HdsAdvancedTableExpandableTrGroupSignature['Args']
  ) {
    super(owner, args);

    this._isExpanded =
      this.args.record['isOpen'] &&
      typeof this.args.record['isOpen'] === 'boolean'
        ? this.args.record['isOpen']
        : false;
  }

  get childrenKey(): string {
    const { childrenKey = 'children' } = this.args;

    return childrenKey;
  }

  get children(): Array<Record<string, unknown>> | undefined {
    const { record } = this.args;

    if (record[this.childrenKey]) {
      const children = record[this.childrenKey];

      if (Array.isArray(children)) {
        return children;
      }
    }
    return undefined;
  }

  get hasChildren(): boolean {
    if (!this.children) return false;
    return true;
  }

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
    if (typeof this._isExpanded === 'boolean') {
      return this.hasChildren && this._isExpanded
    }

    return false;
  }

  @action onClickToggle(newValue?: boolean | 'mixed') {
    if (newValue) {
      this._isExpanded = newValue;
    } else {
      this._isExpanded = !this._isExpanded;
    }

    if (this.args.onClickToggle) {
      this.args.onClickToggle()
    }
  }
}
