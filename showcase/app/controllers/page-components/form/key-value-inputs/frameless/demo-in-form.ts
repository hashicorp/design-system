/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';
import type Owner from '@ember/owner';
import { TrackedArray, TrackedObject } from 'tracked-built-ins';

type PluginBinaryData = {
  os: string;
  id: number;
  validationMessage?: string;
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

export default class PageComponentsFramelessFormKeyValueInputsDemoInFormController extends Controller {
  sampleData = new TrackedArray<PluginBinaryData>([]);

  constructor(owner: Owner) {
    super(owner);
    DEFAULT_DATA.forEach((item) =>
      this.sampleData.push(new TrackedObject(item)),
    );
  }

  @action
  onDeleteRowClick(_item: unknown, rowIndex: number) {
    if (rowIndex < 0 || rowIndex >= this.sampleData.length) {
      console.error(
        'Trying to delete a row with index out of boundaries of the `@data` array',
      );
    } else {
      // Remove the item at the specific index
      this.sampleData.splice(rowIndex, 1);
    }
  }

  @action
  onAddRowClick() {
    this.sampleData.push(
      new TrackedObject({
        os: '',
        id: this.sampleData.length + 1,
      }),
    );
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
      const dataFromSampleData = this.sampleData[index];

      if (dataFromSampleData !== undefined) {
        if (inputHtmlElement.files?.length === 0) {
          dataFromSampleData.validationMessage = 'File is required';
          hasErrors = true;
        } else {
          dataFromSampleData.validationMessage = undefined;
        }
      }
    });

    if (!hasErrors && formElement) {
      const data = new FormData(formElement);
      alert('Form submitted successfully');
      console.log('Form Data:', Object.fromEntries(data.entries()));
    }
  }
}
