import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ComponentsTableController extends Controller {
  // TODO think about query param support
  // queryParams = ['sortBy', 'sortOrder'];

  // these are already tracked in the component, do they also need to be tracked here? Will that cause problems if there are other sortable tables?
  // @tracked sortBy = 'color';
  // @tracked sortOrder = 'asc';

  get customSortMethod() {
    let myCustomDataArray = [
      'critical',
      'warning',
      'success',
      'highlight',
      'neutral',
    ];

    const sortFn = (a, b) => {
      const aIndex = myCustomDataArray.indexOf(a['color']);
      const bIndex = myCustomDataArray.indexOf(b['color']);
      if (aIndex < bIndex) {
        return -1;
      } else if (aIndex > bIndex) {
        return 1;
      } else {
        return 0;
      }
    };
    return myCustomDataArray.sort(sortFn);
  }

  @action
  customOnSort(sortBy, sortOrder) {
    this.sortBy = sortBy;
    this.sortOrder = sortOrder;
  }
}
