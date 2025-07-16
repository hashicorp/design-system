/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';

import type { PageComponentsFormRadioModel } from 'showcase/routes/page-components/form/radio';

export default class PageComponentsFormRadioController extends Controller {
  declare model: PageComponentsFormRadioModel;

  @action
  noop() {}
}
