/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { action } from '@ember/object';
import { HdsAdvancedTableThExpandIconValues } from './types.ts';
import type { HdsAdvancedTableThSortExpandIcons } from './types.ts';
export interface HdsAdvancedTableThButtonExpandSignature {
  Args: {
    labelId?: string;
    isExpanded?: boolean;
    onToggle?: () => void;
  };
  Element: HTMLButtonElement;
}

export default class HdsAdvancedTableThButtonExpand extends Component<HdsAdvancedTableThButtonExpandSignature> {
  // @tracked isExpanded = false;
  // Generates a unique ID for the (hidden) "label prefix" <span> element
  prefixLabelId = 'prefix-' + guidFor(this);

  get icon(): HdsAdvancedTableThSortExpandIcons {
    if (this.args.isExpanded) {
      return HdsAdvancedTableThExpandIconValues.ChevronDown;
    } else {
      return HdsAdvancedTableThExpandIconValues.ChevronRight;
    }
  }

  @action onClick() {
    // this.isExpanded = !this.isExpanded;
    if (this.args.onToggle) {
      this.args.onToggle();
    }
  }

  get classNames(): string {
    const classes = [
      'hds-advanced-table__th-button',
      'hds-advanced-table__th-button--expand',
    ];

    // add a class based on the isExpanded state
    if (this.args.isExpanded) {
      classes.push(`hds-advanced-table__th-button--is-expanded`);
    }

    return classes.join(' ');
  }
}
