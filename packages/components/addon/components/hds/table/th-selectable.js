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
  onChange(event) {
    let { onChange } = this.args;
    if (typeof onChange === 'function') {
      onChange(event.target);
    }
  }
}
