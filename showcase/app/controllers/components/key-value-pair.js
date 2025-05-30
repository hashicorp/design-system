/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';

export default class KeyValuePairController extends Controller {
  get sampleData() {
    let options = ["foo", "bar", "baz"];
    return [
      {
        key: 'field1',
        field1Options: options,
        field1Value: 'foo',
        field1Error: 'Invalid value.',
        field2Value: '',
      },
      {
        key: 'field2',
        field1Options: options,
        field1Value: 'bar',
        field2Value: 'hello!',
        field2Error: 'Invalid value.',
      },
      {
        key: 'field3',
        field1Options: options,
        field1Value: '',
        field2Value: '',
      },
    ];
  }
}
