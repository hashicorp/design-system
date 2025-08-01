/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';

import userData from 'showcase/mocks/user-data';

import type { ModelFrom } from 'showcase/utils/ModelFromRoute';

export type PageComponentsPaginationModel =
  ModelFrom<PageComponentsPaginationRoute>;

export default class PageComponentsPaginationRoute extends Route {
  model() {
    return { records: userData };
  }
}
