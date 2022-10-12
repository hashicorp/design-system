import Component from '@glimmer/component';

export default class HdsTableThSortComponent extends Component {
  get isActiveSortColumn() {
    return this.args.text === this.args.sortBy;
  }

  get ariaSort() {
    if (this.isActiveSortColumn) {
      return this.args.sortBy === 'asc' ? 'ascending' : 'descending';
    } else {
      return undefined;
    }
  }

  get icon() {
    if (this.isActiveSortColumn) {
      return this.args.sortOrder === 'desc' ? 'arrow-up' : 'arrow-down';
    } else {
      return 'swap-vertical';
    }
  }
}
