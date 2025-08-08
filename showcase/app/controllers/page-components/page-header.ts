/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

import type { PageComponentsPageHeaderModel } from 'showcase/routes/page-components/page-header';

export default class PageComponentsPageHeaderController extends Controller {
  declare model: PageComponentsPageHeaderModel;

  @tracked showHighlight = false;

  // =============================
  // GENERIC HANDLERS
  // =============================

  @action
  toggleHighlight() {
    this.showHighlight = !this.showHighlight;
  }
}
