/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { action } from '@ember/object';

import {
  HdsAdvancedTableThExpandIconValues,
  type HdsAdvancedTableExpandState,
} from './types.ts';
import type { HdsAdvancedTableThSortExpandIcons } from './types.ts';
export interface HdsAdvancedTableThButtonExpandSignature {
  Args: {
    labelId?: string;
    isExpanded?: HdsAdvancedTableExpandState;
    onToggle?: (newValue?: HdsAdvancedTableExpandState) => void;
    isExpandAll?: boolean;
  };
  Element: HTMLButtonElement;
}

export default class HdsAdvancedTableThButtonExpand extends Component<HdsAdvancedTableThButtonExpandSignature> {
  // Generates a unique ID for the (hidden) "label prefix" <span> element
  private _prefixLabelId = 'prefix-' + guidFor(this);

  get isExpanded(): HdsAdvancedTableExpandState {
    const { isExpanded = false } = this.args;

    return isExpanded;
  }

  get icon(): HdsAdvancedTableThSortExpandIcons {
    if (this.isExpanded === true) {
      return this.args.isExpandAll
        ? HdsAdvancedTableThExpandIconValues.UnfoldClose
        : HdsAdvancedTableThExpandIconValues.ChevronUp;
    } else if (this.isExpanded === 'mixed' && this.args.isExpandAll) {
      return HdsAdvancedTableThExpandIconValues.UnfoldOpen;
    } else {
      return this.args.isExpandAll
        ? HdsAdvancedTableThExpandIconValues.UnfoldOpen
        : HdsAdvancedTableThExpandIconValues.ChevronDown;
    }
  }

  @action onClick() {
    this.args.onToggle?.();
  }

  get classNames(): string {
    const classes = [
      'hds-advanced-table__th-button',
      'hds-advanced-table__th-button--expand',
    ];

    // add a class based on the isExpanded state
    if (this.args.isExpanded === true) {
      classes.push(`hds-advanced-table__th-button--is-expanded`);
    }

    if (this.args.isExpanded === 'mixed') {
      classes.push(`hds-advanced-table__th-button--is-mixed`);
    }

    return classes.join(' ');
  }
}
