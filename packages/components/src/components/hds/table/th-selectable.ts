/**
 * Copyright (c) HashiCorp, Inc.
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
import type { HdsTableThArgs } from './th';
import type { HdsTableArgs } from '.';
import type { HdsTableThButtonSortArgs } from './th-button-sort';

export interface HdsTableThSelectableArgs {
  Args: {
    sortBySelectedItemKey?: HdsTableArgs['Args']['sortBySelectedItemKey'];
    didInsert: (
      checkbox: HdsFormCheckboxBaseSignature['Element'],
      selectionKey?: string
    ) => void;
    isSelected?: boolean;
    onClickSort?: HdsTableThButtonSortArgs['Args']['onClick'];
    onSelectionChange: (
      target: HdsFormCheckboxBaseSignature['Element'],
      selectionKey: string | undefined
    ) => void;
    selectionAriaLabelSuffix?: string;
    selectionKey?: string;
    selectionScope: HdsTableScope;
    sortOrder?: HdsTableThSortOrder;
    willDestroy: (selectionKey?: string) => void;
  };
  Element: HdsTableThArgs['Element'];
}

export default class HdsTableThSelectable extends Component<HdsTableThSelectableArgs> {
  @tracked isSelected = this.args.isSelected;

  guid = guidFor(this);

  checkboxId = `checkbox-${this.guid}`;
  labelId = `label-${this.guid}`;

  get ariaLabel(): string {
    const { selectionAriaLabelSuffix } = this.args;
    const prefix = this.isSelected ? 'Deselect' : 'Select';
    if (selectionAriaLabelSuffix) {
      return `${prefix} ${selectionAriaLabelSuffix}`;
    } else {
      return prefix;
    }
  }

  get ariaSort(): HdsTableThSortOrderLabels {
    switch (this.args.sortOrder) {
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
      // we need to use a custom event listener here because changing the `checked` value via JS
      // (and this happens with the "select all") doesn't trigger the `change` event
      // and consequently the `aria-label` won't be automatically updated (and so we have to force it)
      checkbox.addEventListener(
        'toggle',
        this.updateAriaLabel.bind(this),
        true
      );
    }
  }

  @action
  willDestroyNode(checkbox: HdsFormCheckboxBaseSignature['Element']): void {
    super.willDestroy();
    const { willDestroy } = this.args;
    if (typeof willDestroy === 'function') {
      willDestroy(this.args.selectionKey);
      if (checkbox) {
        checkbox.removeEventListener(
          'toggle',
          this.updateAriaLabel.bind(this),
          true
        );
      }
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

  @action
  sortBySelectedItem(): void {
    if (this.args.sortBySelectedItemKey === undefined) {
      return;
    }

    this.args.onClickSort?.(this.args.sortBySelectedItemKey);
  }

  updateAriaLabel(event: Event): void {
    // Assert event.target as HTMLInputElement to access the 'checked' property
    const target = event.target as HdsFormCheckboxBaseSignature['Element'];
    this.isSelected = target.checked;
  }
}
