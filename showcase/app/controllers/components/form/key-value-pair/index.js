/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

const DEFAULT_DATA = [
  {
    id: 1,
    key: 'prod',
    value: 'This is a production tag',
  },
  {
    id: 2,
    key: 'enterprise',
    value: '',
  },
  {
    id: 3,
    key: 'beta',
    value: 'Feature includes beta',
  },
];

export default class KeyValuePairController extends Controller {
  @tracked sampleData = DEFAULT_DATA;
  @tracked canAddRow = this.sampleData.length < 4;

  emptyData = [];
  sampleDataWith1Row = DEFAULT_DATA.slice(0, 1);

  @action onDeleteRowClick(item) {
    console.log('onDeleteRowClick', item);
    // this.sampleData = this.sampleData.filter((data) => data !== item);
  }

  @action onAddRowClick() {
    console.log('onAddRowClick');
    this.sampleData.push({
      key: '',
      value: '',
      id: this.sampleData.length + 1,
    });
  }
}
