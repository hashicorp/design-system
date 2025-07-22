/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

const CUSTOM_WIDTH_OPTIONS = {
  mixed: 'fullwidth / mixed',
  fullwidth: 'fullwidth / all',
  form: 'custom width / form',
  'header+section': 'custom width / header+section',
  section: 'custom width / section',
  // TODO!
  // 'field': 'custom width / field',
};

export default class PageFramelessDemoFormComplexController extends Controller {
  @tracked showHighlight = false;
  @tracked customWidthMode = 'mixed';
  customWidthOptions = CUSTOM_WIDTH_OPTIONS;

  @action
  toggleHighlight() {
    this.showHighlight = !this.showHighlight;
  }

  @action
  setCustomWidthMode(event) {
    this.customWidthMode = event.target.value;
  }
}
