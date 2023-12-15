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
  onChange() {
    console.log('onChange called!');

    let { onChange } = this.args;

    if (typeof onChange === 'function') {
      onChange();
    }
  }

  @action
  didInsert(element) {
    const dataScope = element.getAttribute('data-scope');

    if (dataScope === 'row') {
      let { didInsert } = this.args;
      if (typeof didInsert === 'function') {
        didInsert(element.id);
      }
    }
  }
}
