/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class ThemingController extends Controller {
  @service theming;
  @service hdsTheming;

  get currentTheme() {
    return this.theming.getTheme();
  }

  get currentHdsTheme() {
    return this.hdsTheming.getTheme();
  }
}
