/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Controller from '@ember/controller';
import { action } from '@ember/object';

import type { PageComponentsTooltipModel } from '../../routes/page-components/tooltip';

export default class PageComponentsTooltipController extends Controller {
  declare model: PageComponentsTooltipModel;

  @action
  noop() {}
}
