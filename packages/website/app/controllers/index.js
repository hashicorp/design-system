import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { restartableTask, timeout } from 'ember-concurrency';

const DEBOUNCE_MS = 250;

export default class IndexController extends Controller {
  queryParams = ['query'];

  @tracked query = null;
  @tracked model;

  get filteredIcons() {
    let query = this.query;
    let icons = this.model;

    if (query) {
      return icons.filter((i) => {
        return i.searchable.indexOf(query) !== -1;
      });
    } else {
      return icons;
    }
  }

  @restartableTask *searchIcons(query) {
    yield timeout(DEBOUNCE_MS);

    this.query = query;
    return this.filteredIcons;
  }
}
