/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

import type { PageComponentsAccordionModel } from 'showcase/routes/page-components/accordion';

type AccordionState = 'open' | 'close';

export default class PageComponentsAccordionController extends Controller {
  declare model: PageComponentsAccordionModel;

  @action
  noop() {}

  @tracked stateAll: AccordionState = 'close';
  @tracked stateSingle: AccordionState = 'close';

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
  onClickToggleSingle() {
    this.stateSingle = this.stateSingle === 'open' ? 'close' : 'open';
  }
}
