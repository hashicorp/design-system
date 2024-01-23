/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { tracked } from '@glimmer/tracking';

export default class HdsTableThSelectableComponent extends Component {
  @tracked isSelected = this.args.isSelected;

  /**
   * Generate a unique ID for the Checkbox
   * @return {string}
   */
  checkboxId = 'checkbox-' + guidFor(this);

  get ariaLabel() {
    let { selectionAriaLabelSuffix } = this.args;
    const prefix = this.isSelected ? 'Deselect' : 'Select';
    if (selectionAriaLabelSuffix) {
      return `${prefix} ${selectionAriaLabelSuffix}`;
    } else {
      return prefix;
    }
  }

  @action
  didInsert(checkbox) {
    let { didInsert } = this.args;
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
    let { willDestroy } = this.args;
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
    let { onSelectionChange } = this.args;
    if (typeof onSelectionChange === 'function') {
      onSelectionChange(event.target, this.args.selectionKey);
    }
  }

  updateAriaLabel(event) {
    // updating the `isSelected` value will trigger the update of the `aria-label` value via the `ariaLabel` getter
    this.isSelected = event.target.checked;
  }
}
