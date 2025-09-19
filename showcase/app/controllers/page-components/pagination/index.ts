/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';

import type RouterService from '@ember/routing/router-service';

import type { HdsPaginationDirections } from '@hashicorp/design-system-components/components/hds/pagination/types';
import type { HdsTableThSortOrder } from '@hashicorp/design-system-components/components/hds/table/types';

import type { PageComponentsPaginationModel } from 'showcase/routes/page-components/pagination/index';

// uncomment this to override the `atob/btoa` functions for debugging
// const atob = (s: string) => s;
// const btoa = (s: string) => s;

const getCursorParts = (
  cursor: string | null,
  records: PageComponentsPaginationModel['records'],
) => {
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
  records: PageComponentsPaginationModel['records'],
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

export default class PageComponentsPaginationController extends Controller {
  declare model: PageComponentsPaginationModel;
  queryParams = [
    'demoCurrentPage',
    'demoCurrentPageSize',
    'demoCurrentCursor',
    'demoExtraParam',
    // ---------
    'currentPage_demo2',
    'currentPageSize_demo2',
    'currentSortBy_demo2',
    'currentSortOrder_demo2',
    'prevCursor_demo4',
    'nextCursor_demo4',
    'currentPageSize_demo4',
  ];

  @service declare router: RouterService;

  @tracked showHighlight = false;
  // -----
  @tracked demoCurrentPage = 1;
  @tracked demoCurrentPageSize = 5;
  @tracked demoCurrentCursor = btoa(`next__1`);
  @tracked demoPageSizes = [5, 10, 30];
  @tracked demoExtraParam = '';
  // -----
  @tracked currentPage_demo1 = 1;
  @tracked currentPageSize_demo1 = 5;
  // -----
  @tracked currentPage_demo2 = 1;
  @tracked currentPageSize_demo2 = 5;
  @tracked currentSortBy_demo2: string | undefined = undefined;
  @tracked currentSortOrder_demo2: HdsTableThSortOrder | undefined = undefined;
  // -----
  @tracked currentCursor_demo3: string | null = btoa(`next__1`);
  @tracked currentPageSize_demo3 = 5;
  // -----
  @tracked prevCursor_demo4 = null;
  @tracked nextCursor_demo4 = btoa(`next__1`);
  @tracked currentPageSize_demo4 = 5;

  noop() {}

  get demoRouteName() {
    // eg. 'components.pagination';
    const routeName = this.router.currentRouteName;

    return routeName ?? '';
  }

  get demoTotalItems() {
    return this.model.records.length;
  }

  // DEMO #1

  get paginatedData_demo1() {
    const start = (this.currentPage_demo1 - 1) * this.currentPageSize_demo1;
    const end = this.currentPage_demo1 * this.currentPageSize_demo1;
    return this.model.records.slice(start, end);
  }

  @action
  onPageChange_demo1(page: number, pageSize: number) {
    this.currentPage_demo1 = page;
    this.currentPageSize_demo1 = pageSize;
  }

  @action
  onPageSizeChange_demo1(pageSize: number) {
    // we agreed to reset the pagination to the first element (any alternative would result in an unpredictable UX)
    this.currentPage_demo1 = 1;
    this.currentPageSize_demo1 = pageSize;
  }

  // DEMO #2

  get consumerQueryFunction_demo2() {
    return (page: number, pageSize: number) => {
      return {
        currentPage_demo2: page,
        currentPageSize_demo2: pageSize,
        currentSortBy_demo2: this.currentSortBy_demo2,
        currentSortOrder_demo2: this.currentSortOrder_demo2,
        demoExtraParam: 'hello',
      };
    };
  }

  @action
  onTableSort_demo2(sortBy: string, sortOrder: HdsTableThSortOrder) {
    this.currentSortBy_demo2 = sortBy;
    this.currentSortOrder_demo2 = sortOrder;
    // should we reset the selected page?
    // this.currentPage_demo2 = 1;
  }

  get paginatedData_demo2() {
    const start = (this.currentPage_demo2 - 1) * this.currentPageSize_demo2;
    const end = this.currentPage_demo2 * this.currentPageSize_demo2;
    return this.model.records.slice(start, end);
  }

  @action
  onPageSizeChange_demo2(pageSize: number) {
    // the sensible thing to do here is to reset the pagination to the first element (any alternative would result in an unpredictable UX)
    this.currentPage_demo2 = 1;
    this.currentPageSize_demo2 = pageSize;
  }

  // DEMO #3

  get newPrevNextCursors_demo3() {
    const { newPrevCursor, newNextCursor } = getNewPrevNextCursors(
      this.currentCursor_demo3,
      this.currentPageSize_demo3,
      this.model.records,
    );
    return {
      newPrevCursor,
      newNextCursor,
    };
  }

  get isDisabledPrev_demo3() {
    const { newPrevCursor } = this.newPrevNextCursors_demo3;
    return newPrevCursor === null;
  }

  get isDisabledNext_demo3() {
    const { newNextCursor } = this.newPrevNextCursors_demo3;
    return newNextCursor === null;
  }

  @action
  onPageChange_demo3(page: HdsPaginationDirections) {
    // get the next/prev cursors
    const { newPrevCursor, newNextCursor } = this.newPrevNextCursors_demo3;
    // update the "current" cursor
    if (page === 'prev') {
      this.currentCursor_demo3 = newPrevCursor;
    } else if (page === 'next') {
      this.currentCursor_demo3 = newNextCursor;
    }
  }

  get paginatedData_demo3() {
    const { direction, cursorIndex } = getCursorParts(
      this.currentCursor_demo3,
      this.model.records,
    );

    let start;
    let end;
    const pageSize = this.currentPageSize_demo3;
    if (direction === 'prev') {
      end = cursorIndex;
      start = cursorIndex - pageSize;
    } else {
      start = cursorIndex;
      end = cursorIndex + pageSize;
    }
    return this.model.records.slice(start, end);
  }

  // DEMO #4 (this emulates the current implementation in Cloud UI)

  get newPrevNextCursors_demo4() {
    let cursor = '';
    // In cloud UI they use two distinct query params for the cursor depending if it's "prev" or "next"
    if (this.prevCursor_demo4) {
      cursor = this.prevCursor_demo4;
    } else if (this.nextCursor_demo4) {
      cursor = this.nextCursor_demo4;
    }
    return getNewPrevNextCursors(
      cursor,
      this.currentPageSize_demo4,
      this.model.records,
    );
  }

  get consumerQueryFunction_demo4() {
    const { newPrevCursor, newNextCursor } = this.newPrevNextCursors_demo4;
    const currPrevCursor = this.prevCursor_demo4;
    const currNextCursor = this.nextCursor_demo4;
    return (page: HdsPaginationDirections, pageSize: number) => {
      // for the "compact" pagination when the user changes the page size and the `onPageSizeChange` function is invoked
      // the callback function returns a `null` value for the `page` argument so the consumer can decide how to handle the cursors acordingly
      if (page === null) {
        return {
          prevCursor_demo4: currPrevCursor,
          nextCursor_demo4: currNextCursor,
          currentPageSize_demo4: pageSize,
          demoExtraParam: 'hello',
        };
      } else {
        return {
          prevCursor_demo4: page === 'prev' ? newPrevCursor : undefined,
          nextCursor_demo4: page === 'next' ? newNextCursor : undefined,
          currentPageSize_demo4: pageSize,
          demoExtraParam: 'hello',
        };
      }
    };
  }

  get isDisabledPrev_demo4() {
    const { newPrevCursor } = this.newPrevNextCursors_demo4;
    return newPrevCursor === null;
  }

  get isDisabledNext_demo4() {
    const { newNextCursor } = this.newPrevNextCursors_demo4;
    return newNextCursor === null;
  }

  get paginatedData_demo4(): PageComponentsPaginationModel['records'] {
    let token = '';
    if (this.prevCursor_demo4) {
      token = this.prevCursor_demo4;
    } else if (this.nextCursor_demo4) {
      token = this.nextCursor_demo4;
    }

    const { direction, cursorIndex } = getCursorParts(
      token,
      this.model.records,
    );

    let start;
    let end;
    const pageSize = this.currentPageSize_demo4;
    if (direction === 'prev') {
      end = cursorIndex;
      // we want to avoid having a negative `start` index for the `array.slide` method (it happens if the cursorIndex is smaller than the selected page size)
      start = Math.max(0, cursorIndex - pageSize);
    } else {
      start = cursorIndex;
      end = cursorIndex + pageSize;
    }

    // return data
    return this.model.records.slice(start, end);
  }

  @action
  onPageSizeChange_demo4(pageSize: number) {
    // notice: here we don't add specific logic for this, but because of how the cursor-base pagination works
    // there should be a better handling of how the "paginated" data list is computed and shown to the user to avoid some UX issues
    // for details see this thread: https://github.com/hashicorp/design-system/pull/1724#issuecomment-1768167782
    this.currentPageSize_demo4 = pageSize;
  }

  // =============================
  // GENERIC HANDLERS
  // =============================

  @action
  toggleHighlight() {
    this.showHighlight = !this.showHighlight;
  }

  @action
  genericHandlePageChange(page: number, pageSize: number) {
    console.log('genericHandlePageChange invoked with arguments:');
    console.log('page', page);
    console.log('pageSize', pageSize);
  }
}
