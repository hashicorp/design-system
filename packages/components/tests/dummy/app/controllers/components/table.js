import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class ComponentsTableController extends Controller {
  queryParams = ['sortby', 'sortdescending'];
  @tracked sortby = 'year';
  @tracked sortdescending = false;

  get sortedRecords() {
    const sorted = this.model.slice().sortBy(this.sortby || 'year');
    return this.sortdescending ? sorted.reverse() : sorted;
  }
}
