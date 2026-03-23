import Component from '@glimmer/component';
import { service } from '@ember/service';

import type RouterService from '@ember/routing/router-service';

import { HdsPaginationCompact } from '@hashicorp/design-system-components/components';

import type { HdsPaginationDirections } from '@hashicorp/design-system-components/components/hds/pagination/types';

import USER_DATA from 'website/mocks/user-data';
import type { User } from 'website/mocks/user-data';

type DemoQueryParams = Record<string, string | number | boolean | undefined> & {
  demoCurrentCursor?: string | number;
  demoCurrentPageSize?: string | number;
  preserveScrollPosition?: boolean;
};

const getCursorParts = (cursor: string, records: User[]) => {
  const token = atob(cursor);
  const tokenParts = [...token.split('__')];
  const direction = tokenParts[0] as HdsPaginationDirections;
  const cursorID = Number(tokenParts[1]);
  const cursorIndex = records.findIndex((element) => element.id === cursorID);
  return { direction, cursorID, cursorIndex };
};

const getNewPrevNextCursors = (
  cursor: string,
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

export default class LocalComponent extends Component {
  @service declare readonly router: RouterService;

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

  get demoCurrentPageSize() {
    return this.toPositiveInt(this.routeQueryParams.demoCurrentPageSize, 5);
  }

  get demoNewPrevNextCursors() {
    const { newPrevCursor, newNextCursor } = getNewPrevNextCursors(
      this.demoCurrentCursor,
      this.demoCurrentPageSize,
      this.model.records,
    );
    return {
      newPrevCursor,
      newNextCursor,
    };
  }

  get demoIsDisabledPrev() {
    const { newPrevCursor } = this.demoNewPrevNextCursors;
    return newPrevCursor === null;
  }

  get demoIsDisabledNext() {
    const { newNextCursor } = this.demoNewPrevNextCursors;
    return newNextCursor === null;
  }

  get demoQueryFunctionCompact() {
    const { newPrevCursor, newNextCursor } = this.demoNewPrevNextCursors;
    return (page: HdsPaginationDirections) => {
      return {
        // important: in order for this to work, the query param name needs to be added to the list of query params in the controller:
        // see: https://github.com/hashicorp/design-system/blob/main/website/app/controllers/show.js#L42-L53
        demoCurrentCursor: page === 'prev' ? newPrevCursor : newNextCursor,
        demoCurrentPageSize: 5,
        // see: https://github.com/DockYard/ember-router-scroll#preservescrollposition-with-queryparams
        preserveScrollPosition: true,
      };
    };
  }

  get demoCurrentCursor() {
    const currentCursor = this.routeQueryParams.demoCurrentCursor;
    return typeof currentCursor === 'string' && currentCursor.length > 0
      ? currentCursor
      : btoa(`next__1`);
  }

  <template>
    <HdsPaginationCompact
      @route={{this.demoRouteName}}
      @queryFunction={{this.demoQueryFunctionCompact}}
      @isDisabledPrev={{this.demoIsDisabledPrev}}
      @isDisabledNext={{this.demoIsDisabledNext}}
    />
  </template>
}
