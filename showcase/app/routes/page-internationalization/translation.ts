/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';
import { service } from '@ember/service';

import type { IntlService } from 'ember-intl';
import type { ModelFrom } from 'showcase/utils/ModelFromRoute';
import type PageInternationalizationTranslationController from 'showcase/controllers/page-internationalization/translation';

export type PageInternationalizationTranslationModel =
  ModelFrom<PageInternationalizationTranslationRoute>;

export default class PageInternationalizationTranslationRoute extends Route {
  @service intl!: IntlService;

  _localeOnEntry: string | undefined = undefined;

  // store the locale on entry so we can restore it on exit
  beforeModel() {
    this._localeOnEntry = this.intl.primaryLocale;
  }

  // set the locale in the controller so that it doesn't persist between visits
  setupController(
    controller: PageInternationalizationTranslationController,
    model: PageInternationalizationTranslationModel,
  ) {
    super.setupController(controller, model);

    controller.lang = this._localeOnEntry;
  }

  // reset the locale to the one we had on entry
  deactivate() {
    super.deactivate();

    if (this._localeOnEntry) {
      this.intl.setLocale(this._localeOnEntry);
    }
  }
}
