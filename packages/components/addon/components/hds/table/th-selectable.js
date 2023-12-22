/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { tracked } from '@glimmer/tracking';

export default class HdsTableThSelectableComponent extends Component {
  @tracked _checked = this.checked;

  /**
   * Generate a unique ID for the Checkbox
   * @return {string}
   */
  checkboxId = 'checkbox-' + guidFor(this);

  get ariaLabel() {
    if (this.args.scope === 'col') {
      if (this._checked === true) {
        return 'deselect all';
      } else {
        return 'select all';
      }
    } else {
      return `Select ${this.args.selectionKey}`;
    }
  }

  @action
  didInsert() {
    let { didInsert } = this.args;
    if (typeof didInsert === 'function') {
      didInsert(this.args.selectionKey);
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
    this._checked = event.target.checked;
    let { onChange } = this.args;
    if (typeof onChange === 'function') {
      if (this.args.scope === 'col') {
        onChange(event.target);
      } else {
        onChange(this.args.selectionKey);
      }
    }
  }
}
