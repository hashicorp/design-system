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
    hasExpandableRows?: boolean;
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
  Element: HTMLTableElement;
}

export default class HdsAdvancedTableTrExpandableGroup extends Component<HdsAdvancedTableTrExpandableGroupSignature> {
  parentRowHeaderId = 'parent-row-header-' + guidFor(this);

  @tracked isExpanded = false;

  get children(): Array<Record<string, unknown>> | undefined {
    const { record } = this.args;

    if (record['children'] && Array.isArray(record['children'])) {
      return record['children'];
    }
    return undefined;
  }

  get hasChildren(): boolean {
    const { hasExpandableRows = true } = this.args;

    if (!this.children || !hasExpandableRows) return false;
    return true;
  }

  get newDepth(): number {
    const { depth = 1 } = this.args;
    return depth + 1;
  }

  get classes(): string {
    const { hasExpandableRows = true } = this.args;

    const classes = ['hds-advanced-table__tr-expandable-group'];

    if (!this.isExpanded && hasExpandableRows) {
      classes.push('hds-advanced-table__tr-expandable-group--hidden');
    }

    return classes.join(' ');
  }

  @action onClickToggle() {
    this.isExpanded = !this.isExpanded;
  }
}
