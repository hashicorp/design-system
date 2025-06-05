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
  @tracked functionalExampleData = DEFAULT_DATA;
  @tracked canAddRow = this.functionalExampleData.length < 4;

  emptyData = [];
  sampleDataWith1Row = DEFAULT_DATA.slice(0, 1);
  sampleData = DEFAULT_DATA;

  @action onKeyInputBlur(item, event) {
    const value = event.target.value;

    if (value === undefined || value === '') {
      const newData = this.functionalExampleData.map((data) => {
        if (item.id === data.id) {
          return { ...data, key: value, error: 'Key is required.' };
        }
        return data;
      });

      this.functionalExampleData = newData;
    } else {
      const newData = this.functionalExampleData.map((data) => {
        if (item.id === data.id) {
          return { ...data, key: value, error: undefined };
        }
        return data;
      });

      this.functionalExampleData = newData;
    }
  }

  @action onDeleteRowClick(item) {
    this.functionalExampleData = this.functionalExampleData.filter(
      (data) => data.id !== item.id,
    );
  }

  @action onAddRowClick() {
    this.functionalExampleData = [
      ...this.functionalExampleData,
      {
        key: '',
        value: '',
        id: this.functionalExampleData.length + 1,
      },
    ];
  }
}
