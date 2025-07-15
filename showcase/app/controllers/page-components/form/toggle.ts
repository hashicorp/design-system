/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';

import type { PageComponentsFormToggleModel } from 'showcase/routes/page-components/form/toggle';

export default class PageComponentsFormToggleController extends Controller {
  declare model: PageComponentsFormToggleModel;

  @action
  noop() {}
}
