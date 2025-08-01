/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';
import records from 'showcase/mocks/users';

import type { ModelFrom } from 'showcase/utils/ModelFromRoute';

export type PageComponentsPaginationModel =
  ModelFrom<PageComponentsPaginationRoute>;

export default class PageComponentsPaginationRoute extends Route {
  model() {
    return { records };
  }
}
