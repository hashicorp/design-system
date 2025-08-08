/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';

import type { PageComponentsAlertModel } from 'showcase/routes/page-components/alert';

export default class PageComponentsAlertController extends Controller {
  declare model: PageComponentsAlertModel;

  @action
  noop() {}
}
