/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { tracked } from '@glimmer/tracking';
import {
  HdsThSelectableRow,
  HdsThSelectableRowState,
  HdsThSelectionChangeInfo,
  HdsThSelectableRowAriaLabelSuffixValues,
} from './types';
export interface ThSelectableSignature {
  Args: {
    didInsert: unknown;
    isSelected: boolean;
    onSelectionChange: unknown;
    selectionAriaLabelSuffix: HdsThSelectableRowAriaLabelSuffixValues;
    selectionKey: string;
    selectionScope: unknown;
    willDestroy: unknown;
  };
  Element: HTMLElement;
}

export default class ThSelectableComponent extends Component<ThSelectableSignature> {
  @tracked isSelected = this.args.isSelected;

  /**
   * Generate a unique ID for the Checkbox
   * @return {string}
   */
  checkboxId = 'checkbox-' + guidFor(this);

  get ariaLabel() {
    const { selectionAriaLabelSuffix } = this.args;
    const prefix = this.isSelected
      ? HdsThSelectableRowAriaLabelSuffixValues.Deselect
      : HdsThSelectableRowAriaLabelSuffixValues.Select;
    if (selectionAriaLabelSuffix) {
      return `${prefix} ${selectionAriaLabelSuffix}`;
    } else {
      return prefix;
    }
  }

  @action
  didInsert(checkbox) {
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
  willDestroy(checkbox) {
    super.willDestroy(...arguments);
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
  onSelectionChange(event) {
    this.isSelected = event.target.checked;
    const { onSelectionChange } = this.args;
    if (typeof onSelectionChange === 'function') {
      onSelectionChange(event.target, this.args.selectionKey);
    }
  }

  updateAriaLabel(event) {
    // updating the `isSelected` value will trigger the update of the `aria-label` value via the `ariaLabel` getter
    this.isSelected = event.target.checked;
  }
}
