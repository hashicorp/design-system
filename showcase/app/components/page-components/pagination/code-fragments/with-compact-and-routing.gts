/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { array } from '@ember/helper';
import { inject as service } from '@ember/service';
import type RouterService from '@ember/routing/router-service';

import USERS from 'showcase/mocks/user-data';
import type { User } from 'showcase/mocks/user-data';

import CodeFragmentWithUserTable from 'showcase/components/page-components/pagination/code-fragments/with-user-table';
import {
  getCursorParts,
  getNewPrevNextCursors,
} from 'showcase/components/page-components/pagination/code-fragments/helpers/cursor';

import { HdsPaginationCompact } from '@hashicorp/design-system-components/components';
import type { HdsPaginationDirections } from '@hashicorp/design-system-components/components/hds/pagination/types';

interface CodeFragmentWithCompactAndRoutingSignature {
  Args: {
    nextCursor: string | null;
    prevCursor: string | null;
    pageSize: number;
  };
}

export default class CodeFragmentWithCompactAndRouting extends Component<CodeFragmentWithCompactAndRoutingSignature> {
  @service declare router: RouterService;

  get paginatedData() {
    const { prevCursor, nextCursor, pageSize } = this.args;

    let token = '';
    if (prevCursor) {
      token = prevCursor;
    } else if (nextCursor) {
      token = nextCursor;
    }

    const { direction, cursorIndex } = getCursorParts(token, USERS);

    let start;
    let end;

    if (direction === 'prev') {
      end = cursorIndex;
      // we want to avoid having a negative `start` index for the `array.slide` method (it happens if the cursorIndex is smaller than the selected page size)
      start = Math.max(0, cursorIndex - pageSize);
    } else {
      start = cursorIndex;
      end = cursorIndex + pageSize;
    }

    return USERS.slice(start, end);
  }

  get newCursors() {
    const { prevCursor, nextCursor, pageSize } = this.args;

    let cursor = '';
    // In cloud UI they use two distinct query params for the cursor depending if it's "prev" or "next"
    if (prevCursor) {
      cursor = prevCursor;
    } else if (nextCursor) {
      cursor = nextCursor;
    }
    return getNewPrevNextCursors(cursor, pageSize, USERS);
  }

  get isPrevButtonDisabled() {
    const { newPrevCursor } = this.newCursors;
    return newPrevCursor === null;
  }

  get isNextButtonDisabled() {
    const { newNextCursor } = this.newCursors;
    return newNextCursor === null;
  }

  get demoRouteName() {
    // eg. 'components.pagination';
    const routeName = this.router.currentRouteName;
    return routeName ?? '';
  }

  get demoQueryFunction() {
    const { newPrevCursor, newNextCursor } = this.newCursors;
    const currPrevCursor = this.args.prevCursor;
    const currNextCursor = this.args.nextCursor;

    return (page: HdsPaginationDirections, pageSize?: number) => {
      // for the "compact" pagination when the user changes the page size and the `onPageSizeChange` function is invoked
      // the callback function returns a `null` value for the `page` argument so the consumer can decide how to handle the cursors acordingly

      if (page === null) {
        return {
          prevCursorDemoCompact: currPrevCursor,
          nextCursorDemoCompact: currNextCursor,
          pageSizeDemoCompact: pageSize,
        };
      } else {
        return {
          prevCursorDemoCompact: page === 'prev' ? newPrevCursor : undefined,
          nextCursorDemoCompact: page === 'next' ? newNextCursor : undefined,
          pageSizeDemoCompact: pageSize,
        };
      }
    };
  }

  onPageChange = (page: HdsPaginationDirections) => {
    console.log('genericHandlePageChange invoked with arguments:');
    console.log('page', page);
    console.log('pageSize', this.args.pageSize);
  };

  onPageSizeChange = (pageSize: number) => {
    // there should be a better handling of how the "paginated" data list is computed and shown to the user to avoid some UX issues
    // for details see this thread: https://github.com/hashicorp/design-system/pull/1724#issuecomment-1768167782
    this.router.transitionTo(this.demoRouteName, {
      queryParams: {
        pageSizeDemoCompact: pageSize,
      },
    });
  };

  <template>
    <div class="shw-component-pagination-table-demo">
      <CodeFragmentWithUserTable @model={{this.paginatedData}} />
      <HdsPaginationCompact
        @queryFunction={{this.demoQueryFunction}}
        @showSizeSelector={{true}}
        @route={{this.demoRouteName}}
        @currentPageSize={{@pageSize}}
        @pageSizes={{array 5 10 30}}
        @isDisabledPrev={{this.isPrevButtonDisabled}}
        @isDisabledNext={{this.isNextButtonDisabled}}
        @onPageSizeChange={{this.onPageSizeChange}}
        @onPageChange={{this.onPageChange}}
      />
    </div>
  </template>
}
