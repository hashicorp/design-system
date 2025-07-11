/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';

import type { PageComponentsFormCheckboxModel } from '../../../routes/page-components/form/checkbox';

export default class PageComponentsFormCheckboxController extends Controller {
  declare model: PageComponentsFormCheckboxModel;

  @action
  noop() {}
}
