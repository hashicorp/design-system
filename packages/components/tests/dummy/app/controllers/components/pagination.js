import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

const xxx = (page, pageSize, from, current) => {
  console.log(
    `consumerQueryFunction called / page=${page} / pageSize=${pageSize} / from=${from} / current=${current}`
  );
  return {
    demoCurrentPage: page,
    demoCurrentPageSize: pageSize,
    demoExtraParam: 'hello',
  };
};

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
    return xxx;
  }

  get demoTotalItems() {
    return this.model.records.length;
  }

  get demoPaginatedData() {
    // const start = (this.demoCurrentPage - 1) * this.demoCurrentPageSize;
    // const end = this.demoCurrentPage * this.demoCurrentPageSize;
    // return this.model.records.slice(start, end);
    return this.model.records.slice(0, 10);
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
