import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class IndexController extends Controller {
  queryParams = ['query'];

  @tracked query = null;
  @tracked model;

  get filteredIcons() {
    let query = this.query;
    let icons = this.model;

    if (query) {
      return icons.filter((i) => {
        return i.searchable.indexOf(query) !== -1
      });
    } else {
      return icons;
    }
  }

  @action
  async updateSearchText(value, signal) {
    await new Promise((resolve) => setTimeout(resolve, 190));

    if (signal.aborted) {
      return;
    }
    this.query = value;
    return this.filteredIcons();
  }

  @action
  debouncedUpdate(event) {
    debugger
    if (this.ctrl) {
      this.ctrl.abort();
    }
    this.ctrl = new AbortController();
    this.updateSearchText(event.target.value, this.ctrl.signal);
  }
}
