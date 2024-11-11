/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';

import type { HdsAdvancedTableHorizontalAlignment } from './types';
export interface HdsAdvancedTableTrExpandableGroupSignature {
  Args: {
    align?: HdsAdvancedTableHorizontalAlignment;
    depth?: number;
    record: Record<string, unknown>;
  };
  Blocks: {
    default?: [
      {
        data: Record<string, unknown>;
        isExpandable: boolean;
      },
    ];
  };
  Element: HTMLTableElement;
}

export default class HdsAdvancedTableTrExpandableGroup extends Component<HdsAdvancedTableTrExpandableGroupSignature> {
  get children(): Array<Record<string, unknown>> | undefined {
    const { record } = this.args;

    if (record['children'] && Array.isArray(record['children'])) {
      return record['children'];
    }
    return undefined;
  }

  get hasChildren(): boolean {
    if (!this.children) return false;
    return true;
  }

  get hasVisibleChildren(): boolean {
    if (!this.children) return false;

    // const test = this.element.querySelector(
    //   '.hds-advanced-table__th-button--expand'
    // );

    // console.log(test);

    return true;
  }

  get newDepth(): number {
    const { depth = 1 } = this.args;
    return depth + 1;
  }
}
