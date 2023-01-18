import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { next } from '@ember/runloop';

const getCursorParts = (cursor, records) => {
  const token = atob(cursor);
  const tokenParts = [...token.split('__')];
  const direction = tokenParts[0];
  const cursorID = parseInt(tokenParts[1]);
  const cursorIndex = records.findIndex(
    (element) => element.id === parseInt(cursorID)
  );
  return { direction, cursorID, cursorIndex };
};

const getNewPrevNextCursors = (cursor, pageSize, records) => {
  const { direction, cursorIndex } = getCursorParts(cursor, records);

  let newPrevToken;
  let newNextToken;

  const prevCursorIndex =
    direction === 'prev' ? cursorIndex - pageSize : cursorIndex;
  if (prevCursorIndex > 0) {
    const newPrevRecordId = records[prevCursorIndex].id;
    newPrevToken = btoa(`prev__${newPrevRecordId}`);
  } else {
    newPrevToken = null;
  }

  const nextCursorIndex =
    direction === 'next' ? cursorIndex + pageSize : cursorIndex;
  if (nextCursorIndex < records.length) {
    const newNextRecordId = records[nextCursorIndex].id;
    newNextToken = btoa(`next__${newNextRecordId}`);
  } else {
    newNextToken = null;
  }

  return {
    newPrevToken,
    newNextToken,
  };
};

export default class PaginationController extends Controller {
  queryParams = [
    'currentPage_demo2',
    'currentPageSize_demo2',
    'currentSortBy_demo2',
    'currentSortOrder_demo2',
    'prevToken_demo4',
    'nextToken_demo4',
    // 'demoExtraParam',
  ];

  @service router;

  @tracked showHighlight = false;
  @tracked currentPage_demo1 = 2;
  @tracked currentPageSize_demo1 = 5;
  @tracked currentPage_demo2 = 2;
  @tracked currentPageSize_demo2 = 30;
  @tracked currentSortBy_demo2;
  @tracked currentSortOrder_demo2;
  // @tracked demoExtraParam = '';
  @tracked currentCursor_demo3 = btoa(`next__1`);
  @tracked newPrevCursor_demo3 = null;
  @tracked newNextCursor_demo3 = btoa(`next__6`);
  @tracked currentPageSize_demo3 = 5;
  @tracked prevToken_demo4 = null;
  @tracked nextToken_demo4 = btoa(`next__1`);

  get consumerRouteName() {
    // eg. 'components.pagination';
    return this.router.currentRouteName;
  }

  get demoTotalItems() {
    return this.model.records.length;
  }

  // GENERIC EVENT HANDLERS

  @action
  toggleHighlight() {
    this.showHighlight = !this.showHighlight;
  }

  @action
  logClickedControl(control) {
    console.log(`Control "${control}" clicked!`);
  }

  @action
  genericHandlePageChange(page, pageSize) {
    console.log(
      pageSize !== undefined
        ? `Page changed to "${page}" with page size equal to "${pageSize}"!`
        : `Page changed to "${page}"!`
    );
  }

  @action
  genericHandlePageSizeChange(pageSize) {
    console.log(`Page size changed to "${pageSize}"!`);
  }

  // DEMO #1 - NUMBERED / WITH EVENTS

  get paginatedData_demo1() {
    const start = (this.currentPage_demo1 - 1) * this.currentPageSize_demo1;
    const end = this.currentPage_demo1 * this.currentPageSize_demo1;
    return this.model.records.slice(start, end);
  }

  @action
  onPageChange_demo1(page, pageSize) {
    this.currentPage_demo1 = page;
    this.currentPageSize_demo1 = pageSize;
  }

  @action
  onPageSizeChange_demo1(pageSize) {
    // we agreed to reset the pagination to the first element (any alternative would result in an unpredictable UX)
    this.currentPage_demo1 = 1;
    this.currentPageSize_demo1 = pageSize;
  }

  // DEMO #2 - NUMBERED / WITH ROUTING

  @action
  onTableSort_demo2(sortBy, sortOrder) {
    // console.log('onTableSort_demo2 called', sortBy, sortOrder);
    this.currentSortBy_demo2 = sortBy;
    this.currentSortOrder_demo2 = sortOrder;
    // we should reset the selected page
    // this.currentPage_demo2 = 1;
  }

  get paginatedData_demo2() {
    const start = (this.currentPage_demo2 - 1) * this.currentPageSize_demo2;
    const end = this.currentPage_demo2 * this.currentPageSize_demo2;
    return this.model.records.slice(start, end);
  }

  // DEMO #3 - COMPACT / WITH EVENTS

