/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';
import { service } from '@ember/service';

import type { ModelFrom } from 'showcase/utils/ModelFromRoute';
import ShwThemingService from 'showcase/services/shw-theming';

export type PageFoundationsThemingFramelessPageWithContextualThemesModel =
  ModelFrom<PageFoundationsThemingFramelessPageWithContextualThemesRoute>;

export default class PageFoundationsThemingFramelessPageWithContextualThemesRoute extends Route {
  @service declare readonly shwTheming: ShwThemingService;

  activate() {
    console.log('➡️ activated route');
    this.shwTheming.setShwHdsThemes(
      'combined-strategies',
      'dark',
      ({ currentTheme, currentMode }) => {
        console.log(
          '➡️ PAGE CONTEXTUAL THEMES route activate()',
          currentTheme,
          currentMode,
        );
      },
    );
  }

  deactivate() {
    // The code you want to execute when the route is left goes here
    console.log('➡️ deactivated route');
  }
}
