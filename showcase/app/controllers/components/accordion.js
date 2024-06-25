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

  @tracked stateAll = 'close';
  @tracked stateSingle = 'close';

  @action
  toggleStateAll() {
    if (this.stateAll === 'open') {
      this.stateAll = 'close';
    } else {
      this.stateAll = 'open';
    }
  }

  @action
  toggleStateSingle() {
    if (this.stateSingle === 'open') {
      this.stateSingle = 'close';
    } else {
      this.stateSingle = 'open';
    }
  }

  @action
  onClickToggleSingle(isOpen) {
    this.stateSingle = isOpen ? 'open' : 'close';
  }
}
