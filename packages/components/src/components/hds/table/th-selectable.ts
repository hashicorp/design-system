/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { tracked } from '@glimmer/tracking';
import {
  HdsTableThSortOrderValues,
  HdsTableThSortOrderLabelValues,
} from './types.ts';
import type { HdsFormCheckboxBaseSignature } from '../form/checkbox/base';
import type {
  HdsTableScope,
  HdsTableThSortOrder,
  HdsTableThSortOrderLabels,
} from './types';
import type { HdsTableThSignature } from './th';
import type Owner from '@ember/owner';

export interface HdsTableThSelectableSignature {
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
    selectionScope?: HdsTableScope;
    sortBySelectedOrder?: HdsTableThSortOrder;
    willDestroy?: (selectionKey?: string) => void;
  };
  Element: HdsTableThSignature['Element'];
}

export default class HdsTableThSelectable extends Component<HdsTableThSelectableSignature> {
  @tracked isSelected: boolean;
  private _guid = guidFor(this);

  private _checkboxId = `checkbox-${this._guid}`;
  private _labelId = `label-${this._guid}`;

  constructor(owner: Owner, args: HdsTableThSelectableSignature['Args']) {
    super(owner, args);
    this.isSelected = this.args.isSelected ?? false;
  }

  get isSortable(): boolean {
    return this.args.onClickSortBySelected !== undefined;
  }

  get ariaLabel(): string {
    const { selectionAriaLabelSuffix = 'row' } = this.args;
    return `Select ${selectionAriaLabelSuffix}`;
  }

  get ariaSort(): HdsTableThSortOrderLabels | undefined {
    switch (this.args.sortBySelectedOrder) {
      case HdsTableThSortOrderValues.Asc:
        return HdsTableThSortOrderLabelValues.Asc;
      case HdsTableThSortOrderValues.Desc:
        return HdsTableThSortOrderLabelValues.Desc;
      default:
        // none is the default per the spec.
        return HdsTableThSortOrderLabelValues.None;
    }
  }

  @action
  didInsert(checkbox: HdsFormCheckboxBaseSignature['Element']): void {
    const { didInsert } = this.args;
    if (typeof didInsert === 'function') {
      didInsert(checkbox, this.args.selectionKey);
    }
  }

  @action
  willDestroyNode(): void {
    super.willDestroy();
    const { willDestroy } = this.args;
    if (typeof willDestroy === 'function') {
      willDestroy(this.args.selectionKey);
    }
  }

  @action
  onSelectionChange(event: Event): void {
    // Assert event.target as HdsFormCheckboxBaseSignature['Element'] to access the 'checked' property
    const target = event.target as HdsFormCheckboxBaseSignature['Element'];
    this.isSelected = target.checked;
    const { onSelectionChange } = this.args;
    if (typeof onSelectionChange === 'function') {
      onSelectionChange(target, this.args.selectionKey);
    }
  }
}
