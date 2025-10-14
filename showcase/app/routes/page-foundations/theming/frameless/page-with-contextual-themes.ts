/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';

import type { ModelFrom } from 'showcase/utils/ModelFromRoute';

import config from 'showcase/config/environment';

export type PageFoundationsThemingFramelessPageWithContextualThemesModel =
  ModelFrom<PageFoundationsThemingFramelessPageWithContextualThemesRoute>;

const CSS_FILE_WITH = `${config.rootURL}assets/styles/@hashicorp/design-system-components-theming-with-css-selectors.css`;

export default class PageFoundationsThemingFramelessPageWithContextualThemesRoute extends Route {
  activate() {
    // re-assign the stylesheet `href` attribute
    const hdsComponentsStylesheet = document.getElementById(
      'hds-components-stylesheet',
    );
    console.log(
      'activated route',
      config.rootURL,
      hdsComponentsStylesheet,
      hdsComponentsStylesheet?.getAttribute('href'),
      CSS_FILE_WITH,
    );
    if (hdsComponentsStylesheet) {
      hdsComponentsStylesheet.setAttribute(
        'href',
        `${config.rootURL}assets/styles/@hashicorp/design-system-components-theming-with-css-selectors.css`,
      );
    }
  }

  deactivate() {
    // The code you want to execute when the route is left goes here
    console.log('deactivated route');
  }
}
