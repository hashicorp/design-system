/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class Index extends Component {
  @tracked showHighlight = false;
  @tracked value1 = '';
  @tracked value2 = '';
  @tracked value3 = '';
  @tracked value4 = '';
  @tracked value5 = '';

  get SAMPLE_ERROR_MESSAGES() {
    return ['First error message', 'Second error message'];
  }

  @action updateValue(propName, event) {
    this[propName] = event.target.value;
  }
}
