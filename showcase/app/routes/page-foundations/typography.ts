/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';

import type { ModelFrom } from 'showcase/utils/ModelFromRoute';

export type PageFoundationsTypographyModel =
  ModelFrom<PageFoundationsTypographyRoute>;

export default class PageFoundationsTypographyRoute extends Route {
  model() {
    const FONT_FAMILIES = ['sans-display', 'sans-text', 'mono-code'];
    const FONT_WEIGHTS = ['regular', 'medium', 'semibold', 'bold'];
    // we add all the allowed combinations here, per design specs
    const STYLES_COMBINATIONS = {
      'display-500': ['bold'],
      'display-400': ['medium', 'semibold', 'bold'],
      'display-300': ['medium', 'semibold', 'bold'],
      'display-200': ['semibold'],
      'display-100': ['medium'],
      'body-300': ['regular', 'medium', 'semibold'],
      'body-200': ['regular', 'medium', 'semibold'],
      'body-100': ['regular', 'medium', 'semibold'],
      'code-300': ['regular', 'bold'],
      'code-200': ['regular', 'bold'],
      'code-100': ['regular', 'bold'],
    };

    return {
      FONT_FAMILIES,
      FONT_WEIGHTS,
      STYLES_COMBINATIONS,
    };
  }
}
