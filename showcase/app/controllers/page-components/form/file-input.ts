/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

import type { PageComponentsFormFileInputModel } from 'showcase/routes/page-components/form/file-input';

export default class PageComponentsFormFileInputController extends Controller {
  declare model: PageComponentsFormFileInputModel;
  @tracked showHighlight = false;

  @action
  toggleHighlight() {
    this.showHighlight = !this.showHighlight;
  }
}
