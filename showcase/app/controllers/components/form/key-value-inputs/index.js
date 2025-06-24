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
    key: 'textarea',
    value: {
      text: 'This is a multiline text that should go on multiple lines inside a textarea control',
    },
  },
  {
    id: 2,
    key: 'select',
    value: {},
  },
  {
    id: 3,
    key: 'textinput',
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
  @deepTracked startWithEmptyExampleData = [];

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
      const newData = [...this.dynamicInputExampleData];
      newData[itemIndex] = {
        key: newKey,
      };

      this.dynamicInputExampleData = newData;
    }
  }

  @action
  onStartWithEmptyDeleteRowClick(item) {
    // if press delete on the first row, we want to reset the inputs to empty
    if (item === undefined) {
      const keyValueInputs = document.getElementById(
        'start-with-empty-example',
      );

      const nameInput = keyValueInputs.querySelector(
        ".hds-form-key-value-inputs__row--first input[name='key']",
      );
      const valueInput = keyValueInputs.querySelector(
        ".hds-form-key-value-inputs__row--first input[name='value']",
      );

      nameInput.value = '';
      valueInput.value = '';
    }

    console.log('onStartWithEmptyDeleteRowClick', item);
    console.log('startWithEmptyExampleData', this.startWithEmptyExampleData);

    this.startWithEmptyExampleData = this.startWithEmptyExampleData.filter(
      (data) => data.id !== item.id,
    );
  }

  @action
  onStartWithEmptyAddRowClick() {
    if (this.startWithEmptyExampleData.length === 0) {
      const keyValueInputs = document.getElementById(
        'start-with-empty-example',
      );

      const nameInput = keyValueInputs.querySelector(
        ".hds-form-key-value-inputs__row--first input[name='key']",
      );
      const valueInput = keyValueInputs.querySelector(
        ".hds-form-key-value-inputs__row--first input[name='value']",
      );

      // when going from empty to one row, we want to save the values from the row that is rendered and add a new one. otherwise, the data in the initial row is overwritten
      this.startWithEmptyExampleData = [
        {
          key: nameInput ? nameInput.value : '',
          value: valueInput ? valueInput.value : '',
          id: 1,
        },
        {
          key: '',
          value: '',
          id: 2,
        },
      ];
    } else {
      this.startWithEmptyExampleData = [
        ...this.startWithEmptyExampleData,
        {
          key: '',
          value: '',
          id: this.startWithEmptyExampleData.length + 1,
        },
      ];
    }
  }
}
