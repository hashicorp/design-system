/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';

export default class HdsTableThSelectableComponent extends Component {
  /**
   * Generate a unique ID for the Checkbox
   * @return {string}
   */
  checkboxId = 'checkbox-' + guidFor(this);

  @action
  didInsert(checkbox) {
    let { didInsert } = this.args;
    if (typeof didInsert === 'function') {
      didInsert(checkbox);
    }
  }

  @action
  willDestroy(checkbox) {
    super.willDestroy(...arguments);
    let { willDestroy } = this.args;
    if (typeof willDestroy === 'function') {
      willDestroy(checkbox);
    }
  }

  @action
  onChange(event) {
    let { onChange } = this.args;
    if (typeof onChange === 'function') {
      onChange(event.target);
    }
  }
}
