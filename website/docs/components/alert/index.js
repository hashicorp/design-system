/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class Index extends Component {
  @action
  noop() {
    //
  }

  @action
  yourOnClickFunction() {
    console.log('Clicked the button in the "alert"!');
  }
}
