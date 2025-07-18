/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';
import {
  COLORS,
  SUCCESS_ICON,
  ERROR_ICON,
} from '@hashicorp/design-system-components/components/hds/copy/snippet/index';

import type { ModelFrom } from 'showcase/utils/ModelFromRoute';

export type PageComponentsCopySnippetModel =
  ModelFrom<PageComponentsCopySnippetRoute>;

export default class PageComponentsCopySnippetRoute extends Route {
  model() {
    // these are used only for presentation purpose in the showcase
    const STATES = ['default', 'hover', 'active', 'focus'];
    return {
      COLORS,
      STATES,
      SUCCESS_ICON,
      ERROR_ICON,
    };
  }
}
