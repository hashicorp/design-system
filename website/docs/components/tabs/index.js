/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class Index extends Component {
  @service router;

  // ----------------------------
  // since this is techically a component and not a controller
  // we can't directly access the query parameters values (and then track them)
  // using the `queryParams` declaration, so we need to access them directly
  // via the router, and provide them as getter to the code snippets so they're
  // kept in sync with the URL whenever the user interacts with the demo component

  get demoSelectedTab() {
    return parseInt(
      this.router?.currentRoute?.queryParams?.demoSelectedTab ?? 0
    );
  }

  get demoRouteName() {
    // eg. 'components.pagination';
    return this.router.currentRouteName;
  }

  @action
  async demoUpdateSelectedTabQueryParam(_element, index) {
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

  @action
  logClickedTab(event, index) {
    const tabId = event.target.id;
    console.log(`Tab with ID "${tabId}" and index "${index}" clicked!`);
  }
}
