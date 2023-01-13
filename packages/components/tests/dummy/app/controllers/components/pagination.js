import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class PaginationController extends Controller {
  queryParams = ['demoCurrentPage', 'demoCurrentPageSize', 'demoExtraParam'];

  @service router;

  @tracked showHighlight = false;
  @tracked demoCurrentPage = 1;
  @tracked demoCurrentPageSize = 10;

  get consumerRouteName() {
    // return this.router.currentRouteName;
    return 'components.pagination';
  }

  get consumerQueryFunction() {
    return function (page, pageSize) {
      console.log(
        `consumerQueryFunction called / page=${page} / pageSize=${pageSize}`
      );
      return {
        demoCurrentPage: page,
        demoCurrentPageSize: pageSize,
        demoExtraParam: 'hello',
      };
    };
  }

  get demoTotalItems() {
    return this.model.records.length;
  }

  get demoPaginatedData() {
    const start = (this.demoCurrentPage - 1) * this.demoCurrentPageSize;
    const end = this.demoCurrentPage * this.demoCurrentPageSize;
    return this.model.records.slice(start, end);
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
