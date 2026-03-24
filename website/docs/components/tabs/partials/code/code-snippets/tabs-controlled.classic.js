import Component from '@glimmer/component';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class LocalComponent extends Component {
  @service router;

  get demoSelectedTab() {
    return parseInt(
      this.router?.currentRoute?.queryParams?.demoSelectedTab ?? 0
    );
  }

  @action
  async demoUpdateSelectedTabQueryParam(_event, index) {
    const routeQueryParams = this?.router?.currentRoute?.queryParams ?? {};
    let queryParams = Object.assign({}, routeQueryParams);
    if (index !== undefined) {
      // important: in order for this to work, the query param name needs to be added to the list of query params in the controller:
      // see: https://github.com/hashicorp/design-system/blob/main/website/app/controllers/show.js#L42-L53
      queryParams.demoSelectedTab = index;
      // see: https://github.com/DockYard/ember-router-scroll#preservescrollposition-with-queryparams
      queryParams.preserveScrollPosition = true;

      // navigate to the new URL (notice: the anchor/fragment `#...` is not preserved unfortunately)
      await this.router.transitionTo({ queryParams });
    }
  }
}
