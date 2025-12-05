/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import USERS from 'showcase/mocks/user-data';

import CodeFragmentWithUserTable from 'showcase/components/page-components/pagination/code-fragments/with-user-table';
import {
  getCursorParts,
  getNewPrevNextCursors,
} from 'showcase/components/page-components/pagination/code-fragments/helpers/cursor';

import { HdsPaginationCompact } from '@hashicorp/design-system-components/components';
import type { HdsPaginationDirections } from '@hashicorp/design-system-components/components/hds/pagination/types';

export default class CodeFragmentWithCompactAndEvents extends Component {
  @tracked currentCursor: string | null = btoa(`next__1`);
  @tracked pageSize = 5;

  get paginatedData() {
    const { direction, cursorIndex } = getCursorParts(
      this.currentCursor,
      USERS,
    );

    let start;

    const pageSize = this.pageSize;
    if (direction === 'prev') {
      start = cursorIndex - pageSize;
    } else {
      start = cursorIndex;
    }

    const end = start + pageSize;
    return USERS.slice(start, end);
  }

  get newCursors() {
    const { newPrevCursor, newNextCursor } = getNewPrevNextCursors(
      this.currentCursor,
      this.pageSize,
      USERS,
    );
    return {
      newPrevCursor,
      newNextCursor,
    };
  }

  get isPrevButtonDisabled() {
    const { newPrevCursor } = this.newCursors;
    return newPrevCursor === null;
  }

  get isNextButtonDisabled() {
    const { newNextCursor } = this.newCursors;
    return newNextCursor === null;
  }

  onPageChange = (page: HdsPaginationDirections) => {
    console.group('onPageChange invoked with arguments:');
    console.log('page', page);
    console.groupEnd();

    // get the next/prev cursors
    const { newPrevCursor, newNextCursor } = this.newCursors;
    // update the "current" cursor
    if (page === 'prev') {
      this.currentCursor = newPrevCursor;
    } else if (page === 'next') {
      this.currentCursor = newNextCursor;
    }
  };

  <template>
    <div class="shw-component-pagination-table-demo">
      <CodeFragmentWithUserTable @model={{this.paginatedData}} />
      <HdsPaginationCompact
        @isDisabledPrev={{this.isPrevButtonDisabled}}
        @isDisabledNext={{this.isNextButtonDisabled}}
        @onPageChange={{this.onPageChange}}
      />
    </div>
  </template>
}
