import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ComponentsTableController extends Controller {
  @tracked sortBy = '';
  @tracked sortOrder = '';

  get customSortMethod() {
    let myCustomDataArray = [
      'critical',
      'warning',
      'success',
      'highlight',
      'neutral',
    ];

    return (a, b) => {
      const aIndex = myCustomDataArray.indexOf(a['badge-color.name']);
      const bIndex = myCustomDataArray.indexOf(b['badge-color.name']);
      if (aIndex < bIndex) {
        return -1;
      } else if (aIndex > bIndex) {
        return 1;
      } else {
        return 0;
      }
    };
  }

  @action
  customOnSort(sortBy, sortOrder) {
    this.sortBy = sortBy;
    this.sortOrder = sortOrder;
  }
}
