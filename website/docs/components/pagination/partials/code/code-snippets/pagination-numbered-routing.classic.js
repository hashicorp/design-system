import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';

import USER_DATA from 'website/mocks/user-data';

export default class LocalComponent extends Component {
  @service router;

  @tracked demoPageSizes = [5, 10, 30];

  get model() {
    return { records: USER_DATA };
  }

  get demoRouteName() {
    // eg. 'components.pagination';
    return this.router.currentRouteName ?? '';
  }

  get demoTotalItems() {
    return this.model.records.length;
  }

  get demoCurrentPage() {
    return parseInt(
      this.router?.currentRoute?.queryParams?.demoCurrentPage ?? 1
    );
  }

  get demoCurrentPageSize() {
    return parseInt(
      this.router?.currentRoute?.queryParams?.demoCurrentPageSize ?? 5
    );
  }

  get demoQueryFunctionNumbered() {
    return (page, pageSize) => {
      return {
        // important: in order for this to work, the query param name needs to be added to the list of query params in the controller:
        // see: https://github.com/hashicorp/design-system/blob/main/website/app/controllers/show.js#L42-L53
        demoCurrentPage: page,
        demoCurrentPageSize: pageSize,
        // see: https://github.com/DockYard/ember-router-scroll#preservescrollposition-with-queryparams
        preserveScrollPosition: true,
      };
    };
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
  async handlePageSizeChangeNumbered(pageSize) {
    const routeQueryParams = this?.router?.currentRoute?.queryParams ?? {};
    let queryParams = Object.assign({}, routeQueryParams);
    // the sensible thing to do here is to reset the pagination to the first element (any alternative would result in an unpredictable UX)
    queryParams.demoCurrentPage = 1;
    queryParams.demoCurrentPageSize = pageSize;
    // see: https://github.com/DockYard/ember-router-scroll#preservescrollposition-with-queryparams
    queryParams.preserveScrollPosition = true;
    // navigate to the new URL (notice: the anchor/fragment `#...` is not preserved unfortunately)
    await this.router.transitionTo({ queryParams });
  }
}
