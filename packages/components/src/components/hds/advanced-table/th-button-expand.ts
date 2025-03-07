/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { action } from '@ember/object';
import { modifier } from 'ember-modifier';

import { HdsAdvancedTableThExpandIconValues, type HdsAdvancedTableExpandState } from './types.ts';
import type { HdsAdvancedTableThSortExpandIcons } from './types.ts';
export interface HdsAdvancedTableThButtonExpandSignature {
  Args: {
    labelId?: string;
    isExpanded?: boolean | 'mixed';
    onToggle?: (newValue?: HdsAdvancedTableExpandState) => void;
    isExpandAll?: boolean;
  };
  Element: HTMLButtonElement;
}

export default class HdsAdvancedTableThButtonExpand extends Component<HdsAdvancedTableThButtonExpandSignature> {
  // Generates a unique ID for the (hidden) "label prefix" <span> element
  private _prefixLabelId = 'prefix-' + guidFor(this);
  _observer: MutationObserver | undefined = undefined;

  get isExpanded(): boolean | 'mixed' {
    const { isExpanded = false } = this.args;

    return isExpanded;
  }

  get icon(): HdsAdvancedTableThSortExpandIcons {
    if (this.isExpanded === true) {
      return this.args.isExpandAll
        ? HdsAdvancedTableThExpandIconValues.UnfoldClose
        : HdsAdvancedTableThExpandIconValues.ChevronDown;
    } else if (this.isExpanded === 'mixed' && this.args.isExpandAll) {
      return HdsAdvancedTableThExpandIconValues.UnfoldOpen;
    } else {
      return this.args.isExpandAll
        ? HdsAdvancedTableThExpandIconValues.UnfoldOpen
        : HdsAdvancedTableThExpandIconValues.ChevronRight;
    }
  }

  @action onClick() {
    if (this.args.onToggle) {
      this.args.onToggle();
    }
  }

  updateButton(event: Event) {
    const target = event.target as HTMLButtonElement;
    const ariaExpanded = target.getAttribute('aria-expanded');
    let newValue: boolean | 'mixed' | undefined = undefined;

    if (ariaExpanded === 'true') newValue = true;
    else if (ariaExpanded === 'false') newValue = false;
    else if (ariaExpanded === 'mixed') newValue = 'mixed';

    if (this.args.onToggle) {
      this.args.onToggle(newValue);
    }
  }

  private _setUpEventHandler = modifier((button: HTMLButtonElement) => {
    button.addEventListener('toggle', this.updateButton.bind(this), true);

    return () => {
      button.removeEventListener('toggle', this.updateButton.bind(this), true);
    };
  });

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
