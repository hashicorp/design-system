/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class AccordionController extends Controller {
  @action
  noop() {}

  @tracked state = 'close';

  @action
  toggleState() {
    if (this.state === 'open') {
      this.state = 'close';
    } else {
      this.state = 'open';
    }
  }
}
