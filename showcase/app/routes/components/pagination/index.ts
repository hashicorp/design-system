/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';
import type { ModelFrom } from 'showcase/utils/ModelFromRoute';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'Owner' | 'Admin' | 'Contributor';
}

export type ComponentsPaginationModel = ModelFrom<ComponentsPaginationRoute>;

export default class ComponentsPaginationRoute extends Route {
  async model() {
    const response = await fetch('/api/mock-users.json');
    const records = (await response.json()) as User[];

    return { records };
  }
}
