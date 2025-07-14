/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';

import type { PageUtilitiesPopoverPrimitiveModel } from 'showcase/routes/page-utilities/popover-primitive';

export default class PageUtilitiesPopoverPrimitiveController extends Controller {
  declare model: PageUtilitiesPopoverPrimitiveModel;

  @action
  noop() {}

  @action
  onClickButton() {
    window.alert('The button has been clicked!');
  }
}
