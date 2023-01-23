import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

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

  let newPrevCursor;
  let newNextCursor;

  const prevCursorIndex =
    direction === 'prev' ? cursorIndex - pageSize : cursorIndex;
  if (prevCursorIndex > 0) {
    const newPrevRecordId = records[prevCursorIndex].id;
    newPrevCursor = btoa(`prev__${newPrevRecordId}`);
  } else {
    newPrevCursor = null;
  }

  const nextCursorIndex =
    direction === 'next' ? cursorIndex + pageSize : cursorIndex;
  if (nextCursorIndex < records.length) {
    const newNextRecordId = records[nextCursorIndex].id;
    newNextCursor = btoa(`next__${newNextRecordId}`);
  } else {
    newNextCursor = null;
  }

  return {
    newPrevCursor,
    newNextCursor,
  };
};

export default class PaginationController extends Controller {
  queryParams = [
    'demoCurrentPage',
    'demoCurrentPageSize',
    'demoCurrentCursor',
    'demoExtraParam',
    // ---------
    // 'currentPage_demo2',
    // 'currentPageSize_demo2',
    // 'currentSortBy_demo2',
    // 'currentSortOrder_demo2',
    // 'prevToken_demo4',
    // 'nextToken_demo4',
  ];

  @service router;

  @tracked showHighlight = false;
  @tracked demoCurrentPage = 1;
  @tracked demoCurrentPageSize = 5;
  @tracked demoCurrentCursor = btoa(`next__1`);
  // -----
  @tracked currentPage_demo1 = 2;
  @tracked currentPageSize_demo1 = 5;
  @tracked currentPage_demo2 = 2;
  @tracked currentPageSize_demo2 = 30;
  @tracked currentSortBy_demo2;
  @tracked currentSortOrder_demo2;
  @tracked demoExtraParam = '';
  @tracked currentCursor_demo3 = btoa(`next__1`);
  @tracked newPrevCursor_demo3 = null;
  @tracked newNextCursor_demo3 = btoa(`next__6`);
  @tracked currentPageSize_demo3 = 5;
  @tracked prevToken_demo4 = null;
  @tracked nextToken_demo4 = btoa(`next__1`);
  @tracked newPrevCursor_demo4;
  @tracked newNextCursor_demo4;
  @tracked currentPageSize_demo4 = 5;

  get demoRouteName() {
    // eg. 'components.pagination';
    return this.router.currentRouteName;
  }

  get demoTotalItems() {
    return this.model.records.length;
  }

  get demoQueryFunctionNumbered() {
    return (page, pageSize) => {
      return {
        demoCurrentPage: page,
        demoCurrentPageSize: pageSize,
      };
    };
  }

  get newPrevNextCursors() {
    let { newPrevCursor, newNextCursor } = getNewPrevNextCursors(
      this.demoCurrentCursor,
      this.demoCurrentPageSize,
      this.model.records
    );
    return {
      newPrevCursor,
      newNextCursor,
    };
  }

  get demoQueryFunctionCompact() {
    let { newPrevCursor, newNextCursor } = this.newPrevNextCursors;
    return (page) => {
      return {
        demoCurrentCursor: page === 'prev' ? newPrevCursor : newNextCursor,
        demoExtraParam: 'hello',
      };
    };
  }

  get demoIsDisabledPrev() {
    let { newPrevCursor } = this.newPrevNextCursors;
    return newPrevCursor === null;
  }

  get demoIsDisabledNext() {
    let { newNextCursor } = this.newPrevNextCursors;
    return newNextCursor === null;
  }

  @action
  toggleHighlight() {
    this.showHighlight = !this.showHighlight;
  }

  @action
  logClickedControl(control) {
    console.log(`Control "${control}" clicked!`);
  }

  @action
  handlePageChange(page, pageSize) {
    console.log(
      pageSize !== undefined
        ? `Page changed to "${page}" with page size equal to "${pageSize}"!`
        : `Page changed to "${page}"!`
    );
  }

  @action
  handlePageSizeChange(size) {
    console.log(`Page size changed to "${size}"!`);
  }
}
