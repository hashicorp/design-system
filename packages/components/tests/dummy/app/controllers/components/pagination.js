import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class PaginationController extends Controller {
  queryParams = ['myCurrentPage', 'myCurrentPageSize', 'myExtraParam'];

  @service router;

  @tracked showHighlight = false;

  get consumerRouteName() {
    // return this.router.currentRouteName;
    return 'components.pagination';
  }

  get consumerQueryFunction() {
    return function (page, pageSize) {
      return {
        myCurrentPage: page,
        myCurrentPageSize: pageSize,
        myExtraParam: 'hello',
      };
    };
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
