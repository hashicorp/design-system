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
    onToggle?: (newValue?: boolean | 'mixed') => void;
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
      return HdsAdvancedTableThExpandIconValues.ChevronDown;
    } else if (this.isExpanded === 'mixed') {
      return HdsAdvancedTableThExpandIconValues.Caret;
    } else {
      return HdsAdvancedTableThExpandIconValues.ChevronRight;
    }
  }

  @action onClick() {
    if (this.args.onToggle) {
      this.args.onToggle();
    }
  }

  // todo change to observer
  private _setUpEventHandler = modifier((button: HTMLButtonElement) => {
    this._observer = new MutationObserver((mutationList) => {
      // console.log(button.getAttribute('aria-expanded')) 
      // console.log('aria-expanded changed')

      const ariaExpanded = button.getAttribute('aria-expanded');
      
      for (const mutation of mutationList) {
        if (mutation.oldValue !== ariaExpanded) {
          let newValue: boolean | 'mixed' | undefined = undefined;

          if (ariaExpanded === 'true') newValue = true;
          else if (ariaExpanded === 'false') newValue = false;
          else if (ariaExpanded === 'mixed') newValue = 'mixed';
    
          if (this.args.onToggle) {
            this.args.onToggle(newValue)
          }
        }
      }
    });

    this._observer.observe(button, {
      attributes: true,
      attributeFilter: ['aria-expanded'],
      attributeOldValue: true,
    });

    return () => {
      if (this._observer) {
        this._observer.disconnect();
      }
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
