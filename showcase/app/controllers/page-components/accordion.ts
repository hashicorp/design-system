/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

import type { HdsAccordionForceStates } from '@hashicorp/design-system-components/components/hds/accordion/types';

import type { PageComponentsAccordionModel } from 'showcase/routes/page-components/accordion';

export default class PageComponentsAccordionController extends Controller {
  declare model: PageComponentsAccordionModel;

  @action
  noop() {}

  @tracked stateAll: HdsAccordionForceStates = 'close';
  @tracked stateSingle: HdsAccordionForceStates = 'close';

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
