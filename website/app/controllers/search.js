import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { restartableTask, timeout } from 'ember-concurrency';
import { inject as service } from '@ember/service';

const DEBOUNCE_MS = 250;

export default class SearchController extends Controller {
  queryParams = ['fullTextSearch'];

  @service router;

  @tracked searchQuery = this.fullTextSearch;

  updateQueryParams() {
    const newQueryParams = { queryParams: {} };
    if (this.searchQuery) {
      newQueryParams.queryParams.fullTextSearch = this.searchQuery;
    } else {
      newQueryParams.queryParams.fullTextSearch = null;
    }
    this.router.transitionTo(newQueryParams);
  }

  @restartableTask *searchFullText(searchQuery) {
    yield timeout(DEBOUNCE_MS);

    this.searchQuery = searchQuery;
    this.updateQueryParams();
  }
}
