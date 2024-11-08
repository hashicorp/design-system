/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { HdsAdvancedTableThExpandIconValues } from './types.ts';
import type { HdsAdvancedTableThSortExpandIcons } from './types.ts';
export interface HdsAdvancedTableThButtonExpandSignature {
  Args: {
    labelId?: string;
  };
  Element: HTMLButtonElement;
}

export default class HdsAdvancedTableThButtonExpand extends Component<HdsAdvancedTableThButtonExpandSignature> {
  @tracked isExpanded = false;
  // Generates a unique ID for the (hidden) "label prefix/suffix" <span> elements
  prefixLabelId = 'prefix-' + guidFor(this);
  suffixLabelId = 'suffix-' + guidFor(this);

  get icon(): HdsAdvancedTableThSortExpandIcons {
    if (this.isExpanded) {
      return HdsAdvancedTableThExpandIconValues.ChevronDown;
    } else {
      return HdsAdvancedTableThExpandIconValues.ChevronRight;
    }
  }

  // Determines the label (suffix) to use in the `aria-labelledby` attribute of the button,
  // used to indicate what will happen if the user clicks on the button
  //   get sortOrderLabel(): HdsAdvancedTableThSortOrderLabels {
  //     return this.args.sortOrder === HdsAdvancedTableThSortOrderValues.Asc
  //       ? HdsAdvancedTableThSortOrderLabelValues.Desc
  //       : HdsAdvancedTableThSortOrderLabelValues.Asc;
  //   }

  @action onClick() {
    this.isExpanded = !this.isExpanded;
  }

  get classNames(): string {
    const classes = [
      'hds-advanced-table__th-button',
      'hds-advanced-table__th-button--expand',
    ];

    // add a class based on the isExpanded state
    if (this.isExpanded) {
      classes.push(`hds-advanced-table__th-button--is-expanded`);
    }

    return classes.join(' ');
  }
}
