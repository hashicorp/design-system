/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class PageHeaderController extends Controller {
  @tracked showHighlight = false;

  // =============================
  // GENERIC HANDLERS
  // =============================

  @action
  toggleHighlight() {
    this.showHighlight = !this.showHighlight;
  }
}
