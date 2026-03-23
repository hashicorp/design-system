import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import { hash, array } from '@ember/helper';
import { eq } from 'ember-truth-helpers';

import type RouterService from '@ember/routing/router-service';

import {
  HdsPaginationNumbered,
  HdsTable,
} from '@hashicorp/design-system-components/components';

import USER_DATA from 'website/mocks/user-data';

type DemoQueryParams = Record<string, string | number | boolean | undefined> & {
  demoCurrentPage?: string | number;
  demoCurrentPageSize?: string | number;
  preserveScrollPosition?: boolean;
};

export default class LocalComponent extends Component {
  @service declare readonly router: RouterService;

  @tracked demoPageSizes = [5, 10, 30];

  private toPositiveInt(value: unknown, fallback: number): number {
    const parsed = Number(value);
    return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
  }

  get routeQueryParams(): DemoQueryParams {
    return (this.router.currentRoute?.queryParams ?? {}) as DemoQueryParams;
  }

  get model() {
    return { records: USER_DATA };
  }

  get demoRouteName() {
    // eg. 'components.pagination';
    return this.router.currentRouteName;
  }

  get demoTotalItems() {
    return this.model.records.length;
  }

  get demoCurrentPage() {
    return this.toPositiveInt(this.routeQueryParams.demoCurrentPage, 1);
  }

  get demoCurrentPageSize() {
    return this.toPositiveInt(this.routeQueryParams.demoCurrentPageSize, 5);
  }

  get demoQueryFunctionNumbered(): (
    page: number,
    pageSize: number,
  ) => DemoQueryParams {
    return (page: number, pageSize: number) => {
      return {
        // important: in order for this to work, the query param name needs to be added to the list of query params in the controller:
        // see: https://github.com/hashicorp/design-system/blob/main/website/app/controllers/show.js#L42-L53
        demoCurrentPage: page,
        demoCurrentPageSize: pageSize,
        // see: https://github.com/DockYard/ember-router-scroll#preservescrollposition-with-queryparams
        preserveScrollPosition: true,
      };
    };
  }

  handlePageChange = (page: number, pageSize: number) => {
    console.log(
      pageSize !== undefined
        ? `Page changed to "${page}" with page size equal to "${pageSize}"!`
        : `Page changed to "${page}"!`,
    );
  };

  handlePageSizeChangeNumbered = (pageSize: number) => {
    const queryParams: DemoQueryParams = {
      ...this.routeQueryParams,
      // reset pagination to first page when page size changes
      demoCurrentPage: 1,
      demoCurrentPageSize: pageSize,
      // see: https://github.com/DockYard/ember-router-scroll#preservescrollposition-with-queryparams
      preserveScrollPosition: true,
    };

    // navigate to the new URL (notice: the anchor/fragment `#...` is not preserved unfortunately)
    this.router.transitionTo({ queryParams });
  };

  <template>
    <div class="doc-pagination-table-demo">
      <HdsTable
        @model={{this.demoPaginatedDataNumbered}}
        @columns={{array
          (hash key="id" label="ID" isSortable=true)
          (hash key="name" label="Name" isSortable=true)
          (hash key="email" label="Email")
          (hash key="role" label="Role")
        }}
        @sortBy={{this.demoCurrentSortBy}}
        @sortOrder={{this.demoCurrentSortOrder}}
        @onSort={{this.demoOnTableSort}}
        @density={{if (eq this.demoCurrentPageSize 30) "short" "medium"}}
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
        @totalItems={{this.demoTotalItems}}
        @currentPage={{this.demoCurrentPage}}
        @pageSizes={{this.demoPageSizes}}
        @currentPageSize={{this.demoCurrentPageSize}}
        @route={{this.demoRouteName}}
        @queryFunction={{this.demoQueryFunctionNumbered}}
        @onPageChange={{this.handlePageChange}}
        @onPageSizeChange={{this.handlePageSizeChangeNumbered}}
      />
    </div>
  </template>
}
