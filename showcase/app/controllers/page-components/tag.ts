/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';

import type { PageComponentsTagModel } from '../../routes/page-components/tag';

export default class PageComponentsTagController extends Controller {
  declare model: PageComponentsTagModel;

  @action
  noop() {}
}
