/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';

import type { ModelFrom } from 'showcase/utils/ModelFromRoute';

export type PageComponentsTagFramelessDemoObserverPerformaneModel =
  ModelFrom<PageComponentsTagFramelessDemoObserverPerformanceRoute>;

export default class PageComponentsTagFramelessDemoObserverPerformanceRoute extends Route {
  model() {
    const DEMO_RANGE: { index: number }[] = Array.from(
      { length: 1000 },
      (_, i) => ({ index: i + 1 }),
    );
    return { DEMO_RANGE };
  }
}
