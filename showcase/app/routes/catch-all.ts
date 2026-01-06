import Route from '@ember/routing/route';
import { service } from '@ember/service';

import type RouterService from '@ember/routing/router-service';
import type Transition from '@ember/routing/transition';

export default class CatchAllRoute extends Route {
  @service declare readonly router: RouterService;

  beforeModel(transition: Transition) {
    // just go back to where we were
    let name, params, queryParams;
    if (transition.from) {
      name = transition.from.name;
      params = transition.from.params;
      queryParams = transition.from.queryParams;
      return this.router.replaceWith(name, params, {
        queryParams: queryParams,
      });
    }
  }
}
