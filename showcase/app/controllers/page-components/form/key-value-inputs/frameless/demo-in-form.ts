/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { deepTracked } from 'ember-deep-tracked';
import { tracked } from '@glimmer/tracking';

type BinaryData = {
  os: string;
  id: number;
};

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

export default class PageComponentsFormKeyValueInputsDemoInFormController extends Controller {
  @tracked sampleData = DEFAULT_DATA;
  @deepTracked formErrors: { pluginFile?: string }[] = [];

  @action
  onDeleteRowClick(item: unknown) {
    this.sampleData = this.sampleData.filter(
      (data) => data.id !== (item as BinaryData).id,
    );
  }

  @action
  onAddRowClick() {
    this.sampleData = [
      ...this.sampleData,
      {
        os: '',
        id: this.sampleData.length + 1,
      },
    ];
  }

  @action
  onSubmitForm(event: Event) {
    event.preventDefault();

    const formElement = document.getElementById(
      'create-plugin-form',
    ) as HTMLFormElement;

    let hasErrors = false;

    const pluginFileInputs = formElement.querySelectorAll(
      'input[name="plugin-file"]',
    );
    pluginFileInputs.forEach((input, index) => {
      const inputHtmlElement = input as HTMLInputElement;

      if (inputHtmlElement.files?.length === 0) {
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

    if (!hasErrors && formElement) {
      const data = new FormData(formElement);
      alert('Form submitted successfully');
      console.log('Form Data:', Object.fromEntries(data.entries()));
    }
  }
}
