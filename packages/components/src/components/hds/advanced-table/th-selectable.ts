/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { tracked } from '@glimmer/tracking';
import { modifier } from 'ember-modifier';

import {
  HdsAdvancedTableThSortOrderValues,
  HdsAdvancedTableThSortOrderLabelValues,
} from './types.ts';
import type { HdsFormCheckboxBaseSignature } from '../form/checkbox/base';
import type {
  HdsAdvancedTableScope,
  HdsAdvancedTableThSortOrder,
  HdsAdvancedTableThSortOrderLabels,
} from './types.ts';
import type { HdsAdvancedTableThSignature } from './th.ts';

export interface HdsAdvancedTableThSelectableSignature {
  Args: {
    didInsert?: (
      checkbox: HdsFormCheckboxBaseSignature['Element'],
      selectionKey?: string
    ) => void;
    isSelected?: boolean;
    onClickSortBySelected?: () => void;
    onSelectionChange?: (
      target: HdsFormCheckboxBaseSignature['Element'],
      selectionKey: string | undefined
    ) => void;
    selectionAriaLabelSuffix?: string;
    selectionKey?: string;
    selectionScope?: HdsAdvancedTableScope;
    sortBySelectedOrder?: HdsAdvancedTableThSortOrder;
    willDestroy?: (selectionKey?: string) => void;
    isStickyColumn?: boolean;
    isStickyColumnPinned?: boolean;
  };
  Element: HdsAdvancedTableThSignature['Element'];
}

export default class HdsAdvancedTableThSelectable extends Component<HdsAdvancedTableThSelectableSignature> {
  @tracked private _isSelected = this.args.isSelected ?? false;

  private _guid = guidFor(this);
  private _checkboxId = `checkbox-${this._guid}`;
  private _labelId = `label-${this._guid}`;

  get isSortable(): boolean {
    return this.args.onClickSortBySelected !== undefined;
  }

  get ariaLabel(): string {
    const { selectionAriaLabelSuffix = 'row' } = this.args;
    return `Select ${selectionAriaLabelSuffix}`;
  }

  get ariaSort(): HdsAdvancedTableThSortOrderLabels | undefined {
    switch (this.args.sortBySelectedOrder) {
      case HdsAdvancedTableThSortOrderValues.Asc:
        return HdsAdvancedTableThSortOrderLabelValues.Asc;
      case HdsAdvancedTableThSortOrderValues.Desc:
        return HdsAdvancedTableThSortOrderLabelValues.Desc;
      default:
        // none is the default per the spec.
        return HdsAdvancedTableThSortOrderLabelValues.None;
    }
  }

  private _manageCheckbox = modifier(
    (checkbox: HdsFormCheckboxBaseSignature['Element']) => {
      const { didInsert, willDestroy } = this.args;
      if (typeof didInsert === 'function') {
        didInsert(checkbox, this.args.selectionKey);
      }

      return () => {
        if (typeof willDestroy === 'function') {
          willDestroy(this.args.selectionKey);
        }
      };
    }
  );

  @action
  onSelectionChange(event: Event): void {
    // Assert event.target as HdsFormCheckboxBaseSignature['Element'] to access the 'checked' property
    const target = event.target as HdsFormCheckboxBaseSignature['Element'];
    this._isSelected = target.checked;
    const { onSelectionChange } = this.args;
    if (typeof onSelectionChange === 'function') {
      onSelectionChange(target, this.args.selectionKey);
    }
  }
}
