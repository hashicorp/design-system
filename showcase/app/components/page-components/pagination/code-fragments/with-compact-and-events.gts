/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { array, hash } from '@ember/helper';
import { tracked } from '@glimmer/tracking';

import USERS from 'showcase/mocks/user-data';
import type { User } from 'showcase/mocks/user-data';

import {
  HdsPaginationCompact,
  HdsTable,
} from '@hashicorp/design-system-components/components';
import type { HdsPaginationDirections } from '@hashicorp/design-system-components/components/hds/pagination/types';

const getCursorParts = (cursor: string | null, records: User[]) => {
  if (!cursor) {
    return { direction: 'next', cursorID: null, cursorIndex: -1 };
  }

  const token = atob(cursor);
  const tokenParts = [...token.split('__')];
  const direction = tokenParts[0];
  const cursorID = tokenParts[1] ? parseInt(tokenParts[1]) : undefined;
  const cursorIndex = records.findIndex((element) => element.id === cursorID);

  return { direction, cursorID, cursorIndex };
};

const getNewPrevNextCursors = (
  cursor: string | null,
  pageSize: number,
  records: User[],
) => {
  const { direction, cursorIndex } = getCursorParts(cursor, records);

  let newPrevCursor;
  let newNextCursor;

  const prevCursorIndex =
    direction === 'prev' ? cursorIndex - pageSize : cursorIndex;
  if (prevCursorIndex > 0) {
    const newPrevRecordId = records[prevCursorIndex]?.id;
    newPrevCursor = btoa(`prev__${newPrevRecordId}`);
  } else {
    newPrevCursor = null;
  }

  const nextCursorIndex =
    direction === 'next' ? cursorIndex + pageSize : cursorIndex;
  if (nextCursorIndex < records.length) {
    const newNextRecordId = records[nextCursorIndex]?.id;
    newNextCursor = btoa(`next__${newNextRecordId}`);
  } else {
    newNextCursor = null;
  }

  return {
    newPrevCursor,
    newNextCursor,
  };
};

export default class CodeFragmentWithCompactAndEvents extends Component {
  @tracked currentCursor: string | null = btoa(`next__1`);
  @tracked pageSize = 5;

  get paginatedData() {
    const { direction, cursorIndex } = getCursorParts(
      this.currentCursor,
      USERS,
    );

    let start;
    let end;
    const pageSize = this.pageSize;
    if (direction === 'prev') {
      end = cursorIndex;
      start = cursorIndex - pageSize;
    } else {
      start = cursorIndex;
      end = cursorIndex + pageSize;
    }
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
      <HdsTable
        @model={{this.paginatedData}}
        @columns={{array
          (hash key="id" label="ID")
          (hash key="name" label="Name")
          (hash key="email" label="Email")
          (hash key="role" label="Role")
        }}
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
      <HdsPaginationCompact
        @isDisabledPrev={{this.isPrevButtonDisabled}}
        @isDisabledNext={{this.isNextButtonDisabled}}
        @onPageChange={{this.onPageChange}}
      />
    </div>
  </template>
}
