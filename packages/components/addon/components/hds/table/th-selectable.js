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

  /**
   * @param ariaLabel
   * @type {string}
   * @description Sets checkbox aria-label
   */
  get ariaLabel() {
    if (this.args.scope === 'col') {
      // header checkbox:
      if (this._checked === true) {
        return this.args.deselectAllAriaLabel ?? 'Deselect all';
      } else {
        return this.args.selectAllAriaLabel ?? 'Select all';
      }
    } else {
      // row checkbox:
      if (this._checked === true) {
        return this.args.deselectRowAriaLabel
          ? `${this.args.deselectRowAriaLabel} ${this.args.selectionKey}`
          : `Deselect ${this.args.selectionKey}`;
      } else {
        return this.args.selectRowAriaLabel
          ? `${this.args.selectRowAriaLabel} ${this.args.selectionKey}`
          : `Select ${this.args.selectionKey}`;
      }
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
