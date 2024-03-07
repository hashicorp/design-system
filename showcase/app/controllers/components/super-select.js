/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class SuperSelectController extends Controller {
  @action
  noop() {}

  @action
  onInput() {
    console.log('onInput activated!');
  }

  // WIP... (doesn't appear to work yet)
  @action
  resultCountMessage(number) {
    console.log(`${number} results found`);
    return `${number} results found`;
  }
}
