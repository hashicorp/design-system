/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

import type { PageComponentsApplicationStateModel } from 'showcase/routes/page-components/application-state';

export default class PageComponentsApplicationStateController extends Controller {
  declare model: PageComponentsApplicationStateModel;

  @tracked showHighlight = false;

  @action
  toggleHighlight() {
    this.showHighlight = !this.showHighlight;
  }
}
