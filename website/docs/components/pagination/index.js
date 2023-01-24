import Component from '@glimmer/component';
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

export default class Index extends Component {
  @service router;

  @tracked demoCurrentPage = 1;
  @tracked demoCurrentPageSize = 5;
  @tracked demoCurrentCursor = btoa(`next__1`);
  @tracked demoPageSizes = [5, 10, 30];
  @tracked demoExtraParam = '';

  get model() {
    let records = Array.from(Array(39), (x, i) => ({ id: i + 1 }));
    return { records };
  }

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

  get demoNewPrevNextCursors() {
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
    let { newPrevCursor, newNextCursor } = this.demoNewPrevNextCursors;
    return (page) => {
      return {
        demoCurrentCursor: page === 'prev' ? newPrevCursor : newNextCursor,
        demoExtraParam: 'hello',
      };
    };
  }

  get demoIsDisabledPrev() {
    let { newPrevCursor } = this.demoNewPrevNextCursors;
    return newPrevCursor === null;
  }

  get demoIsDisabledNext() {
    let { newNextCursor } = this.demoNewPrevNextCursors;
    return newNextCursor === null;
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
