/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

const DEFAULT_DATA = [
  {
    key: 'prod',
    value: 'This is a production tag',
    error: 'This is an error message',
  },
  {
    key: 'enterprise',
    value: '',
  },
  {
    key: 'beta',
    value: 'Feature includes beta',
    error: 'This is an error message',
  },
];

export default class KeyValuePairController extends Controller {
  @tracked sampleData = DEFAULT_DATA;

  @action onDeleteRowClick(index) {
    this.sampleData = this.sampleData.filter((_, i) => i !== index);
  }
}
