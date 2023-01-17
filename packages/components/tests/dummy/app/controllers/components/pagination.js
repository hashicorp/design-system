import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class PaginationController extends Controller {
  queryParams = [
    'currentPage_demo2',
    'currentPageSize_demo2',
    'demoExtraParam',
    'prevToken_demo4',
    'nextToken_demo4',
  ];

  @service router;

  @tracked showHighlight = false;
  @tracked currentPage_demo1 = 2;
  @tracked currentPageSize_demo1 = 5;
  @tracked currentPage_demo2 = 2;
  @tracked currentPageSize_demo2 = 30;
  // @tracked demoExtraParam = '';
  @tracked pageCursor_demo3 = {
    prev: null,
    next: btoa(`next__1`),
  };
  @tracked pageSize_demo3 = 5;
  @tracked pageCursor_demo4 = {
    prevToken: null,
    nextToken: btoa(`next__1`),
  };
  @tracked prevToken_demo4;
  @tracked nextToken_demo4;
  @tracked pageSize_demo4 = 5;

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

  // DEMO #1

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

  // DEMO #2

  get paginatedData_demo2() {
    const start = (this.currentPage_demo2 - 1) * this.currentPageSize_demo2;
    const end = this.currentPage_demo2 * this.currentPageSize_demo2;
    return this.model.records.slice(start, end);
  }

  // DEMO #3

  get paginatedData_demo3() {
    const start = (this.currentPage_demo2 - 1) * this.currentPageSize_demo2;
    const end = this.currentPage_demo2 * this.currentPageSize_demo2;
    return this.model.records.slice(start, end);
  }

  get isDisabledPrev_demo3() {
    return this.prevPageToken_demo3 === null;
  }

  get isDisabledNext_demo3() {
    return this.nextPageToken_demo3 === null;
  }

  @action
  onPageChange_demo3(page) {
    // TODO update cursor here
    console.log('AAAA', page);
    // this.pageCursor_demo3 = {};
  }

  // DEMO #4

  get paginatedData_demo4() {
    if (prevToken_demo4) {

    } else if () {

    } else {

    }
    const start = (this.currentPage_demo2 - 1) * this.currentPageSize_demo2;
    const end = this.currentPage_demo2 * this.currentPageSize_demo2;
    return this.model.records.slice(start, end);
  }
}
