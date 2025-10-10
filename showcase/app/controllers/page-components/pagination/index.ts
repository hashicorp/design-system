/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

import type { HdsTableThSortOrder } from '@hashicorp/design-system-components/components/hds/table/types';

export default class PageComponentsPaginationController extends Controller {
  queryParams = [
    'currentPageDemoNumbered',
    'pageSizeDemoNumbered',
    'sortByDemoNumbered',
    'sortOrderDemoNumbered',

    'prevCursorDemoCompact',
    'nextCursorDemoCompact',
    'pageSizeDemoCompact',
  ];

  @tracked currentPageDemoNumbered = 1;
  @tracked pageSizeDemoNumbered = 5;
  @tracked sortByDemoNumbered: string | undefined = undefined;
  @tracked sortOrderDemoNumbered: HdsTableThSortOrder | undefined = undefined;

  @tracked prevCursorDemoCompact: string | null = null;
  @tracked nextCursorDemoCompact: string | null = btoa(`next__1`);
  @tracked pageSizeDemoCompact = 5;
}
