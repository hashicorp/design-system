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


export default class KeyValueInputsController extends Controller {
  @tracked showHighlight = false;

  emptyData = [];
  sampleData = DEFAULT_DATA;

  @action
  toggleHighlight() {
    this.showHighlight = !this.showHighlight;
  }
}
