/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { deepTracked } from 'ember-deep-tracked';

const DEFAULT_DATA = [
  {
    id: 1,
    key: {
      text: 'prod',
    },
    value: {
      text: 'This is a production tag',
    },
  },
  {
    id: 2,
    key: {
      text: 'enterprise',
    },
    value: {
      text: '',
    },
  },
  {
    id: 3,
    key: {
      text: 'beta',
    },
    value: {
      text: 'Feature includes beta',
    },
  },
];

export default class KeyValueInputsController extends Controller {
  @tracked functionalExampleData = DEFAULT_DATA;
  @tracked canAddRow = this.functionalExampleData.length < 4;
  @deepTracked functionalExampleErrors = [];

  emptyData = [];
  sampleDataWith1Row = DEFAULT_DATA.slice(0, 1);
  sampleData = DEFAULT_DATA;

  @action onInputBlur(item, inputType, event) {
    const value = event.target.value;

    if (value === undefined || value === '') {
      const itemWithErrorIndex = this.functionalExampleData.findIndex(
        (data) => data.id === item.id,
      );

      this.functionalExampleErrors[itemWithErrorIndex] = {
        ...this.functionalExampleErrors[itemWithErrorIndex],
        [inputType]: `${inputType} is required.`,
      };
    } else {
      const itemWithErrorIndex = this.functionalExampleData.findIndex(
        (data) => data.id === item.id,
      );

      this.functionalExampleErrors[itemWithErrorIndex] = {
        ...this.functionalExampleErrors[itemWithErrorIndex],
        [inputType]: undefined,
      };
    }

    console.log();
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
