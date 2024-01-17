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
    let { selectCheckboxAriaLabelSuffix } = this.args;
    const prefix = this.isSelected ? 'Deselect' : 'Select';
    if (selectCheckboxAriaLabelSuffix) {
      return `${prefix} row ${selectCheckboxAriaLabelSuffix}`;
    } else {
      return prefix;
    }
  }

  @action
  didInsert(checkbox) {
    let { didInsert } = this.args;
    if (typeof didInsert === 'function') {
      didInsert(checkbox, this.args.selectionKey);
    }
  }

  @action
  willDestroy() {
    super.willDestroy(...arguments);
    let { willDestroy } = this.args;
    if (typeof willDestroy === 'function') {
      willDestroy(this.args.selectionKey);
    }
  }

  @action
  onChange(event) {
    this.isSelected = event.target.checked;
    let { onChange } = this.args;
    if (typeof onChange === 'function') {
      onChange(event.target, this.args.selectionKey);
    }
  }
}
