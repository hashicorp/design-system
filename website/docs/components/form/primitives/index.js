/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class Index extends Component {
  @tracked showHighlight = false;

  get SAMPLE_ERROR_MESSAGES() {
    return ['First error message', 'Second error message'];
  }
}
