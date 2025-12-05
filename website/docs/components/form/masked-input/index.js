/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class Index extends Component {
  @tracked value1 = '036215df4996ca649928d8864b4df9e42cba0d';
  @tracked value2 = '036215df4996ca649928d8864b4df9e42cba0d';
  @tracked value3 = '036215df4996ca649928d8864b4df9e42cba0d';
  @tracked value4 = '036215df4996ca649928d8864b4df9e42cba0d';
  @tracked value5 = '036215df4996ca649928d8864b4df9e42cba0d';
  @tracked minLength = 40;

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
