import Component from '@glimmer/component';
import { service } from '@ember/service';

import USER_DATA from 'website/mocks/user-data';

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

export default class LocalComponent extends Component {
  @service router;

  get model() {
    return { records: USER_DATA };
  }

  get demoRouteName() {
    // eg. 'components.pagination';
    return this.router.currentRouteName ?? '';
  }

  get demoCurrentPageSize() {
    return 5;
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

  get demoIsDisabledPrev() {
    let { newPrevCursor } = this.demoNewPrevNextCursors;
    return newPrevCursor === null;
  }

  get demoIsDisabledNext() {
    let { newNextCursor } = this.demoNewPrevNextCursors;
    return newNextCursor === null;
  }

  get demoPaginatedDataCompact() {
    const { direction, cursorIndex } = getCursorParts(
      this.demoCurrentCursor,
      this.model.records,
    );

    let start;
    let end;
    if (direction === 'prev') {
      end = cursorIndex;
      start = cursorIndex - this.demoCurrentPageSize;
    } else {
      start = cursorIndex;
      end = cursorIndex + this.demoCurrentPageSize;
    }

    // return data
    return this.model.records.slice(start, end);
  }


  get demoQueryFunctionCompact() {
    let { newPrevCursor, newNextCursor } = this.demoNewPrevNextCursors;
    return (page) => {
      return {
        // important: in order for this to work, the query param name needs to be added to the list of query params in the controller:
        // see: https://github.com/hashicorp/design-system/blob/main/website/app/controllers/show.js#L42-L53
        demoCurrentCursor: page === 'prev' ? newPrevCursor : newNextCursor,
        demoExtraParam: 'hello',
        // see: https://github.com/DockYard/ember-router-scroll#preservescrollposition-with-queryparams
        preserveScrollPosition: true,
      };
    };
  }

    get demoCurrentCursor() {
    return (
      this.router?.currentRoute?.queryParams?.demoCurrentCursor ??
      btoa(`next__1`)
    );
  }
}
