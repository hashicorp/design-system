/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { action } from '@ember/object';
import {modifier} from 'ember-modifier';

import { HdsAdvancedTableThExpandIconValues } from './types.ts';
import type { HdsAdvancedTableThSortExpandIcons } from './types.ts';
export interface HdsAdvancedTableThButtonExpandSignature {
  Args: {
    labelId?: string;
    isExpanded?: boolean | 'mixed';
    onToggle?: () => void;
  };
  Element: HTMLButtonElement;
}

export default class HdsAdvancedTableThButtonExpand extends Component<HdsAdvancedTableThButtonExpandSignature> {
  // Generates a unique ID for the (hidden) "label prefix" <span> element
  private _prefixLabelId = 'prefix-' + guidFor(this);

  get isExpanded(): boolean | 'mixed' {
    const { isExpanded = false } = this.args;

    return isExpanded;
  }

  get icon(): HdsAdvancedTableThSortExpandIcons {
    if (this.isExpanded === true) {
      return HdsAdvancedTableThExpandIconValues.ChevronDown;
    } else if (this.isExpanded === 'mixed') {
      return HdsAdvancedTableThExpandIconValues.Caret;
    } else {
      return HdsAdvancedTableThExpandIconValues.ChevronRight;
    }
  }

  @action onClick() {
    // console.log('expand button click')
    if (this.args.onToggle) {
      this.args.onToggle();
    }
  }

  // private _setUpEventHandler = modifier((button: HTMLButtonElement) => {
  //   button.addEventListener(
  //     'toggle',
  //     this.onClick.bind(this),
  //     true
  //   );

  //   return () => {
  //     button.removeEventListener(
  //       'toggle',
  //       this.onClick.bind(this),
  //       true
  //     );
  //   };
  // });

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
