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
      text: 'enterprise',
    },
    value: {
      text: '',
    },
  },
  {
    id: 2,
    key: {
      text: 'prod',
    },
    value: {
      text: 'This is a production tag',
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

const DYNAMIC_INPUT_EXAMPLE_DATA = [
  {
    id: 1,
    key: 'multi-line',
    value: {
      text: 'This is a multiline text that should go on multiple lines inside a textarea control',
    },
  },
  {
    id: 2,
    key: 'tags',
    value: {
      inputType: 'select',
    },
  },
  {
    id: 3,
    key: 'single-line',
    value: {
      text: 'This is a single line text',
    },
  },
];

export default class KeyValueInputsController extends Controller {
  @tracked functionalExampleData = DEFAULT_DATA;
  @tracked canAddRow = this.functionalExampleData.length < 4;
  @deepTracked functionalExampleErrors = [{ value: 'Value is required.' }];
  @deepTracked dynamicInputExampleData = DYNAMIC_INPUT_EXAMPLE_DATA;

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
  }

  @action
  onDeleteRowClick(item) {
    this.functionalExampleData = this.functionalExampleData.filter(
      (data) => data.id !== item.id,
    );
  }

  @action
  onAddRowClick() {
    this.functionalExampleData = [
      ...this.functionalExampleData,
      {
        key: '',
        value: '',
        id: this.functionalExampleData.length + 1,
      },
    ];
  }

  @action
  onDynamicExampleDeleteRowClick(item) {
    this.dynamicInputExampleData = this.dynamicInputExampleData.filter(
      (data) => data.id !== item.id,
    );
  }

  @action
  onDynamicExampleAddRowClick() {
    this.dynamicInputExampleData = [
      ...this.dynamicInputExampleData,
      {
        key: 'tag',
        value: {
          inputType: 'select',
        },
        id: this.dynamicInputExampleData.length + 1,
      },
    ];
  }

  @action
  onDynamicInputChange(item, event) {
    const newKey = event.target.value;

    const itemIndex = this.dynamicInputExampleData.findIndex(
      (data) => data.id === item.id,
    );

    if (itemIndex !== -1) {
      const newInputType = newKey === 'tag' ? 'select' : 'textarea';

      const newData = [...this.dynamicInputExampleData];
      newData[itemIndex] = {
        key: newKey.toLowerCase(),
        value: { inputType: newInputType },
      };

      this.dynamicInputExampleData = newData;
    }
  }
}
