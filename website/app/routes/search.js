import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class SearchRoute extends Route {
  queryParams = {
    fullTextSearch: {
      refreshModel: true,
    },
  };

  @service router;

  model(params) {
    if (params.fullTextSearch) {
      return {
        results: [
          {
            query: params.fullTextSearch,
          },
        ],
      };
    } else {
      return {};
    }
  }
}
