/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';

import {
  FONT_FAMILIES,
  FONT_WEIGHTS,
  DISPLAY_STYLES,
  BODY_STYLES,
  CODE_STYLES,
  STYLES_COMBINATIONS,
} from '../../routes/page-foundations/typography';

export default class PageTypographyController extends Controller {
  get families() {
    return [...FONT_FAMILIES];
  }
  get weights() {
    return [...FONT_WEIGHTS];
  }
  get styles() {
    return [...DISPLAY_STYLES, ...BODY_STYLES, ...CODE_STYLES];
  }
  get stylesCombinations() {
    return STYLES_COMBINATIONS;
  }
}
