/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { array, hash } from '@ember/helper';
import { eq } from 'ember-truth-helpers';
import { inject as service } from '@ember/service';
import type RouterService from '@ember/routing/router-service';

import USERS from 'showcase/mocks/user-data';

import {
  HdsPaginationNumbered,
  HdsTable,
} from '@hashicorp/design-system-components/components';
import type { HdsTableThSortOrder } from '@hashicorp/design-system-components/components/hds/table/types';

interface CodeFragmentWithNumberedAndRoutingSignature {
  Args: {
    currentPage: number;
    pageSize: number;
    sortBy: string | undefined;
    sortOrder: HdsTableThSortOrder | undefined;
  };
}

export default class CodeFragmentWithNumberedAndRouting extends Component<CodeFragmentWithNumberedAndRoutingSignature> {
  @service declare router: RouterService;

  get demoRouteName() {
    // eg. 'components.pagination';
    const routeName = this.router.currentRouteName;
    return routeName ?? '';
  }

  get demoQueryFunction() {
    return (page: number, pageSize: number) => {
      return {
        currentPageDemoNumbered: page,
        pageSizeDemoNumbered: pageSize,
        sortByDemoNumbered: this.args.sortBy,
        sortOrderDemoNumbered: this.args.sortOrder,
      };
    };
  }

  get paginatedData() {
    const start = (this.args.currentPage - 1) * this.args.pageSize;
    const end = this.args.currentPage * this.args.pageSize;
    return USERS.slice(start, end);
  }

  onPageChange = (page: number, pageSize: number) => {
    console.group('onPageChange invoked with arguments:');
    console.log('page', page);
    console.log('pageSize', pageSize);
    console.groupEnd();
  };

  onPageSizeChange = (pageSize: number) => {
    this.router.transitionTo(this.demoRouteName, {
      queryParams: {
        currentPageDemoNumbered: 1,
        pageSizeDemoNumbered: pageSize,
      },
    });
  };

  onTableSort = (sortBy: string, sortOrder: HdsTableThSortOrder) => {
    this.router.transitionTo(this.demoRouteName, {
      queryParams: {
        // should we reset the selected page?
        // currentPageDemoNumbered: 1,
        sortByDemoNumbered: sortBy,
        sortOrderDemoNumbered: sortOrder,
      },
    });
  };

  <template>
    <div class="shw-component-pagination-table-demo">
      <HdsTable
        @model={{this.paginatedData}}
        @columns={{array
          (hash key="id" label="ID" isSortable=true)
          (hash key="name" label="Name" isSortable=true)
          (hash key="email" label="Email")
          (hash key="role" label="Role")
        }}
        @density={{if (eq @pageSize 30) "short" "medium"}}
        @sortBy={{@sortBy}}
        @sortOrder={{@sortOrder}}
        @onSort={{this.onTableSort}}
      >
        <:body as |B|>
          <B.Tr>
            <B.Td>{{B.data.id}}</B.Td>
            <B.Td>{{B.data.name}}</B.Td>
            <B.Td>{{B.data.email}}</B.Td>
            <B.Td>{{B.data.role}}</B.Td>
          </B.Tr>
        </:body>
      </HdsTable>

      <HdsPaginationNumbered
        @totalItems={{USERS.length}}
        @currentPageSize={{@pageSize}}
        @currentPage={{@currentPage}}
        @pageSizes={{array 5 10 30}}
        @onPageChange={{this.onPageChange}}
        @onPageSizeChange={{this.onPageSizeChange}}
        @route={{this.demoRouteName}}
        @queryFunction={{this.demoQueryFunction}}
      />
    </div>
  </template>
}
