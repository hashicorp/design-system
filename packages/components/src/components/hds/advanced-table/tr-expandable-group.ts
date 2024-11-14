/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

import type { HdsAdvancedTableHorizontalAlignment } from './types';
export interface HdsAdvancedTableTrExpandableGroupSignature {
  Args: {
    align?: HdsAdvancedTableHorizontalAlignment;
    depth?: number;
    record: Record<string, unknown>;
    parentId?: string;
    childrenKey?: string;
  };
  Blocks: {
    default?: [
      {
        data: Record<string, unknown>;
        isExpandable: boolean;
        id?: string;
        parentId?: string;
        depth: number;
        onClickToggle?: () => void;
        isExpanded?: boolean;
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class HdsAdvancedTableTrExpandableGroup extends Component<HdsAdvancedTableTrExpandableGroupSignature> {
  id = guidFor(this);

  @tracked isExpanded = false;

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

  get childrenDepth(): number {
    return this.depth + 1;
  }

  @action onClickToggle() {
    this.isExpanded = !this.isExpanded;
  }
}
