/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { deepTracked } from 'ember-deep-tracked';
import { tracked } from '@glimmer/tracking';

const DEFAULT_DATA = [
  {
    os: 'darwin - arm64',
    id: 1,
  },
  {
    os: 'linux - 386',
    id: 2,
  },
  {
    os: 'windows - amd64',
    id: 3,
  },
];

export default class KeyValueInputsDemoInFormController extends Controller {
  @tracked sampleData = DEFAULT_DATA;
  @deepTracked formErrors = [];

  @action onDeleteRowClick(item) {
    this.sampleData = this.sampleData.filter((data) => data.id !== item.id);
  }

  @action onAddRowClick() {
    this.sampleData = [
      ...this.sampleData,
      {
        key: '',
        value: '',
        id: this.sampleData.length + 1,
      },
    ];
  }

  @action onSubmitForm(event) {
    event.preventDefault();

    const formElement = document.getElementById('create-plugin-form');

    let hasErrors = false;

    const pluginFileInputs = formElement.querySelectorAll(
      'input[name="plugin-file"]',
    );
    pluginFileInputs.forEach((input, index) => {
      if (input.files.length === 0) {
        this.formErrors[index] = {
          ...this.formErrors[index],
          pluginFile: 'File is required',
        };
        hasErrors = true;
      } else {
        this.formErrors[index] = {
          ...this.formErrors[index],
          pluginFile: undefined,
        };
      }
    });

    if (!hasErrors) {
      const data = new FormData(formElement);
      alert('Form submitted successfully');
      console.log('Form Data:', Object.fromEntries(data.entries()));
    }
  }
}
