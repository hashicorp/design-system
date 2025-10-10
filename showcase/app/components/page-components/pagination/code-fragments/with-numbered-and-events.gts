/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { array } from '@ember/helper';
import { eq } from 'ember-truth-helpers';
import { tracked } from '@glimmer/tracking';

import USERS from 'showcase/mocks/user-data';

import CodeFragmentWithUserTable from 'showcase/components/page-components/pagination/code-fragments/with-user-table';

import { HdsPaginationNumbered } from '@hashicorp/design-system-components/components';
import type { HdsTableThSortOrder } from '@hashicorp/design-system-components/components/hds/table/types';

export default class CodeFragmentWithNumberedAndEvents extends Component {
  @tracked currentPage = 1;
  @tracked pageSize = 5;
  @tracked currentSortBy: string | undefined = undefined;
  @tracked currentSortOrder: HdsTableThSortOrder | undefined = undefined;

  get paginatedData() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = this.currentPage * this.pageSize;
    return USERS.slice(start, end);
  }

  onPageChange = (page: number, pageSize: number) => {
    console.group('onPageChange invoked with arguments:');
    console.log('page', page);
    console.log('pageSize', pageSize);
    console.groupEnd();

    this.currentPage = page;
    this.pageSize = pageSize;
  };

  onPageSizeChange = (pageSize: number) => {
    // we agreed to reset the pagination to the first element (any alternative would result in an unpredictable UX)
    this.currentPage = 1;
    this.pageSize = pageSize;
  };

  onTableSort = (sortBy: string, sortOrder: HdsTableThSortOrder) => {
    this.currentSortBy = sortBy;
    this.currentSortOrder = sortOrder;
    this.currentPage = 1;
  };

  <template>
    <div class="shw-component-pagination-table-demo">
      <CodeFragmentWithUserTable
        @model={{this.paginatedData}}
        @density={{if (eq this.pageSize 30) "short" "medium"}}
        @sortBy={{this.currentSortBy}}
        @sortOrder={{this.currentSortOrder}}
        @onSort={{this.onTableSort}}
      />
      <HdsPaginationNumbered
        @totalItems={{USERS.length}}
        @currentPageSize={{this.pageSize}}
        @currentPage={{this.currentPage}}
        @pageSizes={{array 5 10 30}}
        @onPageChange={{this.onPageChange}}
        @onPageSizeChange={{this.onPageSizeChange}}
      />
    </div>
  </template>
}
