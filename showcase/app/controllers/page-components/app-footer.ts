/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

import type { PageComponentsAppFooterModel } from 'showcase/routes/page-components/app-footer';

export default class PageComponentsAppFooterController extends Controller {
  declare model: PageComponentsAppFooterModel;

  @tracked showHighlight = false;

  @action
  toggleHighlight() {
    this.showHighlight = !this.showHighlight;
  }
}
