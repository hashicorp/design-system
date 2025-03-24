/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

export interface HdsAdvancedTableTheadSignature {
  Args: {
    hasStickyFirstColumn?: boolean;
    hasStickyHeader?: boolean;
    isStickyColumnPinned?: boolean;
    isStickyHeaderPinned?: boolean;
  };
  Blocks: {
    default?: [];
  };
  Element: HTMLDivElement;
}

export default class HdsAdvancedTableThead extends Component<HdsAdvancedTableTheadSignature> {
  get classNames(): string {
    const classes = ['hds-advanced-table__thead'];

    if (this.args.hasStickyHeader) {
      classes.push('hds-advanced-table__thead--sticky');
    }

    if (this.args.isStickyHeaderPinned) {
      classes.push('hds-advanced-table__thead--is-pinned');
    }

    if (this.args.isStickyColumnPinned) {
      classes.push('hds-advanced-table__thead--column-is-pinned');
    }

    return classes.join(' ');
  }
}
