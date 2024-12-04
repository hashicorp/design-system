/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class ThemingController extends Controller {
  @service theming;

  get currentTheme() {
    return this.theming.getTheme();
  }

  get inverseTheme() {
    return this.theming.getInverseTheme();
  }
}
