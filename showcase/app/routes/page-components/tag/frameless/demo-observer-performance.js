/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';

export default class PageComponentsTagFramelessDemoObserverPerformanceRoute extends Route {
  model() {
    const DEMO_RANGE = Array(1000)
      .fill(1)
      .map((n, i) => ({ index: n + i }));
    return { DEMO_RANGE };
  }
}
