import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

const customSortingCriteriaArray = [
  'critical',
  'warning',
  'success',
  'highlight',
  'neutral',
];

export default class ComponentsTableController extends Controller {
  queryParams = ['sortBy', 'sortOrder'];

  @tracked sortBy;
  @tracked sortOrder;

  get customSortingMethodForBadges() {
    return (a, b) => {
      const aIndex = customSortingCriteriaArray.indexOf(a['color']);
      const bIndex = customSortingCriteriaArray.indexOf(b['color']);
      if (aIndex < bIndex) {
        return this.sortOrder === 'asc' ? -1 : 1;
      } else if (aIndex > bIndex) {
        return this.sortOrder === 'asc' ? 1 : -1;
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

  @action
  onClickThCustomSort(column) {
    this.sortBy = column;
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
  }
}
