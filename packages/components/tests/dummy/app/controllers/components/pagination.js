import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class PaginationController extends Controller {
  queryParams = [
    'currentPage_demo2',
    'currentPageSize_demo2',
    'demoExtraParam',
  ];

  @service router;

  @tracked showHighlight = false;
  @tracked currentPage_demo1 = 2;
  @tracked currentPageSize_demo1 = 5;
  @tracked currentPage_demo2 = 2;
  @tracked currentPageSize_demo2 = 30;
  // @tracked demoExtraParam = '';

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

  get paginatedData_demo1() {
    const start = (this.currentPage_demo1 - 1) * this.currentPageSize_demo1;
    const end = this.currentPage_demo1 * this.currentPageSize_demo1;
    return this.model.records.slice(start, end);
  }

  // DEMO #2

  get paginatedData_demo2() {
    const start = (this.currentPage_demo2 - 1) * this.currentPageSize_demo2;
    const end = this.currentPage_demo2 * this.currentPageSize_demo2;
    return this.model.records.slice(start, end);
  }
}
