/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class Index extends Component {
  @tracked value1 = 'my-cluster-1234';
  @tracked value2 = 'my-cluster-1234';
  @tracked value3 = 'my-cluster-1234';
  @tracked value4 = 'my-cluster-1234';
  @tracked value5 = 'my-cluster-1234';
  @tracked minLength = 30;

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
