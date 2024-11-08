/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
// import type { ComponentLike } from '@glint/template';

import type {
  HdsAdvancedTableHorizontalAlignment,
  //   HdsAdvancedTableModel,
} from './types';
// import type { HdsAdvancedTableTdSignature } from './td.ts';
// import type { HdsAdvancedTableThSignature } from './th.ts';
// import type { HdsAdvancedTableTrSignature } from './tr.ts';

export interface HdsAdvancedTableTrExpandableGroupSignature {
  Args: {
    align?: HdsAdvancedTableHorizontalAlignment;
    //   caption?: string;
    //   columns: HdsAdvancedTableColumn[];
    //   density?: HdsAdvancedTableDensities;
    //   identityKey?: string;
    //   isSelectable?: boolean;
    record: Record<string, unknown>;
    //   onSelectionChange?: (
    //     selection: HdsAdvancedTableOnSelectionChangeSignature
    //   ) => void;
    //   onSort?: (sortBy: string, sortOrder: HdsAdvancedTableThSortOrder) => void;
    //   selectionAriaLabelSuffix?: string;
    //   sortBy?: string;
    //   selectableColumnKey?: string;
    //   sortedMessageText?: string;
    //   sortOrder?: HdsAdvancedTableThSortOrder;
    //   valign?: HdsAdvancedTableVerticalAlignment;
    //   hasNestedRows?: boolean;
  };
  Blocks: {
    default?: [];
    // body?: [
    //   {
    //     Td?: ComponentLike<HdsAdvancedTableTdSignature>;
    //     Tr?: ComponentLike<HdsAdvancedTableTrSignature>;
    //     Th?: ComponentLike<HdsAdvancedTableThSignature>;
    //     data?: Record<string, unknown>;
    //     // sortBy?: string;
    //     // sortOrder?: HdsAdvancedTableThSortOrder;
    //   },
    // ];
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
}
