/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class BaseElementsController extends Controller {
  @tracked showHighlight = false;
  @tracked value1 = '';
  @tracked value2 = 'cl';
  @tracked value3 = '';
  @tracked value4 = 'cluster';
  @tracked value5 = 'cluster-length-is-longer-';
  @tracked value6 = 'cluster-length-is-longer-than';
  @tracked value7 = '';
  @tracked value8 = 'c';
  @tracked value9 = 'clu';
  @tracked value10 = '';
  @tracked value11 = 'c';
  @tracked value12 = 'cluster';
  @tracked value13 = 'cluster-length-is-longer-than';
  @tracked value14 = 'Lorem ipsum dolor';

  @action
  toggleHighlight() {
    this.showHighlight = !this.showHighlight;
  }

  @action updateValue(propName, event) {
    this[propName] = event.target.value;
  }
}
