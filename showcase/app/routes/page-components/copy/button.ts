/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';

import { SIZES } from '@hashicorp/design-system-components/components/hds/copy/button/index';

import type { ModelFrom } from 'showcase/utils/ModelFromRoute';
import { INPUT_COMPONENTS as HTML_INPUT_COMPONENTS } from 'showcase/components/page-components/copy/button/copy-button-with-html-input';
import { INPUT_COMPONENTS } from 'showcase/components/page-components/copy/button/copy-button-with-input';
import { MASKED_INPUT_VARIANTS } from 'showcase/components/page-components/copy/button/copy-button-with-masked-input';

export type PageComponentsCopyButtonModel =
  ModelFrom<PageComponentsCopyButtonRoute>;

export default class PageComponentsCopyButtonRoute extends Route {
  model() {
    return {
      SIZES,
      INPUT_COMPONENTS,
      HTML_INPUT_COMPONENTS,
      MASKED_INPUT_VARIANTS,
    };
  }
}
