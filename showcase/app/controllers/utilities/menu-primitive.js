/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';

export default class MenuPrimitiveController extends Controller {
  get renderTargetId() {
    return document.getElementById(
      'shw-utility-menu-primitive-render-target-2'
    );
  }
}