  get newPrevCursor_demo3_decoded() {
    return this.newPrevCursor_demo3 ? atob(this.newPrevCursor_demo3) : '';
  }
  get currentCursor_demo3_decoded() {
    return this.currentCursor_demo3 ? atob(this.currentCursor_demo3) : '';
  }
  get newNextCursor_demo3_decoded() {
    return this.newNextCursor_demo3 ? atob(this.newNextCursor_demo3) : '';
  }

  get paginatedData_demo3() {
    const { direction, cursorIndex } = getCursorParts(
      this.currentCursor_demo3,
      this.model.records
    );

    let start;
    let end;
    let pageSize = this.currentPageSize_demo3;
    if (direction === 'prev') {
      end = cursorIndex - 1;
      start = cursorIndex - pageSize;
    } else {
      start = cursorIndex;
      end = cursorIndex + pageSize;
    }
    return this.model.records.slice(start, end);
  }

  get isDisabledPrev_demo3() {
    return this.newPrevCursor_demo3 === null;
  }

  get isDisabledNext_demo3() {
    return this.newNextCursor_demo3 === null;
  }

  @action
  onPageChange_demo3(page) {
    // update the "current" cursor
    if (page === 'prev') {
      this.currentCursor_demo3 = this.newPrevCursor_demo3;
    } else if (page === 'next') {
      this.currentCursor_demo3 = this.newNextCursor_demo3;
    }
    // update the prev/next cursors
    const newCursors = getNewPrevNextCursors(
      this.currentCursor_demo3,
      this.currentPageSize_demo3,
      this.model.records
    );
    this.newPrevCursor_demo3 = newCursors.newPrevToken;
    this.newNextCursor_demo3 = newCursors.newNextToken;
    // console.log(
    //   `onPageChange_demo3 now with
    //   this.currentCursor_demo3=${this.currentCursor_demo3}
    //   this.newPrevCursor_demo3=${this.newPrevCursor_demo3}
    //   this.newNextCursor_demo3=${this.newNextCursor_demo3}
    //   `
    // );
  }

  // DEMO #4 - COMPACT / WITH ROUTING

  @action
  updateCursor_demo4(newPrevCursorIndex, newNextCursorIndex) {
    // this.prevToken_demo4 =
    //   newPrevCursor < 0 ? null : btoa(`prev_${newPrevCursor}`);
    // this.nextToken_demo4 =
    //   newNextCursor > this.model.records.length - 1
    //     ? null
    //     : btoa(`next_${newNextCursor}`);

    let newPrevToken;
    let newNextToken;
    if (newPrevCursorIndex >= 0) {
      const newPrevRecordId = this.model.records[newPrevCursorIndex].id;
      newPrevToken = btoa(`prev_${newPrevRecordId}`);
    } else {
      newPrevToken = null;
    }
    if (newNextCursorIndex < this.model.records.length) {
      const newNextRecordId = this.model.records[newNextCursorIndex].id;
      newNextToken = btoa(`next_${newNextRecordId}`);
    } else {
      newNextToken = null;
    }

    console.log(
      '>>>>',
      newPrevCursorIndex,
      newPrevToken,
      newNextCursorIndex,
      newNextToken
    );

    this.prevToken_demo4 = newPrevToken;
    this.nextToken_demo4 = newNextToken;
  }

  get pageCursor_demo4() {
    return {
      prevToken: this.prevToken_demo4,
      nextToken: this.nextToken_demo4,
    };
  }

  get paginatedData_demo4() {
    const pageSize = 5;

    let token;
    if (this.prevToken_demo4) {
      token = atob(this.nextToken_demo4);
    } else if (this.nextToken_demo4) {
      token = atob(this.nextToken_demo4);
    } else {
      token = 'next__1';
    }
    const tokenParts = [...token.split('__')];
    const direction = tokenParts[0];
    const cursor = parseInt(tokenParts[1]);
    const cursorIndex = this.model.records.findIndex(
      (element) => element.id === parseInt(cursor)
    );
    console.log('>>>>', cursor, direction, cursorIndex);
    let start;
    let end;
    let records;
    if (direction === 'prev') {
      end = cursorIndex - 1;
      start = end - pageSize;
    } else {
      start = cursorIndex;
      end = cursorIndex + pageSize;
    }

    // calculate new cursors
    // const newPrevCursorIndex = start - 1 - pageSize;
    // const newNextCursorIndex = start + pageSize;
    // const newNextPrevCursors = getNewPrevNextCursors(
    //   newPrevCursorIndex,
    //   newNextCursorIndex,
    //   this.model.records
    // );
    // this.updateCursor_demo4(newPrevCursorIndex, newNextCursorIndex);
    // console.log(newNextPrevCursors);

    // return data
    records = this.model.records.slice(start, end);
    return records;
  }
}
