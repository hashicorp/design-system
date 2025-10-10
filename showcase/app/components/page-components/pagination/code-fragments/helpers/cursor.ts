import type { User } from 'showcase/mocks/user-data';

export const getCursorParts = (cursor: string | null, records: User[]) => {
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

export const getNewPrevNextCursors = (
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
