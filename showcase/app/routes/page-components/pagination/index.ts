/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';

import { fetchJson } from 'showcase/utils/fetchJson';

import type { ModelFrom } from 'showcase/utils/ModelFromRoute';
import type { User } from 'showcase/utils/fetchJson/types';

export type PageComponentsPaginationModel =
  ModelFrom<PageComponentsPaginationRoute>;

export default class PageComponentsPaginationRoute extends Route {
  async model() {
    const records = await fetchJson<User[]>('/api/mock-users.json');

    return { records };
  }
}
