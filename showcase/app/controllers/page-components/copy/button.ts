/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';

import type { PageComponentsCopyButtonModel } from 'showcase/routes/page-components/copy/button';

export default class PageComponentsCopySnippetController extends Controller {
  declare model: PageComponentsCopyButtonModel;

  get targetNodeElement() {
    const element = document.querySelector('#test-target-node-element');
    if (!element) {
      return undefined;
    }

    return element as HTMLElement;
  }

  get bigint() {
    return BigInt(12345678910);
  }

  get maskedInputVariantToLabelMap() {
    return {
      'masked-input-base': 'With MaskedInput::Base',
      'masked-input-base-form-field': 'With Form::Field + MaskedInput::Base',
      'masked-input-field': 'With MaskedInput::Field',
    };
  }
}
