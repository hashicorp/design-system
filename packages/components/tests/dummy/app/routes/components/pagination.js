/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';

export default class ComponentsPaginationRoute extends Route {
  async model() {
    let response = await fetch('/api/mock-users.json');
    let records = await response.json();
    return { records };
  }
}
