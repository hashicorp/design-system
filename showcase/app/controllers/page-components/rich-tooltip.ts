/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

import type { PageComponentsRichTooltipModel } from 'showcase/routes/page-components/rich-tooltip';

export default class PageComponentsRichTooltipController extends Controller {
  declare model: PageComponentsRichTooltipModel;

  @tracked isModalActive = false;

  @action
  noop() {}

  @action
  onClickButton() {
    window.alert('The button has been clicked!');
  }

  @action
  activateModal() {
    this.isModalActive = true;
  }

  @action
  deactivateModal() {
    this.isModalActive = false;
  }
}
