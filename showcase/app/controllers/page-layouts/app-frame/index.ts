/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class PageLayoutsAppFrameController extends Controller {
  @tracked show3DVisualization: boolean = false;

  @action
  toggle3DVisualization() {
    this.show3DVisualization = !this.show3DVisualization;
  }
}
