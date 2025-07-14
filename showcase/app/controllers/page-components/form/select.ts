/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';

import type { PageComponentsFormSelectModel } from 'showcase/routes/page-components/form/select';

export default class PageComponentsFormSelectController extends Controller {
  declare model: PageComponentsFormSelectModel;

  @action
  noop() {}
}
