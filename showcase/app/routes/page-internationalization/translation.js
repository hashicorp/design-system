/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class PageInternationalizationTranslationRoute extends Route {
  @service intl;

  _localeOnEntry = null;

  // store the locale on entry so we can restore it on exit
  beforeModel() {
    super.beforeModel(...arguments);

    this._localeOnEntry = this.intl.primaryLocale;
  }

  // set the locale in the controller so that it doesn't persist between visits
  setupController(controller, model) {
    super.setupController(controller, model);

    controller.lang = this._localeOnEntry;
  }

  // reset the locale to the one we had on entry
  deactivate() {
    super.deactivate(...arguments);

    this.intl.setLocale(this._localeOnEntry);
  }
}
