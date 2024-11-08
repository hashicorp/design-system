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
    default?: [];
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
    if (this.children) return true;
    return false;
  }

  get newDepth(): number {
    const { depth = 1 } = this.args;
    return depth + 1;
  }
}
