/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';
import { service } from '@ember/service';
import type IntlService from 'ember-intl/services/intl';
import type ShwThemingService from 'showcase/services/shw-theming';

export default class ApplicationRoute extends Route {
  @service declare readonly intl: IntlService;
  @service declare readonly shwTheming: ShwThemingService;

  beforeModel(): void {
    this.intl.setLocale(['en-us']);
    this.shwTheming.initialize();
  }
}
