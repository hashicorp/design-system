/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';

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

export default class KeyValueInputsDemoResponsivenessController extends Controller {
  sampleData = DEFAULT_DATA;
}
