// app/controllers/components/table.js

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ComponentsTableController extends Controller {
  @tracked sortBy = '';
  @tracked sortOrder = 'asc';
  queryParams = ['sortBy', 'sortOrder'];

  @action
  setSortBy(value) {
    this.sortBy = value;
    return this.sortBy;
  }

  @action
  setSortOrder(value) {
    this.sortOrder = value;
    return this.sortOrder;
  }
}
