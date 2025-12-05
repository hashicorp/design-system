/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class Index extends Component {
  @tracked value1 = 'This is my description';
  @tracked value2 = 'This is my description';
  @tracked value3 = 'This is my description';
  @tracked value4 = 'This is my description';
  @tracked value5 = 'This is my description';
  @tracked minLength = 100;

  get fieldIsInvalid() {
    return this.value5.length && this.value5.length < this.minLength;
  }

  @action
  yourOnBlurFunction() {
    console.log('Invoked "yourOnBlurFunction"');
  }

  @action updateValue(propName, event) {
    this[propName] = event.target.value;
  }
}
